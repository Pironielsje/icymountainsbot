module.exports.run = async(client, msg, args) => {
    if(msg.guild.channels.cache.find(channel => channel.name === `${msg.author.username}-ticket`)) {
        return msg.reply(`You already have a ticket smh!`)
    } else {
        msg.guild.channels.create(`${msg.author.username}-ticket`)
    }
}

module.exports.help = {
    name: "ticket",
    aliases: []
}