module.exports = {
    name: 'skipMusicButton',
    aliases: null,
    category: 'music',

    async execute(client, interaction, args) {
        console.log("mdr")
        let guildQueue = client.player.getQueue(interaction.guild.id);
        guildQueue.skip();
    }
};
