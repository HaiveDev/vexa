
# Vexa Bot :robot:

## Introducción
Bot programado en Node.js, utilizando el módulo `discord.js` v14. Este bot incluye soporte para Slash Commands (Comandos de Barra Diagonal). 🎮

## Configuración :gear:
### Requisitos Previos
- Node.js v16.0 o superior
- Módulo `discord.js`

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
