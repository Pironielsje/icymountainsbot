const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const embed = new MessageEmbed()
        .setTitle('🏓 Pong')
        .setDescription(`API Response time: ${Date.now() - msg.createdTimestamp}ms\nLatency: ${Math.floor(Math.round(client.ws.ping))}`)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarUrl())

    msg.reply(`Pinging.`).then(m => {
        setTimeout(() => {
            m.edit(`Pinging..`).then(ms => {
                setTimeout(() => {
                    ms.edit(`Pinging...`).then(msg => {
                        setTimeout(() => {
                            msg.edit({ embeds: [embed] })
                        }, 500);
                    })
                }, 500);
            })
        }, 500);
    })
}

module.exports.help = {
    name: "ping",
    aliases: ["pong", "pingpong"]
}