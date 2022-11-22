const { Client, PermissionsBitField, CommandInteraction } = require("discord.js")
const config = require("../../config")

module.exports = {
    name: "nuke",
    description: "Permet de recréer un salon",
    /**
     * 
     * @param {Client} client 
     * @param {CommandInteraction} interaction 
     */

    run: async (client, interaction) => {

        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

        channel = interaction.channel;

        channel.clone({ position: channel.rawPosition }).then(async ch => {
            ch.send({ content: `Le salon a bien été recréer par ${interaction.user.username}` });
        });

        await channel.delete();
    }
}