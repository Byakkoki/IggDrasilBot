const Discord = require('discord.js')

module.exports = (client, member) => {
    if(member.bot) return;

    const embed = new Discord.MessageEmbed()
        .setAuthor(`Bienvenue à ${member.displayName} sur IggDrasil !`)
        .setDescription(`Vas accepter le réglement ici : <#797857182531846174>, \nEt amuse toi bien chez nous !`)
        .setThumbnail(member.user.displayAvatarURL({format: "png"}))
        .setFooter("IggDrasil | 2021", "https://cdn.discordapp.com/attachments/812467342294515732/813494823083442226/logo.png")
        .setColor("RANDOM");

    const channel = client.channels.cache.get('797857055926124604');

    channel.send(embed)
}