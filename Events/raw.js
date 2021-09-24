const voiceChannel = new Map();
const Discord = require('discord.js');
const humanizeDuration = require('humanize-duration');
const fs = require('fs')

module.exports = (client, packet) => {
    console.log(packet.t)
    if(packet.t === "MESSAGE_REACTION_ADD"){
        if(packet.d.channel_id === "813368612424908832"){
            let member;

            switch (packet.d.emoji.name) {
                case "📢":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const role = guild.roles.cache.get("813374089959571476");
                    member = guild.members.cache.get(packet.d.user_id);
                    if(!member.roles.cache.has(role.id)){
                        member.roles.add(role);
                    }
                    break;
                case "🔔":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const r_spoil = guild.roles.cache.get('813374068626817094');
                    member = client.guilds.cache.get('794668123948187668').members.cache.get(packet.d.user_id);
                    if(!member.roles.cache.has(r_spoil.id)){
                        member.roles.add(r_spoil);
                    }
                    break;
                case "📊":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const r_sond = guild.roles.cache.get('814147816473231380');
                    member = client.guilds.cache.get('794668123948187668').members.cache.get(packet.d.user_id);
                    if(!member.roles.cache.has(r_sond.id)){
                        member.roles.add(r_sond);
                    }
                    break;
            }
        } else if (packet.d.channel_id === "797857182531846174"){
            if(packet.d.emoji.name === "✅"){
                guild = client.guilds.cache.get(packet.d.guild_id);
                const verif = guild.roles.cache.get('813374043789066301');
                const verif2 = guild.roles.cache.get('813373539162783776');
                member = client.guilds.cache.get('794668123948187668').members.cache.get(packet.d.user_id);
                if(!member.roles.cache.has(verif.id)){
                    member.roles.add(verif);
                    member.roles.add(verif2);
                }
            }
        }


        if(packet.d.channel_id === "813369388094849065"){
            const channel2 = client.channels.cache.get(packet.d.channel_id);
            let user = client.users.cache.get(packet.d.user_id);
            channel2.messages.fetch(packet.d.message_id).then(msg => {
                msg.reactions.resolve("🔐").users.remove(user.id)
            });

            if (user.bot) { return; }

            if(client.ticket.has(user.id)){
                let channelID = client.ticket.get(user.id);
                const channel = client.channels.cache.get(channelID);
                user.send(`\`❌\` Vous possédez déjà un ticket (${channel})`);
                return;
            }
            channel2.messages.fetch(packet.d.message_id).then(message => {
                message.guild.channels.create(`ticket-#${Math.random().toString().slice(0,5)}`, { type: 'text' }).then(c => {
                    c.setParent("813368905443573782")
                    c.overwritePermissions([
                        {
                            id: message.guild.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                        {
                            id: "797856655475474452",
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                    ]);
                    c.setTopic(user.id)
                    client.ticket.set(user.id, c.id)
                    const supportRole = message.guild.roles.cache.get("797856655475474452");
                    const embed = new Discord.MessageEmbed()
                        .setAuthor(`📞 Bienvenue sur le support`)
                        .setDescription(`Bienvenue, veuillez expliquer votre problème *ou autre* avec brio. Une fois fait, un membre de notre équipe s'occupera de vous.`)
                        .setColor("#7B1636");
                    c.send(`${user} | ${supportRole}`,embed).then(msg => {
                        msg.react("❌")
                    });
                });
            })
        }

        const channel = client.channels.cache.get(packet.d.channel_id);
        if(channel.name.includes("ticket-")){
            channel.messages.fetch(packet.d.message_id).then(message => {
                if(message.embeds[0].author && message.embeds[0].author.name.includes("📞 Bienvenue sur le support")){
                    let member = message.guild.members.cache.get(packet.d.user_id);
                    if(member.user.bot){return}
                    if(member._roles.includes("813373539162783776")){
                        let data = `Transcription des messages du ${channel.name} :\n\n`;
                        let nm = 0;
                        channel.messages.fetch().then(messages => {
                            messages.forEach(msg => {
                                nm++;
                                console.log(nm + " / " + messages.size)
                                data = data + `${msg.author.username}#${msg.author.discriminator} : ${msg.content}\n`;
                                if(nm === messages.size){
                                    fs.writeFile(`./Tickets/${channel.name}.txt`, data, (err) => {
                                        if (err) throw err;
                                        const logs_channel = client.channels.cache.get("814153678038368336");
                                        logs_channel.send(`Transcription du \`${channel.name}\``, { files: [`./Tickets/${channel.name}.txt`] }).then(() => {
                                            fs.unlinkSync(`./Tickets/${channel.name}.txt`);
                                            console.log('kaka')
                                        });
                                    })
                                }
                            })
                        })
                        let timer = 5000;
                        const embed = new Discord.MessageEmbed()
                            .setDescription(`Chargement...`)
                            .setColor("#7B1636");
                        message.channel.send(embed).then(m => {
                            const interval = setInterval(function(){
                                timer = timer-2000;

                                const embed = new Discord.MessageEmbed()
                                    .setDescription(`Fermeture du ticket dans ${humanizeDuration(timer, { language: 'fr', round: true })}`)
                                    .setColor("#7B1636");
                                m.edit(embed)
                                if(timer <= 0){
                                    clearInterval(interval);
                                    message.channel.delete();
                                    client.ticket.delete(message.channel.topic)
                                }
                            }, 2000)
                        })
                    }
                }
            })
        }

    } else if(packet.t === "MESSAGE_REACTION_REMOVE"){

        if(packet.d.channel_id === "813368612424908832"){
            let member;

            switch (packet.d.emoji.name) {
                case "📢":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const role = guild.roles.cache.get("813374089959571476");
                    member = guild.members.cache.get(packet.d.user_id);
                    if(member.roles.cache.has(role.id)){
                        member.roles.remove(role);
                    }
                    break;
                case "🔔":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const r_spoil = guild.roles.cache.get('813374068626817094');
                    member = client.guilds.cache.get('794668123948187668').members.cache.get(packet.d.user_id);
                    if(member.roles.cache.has(r_spoil.id)){
                        member.roles.remove(r_spoil);
                    }
                    break;

                case "📊":
                    guild = client.guilds.cache.get(packet.d.guild_id);
                    const r_sond = guild.roles.cache.get('814147816473231380');
                    member = client.guilds.cache.get('794668123948187668').members.cache.get(packet.d.user_id);
                    if(member.roles.cache.has(r_sond.id)){
                        member.roles.remove(r_sond);
                    }
                    break;
            }
        }
    }

    if(packet.t === "VOICE_STATE_UPDATE") {
        if(packet.d.channel_id && packet.d.channel_id === "814148831448793100" && packet.d.user_id){
            const guild = client.guilds.cache.get(packet.d.guild_id)
            const member = guild.members.cache.get(packet.d.member.user.id)
            guild.channels.create(`🔒 | Salon de ${packet.d.member.nick ? packet.d.member.nick : packet.d.member.user.username}`,  {type: 'voice'}).then(c => {
                c.setParent("814148328974581801");
                c.overwritePermissions([
                    {
                        id: packet.d.member.user.id,
                        allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
                    },
                    {
                        id: guild.id,
                        deny: ['VIEW_CHANNEL']
                    },
                    {
                        id: 813373539162783776,
                        allow: ['VIEW_CHANNEL']
                    }
                ]);
                member.voice.setChannel(c.id);
                voiceChannel.set(c.id, packet.d.member.user.id);
            })
        } else {
            const guild = client.guilds.cache.get(packet.d.guild_id)
            const member = guild.members.cache.get(packet.d.member.user.id);
            if(voiceChannel.has(member.voice.channelID)){
                const channelId = member.voice.channelID
                setTimeout(function() {
                    const channel = guild.channels.cache.get(channelId);
                    if(channel.members.size < 1){
                        channel.delete();
                    }
                }, 1000)
            }
        }
    }
}