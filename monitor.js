const Discord = require('discord.js');
const client = new Discord.Client();

client.config = require('./settings/config.json');

client.on('ready', () => {
    console.log(`Bot Monitor v1.0.0 is Online.\nMonitoring Bot ${client.user.tag}.`)
});

client.on('presenceUpdate', (oldMember, newMember) => {

    const guild = client.guilds.first();
    if (oldMember.presence.status == newMember.presence.status) return;
    if (newMember.id !== client.config.botID) return;

    const channel = guild.channels.find(c => c.name === 'bot-monitor');
    if (!channel) return;

    if (newMember.presence.status === 'offline') {
        const embed = new Discord.RichEmbed()
            .setTitle('Bot Monitor')
            .setColor('GREY')
            .setDescription('**Bot Is Currently Offline.**')
            .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747774638915584/offline.png')
            .setTimestamp();

        channel.send(embed)
            .then(() => console.log('Bot has gone offline. Potential Crash?'))
            .catch(e => console.error(e));
    } else if (newMember.presence.status === 'online') {
        const embed = new Discord.RichEmbed()
            .setTitle('Bot Monitor')
            .setColor(0x14ff1c)
            .setDescription('**Everything is working as normal**')
            .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747775947669506/online.png')
            .setTimestamp();

        channel.send(embed)
            .then(() => console.log('Bot is healthy and online.'))
            .catch(e => console.error(e));
    } else if (newMember.presence.status === 'dnd') {
        const embed = new Discord.RichEmbed()
            .setTitle('Bot Monitor')
            .setColor('RED')
            .setDescription('**Down For Maintenance**')
            .setThumbnail('https://cdn.discordapp.com/attachments/506233661616816138/513747772848209921/dnd.png')
            .setTimestamp();

        channel.send(embed)
            .then(() => console.log('Bot is down for maintenance.'))
            .catch(e => console.error(e));
    }
});

client.login(client.config.token);
