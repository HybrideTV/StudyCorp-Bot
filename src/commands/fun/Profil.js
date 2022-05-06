const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
require('dotenv').config();
const moment = require('moment');

module.exports = class Profil extends BaseCommand {

    constructor() {
          super('profil', 'general', [], true);
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      run(client, msg, args) {
        let user = msg.mentions.users.first() || msg.author;
        const joinDiscord = moment(user.createdAt).format('llll');
        let avatar = user.displayAvatarURL({size: 1024})

        let profilEmbed = new MessageEmbed()
        .setTitle("Informations de profil de " + user.username)
        .setColor(`RANDOM`)
        .setThumbnail(avatar)
        .addField("ID:", `${user.id}`, true)
        .addField('Status:', user.presence.status, true)
        .addField("Compte crée le:", `${moment.utc(user.createdAt).format("dddd, Do MMMM YYYY")}`, true) 
        .setTimestamp(Date.now())

        msg.channel.send(profilEmbed)
      }
  }