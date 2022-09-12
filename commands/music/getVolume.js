module.exports = {
    name: 'getVolume',
    aliases: null,
    category: 'music',
    utilisation: 'getVolume ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);         
        console.log(guildQueue.volume);
    }
};
