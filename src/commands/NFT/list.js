const fetch = require('node-fetch');
const { MessageCollector, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { boolean } = require('webidl-conversions');

module.exports = {
    name: 'list',
    description: `A list of all current NFT's within the ProgrammaticPiggies`,
    commands: ['list'],
    expectedArgs: '',
    permissionError: '',
    minArgs: 0,
    maxArgs: 1,
    async execute(message, arguments) {
        //using this as a catch all. Feel free to delete if you dont want it
        // message.channel.send('Command is Currently unavailable!')
        let id = 0;
        if (!arguments[0]) {
            let id = 0;
        } else {
            let id = arguments[0];
        }
        let firstNFT = 0;
        let lastNFT = '';

        const options = { method: 'GET', headers: { 'X-API-KEY': '0f5fa8b8fd2b4c4595d29f47cd59032f' } };
        fetch('https://api.opensea.io/api/v1/assets?token_ids=' + id + '&asset_contract_address=0x06012c8cf97BEaD5deAe237070F9587f8E7A266d&order_direction=desc&offset=0', options)

        .then(response => response.text())

        .then(text => {
            console.log("JSON: " + text);
            if (!text) {
                unavaliable();
                return;
            }
            const json = JSON.parse(text);
            sendEmbed(json, id);

        })

        .catch(err => {
            console.error(err)
            message.channel.send('Appologies, NFT was not found or you really fucked the bot...');
        });
        async function sendEmbed(json) {

            const traits = [];
            let traitCount = json.assets[id].traits;
            console.log(id);

            let page = id;
            let status = false;

            const row = new MessageActionRow()
                .addComponents(
                    new MessageButton()
                    .setCustomId('first')
                    .setLabel('First')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId('back')
                    .setLabel('Back')
                    .setStyle('SECONDARY'),

                    new MessageButton()
                    .setCustomId('search')
                    .setLabel(page + ' / ' + lastNFT)
                    .setStyle('DANGER'),

                    new MessageButton()
                    .setCustomId('next')
                    .setLabel('Next')
                    .setStyle('PRIMARY'),

                    new MessageButton()
                    .setCustomId('last')
                    .setLabel('Last')
                    .setStyle('PRIMARY')

                );

            const Embed = new MessageEmbed()
                .setColor('#0099ff')
                .setTitle(json.assets[page].name)
                .setURL(json.assets[page].permalink)
                .setAuthor(json.assets[page].collection.name, json.assets[page].collection.profile_img_url, json.assets[page].collection.external_url)
                .setDescription(json.assets[page].collection.description)
                .setThumbnail(json.assets[page].collection.featured_image_url)
                .setImage(json.assets[page].image_url)
                .setTimestamp()
                .setFooter('Powered by OpenSea.io', "https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png")

            await message.reply({ ephemeral: true, embeds: [Embed], components: [row] });

        };

        function changeEmbed(json) {
            let Embed = new discord.MessageEmbed()
                .setColor('#0099ff')
                .setTitle(json.assets[page].name)
                .setURL(json.assets[page].permalink)
                .setAuthor(json.assets[page].collection.name, json.assets[page].collection.profile_img_url, json.assets[page].collection.external_url)
                .setDescription(json.assets[page].collection.description)
                .setThumbnail(json.assets[page].collection.featured_image_url)
                .setImage(json.assets[page].image_url)
                .setTimestamp()
                .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

            message.edit(Embed);
        }

        //Reference https://www.youtube.com/watch?v=f5OcnlgJjHA

        // if (!interaction.isButton) return;
        // console.log(interaction);

    },
    permissions: [],
    requiredRoles: [],
}