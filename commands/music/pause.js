module.exports = {
    name: 'pause',
    aliases: null,
    category: 'music',
    utilisation: 'pause ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);            
        guildQueue.setPaused(true);
    }
};
