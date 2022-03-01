const schema = require('../schemas/moneyschema')

module.exports.run = async(client, msg, args) => {

    const givers = [
        "Elon Musk",
        "Jeff Bezos",
        "Your Crush",
        "Mike Oxlong"
    ]

    const giver = givers[Math.floor(Math.random() * givers.length)]
    const givenMoney = Math.floor(Math.random() * 501)

    if (schema.findOne({ _id: msg.author.id })) {
        schema.updateOne({ $inc: { "money": givenMoney } })
        msg.reply(`${giver} gave you $${givenMoney}`)
    } else {
        let newData = new schema({
            _id: msg.author.id,
            money: givenMoney
        })

        newData.save()
        msg.reply(`${giver} gave you your first $${givenMoney}`)
    }

}

module.exports.help = {
    name: "beg",
    aliases: []
}