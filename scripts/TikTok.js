const { rhodvick } = require('../rhodvickez/command');
const { downloadTiktok } = require('@mrnima/tiktok-downloader');

rhodvick({
  pattern: "tiktok",
  alias: ["tikdl", "tiktokdl", "tt"],
  react: "✅",
  desc: "Download TikTok videos.",
  category: "download",
  filename: __filename
}, async (zk, mek, m, { quoted, reply, text, from }) => {
  
  // Validate input
  if (!text) {
    return reply('Please insert a public TikTok video link!');
  }

  if (!text.includes('tiktok.com')) {
    return reply('That is not a valid TikTok link.');
  }

  try {
    // Fetch TikTok video data
    let tiktokData = await downloadTiktok(text);
    
    const caption = `
     *RHODVICK XMD TIKTOK DL*
    |__________________________|
    |-᳆        *ᴛɪᴛʟᴇ*  
     ${tiktokData.result.title}
    |_________________________
    ʀᴇᴘʟʏ ᴡɪᴛʜ ʙᴇʟᴏᴡ ɴᴜᴍʙᴇʀs 

      |   *1*  | sᴅ ǫᴜᴀʟɪᴛʏ

      |  *2*  |  ʜᴅ ǫᴜᴀʟɪᴛʏ

      |  *3*  |  ᴀᴜᴅɪᴏ

    |__________________________|
    `;
    
    // Send TikTok image and options
    const message = await zk.sendMessage(from, {
      image: { url: tiktokData.result.image },
      caption: caption,
    });

    const messageId = message.key.id;

    // Event listener for reply messages
    zk.ev.on("messages.upsert", async (update) => {
      const messageContent = update.messages[0];
      if (!messageContent.message) return;

      const responseText = messageContent.message.conversation || messageContent.message.extendedTextMessage?.text;
      const rhodvickdl = messageContent.key.remoteJid;

      // Check if the response is a reply to the previous message
      const isReplyToMessage = messageContent.message.extendedTextMessage?.contextInfo.stanzaId === messageId;
      
      if (isReplyToMessage) {
        // React with down arrow
        await zk.sendMessage(rhodvickdl, {
          react: { text: '⬇️', key: messageContent.key },
        });

        // React with up arrow
        await zk.sendMessage(rhodvickdl, {
          react: { text: '⬆️', key: messageContent.key },
        });

        const tiktokLinks = tiktokData.result;

        // Send the requested media based on the user's response
        if (responseText === '1') {
          await zk.sendMessage(rhodvickdl, {
            video: { url: tiktokLinks.dl_link.download_mp4_1 },
            caption: "*RHODVICK XMD*",
          }, { quoted: messageContent });
        } else if (responseText === '2') {
          await zk.sendMessage(rhodvickdl, {
            video: { url: tiktokLinks.dl_link.download_mp4_2 },
            caption: "*RHODVICK XMD*",
          }, { quoted: messageContent });
        } else if (responseText === '3') {
          await zk.sendMessage(rhodvickdl, {
            audio: { url: tiktokLinks.dl_link.download_mp3 },
            mimetype: "audio/mpeg",
          }, { quoted: messageContent });
        }
      }
    });
  } catch (error) {
    console.error(error);
    reply('An error occurred: ' + error.message);
  }
});
