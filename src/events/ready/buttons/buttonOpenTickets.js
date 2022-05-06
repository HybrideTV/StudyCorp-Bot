const BaseEvent = require('../../../utils/structures/BaseEvent');
const { MessageEmbed, Message, Client, MessageCollector, Collection } = require("discord.js");
const { MessageButton, MessageActionRow, MessageComponent } = require('discord-buttons');
const config = require("../../../../configuration.json");

const BlacklistDatabase = require("../../../utils/database/models/blacklist");
const SupportDatabase = require("../../../utils/database/models/support");
const mysql = require("mysql-await");
module.exports = class buttonOpenTickets extends BaseEvent {
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
            const takeTicket = new MessageButton()
            .setStyle('green')
            .setLabel('Take (Vendeur uniquement)')
            .setID('takeTicket')

            const closeTicket = new MessageButton()
            .setStyle('red')
            .setLabel('Close')
            .setID('closeTicket')

            const closeSupportTicket = new MessageButton()
            .setStyle('red')
            .setLabel('Close')
            .setID('closeSupportTicket')

            if (button.id === 'supportTicket') {
                button.defer();
                let buttonMember = button.clicker.member;
                let guild = button.guild;
                let member = guild.members.cache.get(buttonMember.user.id);
                var channel_ticket = guild.channels.create('support-' + buttonMember.user.username, {
                    type: 'text',
                    parent: `${config.category_support}`,
                    permissionOverwrites: [{
                            id: '739495969778827306', //EVERYONE
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: buttonMember.user,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: `${config.role_moderateur}`,
                            allow: ['VIEW_CHANNEL'],
                        },
                    ]
                }).then(async channel_ticket => {
                    const cmd = new MessageEmbed()
                        .setTitle("Bonjour ! Merci d'avoir pris contact avec notre support ! Un membre du staff va prendre ta demande. Soit patient :)")
                        .setColor(0x00ffa6)
                    channel_ticket.send(cmd)
                    let userblacklist = await SupportDatabase.find({ userid : buttonMember.user.id}).countDocuments();
                    if(userblacklist > 3 || userblacklist === 3){
                        channel_ticket.send("Vous avez atteins 3 demandes sans succès, vous êtes refusé définitivement au poste de vendeur.")
                    }
                    channel_ticket.send(`Nombre de demandes d'obtention du grade vendeur refusées/sans suite : ${userblacklist}`);
                    channel_ticket.send('  >', {
                        buttons: [closeSupportTicket],
                      }).then((msg) => msg.pin());
                })
            } else if (button.id === 'openTicket') {
                button.defer();
                let buttonMember = button.clicker.member;
                let guild = button.guild;
                let member = guild.members.cache.get(buttonMember.user.id);
                var channel_ticket = guild.channels.create('commande-' + buttonMember.user.username, {
                    type: 'text',
                    parent: `${config.category_commande}`,
                    permissionOverwrites: [{
                            id: '739495969778827306', //EVERYONE
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: buttonMember.user,
                            allow: ['VIEW_CHANNEL'],
                        },
                        {
                            id: `${config.role_vendeur}`, 
                            allow: ['VIEW_CHANNEL'],
                        },

                    ]
                }).then(async channel_ticket => {   
                      var con = mysql.createConnection({
        host: '195.154.174.181',
        user: 'studycorpdbuser',
        password: 'Fdbp58!7W2o3vw_2',
        database: 'studycorpdb',
        multipleStatements: true
    });
                con.awaitQuery("INSERT INTO tickets VALUES (NULL, '" + buttonMember.user.id + "', '2', '" + Date.now() + "', '0', '" + buttonMember.user.username + "', '" + buttonMember.user.avatar + "', '0')");
        var result2 = await con.awaitQuery("SELECT * FROM tickets WHERE user = '"+buttonMember.user.id+"' ORDER BY ID DESC LIMIT 1");
        var nbr = "";
                result2.forEach((ss)=>{
                    nbr = ss.id;
                });
        	channel_ticket.setTopic(nbr);
                    const cmd = new MessageEmbed()
                        .setTitle("Bonjour ! Merci d'avoir pris commande avec nos vendeurs !")                        
                        .setColor(0x1dcbdc)
                        .setDescription("Pensez à envoyer un cahier des charges complet ici, ce qui facilitera le traitement de votre commande !")
                        .addField('\u200B', "Pensez à activer les notifications de vos tickets !")
                        .addField("Si vous quittez / ne payez pas / ne donnez aucune nouvelle sur votre ticket, vous serez blacklist après plusieurs relances", '\u200B')
                    channel_ticket.send(cmd)
                    channel_ticket.send('Les boutons ont été épinglés au ticket !', {
                        buttons: [closeTicket, takeTicket],
                      }).then((msg) => msg.pin());

                    let userblacklist = await BlacklistDatabase.findOne({ userid : buttonMember.user.id});
                    if (userblacklist) {
                    let userblacklistMotif = userblacklist.get("motif");
                    let userblacklistMotif2 = userblacklist.get("pseudo");
                    let userblacklistMotif3 = userblacklist.get("userid");
                    
                        const ublEmbed = new MessageEmbed()
                        .setTitle("🔒 Prudence ! Ce client est blacklist !🔒")                        
                        .setColor(0xf48908)
                        .setDescription(`Pseudo/Id : ${userblacklistMotif2}/${userblacklistMotif3} \n Motif: ${userblacklistMotif}`)
                        channel_ticket.send(ublEmbed);
                        return;
                    }else{
                        const ublEmbed2 = new MessageEmbed()
                        .setTitle("<:verified:876385892590301185> Ce client n'est pas blacklist ! <:verified:876385892590301185>")                        
                        .setColor(0x33f408)
                        channel_ticket.send(ublEmbed2);
                    }

                })
            }
        })
    }
}
