const client = require("discord.js");
module.exports = {
  name: "tweet_create_events",
  async execute(event, discord) {
    try {
      // Debug print of the event JSON
      // console.log(event.tweet_create_events);

      // Creating the Link
      const link =
        "https://twitter.com/" +
        event.tweet_create_events[0].user.screen_name +
        "/status/" +
        event.tweet_create_events[0].id_str;

      //Manually calling the channel the message is supposed to go too
      const channel = discord.channels
        .fetch("894618672721694720")
        //sending the link to said tweet to the channel!
        .then((channel) => channel.send("Tweet has been posted! " + link))
        .catch(console.error);

      // Just a log to say it was created!
      console.log("tweet created: " + link);
    } catch (err) {
      console.log(err);
    }
  },
};
