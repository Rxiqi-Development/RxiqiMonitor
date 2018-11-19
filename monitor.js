const Discord = require('discord.js');
const client = new Discord.Client();

client.config = require('./settings/config.json');

client.on('ready', () => {
    const guild = client.guilds.first();
    const channel = guild.channels.find(c => c.name === client.config.channelName);
    if(!client.config.token){
        console.log("\n[NO_TOKEN_FOUND]: I cannot connect to Discord without a valid token.\n");
        process.exit(1);
    }
    if(!client.config.botID){
        console.log("\n[NO_BOT_ID_FOUND]: Please enter a BotID into my config.json.\n");
        process.exit(1);
    }
    if(guild.length > 1){
        console.log("\n[MORE_THAN_ONE_GUILD]: I can only be used in ONE_GUILD only.\n");
        process.exit(1);
    }
    if(!guild){
         console.log("\n[NO_GUILD_FOUND]:I need to be in the same guild as the bot I am monitoring.\n");
         process.exit(1);
    }
    if(!channel){
        console.log(`\n[CHANNEL_MISSING]: I need the channel to post in to be able to function properly.\nMake sure the name is in lowercase.\n`)
        process.exit(1);
    }
    console.log(`Bot Monitor v1.0.3 is Online.\n\nMonitoring Bot Name: ${client.user.tag}.\nMonitoring In Guild: ${guild}\nMonitoring Posting In: ${channel.name}`)
});

client.on('presenceUpdate', (oldMember, newMember) => {

    const guild = client.guilds.first();
    if (oldMember.presence.status == newMember.presence.status) return;
    if (newMember.id !== client.config.botID) return;

    const channel = guild.channels.find(c => c.name === client.config.channelName);
    

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
