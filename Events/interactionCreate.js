module.exports = async (Bot, Interaction) => { 
	return new EventsFunctions().InteractionCreate(Bot, Interaction)
}
