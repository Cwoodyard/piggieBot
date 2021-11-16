/*  Author: v1p3r_hax
 *  Authors Notes: The base.js and some of this code has been taken 
    from https://github.com/AlexzanderFlores/Worn-Off-Keys-Discord-Js 
    and should be aknowledged as so <3 to the original dev and their youtube tutorial
 *  Description: A pourpose built NFT notification and interaction bot
 *  Version: 2.0.0
 */

//Modules
const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const { filter } = require("core-js/features/array");
const { commands } = require("./events/ready");
const twitWatchdog = require("./twitter-integration/twitterStart");
require("dotenv").config();

//Discord
const statBot = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
  ],
});
statBot.commands = new Collection();

//File Registration - Discord
const functions = fs
  .readdirSync("./src/functions")
  .filter((file) => file.endsWith(".js"));
const eventFiles = fs
  .readdirSync("./src/events")
  .filter((file) => file.endsWith(".js"));
const commandFolders = fs.readdirSync("./src/commands");

//File Registration - Twitter
// const twitterFunctions = fs
//   .readdirSync("./src/twitterFunctions")
//   .filter((file) => file.endsWith(".js"));
// const twitterEvents = fs
//   .readdirSync("./src/twitterEvents")
//   .filter((file) => file.endsWith(".js"));

//Startup
(async () => {
  //Discord Side
  for (file of functions) {
    require(`./functions/${file}`)(statBot);
  }
  statBot.handleEvents(eventFiles, "./src/events");
  statBot.handleCommands(commandFolders, "./src/commands");
  statBot.login(process.env.token);
  twitWatchdog.start();
})();

// function setDefaultStatus() {
//     statBot.user.setStatus("online");
// };
