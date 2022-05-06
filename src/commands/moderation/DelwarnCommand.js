const BaseCommand = require('../../utils/structures/BaseCommand');
const Warns = require("../../utils/database/models/warn")
const { Client, Message } = require("discord.js");
const config = require("../../../configuration.json");

module.exports = class DelwarnCommand extends BaseCommand {
  constructor() {
    super('delwarn', 'moderation', [], true, "Delete every warn for an user", "<userId/user>");
  }

  /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     * @param {Array} args 
     */
  async run(client, msg, args) {
    if (!msg.member.roles.cache.has(`${config.role_permission_warn}`)) return;
    let target = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0]);
    if (!target) return ;
    let user = await Warns.findOne({ userId: target.id, guildId: msg.guild.id });
    if (!user) {
      msg.channel.send(`L'utilisateur ${target.user.tag} n'a aucun warn.`);
      return;}
    user.remove();
    msg.channel.send(`L'utilisateur ${target.user.tag} n'a plus aucun warn.`)
  }
}