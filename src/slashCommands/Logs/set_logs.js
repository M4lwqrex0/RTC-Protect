const { ApplicationCommandOptionType, PermissionsBitField, EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, ChannelType } = require("discord.js")
const { QuickDB } = require("quick.db");
const db = new QuickDB()
const config = require("../../config")

module.exports = {
  name: "setlogs",
  description: "Permet de configurer le salon des logs",
  options: [
    {
      name: "channel",
      description: "Quel est le salon des logs ?",
      required: true,
      type: ApplicationCommandOptionType.Channel,
    },
  ],
  /**
   * 
   * @param {Client} client 
   * @param {CommandInteraction} interaction 
   */

  run: async (client, interaction) => {
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
    if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.Administrator)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })


    const channel = interaction.options.getChannel('channel');
    if (!channel) {
      let b = await db.get(`log_bot_${interaction.guild.id}`);
      let channelName = interaction.guild.channels.cache.get(b);
      if (interaction.guild.channels.cache.has(b)) {
        return interaction.reply({ content: `**Le salon des logs a été défini sur \`${channelName.name}\`**` });
      } else return interaction.reply({ content: `Veuillez entrer un salon valide`, ephemeral: true });
    }

    if (!channel || channel.type !== ChannelType.GuildText) return interaction.reply({ content: `Veuillez mettre un salon textuel`, ephemeral: true });
    try {
      let a = await db.get(`log_bot_${interaction.guild.id}`);

      if (a === channel.id) {
        return interaction.reply({ content: `Ce salon est déjà définie sur le serveur`, ephemeral: true });
      } else {
        client.guilds.cache.get(interaction.guild.id).channels.cache.get(channel.id).send(`Bonjour, vous retrouverez tout les logs du bot dans ce salon`);
        await db.set(`log_bot_${interaction.guild.id}`, channel.id);

        interaction.reply({ content: `**Le salon des logs a été défini sur \`${channel.name}\`**` });
      }
      return;
    } catch (error) {
      console.log(error)
    }
  }

}