const fetch = require('node-fetch');
const discord = require('discord.js');

module.exports = {
    name: 'find',
    description: `Finding specific NFT's via its tokenID and contract address`,
    commands: ['find'],
    expectedArgs: '<id> <address>',
    permissionError: '',
    minArgs: 1,
    maxArgs: 2,
    async execute(message, args) {
        //setting constants
        const id = args[0];
        let address = "0x6ce5c0b4520f824b0cd1da057644cbbed8bd3DdD";


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
        let options = { method: 'GET' };
        console.log('id ' + args)
        try {

            if (!args[1]) {
                fetch('https://api.opensea.io/api/v1/assets?token_ids=' + id + '&asset_contract_address=0x6ce5c0b4520f824b0cd1da057644cbbed8bd3DdD&order_direction=desc&offset=0&limit=20', options)

                .then(response => response.text())

                .then(text => {
                    console.log("oof1: " + text);
                    if (!text) {
                        unavaliable(id);
                        return;
                    }
                    const json = JSON.parse(text);
                    // console.log("discordURL: " + json.assets[0].traits.length);
                    // console.log("you sure? " + json.assets[0].last_sale.transaction.length)
                    sendEmbed(json);

                })

                .catch(err => {
                    console.error(err)
                    message.channel.send('oofers Appologies, NFT was not found or you really fucked the bot...');
                });
            } else {
                console.log(args[1]);
                address = args[1];
                fetch('https://api.opensea.io/api/v1/assets?token_ids=' + id + '&asset_contract_address=' + address + '&order_direction=desc&offset=0&limit=20', options)

                .then(response => response.text())

                .then(text => {
                    console.log("oof: " + text);
                    if (!text) {
                        unavaliable(id, address);
                        return;
                    } else if (text == '{"assets":[]}') {
                        unavaliable(id, address);
                        return;
                    }
                    const json = JSON.parse(text);
                    // console.log("discordURL: " + json.assets[0].traits.length);
                    // console.log("you sure? " + json.assets[0].last_sale.transaction.length)
                    sendEmbed(json);

                })

                // .then(response => console.log(response))

                .catch(err => {
                    console.error(err)
                    message.channel.send('oofers1 Appologies, NFT was not found or you really fucked the bot...');
                });

            }


        } catch (error) {
            console.log(error);
        }

        function sendEmbed(json, jsonM) {

            const traits = [];
            // let traitCount = json.assets[0].traits;
            // console.log("Im here!");
            // if (json.assets[0].traits >= 0) {
            //     for (i = 0; i < traitCount; i++) {
            //         traits[i] = "Trait: " + json.assets[0].traits[i].trait_type + "\n Value: " + json.assets[0].traits[i].value + "\n Max value: " + json.assets[0].traits[i].max_value + "\n Quantity: " + json.assets[0].traits[i].trait_count;
            //     };
            // }
            // console.log("Im here now!");


            if ((json.dna)) { // Got it to fetch the NFT data. Just need to fill it in on opensea related info.
                switch (json) {
                    default: const exampleEmbed4 = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${json.name}`)
                        .setURL(json.permalink)
                        .setAuthor(jsonM.name, json.collection.profile_img_url, json.collection.external_url)
                        .setDescription(json.collection.description)
                        .setThumbnail(json.collection.featured_image_url)
                        .setImage(json.image_url)
                        .setTimestamp()
                        .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                    message.channel.send({ embeds: [exampleEmbed4] });
                    // console.log("option4");
                    break;

                }
            } else {
                switch (json.assets[0]) {
                    //listing NFT w/the traits and price/last sale information for NFT

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

                    //listing NFT w/o the traits and w/ price/last sale information for NFT

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

                    //listing NFT w/ the traits and w/o price/last sale information for NFT

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

                    //listing NFT w/o the traits and price/last sale information for NFT

                    default: const exampleEmbed4 = new discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${json.assets[0].name}`)
                        .setURL(json.assets[0].permalink)
                        .setAuthor(json.assets[0].collection.name, json.assets[0].collection.profile_img_url, json.assets[0].collection.external_url)
                        .setDescription(json.assets[0].collection.description)
                        .setThumbnail(json.assets[0].collection.featured_image_url)
                        .setImage(json.assets[0].image_url)
                        .setTimestamp()
                        .setFooter('Powered by OpenSea.io', 'https://storage.googleapis.com/opensea-static/Logomark/Logomark-White.png');

                    message.channel.send({ embeds: [exampleEmbed4] });
                    // console.log("option4");
                    break;
                }
            }


            // console.log("Im here here now!");
        }

        function unavaliable(id, address) {
            console.log("Checking if its part of polycon network!");
            let options = {
                method: 'GET',
                headers: {
                    'accept': 'application/json',
                    'X-API-Key': 'M8aWdzJoZaY7vEM9FOjjGsN0hWBDSlMva4AJg9WpjLT81Z5yMJ56P9jvM3c6mYAh'

                }
            };
            fetch('https://deep-index.moralis.io/api/v2/nft/' + address + '/' + id + '?chain=polygon&format=decimal', options)

            .then(response => response.text())

            .then(text => {
                console.log("Moralis oof: " + text);
                if (!text) {
                    return;
                }
                let json = JSON.parse(text);
                const json2 = JSON.parse(json.metadata);

                console.log('json2: ' + JSON.stringify(json2))
                    // console.log("discordURL: " + json.assets[0].traits.length);
                    // console.log("you sure? " + json.assets[0].last_sale.transaction.length)
                sendEmbed(json2, json);

            })

            // .then(response => console.log(response))

            .catch(err => {
                console.error(err)
                message.channel.send('oofers1 Appologies, NFT was not found or you really fucked the bot...');
            });

            console.log("NFT NOT FOUND");
            message.channel.send('Appologies, NFT was not found');

        }



    },
    permissions: [],
    requiredRoles: [],
}