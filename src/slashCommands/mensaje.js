const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mensaje')
    .setDescription('Enviar un mensaje a un canal.')
    .addStringOption(option =>
      option.setName('mensaje').setDescription('El mensaje que deseas enviar.').setRequired(true),
    )
    .addChannelOption(option =>
      option.setName('canal').setDescription('El ID del canal donde se enviará el mensaje.').setRequired(true),
    ),

  /**
   *
   * @param {import("discord.js").Client<true>} client
   * @param {import("discord.js").ChatInputCommandInteraction<"cached">} interaction
   */

  async run(client, interaction) {
    const mensaje = interaction.options.getString('mensaje')
    const canalId = interaction.options.getChannel('canal').id
    const canal = await client.channels.fetch(canalId)

    canal.send(mensaje)

    const embed = new EmbedBuilder().setDescription('Mensaje enviado correctamente.').setColor('#00FF00')

    interaction.reply({
      embeds: [embed],
    })
  },
}
