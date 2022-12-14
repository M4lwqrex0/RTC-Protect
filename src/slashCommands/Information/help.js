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
            .addFields({ name: '๐ Owner : ', value: ' \`leave\`' })
            .addFields({ name: '๐ซ Logs : ', value: ' \`setlogs\`, \`disablelogs\` ' })
            .addFields({ name: 'โ๏ธ Moderation : ', value: ' \`massrole\`, \`ban\`, \`banlist\`, \`kick\`, \`lock\`, \`mute\`, \`nuke\`, \`unban\`, \`unlock\`, \`unmute\`' })
            .addFields({ name: '๐ Information : ', value: ' \`help\`, \`ping\`' })
            .addFields({ name: '๐ Fun : ', value: ' \`hug\`, \`kiss\`, \`love\`, \`slap\`' })
            .setFooter({ text: `Demandรฉ par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}` })
            .setTimestamp()

        await interaction.reply({ embeds: [embed] })

    }
}