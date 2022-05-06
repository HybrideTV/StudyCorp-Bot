require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const Warns = require("../../utils/database/models/warn")
const { Client, Message, MessageEmbed } = require("discord.js");
const config = require("../../../configuration.json");

module.exports = class WarnCommand extends BaseCommand {
  constructor() {
    super('warn', 'moderation', [], true, "Warn an user", "<userId/user> <Reason>");
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
        let reasonW = args.slice(1).join(' ');
        let user = await Warns.findOne({ userId: target.id, guildId: msg.guild.id });
        if (!user) {
            let warn = new Warns({
                userId: target.id,
                guildId: msg.guild.id,
                reason: [args.slice(1).join(' ')],
                userTag: [msg.author.tag],
                warnDate: [Date.now()]
            });
            warn.save().catch(err => console.log(err));
            const warnEmbed = new MessageEmbed()
            .setTitle("✅ Succès ✅")
            .setColor("#e40a0a")
            .setDescription(`${target.user.tag} à été averti par ${msg.author.username} pour ${reasonW}.`)
            .setFooter("StudyCorp - Modération")
            msg.channel.send(warnEmbed)
            //msg.channel.send(`⚠️ L'utilisateur ${target.user.tag} a bien été avertie.`);
            return;
        }
        saveDB(user, args, msg)
        //msg.channel.send(`⚠️ L'utilisateur ${target.user.tag} a bien été avertie.`);
        const warnEmbed2 = new MessageEmbed()
            .setTitle("✅ Succès ✅")
            .setColor("#e40a0a")
            .setDescription(`${target.user.tag} à été averti par ${msg.author.username} pour ${reasonW}.`)
            .setFooter("StudyCorp - Modération")
        msg.channel.send(warnEmbed2)
    }
}

/**
 * 
 * @param {*} user 
 * @param {*} args 
 * @param {Message} msg 
 */
function saveDB(user, args, msg) {
    let reason = new Array();
    user.reason.forEach(value => {
        reason.push(value);
    })
    reason.push(args.slice(1).join(' '));
    let tag = new Array();
    user.userTag.forEach(value => {
      tag.push(value)
    })
    let date = new Array();
    user.warnDate.forEach(value => {
        date.push(value);
    })
    date.push(msg.createdTimestamp);
    tag.push(msg.author.tag)
    user.set("reason", reason);
    user.set("userTag", tag);
    user.set("warnDate", date);
    user.save().catch(err => console.log(err));
}