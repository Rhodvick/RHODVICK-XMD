const { rhodvick } = require('../rhodvickez/command')
const { sleep } = require('../rhodvickez/functions')
const { exec } = require("child_process")

rhodvick({
    pattern: "restart",
    alias: ["rebot", "reboot"],
    react: "🔌",
    desc: "restart the bot",
    category: "system",
    filename: __filename
},
async (conn, mek, m, { from, isOwner, reply }) => {
    try {
        if (!isOwner) return;
        reply("*restarting...*")
        await sleep(1500)
        exec("pm2 restart all")
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
})
