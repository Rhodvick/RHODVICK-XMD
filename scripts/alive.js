const { keith } = require('../keizzah/command');

keith({
    pattern: "alive",
    react: "🌐",
    desc: "Check bot online or no.",
    category: "universal",
    filename: __filename
},
async (zk, mek, m) => {
  try {
    const audioFiles = [
      'https://files.catbox.moe/hpwsi2.mp3',
      'https://files.catbox.moe/xci982.mp3',
      'https://files.catbox.moe/utbujd.mp3',
      'https://files.catbox.moe/w2j17k.m4a',
      'https://files.catbox.moe/851skv.m4a',
      'https://files.catbox.moe/qnhtbu.m4a',
      'https://files.catbox.moe/lb0x7w.mp3',
      'https://files.catbox.moe/efmcxm.mp3',
      'https://files.catbox.moe/gco5bq.mp3',
      'https://files.catbox.moe/26oeeh.mp3',
      'https://files.catbox.moe/a1sh4u.mp3',
      'https://files.catbox.moe/vuuvwn.m4a',
      'https://files.catbox.moe/wx8q6h.mp3',
      'https://files.catbox.moe/uj8fps.m4a',
      'https://files.catbox.moe/dc88bx.m4a',
      'https://files.catbox.moe/tn32z0.m4a'
    ];

    const vn = audioFiles[Math.floor(Math.random() * audioFiles.length)];
    const name = m.pushName || zk.getName(m.sender);
    const murl = 'https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N';
    const img = 'https://i.ibb.co/wJBxKV4/74421a3c5d94ac0a.jpg';

    const con = {
      key: {
        fromMe: false,
        participant: `${m.sender.split('@')[0]}@s.whatsapp.net`,
        ...(m.chat ? { remoteJid: '254115408870@s.whatsapp.net' } : {}),
      },
      message: {
        contactMessage: {
          displayName: name,
          vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`,
        },
      },
    };

    const doc = {
      audio: { url: vn },
      mimetype: 'audio/mpeg',
      ptt: true,
      waveform: [100, 0, 100, 0, 100, 0, 100],
      fileName: 'shizo',
      contextInfo: {
        mentionedJid: [m.sender],
        externalAdReply: {
          title: 'RHODVICK-XMD IS ALIVE KID😁',
          body: 'Rhodvick Tech',
          thumbnailUrl: img,
          sourceUrl: murl,
          mediaType: 1,
          renderLargerThumbnail: true,
        },
      },
    };

    await zk.sendMessage(m.chat, doc, { quoted: con });
  } catch (err) {
    console.error(err);
  }
});
