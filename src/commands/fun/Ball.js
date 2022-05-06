const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");
require('dotenv').config();

module.exports = class Ball extends BaseCommand {

    constructor() {
          super('ask', 'general', [], true, "Commande d aide.");
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      run(client, msg, args) {
        if(!args[1]) return msg.reply("Tu vois m'indiquer une question, sinon je ne peux pas répondre !");
        let replies = ["Oui", "Non", "Je ne sais pas", "Je n'ai pas compris je crois...", "Je ne suis pas sûr.","Aucun doute.", "Je ne peux pas te répondre :/", ];

        let result = Math.floor((Math.random() * replies.length));
        
        msg.channel.send(replies[result])
      }
  }