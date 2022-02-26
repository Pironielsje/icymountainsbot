const { Client, Intents, Collection } = require("discord.js");
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

client.on("messageCreate", async (msg) => {
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

client.login(process.env.TOKEN);
