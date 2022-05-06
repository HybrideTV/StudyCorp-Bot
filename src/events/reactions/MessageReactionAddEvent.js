// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-messageReactionAdd
const { Client, MessageReaction, MessageEmbed } = require('discord.js');
const BaseEvent = require('../../utils/structures/BaseEvent');
module.exports = class MessageReactionAddEvent extends BaseEvent {
  constructor() {
    super('messageReactionAdd');
  }
  
  /**
   * 
   * @param {Client} client 
   * @param {MessageReaction} reaction 
   * @param {*} user 
   * @param {Message} msg 
   */
  async run(client, reaction, user, msg) {
   

    
////ROLES ANNONCE
    let addMemberRole2 = () => {
      if(reaction.emoji.name === "📌") {
        let role2 = reaction.message.guild.roles.cache.get("803311722014179389");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role2 && member) {
          member.roles.add(role2);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole2();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole2();
      }
    }
//////////
    let addMemberRoleDms = () => {
      if(reaction.emoji.name === "🦄") {
        let roleDms = reaction.message.guild.roles.cache.get("938110074671468584");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(roleDms && member) {
          member.roles.add(roleDms);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "938111503830233108") {
        addMemberRoleDms();
      }
    }else {
      if (reaction.message.id === "938111503830233108") {
        addMemberRoleDms();
      }
    }
////////////
    let addMemberRole5 = () => {
      if(reaction.emoji.name === "📃") {
        let role5 = reaction.message.guild.roles.cache.get("819165998908964874");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role5 && member) {
          member.roles.add(role5);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole5();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole5();
      }
    }

    ////ROLES PARTENARIAT
    let addMemberRole4 = () => {
      if(reaction.emoji.name === "💎") {
        let role4 = reaction.message.guild.roles.cache.get("809100807072907315");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role4 && member) {
          member.roles.add(role4);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole4();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole4();
      }
    }

    ////ROLES nouveauté
    let addMemberRole6 = () => {
      if(reaction.emoji.name === "🕸") {
        let role6 = reaction.message.guild.roles.cache.get("824722261973794888");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role6 && member) {
          member.roles.add(role6);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole6();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole6();
      }
    }

    ////ROLES discu
    let addMemberRole8 = () => {
      if(reaction.emoji.name === "😀") {
        let role8 = reaction.message.guild.roles.cache.get("848944168114192465");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role8 && member) {
          member.roles.add(role8);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole8();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole8();
      }
    }

    //ROLES CONCOURS
    let addMemberRole3 = () => {
      if(reaction.emoji.name === "🎁") {
        let role3 = reaction.message.guild.roles.cache.get("803311663658827816");
        let member = reaction.message.guild.members.cache.get(user.id);
        if(role3 && member) {
          member.roles.add(role3);
        }
      }
    }
    if (user.id === client.user.id) return
    if(reaction.message.partial) {
      await reaction.message.fetch();
      if (reaction.message.id === "848946365861462066") {
        addMemberRole3();
      }
    } else {
      if (reaction.message.id === "848946365861462066") {
        addMemberRole3();
      }
    }

  }
  }

  
  


  
