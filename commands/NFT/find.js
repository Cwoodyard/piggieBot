const opensea = require('opensea-js');
const OpenSeaPort = opensea.OpenSeaPort;
const Network = opensea.Network;
const Web3 = require('web3');
const http = require('http');
const Web3HttpProvider = require('web3-providers-http');
module.exports = {
    commands: ['find'],
    expectedArgs: '<id> <address>',
    permissionError: '',
    minArgs: 1,
    maxArgs: 2,
    callback: (message, arguments, text) => {
        //setting constants
        const id = +arguments[0];
        let address = arguments[1];

        //using this as a catch all. Feel free to delete if you dont want it
        message.channel.send('It seems like you have entered an incorrect command. Please use pcommands to get a list of avaliable commands.')

        //This will gather information for specified Piggie via tokenID or NFT contract address and tokenID. ALL NFT'S MUST BE ON OPENSEA!

        //Use OpenSeaPort to interface with Opensea via async waits and requests

        const options = {
            keepAlive: true,
            timeout: 20000, // milliseconds,
            headers: [{ name: 'Access-Control-Allow-Origin', value: '*' }, {}],
            withCredentials: false,
            agent: { http: http.Agent(), baseUrl: '' }
        };

        const provider = new Web3HttpProvider('https://mainnet.infura.io', options);

        const seaport = new OpenSeaPort(provider, {
            networkName: Network.Main

        })

        console.log();




    },
    permissions: [],
    requiredRoles: [],
}