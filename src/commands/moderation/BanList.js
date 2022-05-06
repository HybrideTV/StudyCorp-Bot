const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");
require('dotenv').config();
const config = require("../../../configuration.json");

module.exports = class BanList extends BaseCommand {

    constructor() {
        super('banlist');
    }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      run(client, message, args) {
        
        if (!message.member.roles.cache.has(`${config.role_permission_ban}`)) return message.channel.send("Vous n'avez pas le rôle ⭐ pour voir les bans !")
            message.guild.fetchBans()
            .then(banned => {
            let list = banned.map((member) => member.user.tag + "  -  " + member.user.id).join('\n');
            message.channel.send(`**Liste des ${banned.size} personnes bannies du serveur :**\n${list}`);
          })
          .catch(console.error);
    }
  }