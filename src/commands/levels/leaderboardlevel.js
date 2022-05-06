const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
require('dotenv').config();
const Levels = require('discord-xp');
module.exports = class leaderboardlevel extends BaseCommand {


    constructor() {
        super('levelboard');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
      async run(client, message, args) {
        if (message.author.bot) return;
            const rawLeaderboard = await Levels.fetchLeaderboard(message.guild.id, 10);
            if(rawLeaderboard.length < 1) return message.channel.send("Personne n'as de niveaux..");
            const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true);
            const lb = leaderboard.map(e => `${e.position}. ${e.username}#${e.discriminator}- Niveau: ${e.level}\nXP: ${e.xp.toLocaleString()}`);

            const LeaderboardEmbed = new MessageEmbed()
            .setColor("WHITE")
            .setTitle("Classement des niveaux")
            .setDescription(lb.join("\n"))
            message.channel.send(LeaderboardEmbed);
        }
        
  }