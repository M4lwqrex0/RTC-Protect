const { Guild } = require("discord.js");

module.exports ={
name: "ready",
/**
 * 
 * @param {Client} client 
 * @param {Guild} guild 
 */
run: async (client, guild) => {
    console.log(`${client.user.username} : En ligne sur ${client.guilds.cache.size} serveur(s) !`);

    //Game
    const statuses = [
        () => `Développer par !" 𝑱𝒂𝒎𝒆𝒔__#5896`,
    ]
      let i = 0
      setInterval(() => {
      
        try {

          //SERVEUR 1
          /*
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`💎・Membres・${client.guilds.cache.get("ID_SERVEUR").memberCount}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🎧・Vocal・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(user => user.voice).size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🟢・En・Ligne・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(m => m.presence.status === "online").size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🔮・Boost・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(member => member.premiumSince).size}`);
          */

          //SERVEUR 2
          /*
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`💎・Membres・${client.guilds.cache.get("ID_SERVEUR").memberCount}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🎧・Vocal・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(user => user.voice).size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🟢・En・Ligne・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(m => m.presence.status === "online").size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🔮・Boost・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(member => member.premiumSince).size}`);
          */

          //SERVEUR 3
          /*
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`💎・Membres・${client.guilds.cache.get("ID_SERVEUR").memberCount}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🎧・Vocal・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(user => user.voice).size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🟢・En・Ligne・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(m => m.presence.status === "online").size}`);
          client.guilds.cache.get("ID_SERVEUR").channels.cache.get("ID_CHANNEL_VOICE").setName(`🔮・Boost・${client.guilds.cache.get("ID_SERVEUR").members.cache.filter(member => member.premiumSince).size}`);
          */

        }
        catch (e) {
          console.log(e)
        }


        client.user.setStatus("online")
        client.user.setActivity(statuses[i](),)
        i = ++i % statuses.length
      }, 1e4)
 }
}
