module.exports.run = async(client, msg, args) => {

    const array = [
        "yes",
        "yeah",
        "hell yeah",
        "no",
        "nope",
        "nah",
        "hell nah",
        "NEVER in my life",
        "right now right here",
        "maybe",
        "probably",
        "probably not"
    ]

    const rand = array[Math.floor(Math.random() * array.length)]

    if(!args[0]) return msg.reply(`Ask me a question!`)

    msg.reply(`Lemme think!`).then(mes => {
        setTimeout(() => {
            mes.edit(`Your answer is: ${rand}`)
        }, 2000);
    })

}

module.exports.help = {
    name: "8ball",
    aliases: ["8b", "9square", "eightball"]
}