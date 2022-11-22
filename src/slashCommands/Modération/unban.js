const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "unban",
    description: "Permet d'unban un utilisateur",
    options: [
        {
            name: "user",
            description: "Quel est l'utilisateur ?",
            required: true,
            type: ApplicationCommandOptionType.User,
        },
    ],
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })


        const user = interaction.options.getUser('user');

        if (!(await interaction.guild.bans.fetch()).get(user.id)) return interaction.reply({ content: `${user.username} n'es pas bannit` })

        try {
            await interaction.guild.bans.remove(user)

            await user.send({ content: `Tu as étais unban par ${interaction.user.username} du serveur de ${interaction.guild.name}` }).catch(() => { })

            let logs = interaction.guild.channels.cache.get(await db.get(`log_bot_${interaction.guild.id}`))
            if (logs) {
                const embed = new EmbedBuilder()
                    .setTitle("Unban")
                    .setColor("Green")
                    .setDescription(`Je viens de d'unban ${user.username}`)
                    .setTimestamp()
                await logs.send({ embeds: [embed] })
            }

            return interaction.reply({ content: `J'ai unban ${user.username}` })

        } catch (error) {
            console.log(error)
        }
    }
}