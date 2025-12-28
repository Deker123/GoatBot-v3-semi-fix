const spamData = new Map();

module.exports = {
  config: {
    name: "antispam",
    version: "1.0",
    author: "Jerobie",
    description: "Auto detect spam, kick after 5 spam",
    category: "event"
  },

  onStart: async function () {},

  onChat: async function ({ api, event, threadsData }) {
    try {
      const { senderID, threadID, body } = event;
      if (!body) return;
      if (senderID === api.getCurrentUserID()) return;

      // SETTINGS (per GC)
      const isEnabled = await threadsData.get(threadID, "settings.antispam", true);
      if (!isEnabled) return;

      const now = Date.now();
      const data = spamData.get(senderID) || {
        lastMessage: "",
        lastTime: 0,
        count: 0
      };

      // spam condition (same message within 3 seconds)
      if (body === data.lastMessage && now - data.lastTime < 3000) {
        data.count++;
      } else {
        data.count = 1;
      }

      data.lastMessage = body;
      data.lastTime = now;
      spamData.set(senderID, data);

      // WARNING
      if (data.count >= 3 && data.count < 5) {
        api.sendMessage(
          `⚠️ SPAM WARNING (${data.count}/5)\nStop spamming or you will be kicked.`,
          threadID
        );
      }

      // KICK
      if (data.count >= 5) {
        api.sendMessage(
          `🚫 KICKED FOR SPAM\nUser exceeded spam limit (5).`,
          threadID,
          async () => {
            try {
              await api.removeUserFromGroup(senderID, threadID);
            } catch (e) {
              api.sendMessage("❌ Bot needs admin to kick spammer.", threadID);
            }
          }
        );
        spamData.delete(senderID);
      }

    } catch (err) {
      console.error("[ANTISPAM ERROR]", err);
    }
  }
};