nexusclient.sys.trigger = function(c) {
	if (c === "You have recovered your balance.") {
		nexusclient.sys.onBal(); 
	}
	if (c.includes("You have slain")) {
		nexusclient.sys.onKill();
	}
	if (nexusclient.sys.isInterruptLine(c)) {
		nexusclient.sys.send("ih");
	}
	if (c.includes("You collapse to the ground, killed")) {
		nexusclient.sys.onDeath();
	}
	if (c === "You can once again embrace the surrounding energies.") {
		nexusclient.sys.onHealBalGained();
	} 
	return false;
}

nexusclient.sys.echoTrigger = function(r) {
	display_notice(r);
	nexusclient.sys.trigger(r);
}

nexusclient.sys.trigger(args[1]);