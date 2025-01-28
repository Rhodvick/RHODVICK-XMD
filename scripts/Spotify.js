const { rhodvick } = require('../rhodvickez/command');
const axios = require("axios");

rhodvick({
  pattern: "spotify",
  alias: ["sdl", "spotifydl", "splay"],
  react: "✅",
  desc: "Download Spotify audios.",
  category: "download",
  filename: __filename
}, async (zk, mek, m, { quoted, reply, text, from }) => {

  // Ensure the query is provided
  if (!text) {
    return reply('Please provide a query!');
  }

  try {
    // Spotify track search API URL
    const searchApiUrl = `https://spotifyapi.caliphdev.com/api/search/tracks?q=${encodeURIComponent(text)}`;
    const searchData = (await axios.get(searchApiUrl)).data;

    // Check if track data is available
    const trackData = searchData[0];
    if (!trackData) {
      return reply("No Spotify track found for your query.");
    }

    // Prepare track information to send
    const trackInfo = `
RHODVICK XMD SPOTIFY DL
|__________________________|
|  *Title*   : ${trackData.title}
|  *Artist*  : ${trackData.artist}
|  *URL*     : *${trackData.url}*
|__________________________|`;

    // Send track information to the user
    await zk.sendMessage(
      from,
      {
        text: trackInfo,
        contextInfo: {
          mentionedJid: [m.sender],  // Mention the sender in the message
          externalAdReply: {
            showAdAttribution: true,
            title: trackData.title,
            body: "RHODVICK XMD",
            thumbnailUrl: trackData.thumbnail,
            mediaType: 1,
            sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
            renderLargerThumbnail: false,
          },
        },
      },
      { quoted: mek }  // Send the quoted message
    );

    // Spotify download API URL
    const downloadApiUrl = `https://spotifyapi.caliphdev.com/api/download/track?url=${encodeURIComponent(trackData.url)}`;
    const response = await axios({
      url: downloadApiUrl,
      method: "GET",
      responseType: "stream",
    });

    // Check if the response is an audio stream and send it
    if (response.headers["content-type"] === "audio/mpeg") {
      await zk.sendMessage(
        from,
        { audio: { stream: response.data }, mimetype: "audio/mpeg" },
        { quoted: mek }
      );
    } else {
      reply("Failed to fetch Spotify audio. Please try again later.");
    }

  } catch (error) {
    console.error(error);  // Log the error for debugging
    reply(`Error: ${error.message}`);
  }
});
