module.exports = {
    name: 'getQueue',
    aliases: null,
    category: 'music',
    utilisation: 'getQueue ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
        console.log(guildQueue);
    }
};
