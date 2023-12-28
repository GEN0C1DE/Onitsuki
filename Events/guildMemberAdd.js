module.exports = async (Bot, Member) => { 
	return new EventsFunctions().GuildMemberExecution(Bot, Member, true)
}
