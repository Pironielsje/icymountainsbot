const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
  const reply = new MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setColor("BLURPLE")
    .setFields(
      { name: "Information commands", value: "All the information commands" },
      { name: "`;help`", value: "`Returns this embed`" }
    )
    .setFooter(
      `Requested by: ${msg.author.username}`,
      msg.author.displayAvatarUrl()
    )
    .setTimestamp();

  msg.reply({ embeds: [reply] });
};

module.exports.help = {
  name: "help",
  aliases: ["h", "helpme"],
};
