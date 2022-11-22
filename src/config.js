require("dotenv").config();

module.exports = {
    token: process.env.TOKEN || "TOKEN_DU_BOT", // TOKEN DU BOT
    clientID: process.env.CLIENT_ID || "ID_DU_BOT", // ID DU BOT
    prefix: process.env.PREFIX || "PREFIX_DU_BOT", // PREFIX DU BOT
    ownerID: process.env.OWNERID || "ID_DU_DEVELOPPPEUR" // ID OWNER
}