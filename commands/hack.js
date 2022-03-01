module.exports.run = async(client, msg, args) => {

    const words = [
        "lol",
        "porn",
        "boobies",
        "fuck",
        "daddy",
        "onii-chan",
        "ara ara",
        "indeed",
        "maybe",
        "what",
        "meme",
        "hack"
    ]

    const commonWord = words[Math.floor(Math.random() * words.length)]

    const mails = [
        "@gmail.com",
        "@icymountains.nl",
        "@discord.com",
        "@pornhub.com 😳"
    ]

    target = msg.mentions.members.first()

    const email = mails[Math.floor(Math.random() * mails.length)]

    const ips = [
        "0.0.0.0",
        "255.255.255.255",
        "192.42.53.65",
        "53.213.55.72",
        "182.54.98.34"
    ]

    const ip = ips[Math.floor(Math.random() * ips.length)]

    if (!target) { return msg.reply(`Hey! You didn't ping anyone!`) } else {
        msg.reply(`Getting most common word.`).then(m => {
            setTimeout(() => {
                m.edit(`Getting most common word..`).then(me => {
                    setTimeout(() => {
                        me.edit(`Getting most common word...`).then(mes => {
                            setTimeout(() => {
                                mes.edit(`Most common word: ${commonWord}`).then(mess => {
                                    setTimeout(() => {
                                        mess.edit(`Getting email address`).then(messa => {
                                            setTimeout(() => {
                                                messa.edit(`Email: ${target.username}${email}`).then(messag => {
                                                    setTimeout(() => {
                                                        messag.edit(`Totally real and dangerous hack complete!`)
                                                        msg.author.send(`Hack Information\n\nMost Common Word: ${commonWord}\nEmail: ${target.username}${email}\nIp address: ${ip}`)
                                                    }, 3000);
                                                })
                                            }, 4000);
                                        })
                                    }, 2000);
                                })
                            }, 3000);
                        })
                    }, 500);
                })
            }, 500);
        })
    }

}

module.exports.help = {
    name: "hack",
    aliases: []
}