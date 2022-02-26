const { MessageEmbed } = require("discord.js")
const ms = require('ms')

module.exports.run = async(client, msg, args) => {

    const reply = new MessageEmbed()
        .setTitle(`Botinfo`)
        .setColor(`AQUA`)
        .setFields(
            {name: 'Users', value: `Total users: ${client.users}`},
            {name: 'Uptime', value: `Uptime: ${ms(client.uptime, {long: true})}`}
        )
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()

    msg.reply({embeds: [reply]})

}

module.exports.help = {
    name: "botinfo",
    aliases: ["bi"]
}