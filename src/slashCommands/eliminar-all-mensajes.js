const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('eliminar-all-mensajes')
    .setDescription('Eliminar todos los mensajes en un canal.')
    .addChannelOption(option =>
      option.setName('canal').setDescription('El ID del canal donde se eliminarán los mensajes.').setRequired(true),
    ),

  async run(client, interaction) {
    const canalId = interaction.options.getChannel('canal').id
    const canal = await client.channels.fetch(canalId)

    const embed = new EmbedBuilder()
      .setTitle('Confirmación de borrado de mensajes')
      .setDescription('¿Estás seguro de que deseas eliminar todos los mensajes en el canal?')
      .setColor('#7289DA')

    const confirmButton = new ButtonBuilder()
      .setLabel('Confirmar')
      .setStyle(ButtonStyle.Danger)
      .setCustomId('confirmar-borrado')

    const cancelButton = new ButtonBuilder()
      .setLabel('Cancelar')
      .setStyle(ButtonStyle.Secondary)
      .setCustomId('cancelar-borrado')

    const row = new ActionRowBuilder().addComponents(confirmButton, cancelButton)

    interaction.reply({
      embeds: [embed],
      components: [row],
    })

    const filter = i => i.user.id === interaction.user.id
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    })

    collector.on('collect', async i => {
      if (i.customId === 'confirmar-borrado') {
        const messages = await canal.messages.fetch({ limit: 1 })
        if (messages.size === 0) {
          const resultadoEmbed = new EmbedBuilder().setDescription('El canal no contiene mensajes.').setColor('#FF0000')

          interaction.channel.send({
            embeds: [resultadoEmbed],
          })
        } else {
          await canal.bulkDelete(100, true)

          const resultadoEmbed = new EmbedBuilder()
            .setDescription('Se eliminaron todos los mensajes en el canal.')
            .setColor('#00FF00')

          interaction.channel.send({
            embeds: [resultadoEmbed],
          })
        }
        collector.stop()
      } else if (i.customId === 'cancelar-borrado') {
        const resultadoEmbed = new EmbedBuilder()
          .setDescription('El borrado de mensajes ha sido cancelado.')
          .setColor('#FF0000')

        interaction.channel.send({
          embeds: [resultadoEmbed],
        })
        collector.stop()
      }
    })

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        const resultadoEmbed = new EmbedBuilder().setDescription('La confirmación ha expirado.').setColor('#FF0000')

        interaction.channel.send({
          embeds: [resultadoEmbed],
        })
      }
    })
  },
}
