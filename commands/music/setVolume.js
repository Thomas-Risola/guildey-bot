module.exports = {
    name: 'setVolume',
    aliases: null,
    category: 'music',
    utilisation: 'setVolume [int] ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setVolume(parseInt(args[0]));
    }
};
