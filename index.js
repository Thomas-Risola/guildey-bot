const { Player } = require("discord-music-player");
const config = require("./config.json");
const Discord = require('discord.js');
const { ActivityType, MessageActionRow, MessageSelectMenu, EmbedBuilder, MessageMenuOption, ActionRowBuilder, SelectMenuBuilder, Client, GatewayIntentBits, Partials } = require('discord.js');
const fs = require('fs');
const axios = require("axios");
const { ComponentType } = require('discord.js');

const settings = {
    suffix: '?',
    prefix: '?',
    channelId: "995053789625200730",
    lolChannelId: "700486726899990528",
};

var troll = 0;

const riotApiKey = config.riotApiKey;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds, 
		GatewayIntentBits.GuildMessages, 
		GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildMessageReactions, 
		GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent
	], 
	partials: [Partials.Channel, Partials.Message, Partials.User, Partials.GuildMember, Partials.Reaction] 
});


games_array = [ "valorant", "any", "lol", "smash", "csgo"];
players_array = [ "thomas", "willy", "rayan", "marie", 'bylo', 'quentin', "louis"];


const player = new Player(client, {
    leaveOnEmpty: false, // This options are optional.
});
// You can define the Player as *client.player* to easily access it.
client.player = player;


// Init the event listener only once (at the top of your code).
client.player
    // Emitted when channel was empty.
    .on('channelEmpty',  (queue) =>
        console.log(`Everyone left the Voice Channel, queue ended.`))
    // Emitted when a song was added to the queue.
    .on('songAdd',  (queue, song) =>
        console.log(`Song ${song} was added to the queue.`))
    // Emitted when a playlist was added to the queue.
    .on('playlistAdd',  (queue, playlist) =>
        console.log(`Playlist ${playlist} with ${playlist.songs.length} was added to the queue.`))
    // Emitted when there was no more music to play.
    .on('queueDestroyed',  (queue) =>
        console.log(`The queue was destroyed.`))
    // Emitted when the queue was destroyed (either by ending or stopping).    
    .on('queueEnd',  (queue) =>
        console.log(`The queue has ended.`))
    // Emitted when a song changed.
    .on('songChanged', (queue, newSong, oldSong) =>
        console.log(`${newSong} is now playing.`))
    // Emitted when a first song in the queue started playing.
    .on('songFirst',  (queue, song) =>
        console.log(`Started playing ${song}.`))
    // Emitted when someone disconnected the bot from the channel.
    .on('clientDisconnect', (queue) =>
        console.log(`I was kicked from the Voice Channel, queue ended.`))
    // Emitted when deafenOnJoin is true and the bot was undeafened
    .on('clientUndeafen', (queue) =>
        console.log(`I got undefeanded.`))
    // Emitted when there was an error in runtime
    .on('error', (error, queue) => {
        console.log(`Error: ${error} in ${queue.guild.name}`);
    });




client.on("ready", () => {
    console.log("Bot has started");
  
    client.user.setPresence({
        activities: [{ name: `Le serveur`, type: ActivityType.Watching }],
        status: 'dnd',
      });
  });





// boite troll

client.on('messageCreate', async (message) => {

    if (message.author.id === config.BOT_ID){
        return;  
    }

    switch(message.content.toLowerCase()){
        case "gg":
            message.channel.send("ok bg");
            break;
        
        case "gl":
            const random = Math.random();
            if (random > 0.9){
                message.channel.send("je t'aime pas toi <@" + message.author.id + ">");
            }
            else
                message.channel.send("hf <@" + message.author.id + ">");
            break;
        case "aya":
            message.channel.send("https://c.tenor.com/DRGdjkDYpr4AAAAC/karen.gif"); // Remove the brackets <>
            break;
        case "bonjour":
            console.log(message.author);
            if(message.author.username === "Perrier citron")
                message.channel.send("bonjour dieu, que puis-je faire pour vous?"); 
            else
                message.channel.send("salut"); 
            break;
        case "tu penses quoi de metalem ?":
            message.channel.send("chic type, en plus il code mieux que mon créateur"); 
            break;
    }
    
   
   

    if(!message.content.endsWith(settings.suffix)){
    // ça veut dire les channels de type dm (en gros le bot en privé)
        if (message.channel.type === 1){
            const random = Math.random();
            if (random > 0.5){
                    
                client.users.cache.get(message.author.id).send("Non mais ho là, tu me parles pas comme ça ici.");  
    
            }
            else
                message.channel.send("^^");
        }
        return;
    }

    if(message.content.endsWith(settings.suffix)){
        const fullMessageWithoutSuffix = message.content.substring(0, message.content.length - 2)
        const args = fullMessageWithoutSuffix.slice().trim().split(/ +/g);
        const command = args.shift();
        
        
        switch(command){
            case "dance":
                message.channel.send("j'ai pas encore envie monsieur tango");
                break;
            case "help":
                if(message.author.username === "Perrier citron")
                    troll = 1;
                if (troll%2 === 0){
                    message.channel.send("débrouilles toi");
                    await sleep(1000);
                    function sleep(ms) {
                    return new Promise((resolve) => {
                        setTimeout(resolve, ms);
                    });
                    }
                    message.channel.send("réessaye plus tard :)");
                }
                else{
                    message.channel.send("bon ok, voilà les commandes (à suivre de espace + ?):");
                    message.channel.send("play, skip, etc (oui le codeur avait la flemme de tout te dire)");
                }
                troll += 1;
                break;
            case "ping":          
                const row1 = new ActionRowBuilder()
                    .addComponents(
                        new SelectMenuBuilder()
                            .setCustomId('select')
                            .setPlaceholder('Nothing selected')
                            .addOptions(
                                {
                                    label: 'Select me',
                                    description: 'This is a description',
                                    value: 'first_option',
                                },
                                {
                                    label: 'You can select me too',
                                    description: 'This is also a description',
                                    value: 'second_option',
                                },
                            ),
                    );
                await message.reply({ content: 'Pong!', components: [row1] });
                break;
            case "game": 
                                
                const row2 = new ActionRowBuilder()
                        .addComponents(
                            new SelectMenuBuilder()
                                .setCustomId('select game')
                                .setPlaceholder('Nothing selected')
                                .addOptions(
                                    {
                                        label: 'Valorant',
                                        description: 'This is a description',
                                        value: 'valorant',
                                    },
                                    {
                                        label: 'LoL',
                                        description: 'This is also a description',
                                        value: 'lol',
                                    },
                                    {
                                        label: 'CS:GO',
                                        description: 'This is also a description',
                                        value: 'csgo',
                                    },
                                    {
                                        label: 'Smash',
                                        description: 'This is also a description',
                                        value: 'smash',
                                    },
                                    {
                                        label: 'Mini games (mk, pinturillo, ...)',
                                        description: 'This is also a description',
                                        value: 'any',
                                    },
                                ),
                        );

                    const row3 = new ActionRowBuilder()
                        .addComponents(
                            new SelectMenuBuilder()
                                .setCustomId('select player')
                                .setPlaceholder('Nothing selected')
                                .addOptions(
                                    {
                                        label: 'Thomas',
                                        description: 'This is a description',
                                        value: "thomas" ,
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
                
                await message.reply({ content: "Select your game and your player", components: [row2, row3] });
   

                const collector = message.channel.createMessageComponentCollector({ componentType: ComponentType.SelectMenu, time: 10000, max: 2 });
                
                collector.once('collect', async (message) => {

                });

                collector.on('end', collected => {
                    
                    if(collected.size === 2){
                        var game = "";
                        var playerName = "";
                        if(collected.at(0).customId === "select game"){
                            game = collected.at(0).values[0];
                            playerName = collected.at(1).values[0];
                        }
                        if(collected.at(0).customId === "select player"){
                            playerName = collected.at(0).values[0];
                            game = collected.at(1).values[0];
                        }
                        
                        const embed1 = new EmbedBuilder()
                        .setColor('#1a8175')
                        .setTitle(` Message envoyé!!`)
                        .setDescription(playerName + " a reçu une invite pour jouer à " + game + ".")
                        .addFields( { name: '\u200B', value: '\u200B' },)
                        .setFooter({text: "Merci d'avoir utilisé le service de messagerie ormos' corporation"});
                        

                        const embed2 = new EmbedBuilder()
                        .setColor('#1a8175')
                        .setTitle(` Message reçu!!`)
                        .setDescription("Viens jouer à " + game + " avec " + collected.at(0).user.username + ".")
                        .addFields( { name: '\u200B', value: '\u200B' },)
                        .setFooter({text: "Merci d'avoir utilisé le service de messagerie ormos' corporation"});
        
                        client.users.cache.get(collected.at(0).user.id).send({ embeds: [embed1] });
                        client.users.cache.get(config.users[playerName].id).send({ embeds: [embed2] });

                    }
                });

                break;

            case "add":
                try{
                const name = args[0];
                const discordName = args[2];

                const rawData = fs.readFileSync("config.json");
                let jsonData = JSON.parse(rawData);

                jsonData["users"][discordName]["leagueName"] = name;                       

                const data = JSON.stringify(jsonData, null, 2);
                fs.writeFileSync("config.json", data);
                }
                catch(error){
                    message.channel.send("William veut me détruire il n'est pas gentil ;(");

                }
                break;
        }         
    }
    
    // message.content.toLowerCase() pour s'en battre les couilles des majuscules

 

// Note à moi même : ranger un jour le code dans des boites
// là c'est la boite musique

 
    if(message.content.endsWith(settings.suffix)){
        const fullMessageWithoutSuffix = message.content.substring(0, message.content.length - 2)
        const args = fullMessageWithoutSuffix.slice().trim().split(/ +/g);
        const command = args.shift();
        try {
            let guildQueue = client.player.getQueue(message.guild.id);
            if(command === 'play') {
                let queue = client.player.createQueue(message.guild.id);
                await queue.join(message.member.voice.channel);
                let song = await queue.play(args.join(' ')).catch(_ => {
                    if(!guildQueue)
                        queue.stop();
                });
            }

            if(command === 'playlist') {
                let queue = client.player.createQueue(message.guild.id);
                await queue.join(message.member.voice.channel);
                let song = await queue.playlist(args.join(' ')).catch(_ => {
                    if(!guildQueue)
                        queue.stop();
                });
            }

            if(command === 'skip') {
                guildQueue.skip();
            }

            if(command === 'stop') {
                guildQueue.stop();
            }

            if(command === 'removeLoop') {
                guildQueue.setRepeatMode(RepeatMode.DISABLED); // or 0 instead of RepeatMode.DISABLED
            }

            if(command === 'toggleLoop') {
                guildQueue.setRepeatMode(RepeatMode.SONG); // or 1 instead of RepeatMode.SONG
            }

            if(command === 'toggleQueueLoop') {
                guildQueue.setRepeatMode(RepeatMode.QUEUE); // or 2 instead of RepeatMode.QUEUE
            }

            if(command === 'setVolume') {
                guildQueue.setVolume(parseInt(args[0]));
            }

            if(command === 'seek') {
                guildQueue.seek(parseInt(args[0]) * 1000);
            }

            if(command === 'clearQueue') {
                guildQueue.clearQueue();
            }

            if(command === 'shuffle') {
                guildQueue.shuffle();
            }

            if(command === 'getQueue') {
                console.log(guildQueue);
            }

            if(command === 'getVolume') {
                console.log(guildQueue.volume)
            }

            if(command === 'nowPlaying') {
                console.log(`Now playing: ${guildQueue.nowPlaying}`);
            }

            if(command === 'pause') {
                guildQueue.setPaused(true);
            }

            if(command === 'resume') {
                guildQueue.setPaused(false);
            }

            if(command === 'remove') {
                guildQueue.remove(parseInt(args[0]));
            }

            if(command === 'createProgressBar') {
                const ProgressBar = guildQueue.createProgressBar();
                
                // [======>              ][00:35/2:20]
                console.log(ProgressBar.prettier);
            }
        } catch(error) {
            var message = "ERROR ERROR! EMMERGENCY: le dev code mal!";
            client.channels.cache.get(settings.channelId).send(message);
        }
    }
})


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
                await interaction.update({ content: 'Game selected, select your player!', components: [interaction.message.components[0]] }); 
            } 
            else{
                await interaction.update({ content: 'Fin du processus!', components: [] }); 
            }
        }
        if(interaction.customId === "select"){
            await interaction.update({ content: 'Something was selected!', components: [] }); 
        }
    }
});





// connexion boite

client.on("presenceUpdate", (oldPresence, newPresence) => {

    const currentDate = new Date();
    const nextDate = new Date(new Date().getTime() + 15 * 60 * 60 * 1000);
  
    const rawData = fs.readFileSync("config.json");
    let jsonData = JSON.parse(rawData);
                       
    // thomas
    if(newPresence.userId === config.users.thomas.id){ 
        nextSpamTime = new Date(jsonData["users"]["thomas"]["next_spam"]); 

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
        console.log(oldPresence);
        nextSpamTime = new Date(jsonData["users"]["marie"]["next_spam"]); 
        if ((nextSpamTime < currentDate) && ((newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline"  : false) 
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.status === "offline" : false)
        || (newPresence.clientStatus.desktop === "dnd" && oldPresence.status? oldPresence.clientStatus.mobile === "dnd" : false)
        || (newPresence.clientStatus.desktop !== oldPresence.clientStatus.desktop))
    ){
            //var message = "dites bonjour à l'egirl *UwU* " + "<@" + newPresence.userId + ">";
            //client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send("Hi gl hf <3");
            jsonData["users"]["marie"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
   
    // willy
    if(newPresence.userId === config.users.willy.id){ 
        console.log(oldPresence);
        nextSpamTime = new Date(jsonData["users"]["willy"]["next_spam"]); 
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
        nextSpamTime = new Date(jsonData["users"]["rayan"]["next_spam"]);
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
        console.log(oldPresence);
        nextSpamTime = new Date(jsonData["users"]["tugra"]["next_spam"]);
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
        console.log(oldPresence);
        nextSpamTime = new Date(jsonData["users"]["bylo"]["next_spam"]);
        if ((nextSpamTime < currentDate) && (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false)
        ){
            client.users.cache.get(newPresence.userId).send("What should I do today?");
            jsonData["users"]["bylo"]["next_spam"] = nextDate; 
            const data = JSON.stringify(jsonData, null, 2);
            fs.writeFileSync("config.json", data);
        }
    }
    /*
    // yanis
    if(newPresence.userId === config.users.yanis.id){ 
        if (newPresence.clientStatus.desktop === "online" && oldPresence.status? oldPresence.status === "offline" : false){
            var message = "Mes salutations sage biteman!" + "<@" + newPresence.userId + ">";
            client.channels.cache.get(settings.channelId).send(message);
            client.users.cache.get(newPresence.userId).send('Bouh');
        }
    }
    */
    // etienne
    if(newPresence.userId === config.users.metalem.id){ 
        nextSpamTime = new Date(jsonData["users"]["metalem"]["next_spam"]);
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
    const thomasProfile = await axios.get("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + jsonData["users"]["thomas"]["leagueName"] + "?api_key=" + riotApiKey);
    const marieProfile = await axios.get("https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/" + jsonData["users"]["marie"]["leagueName"] + "?api_key=" + riotApiKey);
    
    const thomas_puuid = thomasProfile.data.puuid;
    const marie_puuid = marieProfile.data.puuid;

    thomasMatchList = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + thomas_puuid + "/ids" + "?api_key=" + riotApiKey);
    marieMatchList = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/" + marie_puuid + "/ids" + "?api_key=" + riotApiKey);
    
    const thomasMatchListId = thomasMatchList.data[0];
    const marieMatchListId = marieMatchList.data[0];

    thomasLastMatch = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + thomasMatchListId + "?api_key=" + riotApiKey);
    marieLastMatch = await axios.get("https://europe.api.riotgames.com/lol/match/v5/matches/" + marieMatchListId + "?api_key=" + riotApiKey);
    
   
    if(jsonData["users"]["thomas"]["lastGame"] !== thomasMatchListId ){ 
        console.log(thomasLastMatch.data.info.participants)
        for (let pas = 0; pas < thomasLastMatch.data.info.participants.length; pas++) {
            if(thomasLastMatch.data.info.participants[pas].summonerName === jsonData["users"]["thomas"]["leagueName"]){   
                victory = thomasLastMatch.data.info.participants[pas].win;
                if(victory){
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["thomas"]["leagueName"] + " a " + "win")
                        .addFields({name: "KDA : ", value: thomasLastMatch.data.info.participants[pas].kills + "/" +  thomasLastMatch.data.info.participants[pas].deaths + "/" + thomasLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP : ", value: "pas disponible pour le moment"})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + thomasLastMatch.data.info.participants[pas].championName + '_0.jpg');
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });  
                }
                else{
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["thomas"]["leagueName"] + " a " + "lose")
                        .addFields({name: "KDA : ", value: thomasLastMatch.data.info.participants[pas].kills + "/" +  thomasLastMatch.data.info.participants[pas].deaths + "/" + thomasLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP : ", value: "pas disponible pour le moment"})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + thomasLastMatch.data.info.participants[pas].championName + '_0.jpg');      
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });
                }
            }      
        } 
        jsonData["users"]["thomas"]["lastGame"] = thomasMatchListId; 
        const data = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync("config.json", data);    
    }

    if(jsonData["users"]["marie"]["lastGame"] !== marieMatchListId ){  
        for (let pas = 0; pas < marieLastMatch.data.info.participants.length; pas++) {
            if(marieLastMatch.data.info.participants[pas].summonerName === jsonData["users"]["marie"]["leagueName"]){   
                victory = marieLastMatch.data.info.participants[pas].win;
                if(victory){
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["marie"]["leagueName"] +  " a " + "win")
                        .addFields({name: "KDA : ", value: marieLastMatch.data.info.participants[pas].kills + "/" +  marieLastMatch.data.info.participants[pas].deaths + "/" + marieLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP : ", value: "pas disponible pour le moment"})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + marieLastMatch.data.info.participants[pas].championName + '_1.png')
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });  
                }
                else{
                    var victoryScreen = new EmbedBuilder()
                        .setDescription("hey " + jsonData["users"]["marie"]["leagueName"] +  " a " + "lose")
                        .addFields({name: "KDA : ", value: marieLastMatch.data.info.participants[pas].kills + "/" +  marieLastMatch.data.info.participants[pas].deaths + "/" + marieLastMatch.data.info.participants[pas].assists})
                        .addFields({name: "LP : ", value: "pas disponible pour le moment"})
                        .setThumbnail("http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + marieLastMatch.data.info.participants[pas].championName + '_1.png')       
                    client.channels.cache.get(settings.lolChannelId).send({ embeds: [victoryScreen] });
                }
            } 
        }
        jsonData["users"]["marie"]["lastGame"] = marieMatchListId; 
        const data = JSON.stringify(jsonData, null, 2);
        fs.writeFileSync("config.json", data);      
    }
}

// 7 min intervalle : delai en millisecs
setInterval(lolTrackerFunction, 1000*60*7);


client.login(config.BOT_TOKEN);

