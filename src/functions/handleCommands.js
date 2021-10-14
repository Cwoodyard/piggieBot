const {
    REST
} = require('@discordjs/rest');
const {
    Routes
} = require('discord-api-types/v9');
const fs = require('fs');
const clientId = '892263441899859998';
const guildId = '891395347484667944';

module.exports = (client) => {
    client.handleCommands = async(commandFolders, path) => {
        client.commandArray = [];
        client.commandPrefixArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                // Set a new item in the Collection
                // With the key as the command name and the value as the exported module
                client.commands.set(command.name, command);

                if (command.data) {
                    console.log('hello ' + command.data.name);
                    client.commandArray.push(command.data.toJSON());
                } else if (command) {
                    console.log('hello ' + command.name);
                    client.commandPrefixArray.push(command.name.toString());
                };
            }
        }
        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async() => {
            try {
                // Registering slash commands
                console.log('Started refreshing application (/) commands.');
                await rest.put(
                    Routes.applicationGuildCommands(clientId, guildId), {
                        body: client.commandArray
                    },
                );
                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    }
}