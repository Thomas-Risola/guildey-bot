module.exports = {
    name: 'remove',
    aliases: null,
    category: 'music',
    utilisation: 'remove [int] ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.remove(parseInt(args[0]));
    }
};
