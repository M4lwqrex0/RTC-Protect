const { Client, ApplicationCommandOptionType, PermissionsBitField, CommandInteraction, EmbedBuilder } = require("discord.js")
const config = require("../../config")

module.exports = {
  name: "ban",
  description: "Permet de ban un utilisateur",
  options: [
    {
      name: "user",
      description: "Quel est l'utilisateur ?",
      required: true,
      type: ApplicationCommandOptionType.User,
    },
    {
      name: "reason",
      description: "Quel est la raison ?",
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
    if (!config.ownerID.includes(interaction.user.id) && !interaction.member?.permissions.has(PermissionsBitField.Flags.BanMembers)) return interaction.reply({ content: `Il te manque des permissions pour effectuer cette commande.`, ephemeral: true })

    const banMember = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (!banMember) return interaction.reply({ content: "L'utilisateur n'est pas dans le serveur.", ephemeral: true });
    if (banMember === interaction.member) return interaction.reply({ content: `Vous ne pouvez pas vous bannir.`, ephemeral: true });
    if (!banMember.bannable) return interaction.reply({ content: `Impossible de bannir cet utilisateur.`, ephemeral: true });

    interaction.guild.bans.create(banMember.id, { reason: reason.length !== 0 ? reason : `Aucune raison fournie` }).then(async () => {
      await interaction.reply({ content: `J'ai bannit ${banMember.user.username} pour la raison : ${reason.length !== 0 ? `\n\`Raison\` - ${reason}` : `\n\`Raison\` - Aucune raison fournie`}` });
    }).catch(() => {
      return console.log(`Impossible de bannir cet utilisateur ${banMember}`);
    });


    let logs = interaction.guild.channels.cache.get(await db.get(`log_bot_${interaction.guild.id}`))
    if (logs) {
      const embed = new EmbedBuilder()
        .setTitle("Ban")
        .setColor("Green")
        .setDescription(`Je viens de bannir ${banMember.user.username} pour la raison : ${reason}`)
        .setTimestamp()
      await logs.send({ embeds: [embed] })
    }

  }
}