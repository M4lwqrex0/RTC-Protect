const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "guildMemberRemove",
    run: async (client, member) => {

        let logs = member.guild.channels.cache.get(await db.get(`log_bot_${member.guild.id}`))
        if (logs) {

            var kills = [
                `- C'est officiel, ${member}, viens de partir !`,
                `- ${member}, quitte le serveur ! `,
                `- ${member}, Nous espérons te revoir bientôt sur le serveur ! `,
                `- Contents de t'avoir vu ${member} !`,
            ];

            const embed = new EmbedBuilder()
                .setDescription(`**${kills[Math.floor(Math.random() * kills.length)]}**`)
                .setColor("Red")
            logs.send({ embeds: [embed] })
        }
    }
}