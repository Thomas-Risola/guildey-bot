module.exports = {
    name: 'play',
    aliases: null,
    category: 'music',
    utilisation: 'play [music](youtube, spotify) ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);
                   
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.play(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });
    
    }
};
