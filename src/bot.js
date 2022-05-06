require('dotenv').config();
const { Client, Collection } = require('discord.js');
const { MessageButton } = require ('discord-buttons');
const client = new Client({ws: {intents: ["GUILDS", "GUILD_BANS", "GUILD_EMOJIS", "DIRECT_MESSAGES", "GUILD_PRESENCES", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS"]}, partials: ["GUILD_MEMBER", "USER", "MESSAGE", "CHANNEL", "REACTION"]});
require("discord-buttons")(client);
const { registerCommands, registerEvents } = require('./utils/registry');
const fs = require("fs");

(async () => {
  client.cachedMessageReactions = new Map();
  client.commands = new Collection();
  client.aliases = new Collection();
  client.events = new Map();
  client.categories = fs.readdirSync("./src/commands/");
  client.cooldown = new Map();
  client.prefix = process.env.DISCORD_BOT_PREFIX;
  await registerCommands(client, '../commands');
  await registerEvents(client, '../events');
  await client.login(process.env.DISCORD_BOT_TOKEN);
})();

