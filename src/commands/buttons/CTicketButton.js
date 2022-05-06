const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class TicketButton extends BaseCommand {
  constructor() {
    super('ticketbutton', 'test', [], true, "Ajoute le bouton ticket", null, new PermissionGuard(["ADMINISTRATOR"]));
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const buttonYes = new MessageButton()
      .setStyle('green')
      .setLabel('Ouvrir')
      .setID('openTicket')

      const ticketEmbed = new MessageEmbed()
      .setTitle('Ouvrir un ticket - COMMANDE')
      .setDescription('Ouvre un ticket pour passer commande à un vendeur')
      .addField('-', "NOTE : Ce ne sont pas des tickets pour des recrutements ! Uniquement pour passer commande. Le non respect de cette règle entrainera l'interdiction d'ouvrir des tickets")
      .setColor('RANDOM')  

      message.channel.send('.', {
        buttons: [buttonYes],
        embed: ticketEmbed
      });
    }
}