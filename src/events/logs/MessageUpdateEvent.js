const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const config = require("../../../configuration.json");

module.exports = class MessageUodateEvent extends BaseEvent {
  constructor() {
    super('messageUpdate');
  }
  
  async run(client, oldMessage, newMessage) {
    if (newMessage.channel.type != "text" || newMessage.cleanContent === oldMessage.cleanContent) return
    if (newMessage.cleanContent === undefined) return
    if (newMessage.cleanContent === "") return
    if (newMessage.cleanContent.length > 1024) return
    const embed = new MessageEmbed()
      .setTitle(`Message édité par : ${oldMessage.author.username} dans le salon ${oldMessage.channel.name}`)
      .addFields({
        name:"Avant:",
        value:oldMessage.cleanContent
      }, {
        name:"Après:",
        value:newMessage.cleanContent
      })
      .setColor(0xff9730)
    oldMessage.guild.channels.cache.get(`${config.channel_logs}`).send(embed);

  }
}