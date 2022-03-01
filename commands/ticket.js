const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js")

module.exports.run = async(client, msg, args) => {
    let author = msg.author.toLowerCase()
    let discriminator = msg.author.discriminator

    if (msg.guild.channels.cache.find(c => c.name == `${author}${discriminator}-ticket`)) {
        msg.reply("You already have a ticket open!")
    } else if (!msg.guild.channels.cache.find(c => c.name == `${author}${discriminator}-ticket`)) {
        msg.guild.channels.create(`${author}${discriminator}-ticket`, {
            parent: '947895136812158986',
            topic: `${author}'s topic!`,
            permissionOverwrites: [{
                    id: msg.author.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                },
                {
                    id: client.user.id,
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: '942822344928415745',
                    allow: ['SEND_MESSAGES', 'VIEW_CHANNEL']
                }, {
                    id: '942069272816017458',
                    deny: ['VIEW_CHANNEL', 'SEND_MESSAGES']
                },
            ],
            type: 'GUILD_TEXT'
        }).then(async c => {
            msg.reply(`Ticket created in <#${c.id}>`)

            const newtic = new MessageEmbed()
                .setColor(`NAVY`)
                .setDescription(`Please wait untill the staff replies! Don't ping them please!`)

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('close')
                    .setLabel('Close')
                    .setEmoji("🔐")
                    .setStyle("DANGER")
                )

            c.send({
                content: `<@${msg.author.id}> <@942822344928415745>`,
                embeds: [newtic],
                components: [row]
            }).then(m => {
                m.pin()
            })
        })
    }
}

module.exports.help = {
    name: "ticket",
    aliases: []
}