const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {
    if(msg.guild.channels.cache.find(channel => channel.name === `${msg.author.username}-ticket`)) {
        return msg.reply(`You already have a ticket smh!`)
    } else {
        msg.guild.channels.create(`${msg.author.username}-ticket`, {
            type: "text",
            topic: `${msg.author.username}'s ticket`,
            parent: '947895136812158986',
            permissionOverwrites: [
                {
                    id: msg.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTATCH_FILES']
                },
                {
                    id: msg.guild.roles.everyone,
                    deny: ['VIEW_CHANNEL']
                },
                {
                    id: '942822344928415745942822344928415745',
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL', 'READ_MESSAGE_HISTORY', 'EMBED_LINKS', 'ATTACH_FILES']
                }
            ]
        }).then(channel => {
            const embed = new MessageEmbed()
                .setTitle(`New ticket opened by: ${msg.author.username}`)
                .setDescription(`Please wait patiently for mods!\n\nReason: ${args.slice(1).join(" ")}`)

            channel.send({embeds: [embed]})
            msg.reply(`I created your ticket in: <#${channel.id}>!`)
        })
    }
}

module.exports.help = {
    name: "ticket",
    aliases: []
}