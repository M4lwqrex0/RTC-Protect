const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const config = require("../../config")

module.exports = {
  name: "leave",
  description: "Permet de faire quitter le bot",
  options: [
    {
      name: "serverid",
      description: "identifiant du serveur ",
      required: true,
      type: ApplicationCommandOptionType.String,
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.SendMessages)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
    if (!config.ownerID.includes(interaction.user.id)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

    const id = interaction.options.getString('valeur');
    if (!id) id = interaction.guild.id;
    const lguild = client.guilds.cache.get(id);
    lguild.leave().then(g => console.log(`J'ai quitté ${g}`));

    interaction.reply({ content: `J'ai bien quitter le serveur` })

  }
}