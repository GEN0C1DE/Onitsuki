module.exports = async (Bot, Member) => { 
	return new EventsFunctions().GuildMemberAdd(Bot, Member)
}
