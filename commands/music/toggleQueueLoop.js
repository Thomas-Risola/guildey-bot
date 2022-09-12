module.exports = {
    name: 'toggleQueueLoop',
    aliases: null,
    category: 'music',
    utilisation: 'toggleQueueLoop ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
    }
};
