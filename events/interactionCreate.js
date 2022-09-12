module.exports = (client, interaction) => {
    command = interaction.customId;

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, interaction, args);
};


/*
if (!interaction.isSelectMenu()) return;

    else {
        if(interaction.customId === "select game"){
            if( interaction.message.components.length === 2 ){
                await interaction.update({ content: 'Game selected, select your player!', components: [interaction.message.components[1]] }); 
            } 
            else{
                await interaction.update({ content: 'Fin du processus!', components: [] }); 
            }
        }
        if(interaction.customId === "select player"){
            if( interaction.message.components.length === 2 ){
                await interaction.update({ content: 'Player selected, select your game!', components: [interaction.message.components[0]] }); 
            } 
            else{
                await interaction.update({ content: 'Fin du processus!', components: [] }); 
            }
        }

        if(interaction.customId === "select report"){
            if( interaction.message.components.length === 2 ){
                await interaction.update({ content: 'report selected, select your player!', components: [interaction.message.components[1]] }); 
            } 
            else{
                await interaction.update({ content: 'Fin du report!', components: [] }); 
            }
        }
        if(interaction.customId === "select reported player"){
            if( interaction.message.components.length === 2 ){
                await interaction.update({ content: 'Player selected, select your report!', components: [interaction.message.components[0]] }); 
            } 
            else{
                await interaction.update({ content: 'Fin du report!', components: [] }); 
            }
        }



        if(interaction.customId === "select"){
            await interaction.update({ content: 'Something was selected!', components: [] }); 
        }
    }
});
*/