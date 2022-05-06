const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");
require('dotenv').config();
module.exports = class Cat extends BaseCommand {

    constructor() {
          super('cat', 'fun', [], true, "Cat command.");
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
            msg.channel.send("https://i.pinimg.com/236x/99/74/bc/9974bc034184ced0efb6d0dddd1d89fa.jpg")
        }
        else if((drop < 29) && (drop > 20))
        {
            msg.channel.send("https://i.pinimg.com/originals/b5/ef/2d/b5ef2d48070ad2a68e0f1680f6610ea7.png")
        }
        else if((drop < 19) && (drop > 10))
        {
            msg.channel.send("https://i.pinimg.com/236x/f4/a2/bb/f4a2bb4a9c1471157205391e16b58f6e.jpg")
        }
        else if((drop < 9) && (drop > 1))
        {
            msg.channel.send("https://i.pinimg.com/originals/a8/39/35/a83935a027475e34ebace7d4a1ed33e8.jpg")
        }
      }
  }