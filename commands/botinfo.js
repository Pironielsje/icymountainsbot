const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const reply = new MessageEmbed()
        .setTitle(`Botinfo`)
        .setColor(`AQUA`)
        .setFields(
            {name: 'Users', value: `Total users: ${client.users.cache.size}`},
            {name: 'Uptime', value: client.uptime}
        )
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())

}

module.exports.help = {
    name: "botinfo",
    aliases: ["bi"]
}