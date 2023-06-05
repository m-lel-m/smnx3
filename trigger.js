nexusclient.sys.trigger = function(c) {
	var res;
	if (c === "You have recovered your balance.") nexusclient.sys.onBal();
	else if (c.includes("You have slain")) {
		nexusclient.sys.onKill();
	}
	else if (nexusclient.sys.isInterruptLine(c)) {
		nexusclient.sys.send("ih");
	} else if (c.includes("You collapse to the ground, killed")) {
		nexusclient.sys.onDeath();
	} else if (c === "You can once again embrace the surrounding energies.") {
		nexusclient.sys.onHealBalGained();
	} 
	return false;
}

nexusclient.sys.echoTrigger = function(r) {
	display_notice(r);
	nexusclient.sys.trigger(r);
}