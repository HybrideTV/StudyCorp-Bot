require('dotenv').config();
const BaseCommand = require('../../utils/structures/BaseCommand');
const Warns = require("../../utils/database/models/warn");
const { MessageEmbed, Message, Client, User } = require("discord.js");
const config = require("../../../configuration.json");

module.exports = class WarnsCommand extends BaseCommand {
  constructor() {
    super('warns', 'moderation', [], true, "See the warnings of an user", "<userId/user>");
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
    if (!target) return;
    let user = await Warns.findOne({ userId : target.id, guildId: msg.guild.id });
    if (!user) {
        msg.channel.send(`Aucun warn n'a été trouvé pour ${target.user.tag}`);
        return;
    }
    Seewarn(user, msg, target)
  }
}

/**
 * 
 * @param {Number} date 
 */
function parseTime(date)
{
  let newDate = new Date(date);
  return (`${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()} à ${newDate.getUTCHours() + 1}h${newDate.getMinutes()}`);
}

/**
 * 
 * @param {Document} user
 * @param {Message} msg 
 * @param {User} target 
 */
async function Seewarn(user, msg, target)
{
    const embed = new MessageEmbed()
        .setTitle(`Avertissements de ${target.user.tag}`)
        .setColor(0xe40a0a)
    let Reason = new Array();
    let userTag = new Array();
    let date = new Array();
    user.userTag.forEach(value => {
      userTag.push(value)
    })
    user.reason.forEach(value => {
      Reason.push(value)
    });
    user.warnDate.forEach(value => {
      date.push(value);
    })
    Reason.forEach((value, index) => {
        embed.addField(`${value}`, `${userTag[index]} - ${parseTime(date[index])}`)
    })
    msg.channel.send(embed);
}