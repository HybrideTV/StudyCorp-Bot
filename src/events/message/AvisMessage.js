const BaseEvent = require('../../utils/structures/BaseEvent');
const { Client, MessageEmbed, Message } = require('discord.js');
const config = require("../../../configuration.json");

module.exports = class AvisMessage extends BaseEvent {
  constructor() {
    super('message');
  }
  
  /**
         * 
         * @param {Client} client 
         * @param {Message} message 
         * @param {Array} args 
         */

  async run(client, message) {
    if (message.channel.id === '781999068489449502'){
        let avisrole = message.guild.roles.cache.find(r => r.id === "780078493500964864");
        let target = message.guild.member(message.author) ;
        target.roles.remove(avisrole);        
        const logsRemoveAvis = new MessageEmbed()
                .setTitle(`La permission de déposer un avis à été retirée à ${target.user.user}`)
                .setFooter("ID de l'utilisateur : " + target.id)
                .setColor(0xb2ff33)
                target.roles.remove(avisrole);
                message.guild.channels.cache.get(`${config.channel_logs}`).send(logsRemoveAvis);

      }  else return;
  }
}