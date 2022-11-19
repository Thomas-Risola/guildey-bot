const fs = require('fs');   
const { ActionRowBuilder, SelectMenuBuilder, ComponentType } = require('discord.js');

module.exports = {
    name: 'report',
    aliases: null,
    category: 'reports',
    utilisation: 'report ?',

    async execute(client, message, args) {
        const currentDate = new Date();
        const nextDate = new Date(new Date().getTime() + 23 * 60 * 60 * 1000);
    
        const rawData = fs.readFileSync("users-data.json");
        let jsonData = JSON.parse(rawData);

        let smurf = true;
        
        for(let user in client.usersData.users){
            if(client.usersData.users[user].id === message.author.id ){
                
                if(currentDate <= new Date(jsonData["users"][user]["next_report"])){
                    message.channel.send("T'as déjà report aujourd'hui, fait gaffe ou t'obtiens un report pour spam");
                    console.log("done");
                    smurf = false;
                    return;
                }
                else{
                    jsonData["users"][user]["next_report"] = nextDate; 
                    const data = JSON.stringify(jsonData, null, 2);
                    fs.writeFileSync("users-data.json", data);
                    smurf = false;
                }
            }
        }

        if(smurf){
            message.channel.send("T'es un smurf et tu tentes d'abuser du système (si t'en es pas un, viens vite voir le dev)");
            return;
        }
        

        const row4 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('selectReport')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            {
                                label: 'Tilt',
                                description: 'Ca lui servira de leçon',
                                value: '0',
                            },
                            {
                                label: 'Noob',
                                description: 'l2p',
                                value: '1',
                            },
                            {
                                label: 'Toxic',
                                description: 'Cheh',
                                value: '2',
                            },
                            {
                                label: 'Spam',
                                description: "C'est pas cool",
                                value: '3',
                            },
                        ),
                );

            const row5 = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('selectReportedPlayer')
                        .setPlaceholder('Nothing selected')
                        .addOptions(
                            {
                                label: 'Thomas',
                                description: 'Le Créateur',
                                value: "thomas" ,
                            },
                            {
                                label: 'Tugra',
                                description: 'This is a description',
                                value: "tugra" ,
                            },
                            {
                                label: 'Etienne',
                                description: 'This is a description',
                                value: "metalem" ,
                            },
                            {
                                label: 'Mathis',
                                description: 'This is a description',
                                value: "mathis" ,
                            },
                            {
                                label: 'Maxime',
                                description: 'This is a description',
                                value: "darion" ,
                            },
                            {
                                label: 'Léo',
                                description: 'This is a description',
                                value: "léo" ,
                            },
                            {
                                label: 'Yanis A.',
                                description: 'This is a description',
                                value: "yanis" ,
                            },
                            {
                                label: 'Yanis H.',
                                description: 'This is a description',
                                value: "iziker" ,
                            },
                            {
                                label: 'William',
                                description: 'This is also a description',
                                value: "willy",
                            },
                            {
                                label: 'Rayan',
                                description: 'This is also a description',
                                value: "rayan",
                            },
                            {
                                label: 'Marie',
                                description: 'This is also a description',
                                value: "marie",
                            },
                            {
                                label: 'Bylolipops',
                                description: 'This is also a description',
                                value: "bylo",
                            },
                            {
                                label: 'TheAarnold',
                                description: 'This is description',
                                value: "manel",
                            },
                            {
                                label: 'Quentin',
                                description: 'This is also a description',
                                value: "quentin",
                            },
                            {
                                label: 'Louis',
                                description: 'This is also a description',
                                value: "louis",
                            },
                        ),
                );
        
        await message.reply({ content: "Select your report and your toxic man", components: [row4, row5] });
        

        // CHEH WILLIAM
        const filter2 = i => {
            return (i.message.reference.messageId === message.id && i.user.id === message.author.id);
        };
        

        const reportCollector = message.channel.createMessageComponentCollector({filter: filter2, max: 2, componentType: ComponentType.SelectMenu, time: 30000 });
                        
    
        
        reportCollector.on('collect', collected => {

        });

        reportCollector.on('end', collected => {
            if(collected.size === 2){
                var report = "";
                var playerName = "";
                if(collected.at(0).customId === "selectReport"){
                    report = collected.at(0).values[0];
                    playerName = collected.at(1).values[0];
                }
                if(collected.at(0).customId === "selectReportedPlayer"){
                    playerName = collected.at(0).values[0];
                    report = collected.at(1).values[0];
                }
                console.log(report)
                console.log(playerName)
                jsonData["users"][playerName]["reports"][report] += 1; 
                const data = JSON.stringify(jsonData, null, 2);
                fs.writeFileSync("users-data.json", data);
                
            }
        });
    }
};
                
                