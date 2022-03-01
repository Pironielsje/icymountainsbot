const schema = require('../schemas/moneyschema')

module.exports.run = async(client, msg, args) => {

    const givers = [
        "Elon Musk",
        "Jeff Bezos",
        "Your Crush",
        "Mike Oxlong"
    ]

    const giver = givers[Math.floor(Math.random() * givers.length)]
    const money = Math.floor(Math.random() * 501)

    if (schema.findOne({ _id: msg.author.id })) {
        schema.findOneAndUpdate({ $inc: { money: money } }, { upsert: true })
        msg.reply(`${giver} gave you $${money}`)
    } else {
        let newData = new schema({
            _id: msg.author.id,
            money: money
        })

        newData.save()
        msg.reply(`${giver} gave you your first $${money}`)
    }

}

module.exports.help = {
    name: "beg",
    aliases: []
}