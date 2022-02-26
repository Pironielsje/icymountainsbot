module.exports.run = async(client, msg, args) => {

    if(msg.member.roles.cache.some(role => role.name === "Verified")){
        return msg.reply("You already have the role!")
    }
    else {
        msg.member.roles.add("942069272816017458")
        msg.reply(`You're verified!`)
    }    
}

module.exports.help = {
    name: "verify",
    aliases: ["v"]
}