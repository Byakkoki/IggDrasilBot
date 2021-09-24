const Discord = require("discord.js")

module.exports.run = (client, msg, args) => {
    msg.delete();
    if (!msg.guild.member(msg.author).hasPermission('BAN_MEMBERS')) {
        return
    }

    const embed = new Discord.MessageEmbed()
        .setAuthor("Règlement de IggDrasil")
        .setDescription("\n" +
            "__**☼ → RÈGLEMENT GÉNÉRAL :**__\n" +
            "\n" +
            "• Tous les pseudos, images ou propos insultants, discriminatoires, et à caractères sexuels sont formellement **INTERDITS**.\n" +
            "• Le harcèlement, la menace, et la divulgation d'informations personnelles sont **INTERDITS**.\n" +
            "• Le spam, flood, la provocation, et les messages en toutes majuscules, sont **INTERDITS**.\n" +
            "• L'abus de mention que ce soit de rôle ou de membre est **INTERDIT**.\n" +
            "• Toute publicité (lien, invitation, chaîne Twitch / YouTube, etc...) non-autorisée par le @🔥| Game Master  est **INTERDITE**.\n" +
            "• Tous les propos racistes, homophobes, misogynes, que ce soit à l'écrit ou à l'oral sont **INTERDITS**.\n" +
            "\n" +
            "__**☼ → RÈGLEMENT SERVEUR :**__\n" +
            "\n" +
            "• Le cheat, les use-bugs, ou toute autre aide externe au jeu afin de vous donner un avantage est lourdement sanctionnable.\n" +
            "• Toute découverte de bug doit être signalée au Staff afin que l'équilibre entre joueurs soit respecté, vous pouvez même être récompensé si le bug était inconnu.\n" +
            "• La vente d'objet In Game contre de l'argent IRL est formellement interdite, et sanctionnable d'un bannissement **DÉFINITIF** pour les deux joueurs.\n" +
            "• Les arnaques sont interdites pour éviter le manque de FairPlay et mettre en avant le RP, n'hésitez pas à prendre des captures d'écran ou de filmer lors d'un échange.\n" +
            "\n" +
            "__**☼ → RÈGLEMENT DES CANAUX :**__\n" +
            "\n" +
            "• Les commandes de bots sont à envoyer dans le canal <#813371871646056469>.\n" +
            "• Pour parler avec d'autres personne en vocal mais sans micro, vous êtes priés d'écrire dans <#813370396304867329>.\n" +
            "• Vous pouvez rejoindre les canaux publics comme vous le souhaitez. Le tout dans un respect absolu d'entre-soi.\n" +
            "\n" +
            "***Pour avoir accès aux autres channels du Discord, vous êtes priés d'ajouter la réaction :white_check_mark:.***\n" +
            "\n" +
            "Merci de votre présence et de votre compréhension, **IggDrasil France**.")

        .setFooter("IggDrasil | 2021", "https://cdn.discordapp.com/attachments/812467342294515732/813494823083442226/logo.png")
        .setColor("#f03434")

    msg.channel.send(embed).then(m => {
        m.react("✅");
    });


}

module.exports.help = {
    name: "regles"
}