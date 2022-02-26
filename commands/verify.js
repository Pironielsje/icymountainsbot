module.exports.run = async(client, msg, args) => {
    const role = 942069272816017458

    if(msg.member.roles.get(role)) return msg.reply("You already have the role!")

    else {
        msg.member.roles.add(role)
        msg.reply(`You're verified!`)
    }    
}

module.exports.help = {
    name: "verify",
    aliases: ["v"]
}