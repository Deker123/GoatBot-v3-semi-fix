
module.exports = {
  config: {
    name: "bago",
    version: "1.3",
    author: "Jerobie",
    shortDescription: "Automatically sends a styled welcome message for new members",
    longDescription: "Sends a welcome message with instructions and emojis to new members automatically",
    category: "Box Chat",
    guide: "{prefix}bago preview"
  },

  onStart: async function({ message, threadsData }) {
    try {
      // Optional: preview command
      const welcomeMsg = `
👋 Welcome to the newly added members! KINDLY READ AND FOLLOW.

📌 Please set your NICKNAME.

FORMAT:
name | chess username

EXAMPLE:
harm | seggsonchat

💬 Feel free interacting with us! Don't be shy and please be active.

♟️ JOIN Club: Chessopath gtg
https://www.chess.com/club/chessopath-gtg/join

👥 JOIN GP:
https://facebook.com/groups/2186968291656839/
`;
      if (message.args[0] && message.args[0].toLowerCase() === "preview") {
        return message.reply(`Current welcome message:\n${welcomeMsg}`);
      }
    } catch (err) {
      console.error("Bago command error:", err);
      return message.reply("Something went wrong fetching the welcome message.");
    }
  },

  onEvent: async function({ api, event }) {
    try {
      if (event.logMessageType !== "log:subscribe") return;

      const addedParticipants = [...event.logMessageData.addedParticipants];
      for (const user of addedParticipants) {
        const { fullName: userName } = user;

        const welcomeMsg = `
👋 Welcome to the newly added members, ${userName}! KINDLY READ AND FOLLOW.

📌 Please set your NICKNAME.

FORMAT:
name | chess username

EXAMPLE:
harm | seggsonchat

💬 Feel free interacting with us! Don't be shy and please be active.

♟️ JOIN Club: Chessopath gtg
https://www.chess.com/club/chessopath-gtg/join

👥 JOIN GP:
https://facebook.com/groups/2186968291656839/
`;

        await api.sendMessage(welcomeMsg, event.threadID);
      }
    } catch (err) {
      console.error("Bago event error:", err);
    }
  }
};