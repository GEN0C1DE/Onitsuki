module.exports = {
  NAME: "help",
  DESCRIPTION: "This will display a embed containing information about staff, organization, and server.",
  OPTIONS: [],
  EXECUTE: function(Interaction, Options) {
	var DiscordEmbed = new Dependencies.Discord.MessageEmbed()
	.setTitle('**ONITSUKI HELP MENU**')
	.setDescription('*WELCOME TO THE HELP MENU FOR ONITSUKI. BELOW DISPLAYS ANY INFORMATION ABOUT THE SERVER, AND THE COMMANDS IT HOLDS.*')
	.setColor(BOTColor)
	.setThumbnail(BOT.guilds.resolve(BOTServerID).members.resolve(BOT.user.id).user.avatarURL())
	.setImage("https://i.pinimg.com/600x315/a5/30/21/a53021b57246780a94306c694b05f0b9.jpg")
	.addFields(
		{ name: '**DEVELOPER**', value: `*x695*`, inline: false},
		{ name: '**CREATED?**', value: `*12 MARCH 2022.*`, inline: true},
		{ name: '**CAPACITY?**', value: `*LOW.*`, inline: true},
		{ name: '**BOT STATUS**', value: `*VERSION: 0.001 WIP.*`, inline: true}
	)		
	.setFooter('*This menu will be deleted in 30 seconds.*')
	.setTimestamp();
	Interaction.reply({ embeds: [DiscordEmbed] })
	return setTimeout(() => Interaction.deleteReply(), 30000)

  }
}
