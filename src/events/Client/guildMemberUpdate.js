const { EmbedBuilder } = require("discord.js");
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
    name: "guildMemberUpdate",
    run: async (client, oldMember, newMember) => {

        let logs = newMember.guild.channels.cache.get(await db.get(`log_bot_${newMember.guild.id}`))
        if (logs) {

            //BOOST DETECTION
            if (oldMember.roles.cache.size !== newMember.roles.cache.size) {
                if (oldMember.premiumSince !== newMember.premiumSince) {
                    var kills = [
                        `- C'est officiel, ${member} viens de boost le serveur !`,
                        `- Le sauveteur ${member} boost sur le serveur ! `,
                        `- ${member} Nous sommes très heureux que vous aillez boost ! `,
                        `- Contents de te voir votre premium ${member} !`,
                    ];

                    const thank = new EmbedBuilder()
                        .setDescription(`**${kills[Math.floor(Math.random() * kills.length)]}**`)
                        .setColor("Purple")
                    logs.send({ embeds: [thank] })
                }
            }
        }
    }
}