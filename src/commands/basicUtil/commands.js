const discord = require('discord.js')
module.exports = {
    name: 'commands',
    description: 'list of all currently avaliable commands',
    async execute(message, args) {
        const Embed2 = new discord.MessageEmbed()
            .setTitle('Commands')
            // .addField('pContract', "To view the contract. Please visit: https://mumbai.polygonscan.com/address/0x6ce5c0b4520f824b0cd1da057644cbbed8bad3ddd#code")
            .addField('pList - not working RN', "To view the list of currently minted Piggies, please visit: https://testnets.opensea.io/collection/test-cn0u2n81kk")
            .addField('pSite', "The Project website can be found here: https://programmaticpiggies.io/")
            .addField('pFind', "This will gather information for specified Piggie via tokenID or NFT contract address and tokenID. ALL NFT'S MUST BE ON OPENSEA!" + "\n" + "Example: pFind 1 0xBBeCb670d04bC0e695f0af4c6FebbAC7DD0BC276")
            .addField('pCommands', "This prompt.")
        message.channel.send({ embeds: [Embed2] })
    },
    permissions: [],
    requiredRoles: [],
}