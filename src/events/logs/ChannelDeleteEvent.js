const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed } = require('discord.js');
const config = require("../../../configuration.json");
module.exports = class ChannelDeleteEvent extends BaseEvent {
  constructor() {
    super('channelDelete');
  }
  
  async run(client, channel) {
    const channelCreate = new MessageEmbed()
      .setTitle(`Salon supprimé => ${channel.name}`)
      .setColor(0xd733ff)
    channel.guild.channels.cache.get(`${config.channel_logs}`).send(channelCreate);
  }
}
