const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log("Bot has started");
  
    client.user.setPresence({
        activities: [{ name: `Le serveur`, type: ActivityType.Watching }],
        status: 'dnd',
    });

    const cmd = client.commands.get("loltrack") || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, interaction, args);
};
