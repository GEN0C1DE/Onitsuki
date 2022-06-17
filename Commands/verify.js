module.exports = {
  NAME: "verify",
  DESCRIPTION: "This will verify a member who has recently joined the server if you have permission.",
  OPTIONS: [
  {
	  name: "user",
	  description: "The user you want to verify in the server!",
	  required: true,
	  type: Dependencies.Discord.Constants.ApplicationCommandOptionTypes.USER
  }
  ],
  EXECUTE: function(Interaction, Options) {
	function ErrorMessage(Message) {
		Interaction.reply({content: `${Message}`})
		return setTimeout(() => Interaction.deleteReply(), 10000)
	}
	if (!Interaction.member.permissions.has(Dependencies.Discord.Permissions.FLAGS.ADMINISTRATOR)) {
		return ErrorMessage(":x: `COMMAND IS UNAVAILABLE FOR YOU.`")
	} else {
		let MemberToRole = Options.getMember("user")
		let Role = BOTServer.roles.cache.get(BOTRoleID) 
		if (Role) {
			if (MemberToRole.permissions.has(Dependencies.Discord.Permissions.FLAGS.ADMINISTRATOR)) {
				return ErrorMessage(":x: `UNABLE TO PERFORM COMMAND. MEMBER HAS ADMINISTRATIVE PERMISSIONS!`")
			} else {
				if (MemberToRole.roles.cache.has(BOTRoleID)) return ErrorMessage(":warning: `THIS USER ALREADY HAS THE ROLE`")
				MemberToRole.roles.add(Role, "VERIFIED WITH ONITSUKI AS PART OF SECURITY.")
				return ErrorMessage(":white_check_mark: `USER SUCCESSFULLY VERIFIED IN THE SERVER!`")
			}
		} else return ErrorMessage(`NO ROLE FOUND WITH ID ${BOTRoleID}`);
	}
  }
}
