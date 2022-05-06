require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const PermissionGuard = require("../../utils/PermissionGuard");
const {MessageEmbed, Client, Message} = require("discord.js");
const ms = require("ms");
const Bans = require("../../utils/database/models/ban");
const config = require("../../../configuration.json");

module.exports = class BanCommand extends BaseCommand {
	constructor() {
		super('ban', 'moderation', [], true, "Ban a Discord user by his ID.", "<userId/user> [délai] <raison>", new PermissionGuard(["BAN_MEMBERS"]));
	}

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     * @param {Array} args 
     */
    run(client, msg, args) {
      if (!msg.member.roles.cache.has(`${config.role_permission_ban}`)) return msg.channel.send("Vous n'avez pas le rôle ⭐ pour bannir !")
        var embedColor = '#fc9d02'
        var missingArgsEmbed = new MessageEmbed() // Creates the embed thats sent if the command isnt run right
          .setColor(embedColor)
          .setAuthor(msg.author.username, msg.author.avatarURL())
          .setTitle("Argument manquant")
          .setDescription(`Usage: \`${process.env.DISCORD_BOT_PREFIX}${this.name} ${this.usage}\``)
          .setTimestamp();
        let pattern = /[0-9]{18}/
        if (msg.mentions.users.first() || msg.guild.member(args[0])) {
          let bUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0])
          if (bUser.hasPermission("BAN_MEMBERS")) return msg.channel.send("Cette personne ne peux pas etre bannie!");
          let validTime = /^\d+(s|m|h|d|S|M|H|D)$/;
          let time = null;
          let bReason = null;
          if (validTime.test(args[1])) {
            time = ms(args[1])
            bReason = args.slice(2).join(" ");
            if (!bReason) return msg.channel.send(missingArgsEmbed)
            const newBan = new Bans({
              userId: bUser.id,
              guildId: msg.guild.id,
              time: Date.now() + time
            });
            newBan.save().catch(err => console.log(err));
          } else {
            bReason = args.slice(1).join(" ");
          }
          if (!bReason) return msg.channel.send(missingArgsEmbed)
          bUser.send(`Vous avez été banni de StudyCorp pour ${bReason}`);
          const banEmbed = new MessageEmbed()
            .setTitle("✅ Succès ✅")
            .setColor("#02fc4e")
            .setDescription(`${bUser.user.username} à été banni par ${msg.author.username}.`)
            .setFooter("StudyCorp - Modération")
            .addField("Raison:", bReason);
             
          msg.guild.member(bUser).ban({days: 7, reason: bReason});
          msg.channel.send(banEmbed)
        } else if (pattern.test(args[0])) {
          let bUser = args[0]
          let bReason = args.slice(1).join(" ");
          if (!bReason) return msg.channel.send(missingArgsEmbed)
          const banEmbed = new MessageEmbed()
            .setTitle("✅ Succès ✅")
            .setColor("#02fc4e")
            .setDescription(`${bUser} à été banni par ${msg.author.username}.`)
            .addField("Raison:", bReason);
          msg.guild.members.ban(bUser, {days: 7, reason: bReason});
          msg.channel.send(banEmbed)
      } else
          return msg.channel.send(missingArgsEmbed)
        msg.delete().catch();
    }
}