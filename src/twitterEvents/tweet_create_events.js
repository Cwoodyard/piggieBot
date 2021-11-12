module.exports = {
  name: "tweet_create_events",
  async execute(event) {
    console.log("tweet created: " + event);
  },
};
