module.exports = {
    name: 'selectReportedPlayer',
    aliases: null,
    category: 'reports',

    async execute(client, interaction, args) {
        if( interaction.message.components.length === 2 ){
            await interaction.update({ content: 'Player selected, select your report!', components: [interaction.message.components[0]] }); 
        } 
        else{
            await interaction.update({ content: 'Fin du report!', components: [] }); 
        }
    }
};
