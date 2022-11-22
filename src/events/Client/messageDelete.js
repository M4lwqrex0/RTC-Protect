const { Message, Client, EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "messageDelete",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if (message.author.bot) return;

        let logs = message.guild.channels.cache.get(await db.get(`log_bot_${message.guild.id}`))
        if (!logs) return;
        if (logs) {
            const e = new EmbedBuilder()
                .setTitle(`Message Supprimer`)
                .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.displayAvatarURL({ dynamic: true })}` })
                .setThumbnail(message.author.displayAvatarURL({ dynamic: true }) || "https://cdn.discordapp.com/attachments/798945891678421044/951585273324650496/discord-logo-white.png")
                .addFields([
                    { name: 'Message supprimer dans :', value: `${message.channel} | \`${message.channel.id}\` ` },
                    { name: 'message :', value: ` ${message.content} ` },
                ])
                .setColor("Green")
                .setTimestamp()
            logs.send({ embeds: [e] })
        }

    }
};