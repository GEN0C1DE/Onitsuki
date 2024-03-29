class EventFunctions {
	async Error(Error) {
		console.error(`${BOTName}SERVER: Encountered an error: ${Error}`)
	}
	async Ready() {
		console.log(`${BOTName}SERVER: System Runner Online. Logging in Users.`)
		BOT.user.setActivity(BOTStatus, {type: BOTType, url: `https://twitch.tv/${BOTName}`})
		
		if (BOT.guilds.cache.get(BOTServerID)) {
			global.BOTServer = BOT.guilds.cache.get(BOTServerID)
			if (BOTServer) {
				if (BOTServer.channels.cache.get(BOTChannelID)) {
					global.BOTChannel = BOTServer.channels.cache.get(BOTChannelID)
				} else {
					return this.Error("CHANNEL NOT FOUND IN SERVER.");
				}
			} else return this.Error("SERVER NOT FOUND ON BOT.");

			await Runner.RegisterCommands(BOT, Runner.Directories.Commands)
		}
	}
	async Message(Bot, Message) {
		if (Message.author.bot) return;
	}
	async InteractionCreate(Bot, Interaction) {
		if (!Interaction.isCommand()) return;
		const { commandName, options } = Interaction

		const Command = Bot.Commands.get(commandName)

		if (Command) {
			Command.EXECUTE(Interaction, options)
		}
	}
	async GuildMemberExecution(Bot, NewMember, Value) {
		if (!BOTSettings.GuildMemberAdd) return;
		NewMember.user.fetch().then(Member => {
			var ChartedNewMember = {
				Avatar: Member.avatarURL({ dynamic: true }),
				Banner: Member.bannerURL({ dynamic: true }),
				Bot: Member.bot,
				Username: Member.username,
				Joined: NewMember.joinedAt,
				Created: Member.createdAt,
				System: Member.system,
				Pending: NewMember.pending,
			}
			
			// Finish Discord Embed and Make Slash Command to Enable Verification of User being Roled.
			var DiscordEmbed = new Dependencies.Discord.MessageEmbed()
			
			if (Value == true) {
				DiscordEmbed.setAuthor({ name: `MEMBER JOINED.`, iconURL: `${BOT.user.avatarURL({ dynamic: true })}`, url: `${BOTUrl}` })
				DiscordEmbed.setDescription(`${ChartedNewMember.Username} is currently awaiting authentication to join the server. To verify, please use the slash command with the user selected, or manually role them.`)
				DiscordEmbed.addFields(
					{ name: "**IS MEMBER A BOT?**", value: `${ChartedNewMember.Bot}`, inline: true },
					{ name: "**IS MEMBER A SYSTEM?**", value: `${ChartedNewMember.System}`, inline: true },
					{ name: "**IS MEMBER PENDING COMPLETION?**", value: `${ChartedNewMember.Pending}`, inline: true },
					{ name: "**USER JOINED AT?**", value: `${ChartedNewMember.Joined}`, inline: true },
					{ name: "**USER CREATED AT?**", value: `${ChartedNewMember.Created}`, inline: true }
				)
			} else {
				DiscordEmbed.setAuthor({ name: `MEMBER EXITTED`,  iconURL: `${BOT.user.avatarURL({ dynamic: true })}`, url: `${BOTUrl}`})
				DiscordEmbed.setDescription(`${ChartedNewMember.Username} has left the server.`) // Most likely will add guild count afterwards.
			}
			
			DiscordEmbed.setColor(BOTColor)
			DiscordEmbed.setThumbnail(`${ChartedNewMember.Avatar}?size=512`) //.setImage(`${ChartedNewMember.Banner}?size=2048`)
			DiscordEmbed.setTimestamp();
			if (BOTChannel) BOTChannel.send({embeds: [DiscordEmbed]});
		}) 
	}
	
}

module.exports = EventFunctions
