module.exports = {
    name: 'skip',
    aliases: null,
    category: 'music',
    utilisation: 'skip ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.skip();
    }
};
