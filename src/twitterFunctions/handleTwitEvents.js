module.exports = (twitter) => {
  twitter.handleTwitEvent = async (twitterEvent, path) => {
    console.log("twitterEvent: " + twitterEvent);
    for (const file of twitterEvent) {
      const event = require(`../twitterEvents/${file}`);

      if (event.once) {
        twitter.once(event.name, (...args) => event.execute(...args, twitter));
      } else {
        console.log("on event triggered: " + event);
        twitter.on(event.name, (...args) => event.execute(...args, twitter));
      }
    }
  };
};
