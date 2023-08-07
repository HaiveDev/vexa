
# Vexa Bot :robot:

## Introducción :arrow_right:
Bot programado en Node.js, utilizando el módulo `discord.js` v14. Este bot incluye soporte para Slash Commands (Comandos de Barra Diagonal). 🎮

## Descripción :page_with_curl:
- **Comando Ping**: Este bot cuenta con el comando `/ping`, ideal para verificar su funcionamiento.
- **Sistema de Tickets**: El bot posee un sistema básico de tickets. Al ejecutar el comando `/panel-ticket` en un canal, se creará un panel de tickets donde los usuarios podrán presionar un botón 'crear ticket' para abrir un canal privado para su ticket.
- **Moderación Básica**: Este bot tiene un sistema de moderación básico. Dentro del archivo `index.js`, hay un array `palabrasProhibidas = ["palabra1", "palabra2",]` donde puedes listar las palabras prohibidas. Si un usuario escribe una de estas palabras, el bot borrará el mensaje, etiquetará al usuario y le dará una advertencia de lenguaje, respondiendo también con un sticker aleatorio almacenado en el array `emojis = ["<:stickerName:id>",]`. :warning: Estos stickers deben ser propios del servidor.
- **Borrado de Mensajes**: Este bot tiene un sistema de borrado de mensajes, permitiéndote configurar la hora, cantidad de mensajes y canales que serán afectados.
- **Sistema de Anuncios**: Este bot cuenta con un sistema de anuncios en formato embed, diseñado específicamente para anunciar koths y jefes en un servidor de Minecraft. 🎮

## Configuración :gear:
### Requisitos Previos
- Node.js v16.0 o superior
- Módulo discord.js

Para trabajar con este bot, necesitarás un archivo de configuración llamado `config.json`, que almacenará distintas variables dentro de un objeto.

Completa estos campos si quieres arrancar el bot:
```json
{
  "token": "Aquí va el Token del bot",
  "botId": "Aquí va la ID del bot"
}
```

## Trabajar con Slash Commands :keyboard:
Por el momento, el bot incluye los comandos `/ping` y `/panel-ticket`, pero puedes crear los tuyos de la misma manera.

Para agregar estos comandos a tu bot, tendrás que abrir una terminal y escribir el siguiente comando:
```
npm run commands
```

## Iniciar el bot :rocket:
Para iniciar el bot, simplemente tendrás que abrir una terminal y escribir el siguiente comando:
```
node .
```
