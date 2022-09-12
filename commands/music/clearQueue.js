module.exports = {
    name: 'clearQueue',
    aliases: null,
    category: 'music',
    utilisation: 'clearQueue ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);          
        guildQueue.clearQueue();
    }
};
