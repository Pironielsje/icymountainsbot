module.exports.run = async(client, msg, args) => {
    if(!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! You have to have the: **BAN_MEMBERS** permission to use this")
    if(!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! I don't have the permission to ban someone!")
 
    if(!args[0]) return msg.reply("Please mention at least one person or give atleast one id to ban!")
    if(!args[1]) return msg.reply("Please give me a reason to ban this person!")
 
    const user = msg.guild.members.cache.get(msg.mentions.users.first().id || msg.guild.members.get(args[0])).id
 
    if(!user) return msg.reply("I can't seem to find this user. Is the id or mention correct?")
 
    if(user.permissions.has("MANAGE_msgS")) return msg.reply("Couldn't kick a moderator.")
 
    var reason = args[1].slice(1).join(" ")
 
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