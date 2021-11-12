/*  Author: v1p3r_hax
 *  Authors Notes: The base.js and some of this code has been taken 
    from https://github.com/AlexzanderFlores/Worn-Off-Keys-Discord-Js 
    and should be aknowledged as so <3 to the original dev and their youtube tutorial
 *  Description: A pourpose built NFT notification and interaction bot
 *  Version: 2.0.0
 */

//Modules
const { Client, Intents, Collection } = require("discord.js");
const { Autohook } = require("twitter-autohook");
const fs = require("fs");
const { filter } = require("core-js/features/array");
const { commands } = require("./events/ready");
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
const twitterFunctions = fs
  .readdirSync("./src/twitterFunctions")
  .filter((file) => file.endsWith(".js"));
const twitterEvents = fs
  .readdirSync("./src/twitterEvents")
  .filter((file) => file.endsWith(".js"));

//Twitter
const twitter = new Autohook({
  token: process.env.TWITTER_ACCESS_TOKEN,
  token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  env: process.env.TWITTER_WEBHOOK_ENV,
});

//Startup
(async () => {
  //Discord Side
  for (file of functions) {
    require(`./functions/${file}`)(statBot);
  }
  statBot.handleEvents(eventFiles, "./src/events");
  statBot.handleCommands(commandFolders, "./src/commands");
  statBot.login(process.env.token);

  //Twitter Side
  for (file of twitterFunctions) {
    require(`./twitterFunctions/${file}`)(twitter);
  }
  twitter.handleTwitEvent(twitterEvents, "./src/twitterEvents");
  await twitter.removeWebhooks();
  twitter.on("event", async (event) => {
    console.log(event);
  });
  await twitter.start();
  await twitter.subscribe({
    oauth_token: process.env.TWITTER_ACCESS_TOKEN,
    oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  });

  //   (async () => {
  //     twitter.on("event", async (event) => {
  //       twitter.twitterEvent(event, "./src/twitter/event");
  //     });
  //   })();
})();

// function setDefaultStatus() {
//     statBot.user.setStatus("online");
// };
