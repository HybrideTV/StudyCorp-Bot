const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const PermissionGuard = require('../../utils/PermissionGuard');

require('dotenv').config();

module.exports = class VerifButton extends BaseCommand {
  constructor() {
    super('vertifbutton', 'test', [], true, "Ajoute le bouton support", null, new PermissionGuard(["ADMINISTRATOR"]));
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     * @param {Array} args 
     */
     run(client, message, user, args) {
      const buttonVerif = new MessageButton()
      .setStyle('green')
      .setLabel('Vérifier')
      .setID('buttonVerif')

      const verifEmbed = new MessageEmbed()
      .setTitle('Veuillez cliquer sur le bouton ci-dessous pour avoir accès à tout les salons !')
      .setDescription("En accédent au serveur tu accepte le règlement. Tout écart au règlement sera sanctionné !")
      .setColor(0x02fc87)  

      message.channel.send('\u200B', {
        buttons: [buttonVerif],
        embed: verifEmbed
      });

     
      

    }
}