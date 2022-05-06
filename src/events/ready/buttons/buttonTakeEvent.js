const BaseEvent = require('../../../utils/structures/BaseEvent');
const { MessageEmbed, Message, Client } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');
const mysql = require("mysql-await");
const config = require("../../../../configuration.json");

module.exports = class buttonTakeEvent extends BaseEvent {
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
            
            if (button.id === 'takeTicket') {
                button.defer();
                let buttonMember = button.clicker.member;
                let guild = button.guild;
                let member = guild.members.cache.get(buttonMember.user.id);     
                if(button.channel.id == '785564862859313153') return; 
                if(button.channel.parentID == `${config.category_commande}`){
                    
                if (member.roles.cache.has(`${config.role_vendeur}`)) {
                    
                    console.log(buttonMember.user.id);
                    console.log(button.channel.topic);
                    button.channel.setName('pris-' + buttonMember.user.username)
                    button.channel.updateOverwrite(buttonMember.user.id, { VIEW_MESSAGES: true, VIEW_CHANNEL: true, ATTACH_FILES: true});
                    button.channel.updateOverwrite('772514297150570577', { VIEW_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGES: false});
                    var con = mysql.createConnection({
        host: '195.154.174.181',
        user: 'studycorpdbuser',
        password: 'Fdbp58!7W2o3vw_2',
        database: 'studycorpdb',
        multipleStatements: true
    });

                    con.awaitQuery("UPDATE tickets SET pris = '"+buttonMember.user.id+"' WHERE id='" + button.channel.topic + "'");
                    console.log(buttonMember.user.id);
                    console.log(button.channel.topic);
                    const taketicket = new MessageEmbed()
                        .setTitle(`Votre ticket à été pris par : `+ buttonMember.user.username)
                        .setDescription("Merci d'éviter les tickets inactifs! Si vous n'utilisez plus ce ticket, fermez le.")
                        .setColor(0xFF9300)
                        button.channel.send(taketicket)
                        con.awaitQuery("UPDATE User SET nbcommandes = nbcommandes + 1 WHERE user='" + buttonMember.user.id + "'");
                    }
                }
                }
        })
    }
}