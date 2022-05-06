const BaseCommand = require('../../utils/structures/BaseCommand');
const {  Message, Client } = require("discord.js");
require('dotenv').config();
const config = require("../../../configuration.json");

module.exports = class UnmuteCommand extends BaseCommand {
  constructor() {
    super('unmute');
  }

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     * @param {Array} args 
     */
    async run(client, msg, args) {
      if (!msg.member.roles.cache.has(`${config.role_permission_mute}`)) return msg.channel.send("Vous n'avez pas le rôle ⭐ pour mute !")
      let target = msg.guild.member(msg.mentions.users.first()) || msg.guild.members.cache.get(args[0])
      let role = msg.guild.roles.cache.find(r => r.id === "787720467032965120");
      await target.roles.remove(role);
      msg.channel.send(`${target} a été démute par ${msg.author}.`);

    }
}