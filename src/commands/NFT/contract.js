module.exports = {
    name: 'contract',
    description: 'link to the contract',
    commands: ['contract'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    async execute(interaction) {
        //using this as a catch all. Feel free to delete if you dont want it
        message.channel.send('It seems like you have entered an incorrect command. Please use pcommands to get a list of avaliable commands.')
    },
    permissions: [],
    requiredRoles: [],
}