const discord = require("discord.js");
module.exports = {
  name: "tweet_create_events",
  async execute(event) {
    console.log("tweet created: " + event);
    discord.Client.ChannelManager.get("894618672721694720").send("Hello here!");
  },
};
