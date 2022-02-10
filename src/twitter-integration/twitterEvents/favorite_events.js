// const client = require("discord.js");
module.exports = {
  name: "favorite_events",
  async execute(event, discord) {
    try {
      // Debug print of the event JSON
      // console.log(event.favorite_events);

      // Creating the Link
      const link =
        "https://twitter.com/" +
        event.favorite_events[0].favorited_status.user.screen_name +
        "/status/" +
        event.favorite_events[0].favorited_status.id_str;

      //Manually calling the channel the message is supposed to go too
      const channel = discord.channels
        .fetch("894618672721694720")
        //sending the link to said tweet to the channel!
        .then((channel) => channel.send("Tweet has been liked! " + link))
        .catch(console.error);

      // Just a log to say it was created!
      console.log("tweet favorited: " + event);
    } catch (err) {
      console.log(err);
    }
  },
};

// const { Client } = require("discord.js");
// module.exports = {
//   name: "favorite_events",
//   async execute(event) {
//     // let channel = new Client.channel().id("894618672721694720");
//     let destination = Client.channels.get(894618672721694720);
//     console.log("Channel: " + destination);
//     // channel = client.channels.cache.get('757685515255545917');
//     const link =
//       "https://twitter.com/" +
//       event.favorite_events[0].favorited_status.user.screen_name +
//       "/status/" +
//       event.favorite_events[0].favorited_status.id_str;
//     // Client.guilds.channels.cache.get(894618672721694720).send({content: link });
//     // channel.send("https://twitter.com/" + event.favorite_events[0].favorited_status.user.screen_name + "/status/" + event.favorite_events[0].favorited_status.id_str);
//     console.log(
//       "https://twitter.com/" +
//         event.favorite_events[0].favorited_status.user.screen_name +
//         "/status/" +
//         event.favorite_events[0].favorited_status.id_str
//     );
//     // console.log("tweet favorited: " + event.favorite_events[0]);
//   },
// };
