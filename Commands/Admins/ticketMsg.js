const Discord = require("discord.js")

module.exports.run = (client, msg, args) => {
    msg.delete();
    if (!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) { return }

    const r_annonce = msg.guild.roles.cache.get('813374089959571476');
    const r_spoil = msg.guild.roles.cache.get('813374068626817094');
    const r_sond = msg.guild.roles.cache.get('814147816473231380');

    const embed = new Discord.MessageEmbed()
        .setAuthor(`📚 - Support d'IggDrasil.`)
        .setDescription(`Bienvenue sur le support, pour créer un ticket d'aide , cliquez sur la réaction ci dessous. Suite à ça , expliquez votre problème et un membre de notre équipe vous répondra au plus vite.Tout abus/spam sera sanctionné.`)
        .setFooter("IggDrasil | 2021", "https://cdn.discordapp.com/attachments/812467342294515732/813494823083442226/logo.png")
        .setColor("#f03434");

    msg.channel.send(embed).then(m => {
        m.react("🔐");
    })
}

module.exports.help = {
    name: "ticket_msg"
}