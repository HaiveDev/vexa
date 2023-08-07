const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  OverwriteType,
} = require("discord.js");
const fs = require("fs");
const config = require("../config.json");
const schedule = require('node-schedule');
const discordTranscripts = require("discord-html-transcripts");

const client = new Client({
  intents: [
    GatewayIntentBits.AutoModerationConfiguration,
    GatewayIntentBits.AutoModerationExecution,
    GatewayIntentBits.DirectMessageReactions,
    GatewayIntentBits.DirectMessageTyping,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildEmojisAndStickers,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildScheduledEvents,
    GatewayIntentBits.GuildVoiceStates,
    GatewayIntentBits.GuildWebhooks,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
  ],
  partials: [
    Partials.Channel,
    Partials.GuildMember,
    Partials.GuildScheduledEvent,
    Partials.Message,
    Partials.Reaction,
    Partials.ThreadMember,
    Partials.User,
  ],
});

const footerCard = {
  text: "Developer Haiver | 2023",
  iconURL: "https://cdn.discordapp.com/emojis/1039303644291543121.gif",
};
const imgJefe = "https://i.imgur.com/dMIasZa.png";
const colorJefe = "#9f02b8";
const jefesChannel = "1115385931910877194";
const kothsChannel = "1115386120801370312";
const rolAnuncio = "1123253700731879564";

client.slashCommands = new Collection();
const slashCommandsFiles = fs
  .readdirSync("./src/slashCommands")
  .filter((file) => file.endsWith("js"));

for (const file of slashCommandsFiles) {
  const slash = require(`./slashCommands/${file}`);
  client.slashCommands.set(slash.data.name, slash);
}



client.on("interactionCreate", async (interaction) => {
  if (interaction.isChatInputCommand()) {
    const slashCommand = client.slashCommands.get(interaction.commandName);

    if (!slashCommand) return;

    try {
      await slashCommand.run(client, interaction);
    } catch (e) {
      console.error(e);
    }
  }
  if (interaction.isButton()) {
    if (interaction.customId === "crear-ticket") {
      const everyone = interaction.guild.roles.cache.find(
        (rol) => rol.name === "@everyone"
      );

      interaction.guild.channels
        .create({
          name: `┣🎫│ᴛɪᴄᴋᴇᴛ-${interaction.user.username}`,
          parent: config.ticketsCategoryId,
          permissionOverwrites: [
            {
              id: everyone.id,
              deny: ["ViewChannel", "SendMessages"],
            },
            {
              id: interaction.user.id,
              allow: ["ViewChannel", "SendMessages", "AttachFiles"],
            },
          ],
        })
        .then((channel) => {
          interaction.reply({
            content: `¡Tu ticket ha sido creado correctamente! ${channel.toString()}`,
            ephemeral: true,
          });

          const embedTicket = new EmbedBuilder()
            .setAuthor({
              name: `${interaction.user.tag} ha creado un ticket.`,
              iconURL: interaction.user.displayAvatarURL({
                forceStatic: false,
              }),
            })
            .setColor("Blurple")
            .setDescription("Espera a que un moderador te responda.")
            .setTimestamp();

          const rowTicket = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setCustomId("cerrar-ticket")
              .setLabel("Cerrar Ticket")
              .setStyle(ButtonStyle.Danger)
          );

          channel.send({
            content: interaction.user.toString(),
            embeds: [embedTicket],
            components: [rowTicket],
          });
        });
    }
    if (interaction.customId === "cerrar-ticket") {
      await interaction.deferUpdate();

      const usuario = interaction.channel.permissionOverwrites.cache.find(
        (permisos) => permisos.type !== OverwriteType.Role
      );

      await interaction.channel.permissionOverwrites.edit(usuario.id, {
        ViewChannel: false,
        SendMessages: false,
      });

      const embedTicketCerrado = new EmbedBuilder()
        .setColor("Red")
        .setDescription(
          `\`\`\`El ticket fue cerrado por ${interaction.user.tag}\`\`\``
        )
        .setTimestamp();

      const rowTicketCerrado = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("eliminar-ticket")
          .setLabel("Eliminar Ticket")
          .setStyle(ButtonStyle.Danger)
          .setEmoji("🗑️"),

        new ButtonBuilder()
          .setCustomId("transcript")
          .setLabel("Transcript")
          .setStyle(ButtonStyle.Secondary)
      );

      interaction.channel.send({
        embeds: [embedTicketCerrado],
        components: [rowTicketCerrado],
      });

      await interaction.message.delete();
    }
    if (interaction.customId === "eliminar-ticket") {
      await interaction.reply({
        content: "El ticket será cerrado en **5 segundos**.",
        ephemeral: true,
      });

      await interaction.message.delete();

      setTimeout(async function () {
        await interaction.channel.delete();
      }, 5000);
    }
    if (interaction.customId === "transcript") {
      interaction.reply(
        "El transcript está siendo generado. Espera un momento."
      );

      const attachment = await discordTranscripts.createTranscript(
        interaction.channel
      );

      interaction.channel.send({ files: [attachment] });
    }
  }
});

/* ============| Respuestas |============ */
client.on("messageCreate", (message) => {
  switch (message.content.toLowerCase()) {
    case "que":
      message.reply("so");
      break;
    case "q":
      message.reply("so");
      break;
    case "rra":
      message.reply("eres");
      break;
    case "a":
      message.reply("b");
      break;
    case "dime":
      message.reply("me");
      break;
    case "verga":
      message.reply("comes");
      break;
    default:
      // No se realiza ninguna acción si el mensaje no coincide con ningún caso
      break;
  }
});

/* ============| Reacciones |============ */
client.on("messageCreate", (message) => {
  switch (message.content.toLowerCase()) {
    case "f":
      message.react("🇫");
      break;
    case "queso":
      message.react("🧀");
      break;
    default:
      // No se realiza ninguna acción si el mensaje no coincide con ningún caso
      break;
  }
});

/* ============| Moderacion |============ */
client.on("messageCreate", (message) => {
  const palabrasProhibidas = [
    "puta",
    "puto",
    "sapa",
    "sapo",
    "perra",
    "imbecil",
    "malparida",
    "malparido",
    "pene",
    "hijo de puta",
    "hija de puta",
    "zorra",
    "zorra",
    "hdp",
    "chupa pija",
  ];

  const contenidoMensajeInsulto = message.content.toLowerCase();
  const contienePalabraProhibida = palabrasProhibidas.some((palabra) =>
    contenidoMensajeInsulto.includes(palabra)
  );

  const emojis = [
    "<:cojone:1128528445069070408>",
    "<a:cuidadito:1128528461699493950>",
    "<:nimodo:1128528456364331038>",
    "<:nojado:1128528446679695456>",
    "<:ojito:1128528442829307974>",
    "<:pero:1128528453096964136>",
    "<a:ummm:1128529355295965244>",
    "<:ban:1128528448642625567>",
    "<a:slapCat:1128537225018220676>",
    "<a:shakethegato:1128537222539382826>",
    "<a:enojado:1128537217766268948>",
    "<a:icomodoo:1128537220874260491>",
  ]; // Lista de emojis

  if (contienePalabraProhibida) {
    const autorGrosero = message.author.id;
    message.delete().then(() => {
      const emojiAleatorio = emojis[Math.floor(Math.random() * emojis.length)];
      message.channel
        .send(`Cuida tu vocabulario, <@${autorGrosero}>!`)
        .then((mensajeEnviado) => {
          mensajeEnviado.react("🇵");
          mensajeEnviado.react("🇺");
          mensajeEnviado.react("🇹");
          mensajeEnviado.react("🇴");
          message.channel.send(emojiAleatorio);
        });
    });
  }
});

const eliminarMensajes = async () => {
  /* Borrar mensajes a la 1 am todos los dias */
  try {
    const jefesCanal = await client.channels.fetch(jefesChannel);
    const kothsCanal = await client.channels.fetch(kothsChannel);

    const mensajesjefesCanal = await jefesCanal.messages.fetch({ limit: 20 });
    const mensajeskothsCanal = await kothsCanal.messages.fetch({ limit: 20 });

    jefesCanal.bulkDelete(mensajesjefesCanal);
    kothsCanal.bulkDelete(mensajeskothsCanal);

    console.log("Mensajes eliminados con éxito");
  } catch (error) {
    console.error("Error al eliminar los mensajes:", error);
  }
};

client.on("ready", () => {
  console.log("Bot en linea!");
  console.log(`En linea como: ${client.user.tag}!`);

  const actividades = ["anunciar Jefes👺", "anunciar Koths⚔️"];

  let i = 0;
  setInterval(() => {
    client.user.setActivity(actividades[i]);
    i = (i + 1) % actividades.length;
  }, 5000);
  /* ======================-0- BORRAR MENSAJES -0-===================== */

  const ruleBorrarMsg = new schedule.RecurrenceRule();
  ruleBorrarMsg.hour = 5; //05
  ruleBorrarMsg.minute = 0; //00
  ruleBorrarMsg.tz = "America/Bogota";
  const BorrarMsg = schedule.scheduleJob(ruleBorrarMsg, function () {
    eliminarMensajes();
  });
  console.log(
    `Borrado programado para hora ${JSON.stringify(
      ruleBorrarMsg.hour
    )} con ${JSON.stringify(ruleBorrarMsg.minute)} minutos - ${JSON.stringify(
      ruleBorrarMsg.tz
    )}`
  );

  /* ================================================================== */
  /* setInterval(() => {
    const channel = client.channels.cache.get('1111385701741772950'); // Reemplaza ID_DEL_CANAL con el ID del canal en el que quieres enviar el mensaje
    channel.send('msg');
  }, 60 * 1000); // 60 segundos * 1000 milisegundos */

  /* ==========================-0- KOTHS -0-========================= */

  /* ======================== Koth DesiertoI ======================== */
  const embedKothDesiertoI = new EmbedBuilder()
    .setColor("#f7af6a") // Cambia el color
    .setTitle("🏜️ │KOTH DESIERTO ") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Koth**  <a:arowDowmgif:1123006857598996550>
  Koth en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "Montaña del desierto", name: "Ubicación🗺️", inline: false },
      { value: "Extremo", name: "Arena⚔️", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(
      "https://i.pinimg.com/originals/2d/6d/bc/2d6dbc2833b379ca1a955ca8847cef19.jpg"
    ) // imagen del kot
    .setFooter(footerCard);
  const ruleKtohDesiertoI = new schedule.RecurrenceRule();
  ruleKtohDesiertoI.dayOfWeek = [2, 5, 0];
  /* 
  0:Domingo,1:lunes,2:martes,3:miercoles,4:jueves,5:viernes,6:sabado
  */
  ruleKtohDesiertoI.hour = 16; //16
  ruleKtohDesiertoI.minute = 50; //50
  ruleKtohDesiertoI.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const KtohDesiertoI = schedule.scheduleJob(ruleKtohDesiertoI, function () {
    const channel = client.channels.cache.get(kothsChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${kothsChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedKothDesiertoI],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para los dias: ${JSON.stringify(
      ruleKtohDesiertoI.dayOfWeek
    )} hora ${JSON.stringify(ruleKtohDesiertoI.hour)} con ${JSON.stringify(
      ruleKtohDesiertoI.minute
    )} minutos - ${JSON.stringify(ruleKtohDesiertoI.tz)}`
  );

  /* ========================== Koth Bosque ========================= */
  const embedKothBosque = new EmbedBuilder()
    .setColor("#41e20a") // Cambia el color
    .setTitle("🌲 │KOTH BOSQUE") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Koth**  <a:arowDowmgif:1123006857598996550>
  Koth en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "Arbol del bosque", name: "Ubicación🗺️", inline: false },
      { value: "Extremo", name: "Arena⚔️", inline: false },
      {
        value: "Llave koth",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(
      "https://i.pinimg.com/originals/ba/07/c7/ba07c709ac8a037fbee97431fe3dabe9.jpg"
    ) //imagen del kot
    .setFooter(footerCard);
  const ruleKothBosque = new schedule.RecurrenceRule();
  ruleKothBosque.hour = 13; //13
  ruleKothBosque.minute = 50; //50
  ruleKothBosque.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const kothBosque = schedule.scheduleJob(ruleKothBosque, function () {
    const channel = client.channels.cache.get(kothsChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${kothsChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedKothBosque],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleKothBosque.hour
    )} con ${JSON.stringify(ruleKothBosque.minute)} minutos - ${JSON.stringify(
      ruleKothBosque.tz
    )}`
  );

  /* ========================== Koth Playa ========================= */
  const embedKothPlaya = new EmbedBuilder()
    .setColor("#f7af6a") // Cambia el color
    .setTitle("🏖️ │KOTH PLAYA") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Koth**  <a:arowDowmgif:1123006857598996550>
  Koth en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "Orillas del lago", name: "Ubicación🗺️", inline: false },
      { value: "Normal", name: "Arena⚔️", inline: false },
      {
        value: "Xp-Money",
        name: "Botin<a:xp:1123023796836778056><a:mineCoin:1123249851472289915>",
        inline: false,
      }
    )
    .setImage(
      "https://i.pinimg.com/originals/8a/18/13/8a18135f2e2cfed97b480c31d73386df.jpg"
    ) // imagen del kot
    .setFooter(footerCard);
  const ruleKtohPlaya = new schedule.RecurrenceRule();
  ruleKtohPlaya.hour = 19; //19
  ruleKtohPlaya.minute = 50; //50
  ruleKtohPlaya.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const KtohPlaya = schedule.scheduleJob(ruleKtohPlaya, function () {
    const channel = client.channels.cache.get(kothsChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${kothsChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedKothPlaya],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleKtohPlaya.hour
    )} con ${JSON.stringify(ruleKtohPlaya.minute)} minutos - ${JSON.stringify(
      ruleKtohPlaya.tz
    )}`
  );

  /* ========================== Koth Desierto ========================= */
  const embedKothDesierto = new EmbedBuilder()
    .setColor("#ab5809") // Cambia el color
    .setTitle("🏜️ │KOTH DESIERTO") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Koth**  <a:arowDowmgif:1123006857598996550>
  Koth en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "Montaña del desierto", name: "Ubicación🗺️", inline: false },
      { value: "Extremo", name: "Arena⚔️", inline: false },
      {
        value: "Llave koth",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(
      "https://i.pinimg.com/originals/46/da/8c/46da8cb84a24d588749a86caf31deae4.jpg"
    ) // imagen del kot
    .setFooter(footerCard);
  const ruleKtohDesierto = new schedule.RecurrenceRule();
  ruleKtohDesierto.hour = 17; //22
  ruleKtohDesierto.minute = 50; //50
  ruleKtohDesierto.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const KtohDesierto = schedule.scheduleJob(ruleKtohDesierto, function () {
    const channel = client.channels.cache.get(kothsChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${kothsChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedKothDesierto],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleKtohDesierto.hour
    )} con ${JSON.stringify(
      ruleKtohDesierto.minute
    )} minutos - ${JSON.stringify(ruleKtohDesierto.tz)}`
  );

  /* ========================== Koth Nether ========================= */
  const embedKothNether = new EmbedBuilder()
    .setColor("#cc060d") // Cambia el color
    .setTitle("🔥 │KOTH NETHER") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Koth**  <a:arowDowmgif:1123006857598996550>
  Koth en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "Arbol del nether", name: "Ubicación🗺️", inline: false },
      { value: "Normal", name: "Arena⚔️", inline: false },
      {
        value: "Xp-Money",
        name: "Botin<a:xp:1123023796836778056><a:mineCoin:1123249851472289915>",
        inline: false,
      }
    )
    .setImage(
      "https://i.pinimg.com/originals/3d/0b/c7/3d0bc70620463a931e8b5c4706fb5b3f.jpg"
    ) // imagen del kot
    .setFooter(footerCard);
  const ruleKtohNether = new schedule.RecurrenceRule();
  ruleKtohNether.hour = 15; //15
  ruleKtohNether.minute = 50; //50
  ruleKtohNether.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const KtohNether = schedule.scheduleJob(ruleKtohNether, function () {
    const channel = client.channels.cache.get(kothsChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${kothsChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedKothNether],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleKtohNether.hour
    )} con ${JSON.stringify(ruleKtohNether.minute)} minutos - ${JSON.stringify(
      ruleKtohNether.tz
    )}`
  );

  /* ==========================-0- JEFES -0-========================= */
  /* ====================== HERALDO CAIDO 8 ========================= */
  const embedJefe_8 = new EmbedBuilder()
    .setColor(colorJefe) // Cambia el color
    .setTitle("💀 │HERALDO CAIDO") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Jefe** <a:arowDowmgif:1123006857598996550>
  Jefe en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "/warp warzone", name: "Ubicación🗺️", inline: false },
      { value: "10-20 Minutos", name: "Duracion⌚", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(imgJefe) // imagen del koth
    .setFooter(footerCard);
  const ruleJefe8 = new schedule.RecurrenceRule();
  ruleJefe8.hour = 7; //7
  ruleJefe8.minute = 50; //50
  ruleJefe8.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Jefe8 = schedule.scheduleJob(ruleJefe8, function () {
    const channel = client.channels.cache.get(jefesChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${jefesChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedJefe_8],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleJefe8.hour
    )} con ${JSON.stringify(ruleJefe8.minute)} minutos - ${JSON.stringify(
      ruleJefe8.tz
    )}`
  );

  /* ====================== SEGADOR CAIDO 12 ========================= */
  const embedJefe_12 = new EmbedBuilder()
    .setColor(colorJefe) // Cambia el color
    .setTitle("💀 │SEGADOR CAIDO") // Agrega un título al Embed
    .setDescription(
      `
  **Descripción del Jefe** <a:arowDowmgif:1123006857598996550>
  Jefe en 10 minutos
  ㅤ`
    )
    .addFields(
      { value: "/warp warzone", name: "Ubicación🗺️", inline: false },
      { value: "15-25 Minutos", name: "Duracion⌚", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(imgJefe) // imagen del koth
    .setFooter(footerCard);
  const ruleJefe12 = new schedule.RecurrenceRule();
  ruleJefe12.hour = 11; //11
  ruleJefe12.minute = 50; //50
  ruleJefe12.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Jefe12 = schedule.scheduleJob(ruleJefe12, function () {
    const channel = client.channels.cache.get(jefesChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${jefesChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedJefe_12],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleJefe12.hour
    )} con ${JSON.stringify(ruleJefe12.minute)} minutos - ${JSON.stringify(
      ruleJefe12.tz
    )}`
  );

  /* ====================== DEFENSOR CAIDO 16 ========================= */
  const embedJefe_16 = new EmbedBuilder()
    .setColor(colorJefe) // Cambia el color
    .setTitle("💀 │DEFENSOR CAIDO") // Agrega un título al Embed
    .setDescription(
      `
   **Descripción del Jefe** <a:arowDowmgif:1123006857598996550>
   Jefe en 10 minutos
   ㅤ`
    )
    .addFields(
      { value: "/warp warzone", name: "Ubicación🗺️", inline: false },
      { value: "20-50 Minutos", name: "Duracion⌚", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(imgJefe) // imagen del koth
    .setFooter(footerCard);
  const ruleJefe16 = new schedule.RecurrenceRule();
  ruleJefe16.hour = 15; //15
  ruleJefe16.minute = 50; //50
  ruleJefe16.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Jefe16 = schedule.scheduleJob(ruleJefe16, function () {
    const channel = client.channels.cache.get(jefesChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${jefesChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedJefe_16],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleJefe16.hour
    )} con ${JSON.stringify(ruleJefe16.minute)} minutos - ${JSON.stringify(
      ruleJefe16.tz
    )}`
  );

  /* ====================== DEVASTADOR CAIDO 20 ========================= */
  const embedJefe_20 = new EmbedBuilder()
    .setColor(colorJefe) // Cambia el color
    .setTitle("💀 │DEVASTADOR CAIDO") // Agrega un título al Embed
    .setDescription(
      `
   **Descripción del Jefe** <a:arowDowmgif:1123006857598996550>
   Jefe en 10 minutos
   ㅤ`
    )
    .addFields(
      { value: "/warp warzone", name: "Ubicación🗺️", inline: false },
      { value: "5-15 Minutos", name: "Duracion⌚", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(imgJefe) // imagen del koth
    .setFooter(footerCard);
  const ruleJefe20 = new schedule.RecurrenceRule();
  ruleJefe20.hour = 19; //19
  ruleJefe20.minute = 50; //50
  ruleJefe20.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Jefe20 = schedule.scheduleJob(ruleJefe20, function () {
    const channel = client.channels.cache.get(jefesChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${jefesChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedJefe_20],
      allowedMentions: { parse: ["roles"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleJefe20.hour
    )} con ${JSON.stringify(ruleJefe20.minute)} minutos - ${JSON.stringify(
      ruleJefe20.tz
    )}`
  );

  /* ====================== CABALLERO CAIDO 00 ========================= */
  const embedJefe_00 = new EmbedBuilder()
    .setColor(colorJefe) // Cambia el color
    .setTitle("💀 │CABALLERO CAIDO") // Agrega un título al Embed
    .setDescription(
      `
    **Descripción del Jefe** <a:arowDowmgif:1123006857598996550>
    Jefe en 10 minutos
    ㅤ`
    )
    .addFields(
      { value: "/warp warzone", name: "Ubicación🗺️", inline: false },
      { value: "10-20 Minutos", name: "Duracion⌚", inline: false },
      {
        value: "Llave divina",
        name: "Botin <a:llave:1122944400079724614>",
        inline: false,
      }
    )
    .setImage(imgJefe) // imagen del koth
    .setFooter(footerCard);
  const ruleJefe00 = new schedule.RecurrenceRule();
  ruleJefe00.hour = 23; //23
  ruleJefe00.minute = 50; //50
  ruleJefe00.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Jefe00 = schedule.scheduleJob(ruleJefe00, function () {
    const channel = client.channels.cache.get(jefesChannel);
    if (!channel) {
      console.log(`No se pudo encontrar el canal con ID ${jefesChannel}.`);
      return;
    }

    channel.send({
      content: `<@&${rolAnuncio}>`,
      embeds: [embedJefe_00],
      allowedMentions: { parse: ["roles"] },
    });
  });
  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje programado para hora ${JSON.stringify(
      ruleJefe00.hour
    )} con ${JSON.stringify(ruleJefe00.minute)} minutos - ${JSON.stringify(
      ruleJefe00.tz
    )}`
  );

  /* =============== LLaves =============== */
  const embedLlaves = new EmbedBuilder()
    .setColor("#D4AF37")
    .setDescription(
      `<a:llave:1122944400079724614> 𝑹𝒆𝒄𝒍𝒂𝒎𝒂𝒓 𝒍𝒍𝒂𝒗𝒆𝒔 <a:llave:1122944400079724614>`
    )
    .setFooter(footerCard);
  const ruleLlaves = new schedule.RecurrenceRule();
  ruleLlaves.hour = 20; //20
  ruleLlaves.minute = 30; //30
  ruleLlaves.tz = "America/Bogota";
  // Crear una tarea programada para enviar el mensaje
  const Llaves = schedule.scheduleJob(ruleLlaves, function () {
    const channel = client.channels.cache.get("1111386848338653275");
    if (!channel) {
      console.log(
        `No se pudo encontrar el canal con ID ${"1111386848338653275"}.`
      );
      return;
    }
    channel.send({
      content: `<@897660552892002304>`,
      embeds: [embedLlaves],
      allowedMentions: { parse: ["users"] },
    });
  });

  // Imprimir la regla programada para verificar
  console.log(
    `Mensaje Llaves programado para hora ${JSON.stringify(
      ruleLlaves.hour
    )} con ${JSON.stringify(ruleLlaves.minute)} minutos - ${JSON.stringify(
      ruleLlaves.tz
    )}`
  );
});

client.login(config.token);
