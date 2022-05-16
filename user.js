if (Message.content === prefix + "imembre ") {
    let user = Message.mention.users.first();
    const member = Message.guild.member.cache.get(user.id);

    const reponse = new MessageEmbed()
        .setAuthor(`Carte d'indentité de  + ${user.username}`, user.displayAvatarURL({ dynamic: true }))
        .setThumbnail(user.displayAvatarURL({ dynamic: true }))
        .addField("identifiant :", `${user.id}`, false)
        .addField("Roles :", `${member.roles.cache.map(r => r).join(` `).replace("@everyone", " ")}`)
        .addfield("Date d'arrivé : ", `${moment(member.joinedAt).format('MMMM Do YYYY, h:mm:ss a')}\n**-**${moment(member.joinedAt).startOf('day').fromNow()}`);
    Message.channel.send(reponse)
}