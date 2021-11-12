module.exports = {
    name: 'site',
    description: 'message reply with link to the site',
    commands: ['site'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    async execute(message, args) {
        message.channel.send('Feel Free to visit the project site at: https://programmaticpiggies.io/');
    },
    permissions: [],
    requiredRoles: [],
};