const { EmbedBuilder} = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports ={
name: "voiceStateUpdate",
    /**
   * 
   * @param {Client} client 
   */
run: async (client, oldMember, newMember) => {

   let logs = newMember.guild.channels.cache.get(await db.get(`log_bot_${newMember.guild.id}`))
    if (!logs) return;
    if (logs) {

            let odlVoice = client.channels.cache.get(oldMember.channelId);
            let newVoice = client.channels.cache.get(newMember.channelId);
    
            if(newVoice){
                const embed = new EmbedBuilder()
                .setAuthor({name: `${newMember.member.user.username}`, iconURL: `${newMember.member.displayAvatarURL({dynamic: true})}`})
                .setColor("Blue")
                .setDescription(`${newMember.member} se connecte au salon <#${newMember.channel.id}>`)
                .setTimestamp()
                logs.send({embeds: [embed]})
            }
            if(odlVoice && !newVoice) {
                const embed = new EmbedBuilder()
                .setAuthor({name: `${oldMember.member.user.username}`, iconURL: `${oldMember.member.displayAvatarURL({dynamic: true})}`})
                .setColor('Red')
                .setDescription(`${oldMember.member} quitte le salon <#${oldMember.channel.id}>`)
                .setTimestamp()
                logs.send({embeds: [embed]})
            }
        } 


    }
}