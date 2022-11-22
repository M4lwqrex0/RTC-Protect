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
        () => `discord.gg/rtcback`,
    ]
      let i = 0
      setInterval(() => {
      
        try {

          client.guilds.cache.get("991721268141367377").channels.cache.get("1043532223879577651").setName(`💎・Membres・${client.guilds.cache.get("991721268141367377").memberCount}`);
          client.guilds.cache.get("991721268141367377").channels.cache.get("1043532328057716780").setName(`🎧・Vocal・${client.guilds.cache.get("991721268141367377").members.cache.filter(user => user.voice).size}`);
          client.guilds.cache.get("991721268141367377").channels.cache.get("1043536612186914846").setName(`🟢・ Online・${client.guilds.cache.get("991721268141367377").members.cache.filter(m => m.presence?.status === "online").size}`);
          client.guilds.cache.get("991721268141367377").channels.cache.get("1043536654285152367").setName(`🔴・ Dnd・${client.guilds.cache.get("991721268141367377").members.cache.filter(m => m.presence?.status === "dnd").size}`);
          client.guilds.cache.get("991721268141367377").channels.cache.get("1043532442675449896").setName(`🔮・Boost・${client.guilds.cache.get("991721268141367377").members.cache.filter(member => member.premiumSince).size}`);

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
