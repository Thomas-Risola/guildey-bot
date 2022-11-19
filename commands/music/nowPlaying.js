module.exports = {
    name: 'nowPlaying',
    aliases: null,
    category: 'music',
    utilisation: 'nowPlaying ?',

    async execute(client, message, args) {
        try{
        let guildQueue = client.player.getQueue(message.guild.id);
        message.channel.send(`Now playing: ${guildQueue.nowPlaying}`);
        }
        catch(error){
            message.channel.send(`Je joue pas pour l'instant, j'ai la flemme.`);
        }
    }
};
