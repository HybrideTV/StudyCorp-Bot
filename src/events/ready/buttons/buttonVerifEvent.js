const BaseEvent = require('../../../utils/structures/BaseEvent');
const {  Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

module.exports = class buttonVerifEvent extends BaseEvent {
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
       //LISTE DES BOUTONS
        client.on('clickButton', async(button) => {
            if (button.id === 'buttonVerif') {
                button.defer();
                let buttonMember = button.clicker.member;
                let guild = button.guild;
                let member = guild.members.cache.get(buttonMember.user.id);
                let role = guild.roles.cache.find(r => r.id === "739498020667785267");
                let role2 = guild.roles.cache.find(r => r.id === "811256922900660245");
                buttonMember.roles.add(role);
                buttonMember.roles.add(role2);

        
            }
        })
    }
}