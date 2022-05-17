var discord = require("discord.js");
var Client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
    ],
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
});
var playerList = [];
var userList = [];

const prefix = "$";

Client.on("ready", () => {
    console.log("BOT ON");
    Client.user.setStatus("dnd");
    Client.user.setActivity("Le vrai roi Clovis !", { type: "LISTENING" });
});

// MEMBRE REJOINT
Client.on("guildMemberAdd", (member) => {
    console.log("un membre vient d'arrivé sur le serveur");
    Client.channels.cache
        .get("927975884797927526")
        .send(`<@${member.id}> est arrivé sur le serveur de clovis !!`);
    member
        .createDM()
        .then(function(channel) {
            channel.send(
                "Bienvenue sur le serveur du roi Clovis :" + member.displayName
            );
        })
        .catch(console.error);
});

// MEMBRE QUITTE
Client.on("guildMemberRemove", (member) => {
    console.log("un membre vient de quitter le serveur");
    Client.channels.cache
        .get("927975884797927526")
        .send(`<@${member.id}> a quitté le serveur de clovis !!`);
});

Client.on("messageCreate", (Message) => {
    if (Message.author.bot) return;
    //$ping
    if (Message.content === prefix + "ping") {
        Message.channel.send("pong !");
    }
    //$help
    else if (Message.content === prefix + "help") {
        const embed = new discord.MessageEmbed()
            .setTitle("Liste des commandes :")
            .setAuthor(
                "Créateur du bot",
                "https://pbs.twimg.com/profile_images/1492648199999438848/ACZJAoOM_400x400.jpg",
                "https://twitter.com/wayleretour"
            )
            .setDescription("Vous pourrez y trouver la liste des commandes du bot !")
            .setThumbnail(
                "http://www.alex-bernardini.fr/histoire/images/clovis_Ier_Vig.jpg"
            )
            .addField("__$help__", "Liste des commandes du bot")
            .addField("__$ping__", "Vous renvoie pong")
            .addField("__$iroulette__", "S'inscrire à la roulette")
            .addField("__$droulette__", "Se désinscrire de la roulette")
            .addField("__$lroulette__", "Lance la roue du hasard !");
        Message.channel.send({ embeds: [embed] });
    }
});

//ROULETTE
Client.on("messageCreate", (Message) => {
    if (Message.content === prefix + "iroulette") {
        if (Message.member.roles.cache.has("974743398022017054"))
            return Message.channel.send(
                `:warning: <@${Message.member.id}> tu es déjà inscris !`
            );
        playerList.push(Message.author.id);
        userList.push(Message.author);
        Message.member.roles
            .add("974743398022017054")
            .then(
                Message.channel.send(
                    `:white_check_mark: <@${Message.member.id}> s'est bien inscrit à la roulette ! Participants :` +
                    userList
                )
            );
    } else if (Message.content === prefix + "droulette") {
        if (Message.member.roles.cache.has("974743398022017054"))
            return Message.member.roles
                .remove("974743398022017054")
                .then(
                    Message.channel.send(
                        `:x: <@${Message.member.id}> s'est bien désinscrit de la roulette !`
                    ),
                    playerList.shift(Message.author),
                    userList.shift(Message.author)
                );
        else
            return Message.channel.send(
                `:warning: <@${Message.member.id}> tu n'es pas inscris !`
            );
    } else if (Message.content === prefix + "lroulette") {
        if (playerList.length > 1) {
            const Role = Message.guild.roles.cache.get("974743398022017054");
            Role.members.forEach((member, i) => {
                setTimeout(() => {
                    member.roles.remove(Role);
                }, i * 1000);
            });
            var winner = playerList[Math.floor(Math.random() * playerList.length)];
            let user = Client.users.cache.get(winner);
            user.send("gg à toi gros bouffon :confetti_ball:");
            const embedroulette = new discord.MessageEmbed()
                .setThumbnail(
                    "https://www.pikpng.com/pngl/b/369-3699008_roulette-graphic-design-clipart.png"
                )
                .addField("Le grand gagnant est : ", user.username);
            Message.channel.send({ embeds: [embedroulette] });
            console.log(Message.author.username + " | FIN DE LA ROULETTE");
            //Message.channel.send(":confetti_ball: Le grand gagnant est : " + user.username + " :confetti_ball:");
            playerList = [];
            userList = [];
        } else
            Message.channel.send(
                ":warning: Il faut être au minimum 2 pour pouvoir lancer la roue !"
            );
    }
});

Client.login(
    "OTc0Njc1OTg1MTk2ODEwMjkw.GSCiVO.OcX_0HBKreTfuvaj5wxqJMpvk399ECj9cO658Y"
);