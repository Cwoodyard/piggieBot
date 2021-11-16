const { Autohook } = require("twitter-autohook");
const fs = require("fs");

async function start() {
  try {
    // WebSocket Setup
    const twitter = new Autohook({
      token: process.env.TWITTER_ACCESS_TOKEN,
      token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
      consumer_key: process.env.TWITTER_CONSUMER_KEY,
      consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
      env: process.env.TWITTER_WEBHOOK_ENV,
    });
    await twitter.removeWebhooks();
    await twitter.start();
    await twitter.subscribe({
      oauth_token: process.env.TWITTER_ACCESS_TOKEN,
      oauth_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
    });
    // Register Events
    const eventFiles = fs
      .readdirSync(`./src/twitter-integration/twitterEvents/`)
      .filter((file) => file.endsWith(".js"));

    for (const file of eventFiles) {
      const events = require(`./twitterEvents/${file}`);
      //Loading events
      console.log(events);
      twitter.on("event", async (event) => {
        // Identifying Events and forwarding to event files
        if (event.favorite_events) {
          if (events.name == "favorite_events") {
            events.execute(event);
          }
        } else if (event.tweet_create_events) {
          if (events.name == "tweet_create_events") {
            events.execute(event);
          }
        }
      });
    }
  } catch (error) {
    // Display the error and quit
    console.error(error);
    process.exit(1);
  }
}
module.exports = {
  start,
};
