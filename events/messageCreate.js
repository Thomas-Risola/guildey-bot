module.exports = (client, message) => {
    const suffix = client.config.settings.suffix;

    const fullMessageWithoutSuffix = message.content.substring(0, message.content.length - 2)
    const args = fullMessageWithoutSuffix.slice().trim().split(/ +/g);
    const command = args.shift();

    const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

    if (cmd) cmd.execute(client, message, args);
};
