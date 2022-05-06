const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed, Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const db = require("../../utils/database/database");
const Mutes = require("../../utils/database/models/mute");
const Bans = require("../../utils/database/models/ban");

module.exports = class ReadyEvent extends BaseEvent {
    constructor() {
        super('ready');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @param {*} user 
     */
    async run(client, message, user) {


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        console.log(client.user.tag + ' has logged in.');
        client.user.setActivity("+help", { type: 'WATCHING' })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        db.then(() => {
            client.setInterval(async() => {
                let mutedUsers = await Mutes.find();
                mutedUsers.forEach(async(mutedUser) => {
                    let time = mutedUser.get("time");
                    let guildID = mutedUser.get("guildId");
                    let memberId = mutedUser.get("userId");
                    let guild = await client.guilds.fetch(guildID)
                    let member = await guild.members.fetch(memberId)
                    let mutedRole = guild.roles.cache.find(r => r.id === '')
                    if (mutedRole && Date.now() > time) {
                        member.roles.remove(mutedRole)
                        Mutes.findOneAndRemove({ userId: memberId });
                    }
                })
            }, 60000)
            client.setInterval(async() => {
                let bannedUsers = await Bans.find();
                bannedUsers.forEach(async(bannedUser) => {
                    let time = bannedUser.get("time");
                    let guildID = bannedUser.get("guildId");
                    let memberId = bannedUser.get("userId");
                    let guild = await client.guilds.fetch(guildID)
                    if (Date.now() > time) {
                        guild.members.unban(memberId);
                        Bans.findOneAndRemove({ userId: memberId });
                    }
                })
            }, 60000)
        })
    }
}