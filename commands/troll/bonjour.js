module.exports = {
    name: 'bonjour',
    aliases: null,
    category: 'troll',
    utilisation: 'bonjour',

    execute(client, message, args) {
        console.log(message.author);
        if(message.author.username === "Perrier citron")
            message.channel.send("bonjour dieu, que puis-je faire pour vous?"); 
        else
            message.channel.send("salut"); 
    },
};
