module.exports = {
    name: 'shuffle',
    aliases: null,
    category: 'music',
    utilisation: 'shuffle ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.shuffle();
    }
};
