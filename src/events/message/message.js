const { Message, Client, MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');

const mysql = require("mysql-await");
module.exports = class MessageEvent extends BaseEvent {
    constructor() {
        super('message');
    }

    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    async run(client, message) {
    
        //SUGGESTION
        if (message.author.bot) return;
        if (message.channel.id === "796316078309244948") {
            let { content, author } = message;
            const suggestion = new MessageEmbed()
                .setTitle(`Suggestion de ${author.username}`)
                .setColor('RANDOM')
                .setDescription(content)
                .setTimestamp()
            message.delete();
            message.channel.send(suggestion).then(msg => {
                msg.react("✅");
                msg.react("❌");
            });
            return;
        }

        //PUBLICITE
    if (message.author.bot) return;
    if (message.channel.id === "784706235538472962") {
      const publicite = new MessageEmbed()
        .setColor('RANDOM')
        .setDescription("▶ Vous devez être niveau 2 pour pouvoir poster votre publicité \n▶ Vous avez la possibilité de faire votre pub **toutes les 12h**.\n▶ Si vous __quittez le serveur__, **toutes vos publicités** seront __supprimées__.\n▶ Mettez une **description** et un **lien valide** dans vos pubs !")
      message.channel.send(publicite);
      return;
    }


        if (message.content.startsWith(client.prefix)) {
            const [cmdName, ...cmdArgs] = message.content.slice(client.prefix.length).trim().split(/\s+/);
            const command = client.commands.get(cmdName) || client.aliases.get(cmdName);
            if (!command) return;
            if (command.guildOnly && message.channel.type !== "text") return message.channel.send("This is a guildOnly command!")
            if (command && command.permissions) {
                if (command.permissions.check(message.member.permissions.toArray()))
                    command.run(client, message, cmdArgs);
                else
                    message.channel.send(`Tu as besoin de ces permissions pour la commande ${command.name} : ${command.permissions.getPerm()}`)
            } else if (command && !command.permissions) {
                command.run(client, message, cmdArgs);
            }
        }
    }
}