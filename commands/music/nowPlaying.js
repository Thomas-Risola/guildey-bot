module.exports = {
    name: 'nowPlaying',
    aliases: null,
    category: 'music',
    utilisation: 'nowPlaying ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        console.log(`Now playing: ${guildQueue.nowPlaying}`);
    }
};
