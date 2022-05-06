const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const config = require('../../../configuration.json');
module.exports = class MessageDeleteEvent extends BaseEvent {
  constructor() {
    super('messageDelete');
  }
  
  async run(client, message) {
    if (message.cleanContent === null && message.cleanContent < 1) return
    if (message.cleanContent.length > 1024) return
    if (!channel) return
    const embed = new MessageEmbed()
      .setTitle(`Message supprimé par : ${message.author.username} dans le salon ${message.channel.name}`)
      .setDescription(message.cleanContent)
      .setColor(0xff9730)
    message.guild.channels.cache.get(`${config.channel_logs}`).send(embed);

  }
}