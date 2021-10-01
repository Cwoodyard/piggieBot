/*  Author: v1p3r_hax
 *  Authors Notes: The base.js and some of this code has been taken 
    from https://github.com/AlexzanderFlores/Worn-Off-Keys-Discord-Js 
    and should be aknowledged as so <3 to the original dev and their youtube tutorial
 *  Description: A pourpose built NFT notification and interaction bot
    status of the SMP server used in the streams
 *  Version: 2.0.0
 */
const discord = require('discord.js')
const config = require('./config.json');
const statBot = new discord.Client();
//Added as part of WornOffKey's 25th vid
const path = require('path');
const fs = require('fs');

statBot.on('ready', async() => {
    setDefaultStatus();
    console.log("Standing ready sire!");

    //Added as part of WornOffKey's 25th vid
    const baseFile = 'base.js';
    const commandBase = require(`./commands/${baseFile}`)
    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                console.log(file, option)
                commandBase(option)

            }
        }
    }
    readCommands('commands');
    commandBase.listen(statBot);
});

function setDefaultStatus() {
    statBot.user.setStatus("online");
};

statBot.login(config.token);