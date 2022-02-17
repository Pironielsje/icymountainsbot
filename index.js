const {Client, Intents} = require('discord.js')
const config = require('./config.json')
const mongoose = require('mongoose')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
})

mongoose.connect(process.env.MONGOSRV, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to the db")
}).catch((error) => {
    console.log(error)
}) 

client.once('ready', () => {
    console.log(`${client.user.username} is ready!`)
    client.user.setActivity(`;help`, {type: "PLAYING"})
})

client.login(process.env.TOKEN)