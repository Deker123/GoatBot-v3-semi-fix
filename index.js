const express = require("express");
const path = require("path");
const fs = require("fs");
const { spawn } = require("child_process");
const log = require("./logger/log.js");

const app = express();
const PORT = process.env.PORT || 3000;

/* ================= WEB SERVER ================= */

// serve /public (dito yung HTML mo)
app.use(express.static(path.join(__dirname, "public")));

// main page → index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// api status (ginagamit ng dashboard JS)
app.get("/api/status", (req, res) => {
  const uptime = process.uptime();
  const hours = Math.floor(uptime / 3600);
  const minutes = Math.floor((uptime % 3600) / 60);
  const seconds = Math.floor(uptime % 60);

  let commands = 62;
  let events = 6;

  try {
    const statsPath = path.join(__dirname, "bot-stats.json");
    if (fs.existsSync(statsPath)) {
      const stats = JSON.parse(fs.readFileSync(statsPath, "utf8"));
      commands = stats.commands || commands;
      events = stats.events || events;
    }
  } catch (e) {
    console.warn("⚠️ Failed to read bot-stats.json");
  }

  res.json({
    status: "online",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    version: "1.5.35",
    commands,
    events,
    author: "April Manalo"
  });
});

// START WEB SERVER (IMPORTANT SA RENDER)
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🌐 Web server running on port ${PORT}`);
  console.log(`⚡ Hacker Terminal Dashboard Active!`);
});

/* ================= BOT PROCESS ================= */

function startBot() {
  const bot = spawn("node", ["Goat.js"], {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });

  bot.on("close", (code) => {
    console.log("🤖 Bot exited with code:", code);
    if (code === 2) {
      log.info("Restarting bot...");
      startBot();
    }
  });
}

startBot();
