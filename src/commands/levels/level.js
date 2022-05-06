const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");
require('dotenv').config();
const Levels = require('discord-xp');
module.exports = class level extends BaseCommand {

    constructor() {
        super('level');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
      async run(client, message, args) {
        if (message.author.bot) return;
            const target = message.mentions.users.first() || message.author;
            const user = await Levels.fetch(target.id, message.guild.id);
            if(!user) return message.channel.send("Il semble que vous n'avez pas d'XP :/")
            message.channel.send(`${target.tag} est actuellement niveau ${user.level}.`);
        }
        
  }