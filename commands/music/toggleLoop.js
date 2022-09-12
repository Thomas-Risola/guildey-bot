module.exports = {
    name: 'toggleLoop',
    aliases: null,
    category: 'music',
    utilisation: 'toggleLoop ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
    }
};
