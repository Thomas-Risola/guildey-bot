module.exports = {
    name: 'resume',
    aliases: null,
    category: 'music',
    utilisation: 'resume ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        guildQueue.setPaused(false);
    }
};
