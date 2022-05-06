const BaseCommand = require('../../utils/structures/BaseCommand');
const { MessageEmbed, Message, Client } = require("discord.js");
require('dotenv').config();
const weather = require("weather-js")
const moment = require('moment');

module.exports = class Meteo extends BaseCommand {

    constructor() {
          super('meteo', 'general', [], true);
      }
          /**
       * 
       * @param {Client} client 
       * @param {Message} message 
       * @param {Array} args 
       */
      run(client, message, args) {
        weather.find({search: args.join(" "), degreeType: "C"}, function(err, result) {
            if(err) message.channel.send(err)
    
            if(result.length === 0) {
                message.channel.send("**Merci d'entrer une localisation correcte**")
                return;
            }
    
            var current = result[0].current 
            var location = result[0].location
    
            let embed = new MessageEmbed()
               .setDescription(`**${current.skytext}**`) 
               .setAuthor(`Météo de ${current.observationpoint}`) 
               .setThumbnail(current.imageUrl)
               .setColor(0x00AE86) 
               .addField("Temperature", `${current.temperature}°C`, true)
               .addField("Humidité", ` ${current.humidity}%`, true)
               .addField("Date", `${current.date}`, true)
               
               message.channel.send(embed)
    
        });


      }
  }