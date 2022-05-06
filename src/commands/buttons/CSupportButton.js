const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class SupportButton extends BaseCommand {
  constructor() {
    super('supportbutton', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const buttonYesX = new MessageButton()
      .setStyle('green')
      .setLabel('Ouvrir')
      .setID('supportTicket')

      const supportEmbed = new MessageEmbed()
      .setTitle('Ouvrir un ticket - SUPPORT')
      .setDescription("Tu as une question ? Une demande ? Tu souhaites devenir vendeur ? N'hésite pas à ouvrir un ticket ! Notre équipe de support vous répondrons dans les meilleurs délais.")
      .setColor('RANDOM')  

      message.channel.send('\u200B', {
        buttons: [buttonYesX],
        embed: supportEmbed
      });

     
      

    }
}