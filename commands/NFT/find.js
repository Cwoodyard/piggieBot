const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const Web3 = require('web3');
const http = require('http');
const Web3HttpProvider = require('web3-providers-http');
const { getWyvernAsset } = require('opensea-js/lib/utils/utils');
const discord = require('discord.js');
module.exports = {
    commands: ['find'],
    expectedArgs: '<id> <address>',
    permissionError: '',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        //setting constants
        let id = arguments[0];
        let address = "0x495f947276749ce646f68ac8c248420045cb7b5e";


        //using this as a catch all. Feel free to delete if you dont want it

        //This will gather information for specified Piggie via tokenID or NFT contract address and tokenID. ALL NFT'S MUST BE ON OPENSEA!

        //Use basic get request to custom catered orders and receive the proper information 
        //Got via https://docs.opensea.io/reference/getting-assets through javascript tag
        //is example code + modifications to link

        //  LATER ADDITIONS
        //      Find owner and price of NFT
        //          Both in ETH and USD
        //      List the Traits of each NFT via metadata
        //          No set limit, except for what Embed can hold
        //      
        const options = { method: 'GET' };
        try {

            if (!arguments[1]) {
                fetch('https://api.opensea.io/api/v1/assets?token_ids=' + id + '&asset_contract_address=0x495f947276749ce646f68ac8c248420045cb7b5e&order_direction=desc&offset=0&limit=20', options)

                    .then(response => response.text())

                    .then(text => {
                        console.log("oof1: " + text);
                        const json = JSON.parse(text);
                        // console.log("discordURL: " + json.assets[0].traits.length);
                        // console.log("you sure? " + json.assets[0].last_sale.transaction.length)
                        sendEmbed(json);

                    })

                    .catch(err => console.error(err));
            } else {
                console.log(arguments[1]);
                address = arguments[1];
                fetch('https://api.opensea.io/api/v1/assets?token_ids=' + id + '&asset_contract_address=' + address + '&order_direction=desc&offset=0&limit=20', options)

                    .then(response => response.text())

                    .then(text => {
                        console.log("oof: " + text);
                        const json = JSON.parse(text);
                        // console.log("discordURL: " + json.assets[0].traits.length);
                        // console.log("you sure? " + json.assets[0].last_sale.transaction.length)
                        sendEmbed(json);

                    })

                    // .then(response => console.log(response))

                    .catch(err => console.error(err));
            }


        } catch (error) {
            console.log(error);
        }

        function sendEmbed(json) {

            const traits = [];
            let traitCount = json.assets[0].traits;
            // console.log("Im here!");
            // if (json.assets[0].traits >= 0) {
            //     for (i = 0; i < traitCount; i++) {
            //         traits[i] = "Trait: " + json.assets[0].traits[i].trait_type + "\n Value: " + json.assets[0].traits[i].value + "\n Max value: " + json.assets[0].traits[i].max_value + "\n Quantity: " + json.assets[0].traits[i].trait_count;
            //     };
            // }
            // console.log("Im here now!");
            switch (json.assets[0]) {
                // case ((json.assets[0].traits.length >= 0) && (json.assets[0].last_sale.transaction.length >= 0)):
                //     const exampleEmbed1 = new discord.MessageEmbed()
                //         .setColor('#0099ff')
                //         .setTitle(json.assets[0].name)
                //         .setURL(json.assets[0].permalink)
                //         .setAuthor(json.assets[0].collection.name, json.assets[0].collection.profile_img_url, json.assets[0].collection.external_url)
                //         .setDescription(json.assets[0].collection.description)
                //         .setThumbnail(json.assets[0].collection.featured_image_url)
                //         .addFields(
                //             {
                //                 name: 'Asset Traits', value: "placeholder"
                //             },
                //             { name: '\u200B', value: '\u200B' },
                //             { name: 'Last Sold ETH', value: json.assets[0].last_sale.payment_token.eth_price, inline: true },
                //             { name: 'Last Sold USDC', value: json.assets[0].last_sale.payment_token.usd_price, inline: true },
                //         )
                //         .addField('Current Owner', 'Some value here', true)
                //         .setImage(json.assets[0].image_url)
                //         .setTimestamp()
                //         .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                //     message.channel.send(exampleEmbed1);
                //     console.log("option1");
                //     break;
                // case (!(json.assets[0].traits.length >= 0) && json.assets[0].last_sale.transaction.length >= 0):
                //     const exampleEmbed2 = new discord.MessageEmbed()
                //         .setColor('#0099ff')
                //         .setTitle(json.assets[0].name)
                //         .setURL(json.assets[0].permalink)
                //         .setAuthor(json.assets[0].collection.name, json.assets[0].collection.profile_img_url, json.assets[0].collection.external_url)
                //         .setDescription(json.assets[0].collection.description)
                //         .setThumbnail(json.assets[0].collection.featured_image_url)
                //         .addFields(
                //             { name: 'Asset Traits', value: 'None Found' },
                //             { name: '\u200B', value: '\u200B' },
                //             { name: 'Last Sold ETH', value: json.assets[0].last_sale.payment_token.eth_price, inline: true },
                //             { name: 'Last Sold USDC', value: json.assets[0].last_sale.payment_token.usd_price, inline: true },
                //         )
                //         .addField('Owner', 'Some value here', true)
                //         .setImage(json.assets[0].image_url)
                //         .setTimestamp()
                //         .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                //     message.channel.send(exampleEmbed2);
                //     console.log("option2");
                //     break;
                // case ((json.assets[0].traits.length >= 0) && !(json.assets[0].last_sale.transaction.length >= 0)):
                //     const exampleEmbed3 = new discord.MessageEmbed()
                //         .setColor('#0099ff')
                //         .setTitle(json.assets[0].name)
                //         .setURL(json.assets[0].permalink)
                //         .setAuthor(json.assets[0].collection.name, json.assets[0].collection.profile_img_url, json.assets[0].collection.external_url)
                //         .setDescription(json.assets[0].collection.description)
                //         .setThumbnail(json.assets[0].collection.featured_image_url)
                //         .addFields(
                //             { name: 'Asset Traits', value: 'None Found' },
                //             { name: '\u200B', value: '\u200B' },
                //         )
                //         .setImage(json.assets[0].image_url)
                //         .setTimestamp()
                //         .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                //     message.channel.send(exampleEmbed3);
                //     console.log("option3");
                //     break;
                default:
                    const exampleEmbed4 = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(json.assets[0].name)
                        .setURL(json.assets[0].permalink)
                        .setAuthor(json.assets[0].collection.name, json.assets[0].collection.profile_img_url, json.assets[0].collection.external_url)
                        .setDescription(json.assets[0].collection.description)
                        .setThumbnail(json.assets[0].collection.featured_image_url)
                        .setImage(json.assets[0].image_url)
                        .setTimestamp()
                        .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                    message.channel.send(exampleEmbed4);
                    // console.log("option4");
                    break;
            }
            // console.log("Im here here now!");
        }
        // function()



    },
    permissions: [],
    requiredRoles: [],
}