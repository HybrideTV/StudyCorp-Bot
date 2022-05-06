const BaseCommand = require('../../utils/structures/BaseCommand');
const { Message, Client } = require("discord.js");
require('dotenv').config();



module.exports = class Support extends BaseCommand {
    constructor() {
        super('support', 'ticket', [], true, "Create ticket.");
    }
    async run(client, msg, args) {

        let action = msg.guild.member(args[0]);
        if (args[0] === 'add') {
                let target = args[1];
                msg.channel.updateOverwrite(target, { VIEW_MESSAGES: true, VIEW_CHANNEL: true, READ_MESSAGES: true });
                msg.channel.send(`${target} a été ajouté au ticket !`);
            
        } 
          else if (args[0] === 'remove') {
                let target = args[1];
                msg.channel.updateOverwrite(target, { VIEW_MESSAGES: false, VIEW_CHANNEL: false, READ_MESSAGES: false });
                msg.channel.send(`${target} a été supprimé du ticket !`);
        }
    }
};