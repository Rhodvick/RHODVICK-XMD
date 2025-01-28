const { rhodvick, commands } = require('../rhodvickez/command');
const { runtime } = require('../rhodvickez/functions');
const { platform, totalmem, freemem } = require('os');
const axios = require('axios');

// Function to convert text to fancy uppercase font
const toFancyUppercaseFont = (text) => {
    const fonts = {
        'A': '𝐀', 'B': '𝐁', 'C': '𝐂', 'D': '𝐃', 'E': '𝐄', 'F': '𝐅', 'G': '𝐆', 'H': '𝐇', 'I': '𝐈', 'J': '𝐉', 'K': '𝐊', 'L': '𝐋', 'M': '𝐌',
        'N': '𝐍', 'O': '𝐎', 'P': '𝐏', 'Q': '𝐐', 'R': '𝐑', 'S': '𝐒', 'T': '𝐓', 'U': '𝐔', 'V': '𝐕', 'W': '𝐖', 'X': '𝐗', 'Y': '𝐘', 'Z': '𝐙'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
};

// Function to convert text to fancy lowercase font
const toFancyLowercaseFont = (text) => {
    const fonts = {
        'a': '𝚊', 'b': '𝚋', 'c': '𝚌', 'd': '𝚍', 'e': '𝚎', 'f': '𝚏', 'g': '𝚐', 'h': '𝚑', 'i': '𝚒', 'j': '𝚓', 'k': '𝚔', 'l': '𝚕', 'm': '𝚖', 
        'n': '𝚗', 'o': '𝚘', 'p': '𝚙', 'q': '𝚚', 'r': '𝚛', 's': '𝚜', 't': '𝚝', 'u': '𝚞', 'v': '𝚟', 'w': '𝚠', 'x': '𝚡', 'y': '𝚢', 'z': '𝚣'
    };
    return typeof text === 'string' ? text.split('').map(char => fonts[char] || char).join('') : text;
};

// Command to list all bot commands along with descriptions and aliases
rhodvick({
    pattern: "help",
    react: "⚔️",
    alias: ["panelist", "commandlist", "cmdlist", "list"],
    desc: "Get bot command list.",
    category: "universal",
    use: '.menu',
    filename: __filename
}, async (zk, mek, m, { from, pushname }) => {
    let menu = 'RHODVICK XMD ʟɪsᴛ\n\n';
    let rhodvickList = [];

    // Loop through all commands to fetch the relevant information (command, description, and alias)
    commands.forEach((command) => {
        const { pattern, desc = 'No description available', alias = 'No aliases', dontAddCommandList } = command;

        if (!dontAddCommandList && pattern !== undefined) {
            rhodvickList.push({ rhodvick: pattern, desc, alias });
        }
    });

    // Sort the command list alphabetically by command name
    rhodvickList.sort((a, b) => a.rhodvick.localeCompare(b.rhodvick));

    // Format and add each command, description, and alias to the menu
    rhodvickList.forEach(({ rhodvick, desc, alias }, index) => {
        menu += `${index + 1}. ${toFancyUppercaseFont(rhodvick.trim())}\n`;
        menu += `Description: ${toFancyLowercaseFont(desc)}\n`;
        menu += `Aliases: ${toFancyLowercaseFont(alias)}\n\n`;
    });

    // Send the formatted menu as a message
    return await zk.sendMessage(m.chat, {
        text: menu,
        contextInfo: {
            mentionedJid: [pushname], // Mention the sender
            externalAdReply: {
                title: "RHODVICK XMD",
                body: "Rhodvick Tech",
                thumbnailUrl: "https://i.ibb.co/wJBxKV4/74421a3c5d94ac0a.jpg",
                sourceUrl: "https://whatsapp.com/channel/0029VabySTR9Bb5upWFhMv1N",
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    });
});
