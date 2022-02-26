module.exports.run = async(client, msg, args) => {
    if(!message.member.permissions.has("BAN_MEMBERS")) return message.reply("Sorry! You have to have the: **BAN_MEMBERS** permission to use this")
    if(!message.guild.me.permissions.has("BAN_MEMBERS")) return message.reply("Sorry! I don't have the permission to ban someone!")
 
    if(!args[0]) return message.reply("Please mention at least one person or give atleast one id to ban!")
    if(!args[1]) return message.reply("Please give me a reason to ban this person!")
 
    const user = message.guild.members.cache.get(message.mentions.users.first().id || message.guild.members.get(args[0])).id
 
    if(!user) return message.reply("I can't seem to find this user. Is the id or mention correct?")
 
    if(user.permissions.has("MANAGE_MESSAGES")) return message.reply("Couldn't kick a moderator.")
 
    var reason = args[1].slice(1).join(" ")
 
    const unbanned = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Unbanned **${user} (${user.id})** For **${reason}**`)
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()
 
    user.unban().catch(err => {
        if(err) {
            message.reply('Something went wrong')
            console.log(err)
        }
    })
    message.reply({embeds: [unbanned]})
}

module.exports.help = {
    name: "unban",
    aliases: ["unbanish"]
}