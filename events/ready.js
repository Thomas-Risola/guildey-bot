const { ActivityType } = require('discord.js');

module.exports = (client) => {
    console.log("Bot has started");
  
    client.user.setPresence({
        activities: [{ name: `Le serveur`, type: ActivityType.Watching }],
        status: 'dnd',
    });
};
