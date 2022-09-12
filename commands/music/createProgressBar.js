module.exports = {
    name: 'createProgressBar',
    aliases: null,
    category: 'music',
    utilisation: 'createProgressBar ?',

    async execute(client, message, args) {
        let guildQueue = client.player.getQueue(message.guild.id);

        const ProgressBar = guildQueue.createProgressBar();            
        // [======>              ][00:35/2:20]
        console.log(ProgressBar.prettier);
    
    }
};
