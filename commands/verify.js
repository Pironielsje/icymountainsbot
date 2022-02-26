module.exports.run = async(client, msg, args) => {
    const role = msg.guild.roles.cache.find(r => r.name === "Verified")

    if(msg.member.roles.cache.get(role)) return msg.reply("You already have the role!")

    else {
        msg.member.roles.add(role)
        msg.reply(`You're verified!`)
    }    
}

module.exports.help = {
    name: "verify",
    aliases: ["v"]
}