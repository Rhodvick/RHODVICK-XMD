const { rhodvick } = require('../rhodvickez/command');
const axios = require("axios");

rhodvick({
  pattern: "twittersearch",
  alias: ["xsearch", "searchx"],
  react: "🌐",
  desc: "Check bot online or not.",
  category: "developer",
  filename: __filename
}, async (zk, mek, m, { quoted, reply, arg, text, q, args, from }) => {
  // Check if there is a query in the arguments
  if (!text) {
    return reply('Please provide a query!');
  }

  try {
    // Define the search API URL
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(text)}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if no results are found
    if (!searchData || searchData.length === 0) {
      return reply("No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `RHODVICK XMD TWITTER SEARCH\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and append details to the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*┃${trackNumber}.* ${track.user}\n`;
      searchMessage += `*┃Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*┃Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*┃User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `───────────────────◆\n\n`;
    });

    // Send the search result message
    await zk.sendMessage(
      from,
      {
        text: searchMessage,
        contextInfo: {
          mentionedJid: [m.sender],
          externalAdReply: {
            showAdAttribution: true,
            title: "RHODVICK XMD TWITTER SEARCH",
            body: "Powered by Rhodvick Tech",
            sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
            mediaType: 1,
            renderLargerThumbnail: false,
          },
        },
      }
    );
  } catch (error) {
    // Log and respond with the error message
    console.error(error);  // Log the error to the console
    reply(`Error: ${error.message || 'Something went wrong.'}`);
  }
});
