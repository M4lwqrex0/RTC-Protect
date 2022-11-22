const { Client, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "help",
    description: "Permet de voir les commandes du bot",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        const embed = new EmbedBuilder()
            .setTitle(`Help ${client.user.username}`)
            .addFields({ name: '🔒 Owner : ', value: ' \`leave\`' })
            .addFields({ name: '💫 Logs : ', value: ' \`setlogs\`, \`disablelogs\` ' })
            .addFields({ name: '⚔️ Moderation : ', value: ' \`massrole\`, \`ban\`, \`banlist\`, \`kick\`, \`lock\`, \`mute\`, \`nuke\`, \`unban\`, \`unlock\`, \`unmute\`' })
            .addFields({ name: '📎 Information : ', value: ' \`help\`, \`ping\`' })
            .addFields({ name: '😀 Fun : ', value: ' \`hug\`, \`kiss\`, \`love\`, \`slap\`' })
            .setFooter({ text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })

    }
}