const BaseEvent = require('../../../utils/structures/BaseEvent');
const { MessageEmbed, Message, Client, MessageCollector, Collection } = require("discord.js");
const { MessageButton, MessageActionRow } = require('discord-buttons');

const fs = require('fs').promises;
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const dom = new JSDOM();
const document = dom.window.document;


module.exports = class buttonCloseEvent extends BaseEvent {
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
            if (button.id === 'closeSupportTicket') {
                button.defer();
                let buttonMember = button.clicker.member;
                let guild = button.guild;
                let member = guild.members.cache.get(buttonMember.user.id);                
                let messageCollection = new Collection();
                let channelMessages = await button.channel.messages.fetch({
                    limit: 100
                }).catch(err => console.log(err));
                messageCollection = messageCollection.concat(channelMessages);
                while(channelMessages.size === 100) {
                    let lastMessageId = channelMessages.lastKey();
                    channelMessages = await button.channel.messages.fetch({ limit: 100, before: lastMessageId }).catch(err => console.log(err));
                    if(channelMessages)
                        messageCollection = messageCollection.concat(channelMessages);
                }
                let messages = messageCollection.array().reverse();
                var fileDate = new Date()
                let fileDateComplete = (fileDate.getDate()+"-"+(fileDate.getMonth()+1)+"-"+fileDate.getFullYear())
                let channelnamefile = button.channel.name;
                let data = await fs.readFile('./transcripts/template.html', 'utf8').catch(err => console.log(err));
                if(data) {
                    await fs.writeFile(`./transcripts/everyonesupport/${channelnamefile}-${fileDateComplete}.html`, data).catch(err => console.log(err));
                    let guildElement = document.createElement('div');
                    let guildText = document.createTextNode(button.guild.name);
                    guildElement.appendChild(guildText);
                    await fs.appendFile(`./transcripts/everyonesupport/${channelnamefile}-${fileDateComplete}.html`, guildElement.outerHTML).catch(err => console.log(err));
                    messages.forEach(async message => {
                        let parentContainer = document.createElement("div");
                        parentContainer.className = "parent-container";
                        let avatarDiv = document.createElement("div");
                        avatarDiv.className = "avatar-container";
                        let img = document.createElement('img');
                        img.setAttribute('src', message.author.displayAvatarURL());
                        img.className = "avatar";
                        avatarDiv.appendChild(img);
                        parentContainer.appendChild(avatarDiv);
                        let messageContainer = document.createElement('div');
                        messageContainer.className = "message-container";
                        let nameElement = document.createElement("b");
                        let name = document.createTextNode(message.author.tag + " " + message.createdAt.toDateString() + " " + message.createdAt.toLocaleTimeString());
                        nameElement.appendChild(name);
                        nameElement.style.font = 'bold';
                        messageContainer.append(nameElement);
                        if(message.content.startsWith("```")) {
                            if(message.length < 1) return;
                            let m = message.content.replace(/```/g, "");
                            let codeNode = document.createElement("code");
                            let textNode =  document.createTextNode(m);
                            codeNode.appendChild(textNode);
                            messageContainer.appendChild(codeNode);
                        }
                        else {
                            if(message.length < 1) return;
                            let messageNode = document.createElement('span');
                            let textNode = document.createTextNode(message.content);
                            messageNode.append(textNode);
                            messageContainer.appendChild(messageNode);
                        }
                        parentContainer.appendChild(messageContainer);
                        await fs.appendFile(`./transcripts/everyonesupport/${channelnamefile}-${fileDateComplete}.html`, parentContainer.outerHTML).catch(err => console.log(err));
        
                    });
                }
                button.channel.delete();
                    }
        })
    }
}