const { Client, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "ping",
    description: "Permet de voir le ping du bot",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        interaction.reply({ content: `Mon ping est de ${client.ws.ping} ms` })

    }
}