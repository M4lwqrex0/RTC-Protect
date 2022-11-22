const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js");
const config = require("../../config");
const client = require('nekos.life');
const neko = new client();

module.exports = {
    name: "hug",
    description: "Permet de prendre dans les bras un user",
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
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: `Je n'es pas les permissions pour effectuer cette commande`, ephemeral: true })
        if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: `Tu n'as pas les permissions pour effectuer cette commande`, ephemeral: true })

        try {
            const user = interaction.options.getMember("user");


            async function work() {
                let owo = (await neko.hug());

                const hugembed = new EmbedBuilder()
                    .setTitle(`${user.user.username} vous avez été pris dans les bras !`)
                    .setColor("Random")
                    .setDescription((user.toString() + "a été pris dans les bras par" + interaction.user.toString()))
                    .setImage(owo.url)
                    .setURL(owo.url)

                return interaction.reply({ embeds: [hugembed] })
            }
            work();
        } catch (err) {
            console.log("Une erreur est survenue", err)
        }
    }
}