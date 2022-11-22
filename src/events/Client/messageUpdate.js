const { Message, Client, EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "messageUpdate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} newMessage 
     * @returns 
     */
    run: async (client, oldMessage, newMessage) => {
        if (newMessage.author.bot) return;

        let logs = newMessage.guild.channels.cache.get(await db.get(`log_bot_${newMessage.guild.id}`))
        if (!logs) return;
        if (logs) {
            const e = new EmbedBuilder()
                .setTitle(`Message Modifié`)
                .setAuthor({ name: `${newMessage.author.username}`, iconURL: `${newMessage.author.displayAvatarURL({ dynamic: true })}` })
                .setThumbnail(newMessage.author.displayAvatarURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/798945891678421044/951585273324650496/discord-logo-white.png")
                .addFields([
                    { name: 'Message éditer dans :', value: `${newMessage.channel} | \`${newMessage.channel.id}\` ` },
                    { name: 'Avant :', value: ` ${oldMessage.content} ` },
                    { name: 'Après :', value: ` ${newMessage.content} ` },
                ])
                .setColor("Green")
                .setTimestamp()
            logs.send({ embeds: [e] })
        }

    }
};