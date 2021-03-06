const validatePermissions = (permissions) => {
    const validPermissions = [
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'ADMINISTRATOR',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validPermissions.includes(permission)) {
            throw new Error(`Unknown permission node "${permission}"`)
        }
    }
}

const allCommands = {};

const prefix = (process.env.prefix);

module.exports = (commandOptions) => {
    let {
        commands,
        permissions = [],
    } = commandOptions

    // Ensure the command and aliases are in an array
    if (typeof commands === 'string') {
        commands = [commands];
        console.log('lel' + commands);
    }

    console.log(`Registering command "${commands[0]}"`)

    // Ensure the permissions are in an array and are all valid
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }

    for (const command of commands) {
        allCommands[command] = {
            ...commandOptions,
            commands,
            permissions
        };
    }
}
module.exports = {
    name: 'messageCreate',
    async execute(message, client) {

        const { member, content, guild } = message;
        console.log("commands " + client.commandPrefixArray);
        const allCommands = client.commands;

        // Split on any number of spaces
        const arguments = content.split(/[ ]+/)

        // Remove the command which is the first index

        const name = arguments.shift().toLowerCase();

        if (name.startsWith(prefix)) {
            console.log(name.replace(prefix, ""));
            const command = allCommands.get(name.replace(prefix, ""));

            console.log('##prefix identified## ' + command);
            console.log(allCommands);

            if (!command) {
                console.log(command + ' not registered as a command');
                return;
            }
            const {
                permissions = [],
                    permissionError = 'You do not have permission to run this command.',
                    requiredRoles = [],
                    minArgs = 0,
                    maxArgs = null,
                    expectedArgs,
            } = command;

            // A command has been ran
            console.log("user " + message.author.username + " has requested to run: " + message.content);
            // Ensure the user has the required permissions
            for (const permission of permissions) {
                if (!member.hasPermission(permission)) {
                    message.reply(permissionError)
                    return
                }
            }

            // Ensure the user has the required roles
            for (const requiredRole of requiredRoles) {
                const role = guild.roles.cache.find(
                    (role) => role.name === requiredRole
                )

                if (!role || !member.roles.cache.has(role.id)) {
                    message.reply(
                        `You must have the "${requiredRole}" role to use this command.`
                    )
                    return
                }
            }

            // Ensure we have the correct number of arguments
            if (
                arguments.length < minArgs ||
                (maxArgs !== null && arguments.length > maxArgs)
            ) {
                message.reply(
                    `Incorrect syntax! Use ${name} ${expectedArgs}`
                )
                return
            }
            console.log('messageCreate arguments found ' + arguments)
            // Handle the custom command code
            await command.execute(message, arguments, arguments.join(' '), client);
        }
    },
};