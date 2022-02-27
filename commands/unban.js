module.exports.run = async(client, msg, args) => {
    if(!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! You have to have the: **BAN_MEMBERS** permission to use this")
    if(!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! I don't have the permission to ban someone!")
 
    if(!args[0]) return msg.reply("Please mention at least one person or give atleast one id to ban!")
 
    if(user.permissions.has("MANAGE_MSG")) return msg.reply("Couldn't kick a moderator.")
 
    var reason = args[1].slice(1).join(" ")
 
    if(!reason) reason = "No reason specified"

    const unbanned = new msgEmbed()
        .setColor("RED")
        .setDescription(`Unbanned **${user} (${user.id})** For **${reason}**`)
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()
 
    user.unban().catch(err => {
        if(err) {
            msg.reply('Something went wrong')
            console.log(err)
        }
    })
    msg.reply({embeds: [unbanned]})
}

module.exports.help = {
    name: "unban",
    aliases: ["unbanish"]
}