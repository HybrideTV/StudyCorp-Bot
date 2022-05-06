const { MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const config = require("../../../configuration.json");

module.exports = class GuildMemberRemoveEvent extends BaseEvent {
  constructor() {
    super('guildMemberRemove');
  }
  
  async run(client, member) {
    const memberRemove = new MessageEmbed()
      .setTitle("Membre parti")
      .setDescription(member.user.tag)
      .setFooter("ID : " + member.user.id)
      .setColor(0xff0000)
      member.guild.channels.cache.get(`${config.channel_logs}`).send(memberRemove);
  }
}