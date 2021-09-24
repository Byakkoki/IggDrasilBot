const Discord = require("discord.js");

module.exports.run = (client, message, args) => {

    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("<:no:754310479924428930> Vous n'avez pas la permission !").catch(console.error);

    if(!args[0]) return message.channel.send("<:no:754310479924428930> Vous devez spécifier le nombre de message à surprimer");

    if(isNaN(args[0])) return message.channel.send("<:no:754310479924428930> Veuillez spécifier un nombre !");

    message.delete()
    message.channel.bulkDelete(args[0]);

    message.channel.send(`${args[0]} messages ont été supprimés !`).then(msg => msg.delete({ timeout: 1500 }))
};

module.exports.help = {
    name: "clear",
    category: "`👮‍♂️` Modération",
    description: "Permets de supprimer des messages",
    usage: "/clear `[nmbr de messages]`"
};
