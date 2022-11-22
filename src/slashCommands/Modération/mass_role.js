const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, ApplicationCommandType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "massrole",
    description: "Permet d'ajouter un rôle à tout les utilisateurs & bots",
    owner: false,
    options: [
        {
            name: "role",
            description: "Quel est le rôle ?",
            required: true,
            type: ApplicationCommandOptionType.Role,
        },
    ],
    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `**❌ Tu n'a pas les autorisations pour faire cette commande**`, ephemeral: true })

        try {

        const role = interaction.options.getRole("role");

        await interaction.reply({ content: `Je suis entrain d'ajouter le rôle ${role} veuillez patienter !!`});

        Promise.allSettled(interaction.guild.members.cache.filter(m => !m.user.bot).map(member => member.roles.add(role))).then(async () => {
            await interaction.editReply({ content: `L'ajout du rôles viens de ce terminé`});
        })

        } catch (error) {
            console.log(error)
        }
    }
}