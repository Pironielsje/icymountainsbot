const { MessageEmbed } = require("discord.js");

module.exports.run = async (client, msg, args) => {
  const reply = new MessageEmbed()
    .setTitle(`Commands for ${client.user.username}`)
    .setColor("BLURPLE")
    .setFields(
      { name: "Information commands", value: "All the information commands\n\n**;help** - `Returns this embed` - usage: ;help\n**;botinfo** - `Gives the bot's info` - usage: ;botinfo" },
      {name: "Fun Commands", value: `All the fun commands\n\n**;8ball** - \`Gives you a random answer\` - usage: ;8ball <question>`},
      {name: "Moderation Commands", value: `All the moderation commands\n\n**;warn** - \`Warns the targeted user / id\` - usage: ;warn <target> [reason]\n**;ban** - \`Bans the targeted user / id\` - usage: ;ban <user> [reason]\n**;unban** - \`Unbans the targeted user / id\` - usage: ;unban <user> [reason]\n**;kick** - \`Kicks the targeted user / id\` - usage: ;kick <user> [reason]`},
      {name: "Role Commands", value: `All the Role commands\n\n**;verify** - \`Verifies you\` - usage: ;verify`}
    )
    .setFooter(
      `Requested by: ${msg.author.username}`,
      msg.author.displayAvatarURL()
    )
    .setTimestamp();

  msg.reply({ embeds: [reply] });
};

module.exports.help = {
  name: "help",
  aliases: ["h", "helpme"],
};
