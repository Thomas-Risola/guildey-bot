module.exports = {
    name: 'removeLoop',
    aliases: null,
    category: 'music',
    utilisation: 'removeLoop ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
    }
};
