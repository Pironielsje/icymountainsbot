const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {
    const categoryId = "947895136812158956";

    // Get username
    var userName = message.author.username;
    // Verkrijg discriminator
    var userDiscriminator = message.author.discriminator;

    // If ticket has been made
    var bool = false;

    // Checking if ticket has been made.
    message.guild.channels.forEach((channel) => {

        // If ticket has been made sent:
        if (channel.name == userName.toLowerCase() + "-" + userDiscriminator) {

            message.channel.send("You already made a ticket");

            bool = true;

        }

    });

    // Ticket return code
    if (bool == true) return;

    var embedCreateTicket = new discord.RichEmbed()
        .setTitle("Hey, " + message.author.username)
        .setFooter("Support channel will be made");

    message.channel.send(embedCreateTicket);

    // Create channel and put it in the right catogary
    message.guild.createChannel(userName + "-" + userDiscriminator, "text").then((createdChan) => { // Maak kanaal

        createdChan.setParent(categoryId).then((settedParent) => { // Zet kanaal in category.

            // Put permissions for everyone
            settedParent.overwritePermissions(message.guild.roles.find('name', "@everyone"), { "READ_MESSAGES": false });
            settedParent.overwritePermissions(message.guild.roles.find('name', "@staff"), { "VIEW_CHANNEL": true });
            // Put permission by the user that created the ticket
            settedParent.overwritePermissions(message.author, {

                "READ_MESSAGES": true,
                "SEND_MESSAGES": true,
                "ATTACH_FILES": true,
                "CONNECT": true,
                "CREATE_INSTANT_INVITE": false,
                "ADD_REACTIONS": true

            });

            var embedParent = new discord.RichEmbed()
                .setTitle("Hey, " + message.author.username.toString())
                .setDescription("Ask your questions to the staff team here!");

            settedParent.send(embedParent);
        }).catch(err => {
            message.channel.send("Something went wrong.");
        });

    }).catch(err => {
        message.channel.send("Something went wrong.");
    });
}

module.exports.help = {
    name: "ticket",
    aliases: []
}