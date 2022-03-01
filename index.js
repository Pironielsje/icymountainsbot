const { Client, Intents, Collection, MessageEmbed } = require("discord.js");
const config = require("./config.json");
const mongoose = require("mongoose");
const fs = require("fs");

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.commands = new Collection();
client.aliases = new Collection();

const cmdFiles = fs
    .readdirSync("./commands")
    .filter((file) => file.endsWith(".js"));

for (const file of cmdFiles) {
    const command = require(`./commands/${file}`);

    console.log(`${file} loaded`);

    client.commands.set(command.help.name, command);

    for (const alias of command.help.aliases) {
        client.aliases.set(alias, command);
    }
}

mongoose
    .connect(process.env.MONGOSRV, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Connected to the db");
    })
    .catch((error) => {
        console.log(error);
    });

client.once("ready", () => {
    console.log(`${client.user.username} is ready!`);
    client.user.setActivity(`;help`, { type: "PLAYING" });
});

client.on("messageCreate", async(msg) => {
    if (msg.author.bot) return;

    const msgArray = msg.content.split(" ");

    const command = msgArray[0];

    const args = msgArray.slice(1);

    if (!msg.content.startsWith(config.prefix)) return;

    const cmdData =
        client.commands.get(command.slice(config.prefix.length)) ||
        client.aliases.get(command.slice(config.prefix.length));

    if (!cmdData) return;

    try {
        cmdData.run(client, msg, args);
    } catch (error) {
        console.log(error);
        msg.reply(`Something went wrong please contact Niels#8069`);
    }
});

client.on('interaction', (interaction) => {
    if (interaction.customId === "close") {
        interaction.channel.setName(`closed-${interaction.user.username.toLowerCase()}${interaction.user.discriminator}-ticket`)
        const reply = new MessageEmbed()
            .setTitle("Closed")
            .setColor("RED")
            .setDescription(`Deleting the ticket in 5 seconds...\nClosed by ${interaction.user.username}`)

        const deletedEmbed = new MessageEmbed()
            .setTitle("Channel deleted")
            .setColor("RED")
            .setDescription(`${interaction.channel.name} has been deleted.`)
        interaction.channel.send({ embeds: [reply] }).then(m => {
            setTimeout(() => {
                interaction.channel.delete()
                interaction.guild.channels.cache.find(c => c.name === "🌲-logs").send({ embeds: [deletedEmbed] })
            }, 5000);
        })
    }
    if (interaction.customId === "nmeme") {
        const meme = require('reddit-fetch')

        meme({
            subreddit: "memes" || "dankmemes",
            sort: "hot",
            allowCrossPost: true,
            allowModPost: false,
            allowNSFW: false,
            allowVideo: true
        }).then(post => {
            const embed = new MessageEmbed()
                .setTitle(`${post.title}`)
                .setDescription(`👍: ${post.ups} 💬: ${post.num_comments}`)
                .setColor("NAVY")
                .setURL(meme.url)
                .setFooter(`Meme requested by: ${interaction.user.username}`, interaction.user.displayAvatarURL())

            interaction.edit({ embeds: [embed] })
            interaction.reply({ content: `I gave u a new meme!`, ephemeral: true })
        })
    }
})

client.login(process.env.TOKEN);