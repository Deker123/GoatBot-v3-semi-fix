module.exports = {
config: {
name: "owner",
version: "1.0",
author: "Jerobie",
shortDescription: "View bot owner info",
longDescription: "Shows contact info and dashboard details of the bot owner",
category: "System",
guide: "{prefix}owner"
},

onStart: async function({ api, event }) {
try {
const ownerInfo =    ╭─────────────⭓   │ 👑 Bot Owner Info   ├─────────────⭔   │ Name: Jerobie   │ Facebook: https://www.facebook.com/jirokeene.bundang   │ Mobile: 09771256938   │ Email: kadacraft627@gmail.com   │ Dashboard: {insert link if needed}   │ IP: 123.456.789.0   │ Location: General Santos City, Mindanao   ├─────────────⭔   │ ⚠️ Do not prank or spam the bot   │ Make sure to respect the bot owner's rules   ├─────────────⭔   │ Make By Jerobie lauglaug   ╰─────────────⭓;

return api.sendMessage(ownerInfo, event.threadID);  
} catch (err) {  
  console.error("Owner command error:", err);  
  return api.sendMessage("Something went wrong fetching owner info.", event.threadID);  
}

}
};