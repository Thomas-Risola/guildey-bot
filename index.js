import config from "./config.json" assert {type: "json"};
import Discord from 'discord.js'
import { ActivityType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, Client, GatewayIntentBits, Partials } from 'discord.js';
import axios from 'axios'
import fs from 'fs'
import { ComponentType } from 'discord.js'
import Message, {client, settings} from './src/message.js'


const riotApiKey = config.riotApiKey;



client.on("ready", () => {
    console.log("Bot has started");
  
    client.user.setPresence({
        activities: [{ name: `Le serveur`, type: ActivityType.Watching }],
        status: 'dnd',
      });
  });





// boite troll
client.on('messageCreate', Message);


client.on('interactionCreate', async interaction => {

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





// connexion boite

client.on("presenceUpdate", (oldPresence, newPresence) => {

    if (oldPresence === null){
        return ;
    }

    const currentDate = new Date();
    const nextDate = new Date(new Date().getTime() + 15 * 60 * 60 * 1000);
  
    const rawData = fs.readFileSync("config.json");
    let jsonData = JSON.parse(rawData);
                       
    // thomas
    if(newPresence.userId === config.users.thomas.id){ 
        let nextSpamTime = new Date(jsonData["users"]["thomas"]["next_spam"]); 

        if ((nextSpamTime < currentDate) && ((newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false) 
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.status === "offline" : false)
        )){
            var message = "Ave Creator!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send("Bouh?");
            jsonData["users"]["thomas"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    // marie

    
    if(newPresence.userId === config.users.marie.id){
        let nextSpamTime = new Date(jsonData["users"]["marie"]["next_spam"]); 
        if ((nextSpamTime < currentDate) && ((newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline"  : false) 
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.status === "offline" : false)
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.clientStatus.mobile === "dnd" : false))
    ){
            //var message = "dites bonjour à l'egirl *UwU* " + "<@" + newPresence.userId + ">";
            //client.channels.cache.get(settings.channelId).send(message);
            jsonData["users"]["marie"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
   
    // willy
    if(newPresence.userId === config.users.willy.id){ 
        let nextSpamTime = new Date(jsonData["users"]["willy"]["next_spam"]); 
        if ((nextSpamTime < currentDate) && (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)){
            var message = "Yo Dieu!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send('Bouh!');
            jsonData["users"]["willy"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    // rayan
    if(newPresence.userId === config.users.rayan.id){ 
        let nextSpamTime = new Date(jsonData["users"]["rayan"]["next_spam"]);
        if ((nextSpamTime < currentDate) && ((newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.status === "offline" : false))){
            var message = "Yo Le Mec Le Plus Gentil Du Bahut!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send('Bouh!');
            jsonData["users"]["rayan"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    // tugra
    
    if(newPresence.userId === config.users.tugra.id){ 
        let nextSpamTime = new Date(jsonData["users"]["tugra"]["next_spam"]);
        if ((nextSpamTime < currentDate) && newPresence.clientStatus.desktop === "online" && oldPresence? oldPresence.status === "offline" : false){
            var message = "Yo BG, what's up?" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);   
            jsonData["users"]["tugra"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);   
        }
    }
    
    // bylo
    if(newPresence.userId === config.users.bylo.id){ 
        let nextSpamTime = new Date(jsonData["users"]["bylo"]["next_spam"]);
        if ((nextSpamTime < currentDate) && (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)
        ){
            client.users.cache.get(newPresence.userId).send("What should I do today?");
            jsonData["users"]["bylo"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    
    // yanis
    if(newPresence.userId === config.users.yanis.id){ 
        
        let nextSpamTime = new Date(jsonData["users"]["yanis"]["next_spam"]);
        if ((nextSpamTime < currentDate) && (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)){
            var message = "Mes salutations sage biteman!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            jsonData["users"]["yanis"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    
    // etienne
    if(newPresence.userId === config.users.metalem.id){ 
        let nextSpamTime = new Date(jsonData["users"]["metalem"]["next_spam"]);
        if ((nextSpamTime < currentDate) && (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)){
            var message = "Oh noooooo un démon BDSM!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send('Bouh');
            jsonData["users"]["metalem"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    /*
    // iziker
    if(newPresence.userId === config.users.iziker.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            var message = "QUEL SEIGNEUR! Il détruit la botlane Fnatic!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
        }
    }
    // darion
    if(newPresence.userId === config.users.darion.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            var message = "Yo maître " + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
        }
    }
    // léo
    if(newPresence.userId === config.users.léo.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            //var message = "daddy " + "<@" + newPresence.userId + ">" + " est là pour nous carry";
            //client.channels.cache.get(settings.channelId).send(message);
            var a = 4;
        }
    }
    // Gaetan
    if(newPresence.userId === config.users.manel.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            //var message = "daddy " + "<@" + newPresence.userId + ">" + " est là pour nous carry";
            //client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send(".--- .----. .- .. / .--. . .-. -.. ..-");
            }
    }
    // Louis
    if(newPresence.userId === config.users.louis.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            var message = "L'ouragan arrive, fuyez!!! " + "<@" + newPresence.userId + ">" ;
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send('Bouh');
        }
    }
   */ 
});


// number of requete ? 6 for now, limite à 20
// faire un for user in users 
async function lolTrackerFunction(){ 

    let rawData = fs.readFileSync("config.json");
    let jsonData = JSON.parse(rawData);

    // ceci n'est qu'un test (à ameliorer)
    const thomasProfile = await axios.get("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + jsonData["users"]["thomas"]["league"]["leagueName"] + "?api_key=" + riotApiKey);
    const marieProfile = await axios.get("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + jsonData["users"]["marie"]["league"]["leagueName"] + "?api_key=" + riotApiKey);
    
    const thomas_puuid = thomasProfile.data.puuid;
    const marie_puuid = marieProfile.data.puuid;

    const thomas_id = thomasProfile.data.id;
    const marie_id = marieProfile.data.id;

    let thomasMatchList = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + thomas_puuid + "/ids" + "?api_key=" + riotApiKey);
    let marieMatchList = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + marie_puuid + "/ids" + "?api_key=" + riotApiKey);
    
    const thomasAllRank = await axios.get("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + thomas_id + "?api_key=" + riotApiKey);
    const marieAllRank = await axios.get("https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/" + marie_id + "?api_key=" + riotApiKey);



    let thomasRank = null;
    let marieRank = null;
    if(thomasAllRank.data[0].queueType === 'RANKED_SOLO_5x5')
        thomasRank = thomasAllRank.data[0];   
    else
        thomasRank = thomasAllRank.data[1];

    if(marieAllRank.data[0].queueType === 'RANKED_SOLO_5x5')
        marieRank = marieAllRank.data[0];
    else
        marieRank = marieAllRank.data[1];


    const thomasMatchListId = thomasMatchList.data[0];
    const marieMatchListId = marieMatchList.data[0];

    let thomasLastMatch = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + thomasMatchListId + "?api_key=" + riotApiKey);
    let marieLastMatch = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + marieMatchListId + "?api_key=" + riotApiKey);
    

    if(jsonData["users"]["thomas"]["league"]["lastGame"] !== thomasMatchListId ){ 
        var lpGain = "";
        if(thomasLastMatch.data.info.queueId !== 420)
            
            lpGain = "c'était pas une solo duo"
        else{
            if (thomasRank.miniSeries !== undefined)
                lpGain = thomasRank.miniSeries.progress
            else{
                lpGain = thomasRank.leaguePoints - jsonData["users"]["thomas"]["league"]["lp"];
            }
        }
        for (let pas = 0; pas < thomasLastMatch.data.info.participants.length; pas++) {
            if(thomasLastMatch.data.info.participants[pas].summonerName === jsonData["users"]["thomas"]["league"]["leagueName"]){   
                let victory = thomasLastMatch.data.info.participants[pas].win;
                if(victory){
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["thomas"]["league"]["leagueName"] + " a " + "win")
                        .addFields({name: "KDA : ", value: thomasLastMatch.data.info.participants[pas].kills + "/" +  thomasLastMatch.data.info.participants[pas].deaths + "/" + thomasLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP diff: ", value: lpGain.toString()})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + thomasLastMatch.data.info.participants[pas].championName + '_0.jpg');
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });  
                }
                else{
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["thomas"]["league"]["leagueName"] + " a " + "lose")
                        .addFields({name: "KDA : ", value: thomasLastMatch.data.info.participants[pas].kills + "/" +  thomasLastMatch.data.info.participants[pas].deaths + "/" + thomasLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP diff: ", value: lpGain.toString()})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + thomasLastMatch.data.info.participants[pas].championName + '_0.jpg');      
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });
                }
            }      
        } 

        jsonData["users"]["thomas"]["league"]["lp"] = thomasRank.leaguePoints;
        jsonData["users"]["thomas"]["league"]["lastGame"] = thomasMatchListId; 
        const data = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync("config.json", data);    
    }

    if(jsonData["users"]["marie"]["league"]["lastGame"] !== marieMatchListId ){  
        var lpGain = "";
        if(marieLastMatch.data.info.queueId !== 420)
            
            lpGain = "c'était pas une solo duo"
        else{
            if (marieRank.miniSeries !== undefined)
                lpGain = marieRank.miniSeries.progress
            else{
                lpGain = marieRank.leaguePoints - jsonData["users"]["marie"]["league"]["lp"];
            }
        }
        for (let pas = 0; pas < marieLastMatch.data.info.participants.length; pas++) {
            if(marieLastMatch.data.info.participants[pas].summonerName === jsonData["users"]["marie"]["league"]["leagueName"]){   
                let victory = marieLastMatch.data.info.participants[pas].win;
                if(victory){
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["marie"]["league"]["leagueName"] +  " a " + "win")
                        .addFields({name: "KDA : ", value: marieLastMatch.data.info.participants[pas].kills + "/" +  marieLastMatch.data.info.participants[pas].deaths + "/" + marieLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP diff: ", value: lpGain.toString()})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + marieLastMatch.data.info.participants[pas].championName + '_0.jpg')
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });  
                }
                else{
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["marie"]["league"]["leagueName"] +  " a " + "lose")
                        .addFields({name: "KDA : ", value: marieLastMatch.data.info.participants[pas].kills + "/" +  marieLastMatch.data.info.participants[pas].deaths + "/" + marieLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP diff: ", value: lpGain.toString()})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + marieLastMatch.data.info.participants[pas].championName + '_0.jpg')       
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });
                }
            } 
        }

        jsonData["users"]["marie"]["league"]["lp"] = marieRank.leaguePoints;
        jsonData["users"]["marie"]["league"]["lastGame"] = marieMatchListId; 
        const data = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync("config.json", data);      
    }
}

// 5 min intervalle : delai en millisecs
setInterval(lolTrackerFunction, 1000*5*60);


client.login(config.BOT_TOKEN);

