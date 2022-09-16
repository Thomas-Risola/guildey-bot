const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    name: 'playlist',
    aliases: null,
    category: 'music',
    utilisation: 'playlist [playlist music](youtube, spotify) ?',

    async execute(client, message, args) {
        if (!message.member.voice.channel)
            return message.channel.send(`T'es un troll` + message.author + `, tu crois que je te vois pas?`);

        let guildQueue = client.player.getQueue(message.guild.id);
                   
        let queue = client.player.createQueue(message.guild.id);
        await queue.join(message.member.voice.channel);
        let song = await queue.playlist(args.join(' ')).catch(_ => {
            if(!guildQueue)
                queue.stop();
        });


        const nextButton = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('skipMusicButton')
                    .setLabel('Next')
                    .setStyle(ButtonStyle.Primary),
            );

        await message.reply({ content: 'Next!', components: [nextButton] });

    }
};
