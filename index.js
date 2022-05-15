var discord = require("discord.js");
var Client = new discord.Client({
    intents: [
        discord.Intents.FLAGS.GUILDS,
        discord.Intents.FLAGS.GUILD_MESSAGES,
        discord.Intents.FLAGS.DIRECT_MESSAGES,
        discord.Intents.FLAGS.GUILD_MEMBERS,
    ],
});

const prefix = "$";

Client.on("ready", () => {
    console.log("BOT ON");
});

// MEMBRE REJOINT
Client.on("guildMemberAdd", (member) => {
    console.log("un membre vient d'arrivé sur le serveur");
    Client.channels.cache
        .get("927975884797927526")
        .send(`<@${member.id}> est arrivé sur le serveur de clovis !!`);
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
            .addField("__$droulette__", "Se désinscrire de la roulette");
        Message.channel.send({ embeds: [embed] });
    }
});

//ROULETTE
Client.on("messageCreate", (Message) => {
    if (Message.content === prefix + "iroulette") {
        if (Message.member.roles.cache.has("974746643285016656"))
            return Message.channel.send(
                `<@${Message.member.id}> tu es déjà inscris ! !!`
            );
        Message.member.roles
            .add("974746643285016656")
            .then(
                Message.channel.send(
                    `<@${Message.member.id}> s'est bien inscrit à la roulette !!`
                )
            );
    } else if (Message.content === prefix + "droulette") {
        if (Message.member.roles.cache.has("974746643285016656"))
            return Message.member.roles
                .remove("974746643285016656")
                .then(
                    Message.channel.send(
                        `<@${Message.member.id}> s'est bien desinscrit de la roulette !!`
                    )
                );
        else
            return Message.channel.send(
                `<@${Message.member.id}> tu n'es pas inscris !!`
            );
    } else if (Message.content === prefix + "lroulette") {
        MemberWithRole = Message.member.roles.cache.has("974746643285016656");
        Message.channel.send(`@${MemberWithRole}`);
    }
});

Client.login(
    "OTc0Njc1OTg1MTk2ODEwMjkw.GSCiVO.OcX_0HBKreTfuvaj5wxqJMpvk399ECj9cO658Y"
);