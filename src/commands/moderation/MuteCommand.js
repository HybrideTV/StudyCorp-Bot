const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
const fs = require("fs");
const Mutes = require("../../utils/database/models/mute");
require('dotenv').config();
const ms = require("ms");
const config = require("../../../configuration.json");


module.exports = class MuteCommand extends BaseCommand {
  constructor() {
    super('mute', 'moderation', [], true, "Mute an user", "<userId/user> [duration]");
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
      var embedColor = '#ffffff'
      var missingArgsEmbed = new MessageEmbed()
        .setColor(embedColor)
        .setAuthor(msg.author.username, msg.author.avatarURL())
        .setTitle("Argument manquant !")
        .setDescription(`Usage: \`${process.env.DISCORD_BOT_PREFIX}${this.name} ${this.usage}\``)
        .setTimestamp();
      if (!target) return msg.channel.send(missingArgsEmbed)
      msg.delete().catch()
      let role = msg.guild.roles.cache.find(r => r.id === "787720467032965120");
      if (!role) {
          msg.channel.send("Le rôle n'a pas été trouvé !")
      }
      if(target.roles.cache.has(role.id)) return msg.channel.send("Cette utilisateur est déjà mute !")
      var time = 0;
      let reason = args.slice(2).join(' ');
      let validTime = /^\d+(s|m|h|d|S|M|H|D)$/;
      if (validTime.test(args[1]))
        time = ms(args[1])
      else
        return (msg.channel.send("Temps invalide"));
      const newMute = new Mutes({
        userId: target.id,
        guildId: msg.guild.id,
        time: Date.now() + time
      })
      await target.roles.add(role);
      newMute.save().catch(err => console.log(err));
      const muteEmbed = new MessageEmbed()
            .setTitle("✅ Succès ✅")
            .setColor("#e40a0a")
            .setDescription(`${target.user.username} à été mute par ${msg.author.username} pendant ${args1}.`)
            .setFooter("StudyCorp - Modération")
            .addField("Raison:", `${reason}`);
      msg.channel.send(muteEmbed)
    }
}