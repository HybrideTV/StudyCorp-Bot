const BaseEvent = require('../../utils/structures/BaseEvent');
const { MessageEmbed, Message, Client } = require('discord.js');

module.exports = class GuildMemberWelcomeEvent extends BaseEvent {
  constructor() {
    super('guildMemberAdd');
  }
  
  async run(client, member) {


    var salon = member.guild.channels.cache.get('739501609284927559');
    var userCount = member.guild.memberCount;
    const welcomeEmbed = new MessageEmbed()
    .setTitle("Bienvenue à toi " + member.user.username)
    .setColor(0x01FF00)
    .setDescription(`Nous sommes désormais ` + userCount + ' membres sur ce discord !')
    salon.send(welcomeEmbed); 

    const welcomeMpEmbed = new MessageEmbed()
    .setTitle("Bienvenue sur StudyCorp !")
    .setColor(0x01FF00)
    .setDescription("Pense à lire le règlement pour éviter des sanctions !\nNotre équipe de modération se porte à votre service pour toute question.")
    .addField("\nVous n'avez pas trouver ce que vous cherchiez ? N'hésitez pas à envoyer votre avis ici :", "https://feedback.studycorp.fr")
    member.send(welcomeMpEmbed);

  }
}