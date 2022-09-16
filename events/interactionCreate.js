module.exports = (client, interaction) => {
    command = interaction.customId.toLowerCase();
    args = ""

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, interaction, args);
};


/*
old version

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
*/