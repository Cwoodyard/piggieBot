const openSea = require('opensea-js');
module.exports = {
    commands: ['find'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        //using this as a catch all. Feel free to delete if you dont want it
        message.channel.send('It seems like you have entered an incorrect command. Please use pcommands to get a list of avaliable commands.')

        //This will gather information for specified Piggie via tokenID or NFT contract address and tokenID. ALL NFT'S MUST BE ON OPENSEA!

    },
    permissions: [],
    requiredRoles: [],
}