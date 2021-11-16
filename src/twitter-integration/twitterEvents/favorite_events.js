module.exports = {
  name: "favorite_events",
  async execute(event) {
    console.log("tweet favorited: " + event.toString());
  },
};
