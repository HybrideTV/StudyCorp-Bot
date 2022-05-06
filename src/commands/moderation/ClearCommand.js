const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
const config = require("../../../configuration.json");
require('dotenv').config();

module.exports = class ClearCommand extends BaseCommand {

    constructor() {
          super('clear', 'moderation', [], true, "Clear messages.", "<userId/user> [délai] <raison>");
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      run(client, msg, args) {
              msg.delete();
             if (msg.member.roles.cache.has(`${config.role_permission_clear}`)) {
                 let args = msg.content.trim().split(/ +/g);
                 if (args[1]) {
                     if (!isNaN(args[1]) && args[1] >= 1 && args[1] <= 99) {
                      msg.channel.bulkDelete(args[1])
                                const clearEmbed = new MessageEmbed()
                             .setTitle("✅ Succès ✅")
                             .setColor(0xFF2D2D)
                             .setDescription(`${args[1]} message(s) ont été supprimés`)
                             msg.channel.send(clearEmbed)
                             msg.channel.bulkDelete(1)
                     }else {
                      msg.channel.send("Tu dois mettre un nombre entre 1 et 99 !")
                     }
                 }else {
                  msg.channel.send("Tu dois mettre un nombre !")
                 }
             }else {
                msg.channel.send("Vous n'avez pas le rôle ⭐ pour clear !")
             }
         }
  }