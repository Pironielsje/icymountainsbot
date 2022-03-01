const ms = require("ms");

module.exports.run = async(client, msg, args) => {

    if (!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply(`You don't have the permission to mute someone!`)

    const target = msg.guild.members.cache.get(msg.mentions.users.first().id) || msg.guild.members.cache.get(args[0]);
    if (!args[0]) return msg.reply(`Provide a member to mute please`)

    let mainRole = msg.guild.roles.cache.find(role => role.name === "Verified");
    let role = msg.guild.roles.cache.find(role => role.name === "muted")

    if (!role) return msg.reply(`You dont have a muted role! Please make one first`)

    target.roles.add(mainRole)
    target.roles.remove(role)

    msg.reply(`<@${target.user.id}> has been unmuted!`)
    target.send(`You have been unmuted`)

}

module.exports.help = {
    name: "unmute",
    aliases: ["unmoot"]
}