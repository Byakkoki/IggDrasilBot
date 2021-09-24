const Discord = require("discord.js")

module.exports.run = (client, msg, args) => {
    msg.delete();
    if (!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) { return }

    if(args.length < 0) return;

    const channel = client.channels.cache.get('813368002241495060');

    const embed = new Discord.MessageEmbed()
        .setAuthor("🔔 Nouvelle annonce !")
        .setDescription(args.join(" "))
        .setFooter(`Écrit par : ${msg.author.username}`, msg.author.displayAvatarURL({format: "png"}))
        .setColor("#f03434")

    channel.send(embed).then(msg_ => {
        msg_.react("🔼");
        msg_.react("🔽");

        msg.channel.send(`Message envoyé ! \n*Dispo ici :* ${channel}`)
    });

}

module.exports.help = {
    name: "annonce"
}