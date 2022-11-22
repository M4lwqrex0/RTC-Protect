const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {
        let logs = member.guild.channels.cache.get(await db.get(`log_bot_${member.guild.id}`))
        if (logs) {

            var kills = [
                `- C'est officiel, ${member} nous a rejoint !`,
                `- Le sauveteur ${member} Arrive dans le serveur ! `,
                `- ${member} Nous sommes très heureux de vous avoir sur le serveur ! `,
                `- Contents de te voir ${member} !`,
            ];

            const embed = new EmbedBuilder()
                .setDescription(`**${kills[Math.floor(Math.random() * kills.length)]}**`)
                .setColor("Green")
            logs.send({ embeds: [embed] })
        }
    }
}