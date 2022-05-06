const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed } = require("discord.js");
require('dotenv').config();
const config = require("../../../configuration.json");

module.exports = class Relance extends BaseCommand {
    constructor() {
        super('relance', 'relance', [], true, "Relancer des commandes.");
    }
    async run(client, msg, args) {
        let action = msg.guild.member(args[0]);
        let leftdays = args[1];
        if(args[0] === 'paiement'){
            if(msg.channel.id == '785564862859313153') return; 
            if(msg.channel.parentID == `${config.category_commande}`){
            if (msg.member.roles.cache.has(`${config.role_vendeur}`)) {
                const relanceembed = new MessageEmbed()
                .setTitle("**Notification de relance**")
                .setColor(0xbe3424)
                .setDescription("➤ Votre commande n'as toujours pas été payée.")
                .addField("Merci de régler au plus vite la situation et procéder au paiement.", `Si le paiement n'as pas été effectué sous ${leftdays} jours, vous serez automatiquement blacklisté.`)
                msg.channel.bulkDelete(1)
            msg.channel.send(relanceembed);
            msg.channel.send(`<@&739498020667785267>`)
                }
            }
        }else if(args[0] === 'cdc'){
            if(msg.channel.id == '785564862859313153') return; 
            if(msg.channel.parentID == `${config.category_commande}`){
                if (msg.member.roles.cache.has(`${config.role_vendeur}`)) {
                const relanceembed2 = new MessageEmbed()
                .setTitle("**Notification de relance**")
                .setColor(0xbe3424)
                .setDescription("➤ Merci d'envoyer un cahier des charges complet pour votre demande.")
                .addField("Si aucun cahier des charges n'est envoyé rapidement, le ticket sera fermé.", "-")
                msg.channel.bulkDelete(1)
            msg.channel.send(relanceembed2);
                }
            }
    }else if(args[0] === 'avis'){
        if(msg.channel.id == '785564862859313153') return; 
        if(msg.channel.parentID == `${config.category_commande}`){
            if (msg.member.roles.cache.has(`${config.role_vendeur}`)) {
            const relanceembed3 = new MessageEmbed()
                .setTitle("**Notification de relance**")
                .setColor(0xbe3424)
                .setDescription("➤ Vous n'avez toujours pas déposé d'avis !")
                .addField("Vous pouvez toujours déposer un avis sur le vendeur !", "Si vous n'avez pas déposé d'avis dans 24h, la permission vous sera retirée.")
                msg.channel.bulkDelete(1)
            msg.channel.send(relanceembed3);
            msg.channel.send(`<@&739498020667785267>`)
        }
    }
    }else if(args[0] === 'general'){
        if(msg.channel.id == '785564862859313153') return; 
        if(msg.channel.parentID == `${config.category_commande}`){
            if (msg.member.roles.cache.has(`${config.role_vendeur}`)) {
            const relanceembed4 = new MessageEmbed()
                .setTitle("**Notification de relance**")
                .setColor(0xbe3424)
                .setDescription("➤ Votre ticket est inactif depuis plusieurs jours !")
                .addField("Si vous avez terminé la commande, merci de le signaler afin de pouvoir dédposer un avis !", "-")
                msg.channel.bulkDelete(1)
            msg.channel.send(relanceembed4);
            msg.channel.send(`<@&739498020667785267>`)
        }
    }
    }
    }
};