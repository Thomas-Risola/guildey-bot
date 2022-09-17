module.exports = {
    name: 'skipMusicButton',
    aliases: null,
    category: 'music',

    async execute(client, interaction, args) {
        try{
        let guildQueue = client.player.getQueue(interaction.guild.id);
        guildQueue.skip();
        }
        catch(error){
            console.log("mdr")
        }
    }
};
