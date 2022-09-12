module.exports = {
    name: 'seek',
    aliases: null,
    category: 'music',
    utilisation: 'seek [int] ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.seek(parseInt(args[0]) * 1000);
    }
};
