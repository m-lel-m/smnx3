// various utility functions

nexusclient.sys.send = function (cmd) {
    nexusclient.send_commands(cmd, 1);
};

nexusclient.sys.stripAnsiCodes = function(string) {
    return string.replace(/[\u001b\u009b][[()#;?]*(?:[0-9]{1,4}(?:;[0-9]{0,4})*)?[0-9A-ORZcf-nqry=><]/g, '');
}

nexusclient.sys.sendMsgToDiscord = function(webHookURL, message) {
	var xhr = new XMLHttpRequest();
        xhr.open("POST", webHookURL, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            'content': message,
            'username':'Sabika-Bot-N3',
        }));
}

nexusclient.sys.webhookMap = function(chan, msg) {
	var wh = nexusclient.sys.webhooklist;
	switch(chan) {
	case "say":
	case "emote":
	case "ooc":
		nexusclient.sys.sendMsgToDiscord(wh.rp, msg);
		break;
	case "tells":
		nexusclient.sys.sendMsgToDiscord(wh.rp, msg);
		break;
	case "ft":
		nexusclient.sys.sendMsgToDiscord(wh.scatterhome, msg);
		break;
	case "newbie":
		nexusclient.sys.sendMsgToDiscord(wh.newbie, msg);
		break;
	case "commerce":
		nexusclient.sys.sendMsgToDiscord(wh.commerce, msg);
		break;
	case "dt":
		nexusclient.sys.sendMsgToDiscord(wh.dt, msg);
		break;
	case "conflict":
		nexusclient.sys.sendMsgToDiscord(wh.conflict, msg);
		break;
	case "clt":
		nexusclient.sys.sendMsgToDiscord(wh.clans, msg);
		break;
	case "crew":
		nexusclient.sys.sendMsgToDiscord(wh.crew, msg);
		break;
	case "promo":
		nexusclient.sys.sendMsgToDiscord(wh.promo, msg);
		break;
	default:
		nexusclient.sys.info("No webhook in place for this comms message!");
	}
}