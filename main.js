// Discord Slash Interactive Commands
// Coded by GEN0C1DE. 

global.Dependencies = {
	Discord: require("discord.js"),
	FileSystem: require("fs"),
	Path: require("path")
}

class Onitsuki {
	constructor() {
		this.Directories = {
			Commands: Dependencies.Path.join(__dirname, "Commands"),
			Functions: Dependencies.Path.join(__dirname, "Functions"),
			Events: Dependencies.Path.join(__dirname, "Events"),
		}
		global.BOTName = ""
		global.BOT = undefined
		global.BOTToken = ""
		global.BOTServerID = ""
		global.BOTChannelID = ""
		global.BOTRoleID = ""
		global.BOTColor = "#ffffff"
		global.BOTType = "STREAMING"
		global.BOTStatus = "Slashing the opposition steadily. One by one."
		global.BOTUrl = "https://discord.gg/uVJX9An8Uf"
	}
	

	async RegisterFunctions(Directory) {
		var Functions = Dependencies.FileSystem.readdirSync(Directory).filter(file => file.endsWith('.js'))
		
		for (const file of Functions) {
			let FunctionName = file.split('.')[0]
			if (FunctionName == "SystemFunctions") continue;
			global[FunctionName] = require(`${Directory}/${file}`)
			console.log("Required File")
		}
	}
	async RegisterCommands(Bot, Directory) {
		let Commands = Dependencies.FileSystem.readdirSync(Directory).filter(file => file.endsWith('.js'))
		if (Commands.length == 0) return;
		
		let CUMMONDS
		if (BOTServer) {
			CUMMONDS = BOTServer.commands
		} else {
			CUMMONDS = BOT.application?.commands

		}

		for (const file of Commands) {
			const RequiredCommands = require(`${Directory}/${file}`);
			CUMMONDS?.create({
				name: RequiredCommands.NAME,
				description: RequiredCommands.DESCRIPTION,
				options: RequiredCommands.OPTIONS
			})
			Bot.Commands.set(RequiredCommands.NAME, RequiredCommands);
		}
	}
	async RegisterEvents(Bot, Directory) {
		var Events = Dependencies.FileSystem.readdirSync(Directory).filter(file => file.endsWith('.js'))
		
		for (const file of Events) {
			let EventName = file.split('.')[0]
			let Event = require(`${Directory}/${file}`)
			
			Bot.on(EventName, Event.bind(null, Bot))
		}
	}
	async CreateSystem() {
		if (BOTToken == undefined) return console.error(`${BOTName}SERVER: Cannot log into the system without a token.`)
		if (BOTServerID == undefined) return console.error(`${BOTName}SERVER: Cannot create user profiles without a Server ID.`)
		if (BOTChannelID == undefined) return console.error(`${BOTName}SERVER: Cannot log User Data without a Channel ID.`)
		if (BOT !== undefined) return console.error(`${BOTName}SERVER: Something is already in place of the System Bot.`)
			
		BOT = new Dependencies.Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS", "GUILD_MESSAGE_REACTIONS", "DIRECT_MESSAGES", "DIRECT_MESSAGE_REACTIONS"] })
		BOT.Commands = new Dependencies.Discord.Collection();
		
		// CREATING REGISTRY FOR EVENTS AND SLASH-COMMANDS.
		await this.RegisterFunctions(this.Directories.Functions)
		await this.RegisterEvents(BOT, this.Directories.Events)
		
		// LOGGING INTO THE CLIENT VIA DISCORD.JS
		BOT.login(BOTToken).catch(Error => {
			console.error(`${BOTName}SERVER: Something went wrong with logging into the Client. ${Error}`)
			process.exit(1)
		})
	}
}


global.Runner = new Onitsuki()
Runner.CreateSystem()
  
