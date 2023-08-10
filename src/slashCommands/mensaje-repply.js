const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mensaje-reply')
    .setDescription('Responder a un mensaje en un servidor.')
    .addStringOption(option => option.setName('mensaje').setDescription('El mensaje de respuesta.').setRequired(true))
    .addStringOption(option =>
      option.setName('mensaje_id').setDescription('El ID del mensaje al que deseas responder.').setRequired(true),
    )
    .addStringOption(option =>
      option.setName('canal_id').setDescription('El ID del canal donde se encuentra el mensaje.').setRequired(true),
    ),

  async run(client, interaction) {
    const mensaje = interaction.options.getString('mensaje')
    const mensajeId = interaction.options.getString('mensaje_id')
    const canalId = interaction.options.getString('canal_id')
    const canal = await client.channels.fetch(canalId)

    canal.messages
      .fetch(mensajeId)
      .then(mensajeOriginal => {
        mensajeOriginal.reply(mensaje)

        const embed = new EmbedBuilder()
          .setDescription('Mensaje de respuesta enviado correctamente.')
          .setColor('#00FF00')

        interaction.reply({
          embeds: [embed],
        })
      })
      .catch(error => {
        console.error(`Error al obtener el mensaje original: ${error}`)
        const embed = new EmbedBuilder()
          .setDescription('No se pudo encontrar el mensaje al que deseas responder.')
          .setColor('#FF0000')

        interaction.reply({
          embeds: [embed],
        })
      })
  },
}
