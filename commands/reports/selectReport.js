module.exports = {
    name: 'selectReport',
    aliases: null,
    category: 'reports',

    async execute(client, interaction, args) {
        if( interaction.message.components.length === 2 ){
            await interaction.update({ content: 'report selected, select your player!', components: [interaction.message.components[1]] }); 
        } 
        else{
            await interaction.update({ content: 'Fin du report!', components: [] }); 
        }
    }
};