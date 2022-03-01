const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const redditfetch = require('reddit-fetch')

module.exports.run = async(client, msg, args) => {

    redditfetch({
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
            .setFooter(`Meme requested by: ${msg.author.username}`, msg.author.displayAvatarURL())

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('nmeme')
                .setLabel("Next")
                .setEmoji("⏩")
                .setStyle("SUCCESS")
            )

        msg.reply({ embeds: [embed], components: [row] })
    })

}

module.exports.help = {
    name: "meme",
    aliases: ["dankmeme"]
}