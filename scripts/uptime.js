const config = require('../config');
const { rhodvick, commands } = require('../rhodvickez/command');
const speed = require("performance-now");

// Function to simulate delay
function delay(ms) {
  console.log(`⏱️ Delay for ${ms}ms`);
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Format the uptime into a human-readable string
function runtime(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secondsLeft = Math.floor(seconds % 60);

  return `${hours}h ${minutes}m ${secondsLeft}s`;
}

// Command handler for "uptime"
rhodvick({
  pattern: "uptime",
  react: "⚔️",
  alias: ["runtime", "commands"],
  desc: "Get bot command list.",
  category: "system",
  filename: __filename
}, async (zk, mek, m, { from, pushname }) => {
  try {
    // Get bot's uptime
    const botUptime = process.uptime(); // Get the bot uptime in seconds
    const formattedUptime = runtime(botUptime); // Format the uptime

    // Send uptime information to the user
    await zk.sendMessage(from, {
      text: "RHODVICK XMD",
      contextInfo: {
        externalAdReply: {
          title: "RHODVICK XMD UPTIME",
          body: `Bot Uptime: ${formattedUptime}`, // Add formatted uptime
          thumbnailUrl: config.ALIVE_IMG, // Bot profile image URL
          sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N", // Your channel URL
          mediaType: 1,
          showAdAttribution: true, // Show attribution if verified
        },
      },
    });

    console.log("Runtime results sent successfully with formatted results!");

    // Optional delay to simulate loading animation or other processes
    await delay(2000);  // Example delay of 2 seconds

  } catch (error) {
    console.error("Error sending uptime message:", error);
  }
});

// React function to allow interaction after sending message
function react(from, zk, mek, reaction) {
  zk.sendMessage(from, { react: { text: reaction, key: mek.key } });
}
