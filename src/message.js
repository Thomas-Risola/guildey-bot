import config from "../config.json" assert {type: "json"};
import { Player } from 'discord-music-player';
import { ActivityType, ComponentType, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, Client, GatewayIntentBits, Partials } from 'discord.js';
import fs from 'fs'


export const client = new Client({
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

export const settings = {
    suffix: '?',
    prefix: '?',
    channelId: "995053789625200730",
    lolChannelId: "700486726899990528",
};

var troll = 0;


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



const gg = (command, message) => {
    if(command !== "gg")
        return false;
    message.channel.send("ok bg")
    return true;
}

const gl = (command, message) => {
    if (command !== "gl")
        return false;

        const random = Math.random();

    if (random > 0.9)
        message.channel.send("je t'aime pas toi <@" + message.author.id + ">");
    else
        message.channel.send("hf <@" + message.author.id + ">");
    return true;
}

const aya = (command, message) => {
    if (command !== "aya")
        return false;
    message.channel.send("https://c.tenor.com/DRGdjkDYpr4AAAAC/karen.gif"); // Remove the brackets <>
    return true;
}

export default async function Message(message) {
    if (message.author.id === config.BOT_ID)
        return;

    const func = [gg, gl, aya]
    const m = message.content.toLowerCase();

    for(let i = 0; i < func.length; i++) 
        if (func[i](m, message))
            return;

    switch(m){
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

            case "etc":
                if (troll >= 2){
                    message.channel.send("this is the true help command, gg! (coming soon with real things)");
                }
                else{
                    message.channel.send("you haven't unlocked this ability yet");
                    troll += 1;
                }
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
                                        value: 'mini games',
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
   
                
                const filter1 = i => {
                    return (i.message.reference.messageId === message.id && i.user.id === message.author.id);
                };

                const collectorGame = message.channel.createMessageComponentCollector({filter: filter1, componentType: ComponentType.SelectMenu, time: 20000, max: 2 });
                
               
                collectorGame.on('end', collected => {
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

                jsonData["users"][discordName]["league"]["leagueName"] = name;                       

                const data = JSON.stringify(jsonData, null, 2);
                fs.writeFileSync("config.json", data);
                }
                catch(error){
                    message.channel.send("William veut me détruire il n'est pas gentil ;(");

                }
                break;
            
            case "report":
                const currentDate = new Date();
                const nextDate = new Date(new Date().getTime() + 23 * 60 * 60 * 1000);
            
                const rawData = fs.readFileSync("config.json");
                let jsonData = JSON.parse(rawData);

                
                for(let user in config.users){
                    if(config.users[user].id === message.author.id ){
                        
                        if(currentDate < new Date(jsonData["users"][user]["next_report"])){
                            message.channel.send("T'as déjà report aujourd'hui, fait gaffe ou t'obtiens un report pour spam");
                            console.log("done");
                            return;
                        }
                        else{
                            jsonData["users"][user]["next_report"] = nextDate; 
                            const data = JSON.stringify(jsonData, null, 2);
                            fs.writeFileSync("config.json", data);
                        }
                    }
                }
                

                const row4 = new ActionRowBuilder()
                        .addComponents(
                            new SelectMenuBuilder()
                                .setCustomId('select report')
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
                                .setCustomId('select reported player')
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
                

                const reportCollector = message.channel.createMessageComponentCollector({filter: filter2, max: 2, componentType: ComponentType.SelectMenu, time: 20000 });
                              
            
                
                reportCollector.on('collect', collected => {

                });

                reportCollector.on('end', collected => {
                    if(collected.size === 2){
                        var report = "";
                        var playerName = "";
                        if(collected.at(0).customId === "select report"){
                            report = collected.at(0).values[0];
                            playerName = collected.at(1).values[0];
                        }
                        if(collected.at(0).customId === "select reported player"){
                            playerName = collected.at(0).values[0];
                            report = collected.at(1).values[0];
                        }
                        console.log(report)
                        console.log(playerName)
                        jsonData["users"][playerName]["reports"][report] += 1; 
                        const data = JSON.stringify(jsonData, null, 2);
                        fs.writeFileSync("config.json", data);
                        
                    }
                });

                break;
                
    
    
    // message.content.toLowerCase() pour s'en battre les couilles des majuscules

 

// Note à moi même : ranger un jour le code dans des boites
// là c'est la boite musique

            default:
                
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
                    console.log('zik broken')
                }
        }
    }
}
