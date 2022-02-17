const warnSchema = require('../models/warnmodel')
const mongoose = require('mongoose')

module.exports.run = async(client, msg, args) => {

    if(!msg.member.permissions.has("KICK_MEMBERS")) return msg.reply("You have to have the **KICK_MEMBERS** permission to do this!")

    const target = msg.mentions.members.first()

    if(!target || !args[0]) msg.reply(`Who do you want to warn? Please tag someone while running the command!`)

    if(!parseInt(args[0])) msg.reply(`Please give me an id! Not some letters`)

    if(target.permissions.has("MANAGE_MESSAGES")) return msg.reply("You can't warn that user!")

    const targetId = target.user.id || args[0]

    let reason = args[1].join(" ")

    if(!reason) reason = "No reason specified" 

    let data = await warnSchema.findOne({
        _id: targetId
    })

    if(data) {
        data.update(
            { warns: { $add: 1 }}
        )
    } else if(!data) {
        let newData = new warnSchema({
            _id: targetId,
            warns: 1
        })

        newData.save()

        msg.reply(`Warned <@${targetId}> for ${reason}`)
    }

}

module.exports.help = {
    name: "warn",
    aliases: ["strike"]
}