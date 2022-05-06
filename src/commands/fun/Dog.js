const BaseCommand = require('../../utils/structures/BaseCommand');
const PermissionGuard = require('../../utils/PermissionGuard');
const { MessageEmbed, Message, Client } = require("discord.js");
require('dotenv').config();
module.exports = class Dog extends BaseCommand {

    constructor() {
          super('dog', 'fun', [], true);
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} msg 
       * @param {Array} args 
       */
      run(client, msg, args) {
        const drop = Math.floor(Math.random() * 41) + 1;
        if(drop > 30) {
            msg.channel.send("https://i.pinimg.com/236x/23/46/84/234684593d24b94a25017027243c4fec.jpg")
        }
        else if((drop < 29) && (drop > 20))
        {
            msg.channel.send("https://i.pinimg.com/236x/f7/fc/41/f7fc41914eba9ca4a3876b0d4f7658bb.jpg")
        }
        else if((drop < 19) && (drop > 10))
        {
            msg.channel.send("https://i.pinimg.com/236x/e3/13/de/e313de124f306ba740ecbb10754fd996.jpg")
        }
        else if((drop < 9) && (drop > 1))
        {
            msg.channel.send("https://i.pinimg.com/236x/84/7e/25/847e2582919250f1eda1c5497635bcea.jpg")
        }
      }
  }