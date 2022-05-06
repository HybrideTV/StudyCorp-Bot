const { MessageEmbed, GuildMember } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
const config = require("../../../configuration.json");

module.exports = class GuildMemberAddEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  /**
   * 
   * @param {*} client 
   * @param {GuildMember} member 
   */
  async run(client, member) {
    const memberAdd = new MessageEmbed()
      .setTitle("Nouveau membre")
      .setDescription(member.user.tag)
      .setColor("GREEN")
      .setFooter("ID : " + member.user.id)
      member.guild.channels.cache.get(`${config.channel_logs}`).send(memberAdd);
  }

  
}