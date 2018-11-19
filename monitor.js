const Discord = require("discord.js");
const client = new Discord.Client();

client.config = require("./settings/config.json");

client.on('ready', () => {
    console.log(`Bot Monitor v1.0.0 is Online.\nMonitoring Bot with Client ID of: ${client.config.botID}.`)

});

client.on('presenceUpdate', (oldMember, newMember) => {

    const guildChannels = oldMember.client.guilds.first().channels;
    if (oldMember.presence.status == newMember.presence.status) return;
    if (newMember.id === client.config.botID) {


        if (newMember.presence.status === 'offline') {
            const offline = new Discord.RichEmbed()
                .setTitle('Bot Monitor')
                .setColor(`GREY`)
                .setDescription("**Bot Is Currently Offline.**")
                .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747774638915584/offline.png')
                .setTimestamp()
            guildChannels.find(c => c.name === 'bot-monitor')
                .send(offline)
                .then(msg => {
                    console.log("Bot has gone offline. Potential Crash?")
                }).catch(console.error)
        }
        if (newMember.presence.status === 'online') {
            const online = new Discord.RichEmbed()
                .setTitle('Bot Monitor')
                .setColor(0x14ff1c)
                .setDescription("**Everything is working as normal**")
                .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747775947669506/online.png')
                .setTimestamp()
            guildChannels.find(c => c.name === 'bot-monitor')
                .send(online)
                .then(msg => {
                    console.log("Bot is running health and is online.")
                }).catch(console.error)
        }

        if (newMember.presence.status === 'dnd') {
            const maintenance = new Discord.RichEmbed()
                .setTitle('Bot Monitor')
                .setColor(`RED`)
                .setDescription("**Down For Maintenance**")
                .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747772848209921/dnd.png')
                .setTimestamp()
            guildChannels.find(c => c.name === 'bot-monitor')
                .send(maintenance)
                .then(msg => {
                    console.log("Bot is down for maintenance.")
                }).catch(console.error)

        }

    }
});

client.login(client.config.token);