const BaseEvent = require('../../utils/structures/BaseEvent');
const { Client, Message } = require('discord.js');
const Levels = require("discord-xp");
module.exports = class level extends BaseEvent {
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

    if (message.author.bot) return;
    const randomAmoutOfXp =  Math.floor(Math.random() * 15) + 1;
    const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmoutOfXp);
    if(hasLeveledUp){
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, tu es passé niveau ${user.level} !`)
        if(user.level === 2){
          let member = message.guild.members.cache.get(message.author.id);
          let role = message.guild.roles.cache.find(r => r.id === "");
          member.roles.add(role);
        }
    }

  }
}