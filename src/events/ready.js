module.exports = {
  name: "ready",
  once: true,
  commands: ["commands"],
  expectedArgs: "",
  permissionError: "",
  minArgs: 0,
  maxArgs: 0,
  async execute() {
    console.log("OINK BITCH!");
  },
};
