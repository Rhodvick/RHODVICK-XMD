const config = require('../config');
const { rhodvick, commands } = require('../rhodvickez/command');
const { runtime } = require('../rhodvickez/functions');
const { platform, totalmem, freemem } = require('os');

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return text.split('').map(char => fonts[char] || char).join('');
};

// Command handler
rhodvick({
    pattern: "menu",
    react: "⚔️",
    alias: ["panel", "commands"],
    desc: "Get bot command list.",
    category: "universal",
    use: '.menu',
    filename: __filename
}, async (zk, mek, m, { from, pushname }) => {
    try {
        // Initialize menu text
        let menuText = `╭━━━ ⟮ ${toFancyUppercaseFont(config.BOT_NAME)} ⟯━━━━━━┈⊷\n`;
        menuText += `┃✦╭──────────────\n`;
        menuText += `┃✦│ ᴜsᴇʀ ${pushname}\n`;
        menuText += `┃✦│ ᴍᴏᴅᴇ ${config.MODE}\n`;
        menuText += `┃✦│ ᴘʟᴜɢɪɴs ${commands.length}\n`;
        menuText += `┃✦│ Youtube ; https://www.youtube.com/@Rhodvick
        menuText += `┃✦│ ᴜᴘᴛɪᴍᴇ ${runtime(process.uptime())}\n`;
        menuText += `┃✦│ ᴘʟᴀᴛғᴏʀᴍ ${platform()}\n`;
        menuText += `┃✦│ ᴍᴇᴍᴏʀʏ ${totalmem() - freemem()} bytes\n`;
        menuText += `┃✦╰──────────────\n`;
        menuText += `╰━━━━━━━━━━━━━━━━━━┈⊷\n`;

        // Categorize the commands
        const categorized = commands
            .filter(rhodvick => rhodvick.pattern && !rhodvick.dontAddCommandList)
            .map(rhodvick => ({
                name: rhodvick.pattern ? rhodvick.pattern.toString().replace(/^\/|\/$/g, '') : 'undefined',
                category: rhodvick.category ? rhodvick.category.toUpperCase() : 'MISC',
            }))
            .reduce((acc, { name, category }) => {
                acc[category] = acc[category] || [];
                acc[category].push(name);
                return acc;
            }, {});

        let commandCounter = 1;

        // Add commands and categories to menuText
        Object.keys(categorized).forEach((category) => {
            menuText += `\n╭─────「 ${toFancyUppercaseFont(category)} 」──┈⊷\n`;
            categorized[category].forEach((rhodvick) => {
                menuText += `│ ${commandCounter++}. ◦➛ ${toFancyLowercaseFont(rhodvick)}\n`;
            });
            menuText += `╰──────────────┈⊷\n`;
        });

        // Prepare context info for the message
        const contextInfo = {
            mentionedJid: [m.sender], // Mention the sender
            externalAdReply: {
                title: "RHODVICK XMD",
                body: "RHODVICK TECH",
                thumbnailUrl: config.ALIVE_IMG,
                sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        };

        // Send the message with the image URL and menu text
        await zk.sendMessage(from, {
            image: { url: config.ALIVE_IMG },
            caption: `\`\`\`${menuText}\`\`\``,
            contextInfo: contextInfo
        });
    } catch (error) {
        // Error handling
        console.error('Error occurred while processing menu command:', error);
        await zk.sendMessage(from, { text: `An error occurred while processing the menu command. Please try again later.` });
    }
});
