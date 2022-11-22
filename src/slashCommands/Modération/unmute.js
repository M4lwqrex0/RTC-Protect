const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
  name: "unmute",
  description: "Permet d'unmute un utilisateur",
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
    if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.reply({ content: `Il me manque des permissions pour effectuer cette commande.`, ephemeral: true })
    if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.MuteMembers)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })


    const mutee = interaction.options.getMember('user');

    if (!mutee) return interaction.reply({ content: `Veuillez entrée un utilisateur a unmute`, ephemeral: true })
    if (!mutee) return interaction.reply({ content: `Veuillez entrer un utilisateur valide`, ephemeral: true });
    if (!mutee.isCommunicationDisabled()) return interaction.reply({ content: `Cet utilisateur n'est pas mute !`, ephemeral: true })

    mutee.timeout(null)

    let logs = interaction.guild.channels.cache.get(await db.get(`log_bot_${interaction.guild.id}`))
    if (logs) {
      const embed = new EmbedBuilder()
        .setTitle("Unmute")
        .setColor("Green")
        .setDescription(`Je viens d'unmute ${mutee}`)
        .setTimestamp()
      await logs.send({ embeds: [embed] })
    }

    return interaction.reply({ content: `j'ai unmute ${mutee.user.username}.` });

  }
}