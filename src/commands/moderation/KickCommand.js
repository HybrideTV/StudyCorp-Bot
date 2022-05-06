require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const PermissionGuard = require("../../utils/PermissionGuard")
const {MessageEmbed, Client, Message} = require("discord.js")
const config = require("../../../configuration.json");


module.exports = class KickCommand extends BaseCommand {
	constructor() {
		super('kick', 'moderation', [], true, "Kick a Discord user by his ID.", "<userId/user> <raison>", new PermissionGuard(["KICK_MEMBERS"]));
	}

    /**
     * 
     * @param {Client} client 
     * @param {Message} msg 
     * @param {Array} args 
     */
    run(client, msg, args) {
      if (!msg.member.roles.cache.has(`${config.role_permission_kick}`)) return msg.channel.send("Vous n'avez pas le rôle ⭐ pour exclure !")
        var embedColor = '#fc9d02'
        var missingArgsEmbed = new MessageEmbed() // Creates the embed thats sent if the command isnt run right
          .setColor(embedColor)
          .setAuthor(msg.author.username, msg.author.avatarURL())
          .setTitle("Argument manquant")
          .setDescription(`Usage: \`${process.env.DISCORD_BOT_PREFIX}${this.name} ${this.usage}\``)
          .setTimestamp();
        if (msg.mentions.users.first() || msg.guild.member(args[0])) {
          let bUser = msg.guild.member(msg.mentions.users.first()) || msg.guild.member(args[0])
          if (bUser.hasPermission("KICK_MEMBERS")) return msg.channel.send("Cette personne ne peut être exclue !");
          let bReason = args.slice(1).join(" ");
          if (!bReason) return msg.channel.send(missingArgsEmbed)
          bUser.send(`Vous avez été exclu de StudyCorp pour ${bReason}.`);
          const kickEmbed = new MessageEmbed()
            .setDescription("✅ Succès ✅")
            .setColor("#02fc4e")
            .setDescription(`${bUser.user.username} à été exclu par ${msg.author.username}.`)
            .setFooter("StudyCorp - Modération")
            .addField("Raison:", bReason);
          msg.guild.member(bUser).kick(bReason);
          msg.channel.send(kickEmbed)
        } else
          return msg.channel.send(missingArgsEmbed)
        msg.delete().catch();
    }
}