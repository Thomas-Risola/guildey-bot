module.exports = {
    name: 'stop',
    aliases: null,
    category: 'music',
    utilisation: 'stop ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.stop();
    }
};
