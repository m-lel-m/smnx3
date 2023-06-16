eventBus.subscribe("onBlock", (data) => {
	var xyz;
	nexusclient.sys.interruptRegex = /^(\w+)(\s+)(.+)(\s+)\((.*)channeling attack(.*)\)$/;
	nexusclient.sys.crystalHarvestedRegex = /^After meticulous and exacting labor, you finish polishing .+ crystal, and it drops free into your hand, pulsing with a soft, internal glow\.$/;
	// iterate over all lines of the received block
	for (let line of data) {
		line = nexusclient.sys.stripAnsiCodes(line.line);
		if (line.includes("You have slain")) {
			nexusclient.sys.onKill();
			break;
		}
		if (nexusclient.sys.isInterruptLine(line)) {
			nexusclient.sys.send("ih");
			break;
		}
		if (line.includes("You collapse to the ground, killed")) {
			nexusclient.sys.onDeath();
			break;
		}
		if (line === "The time distortion effect ends.") {
			nexusclient.sys.speedupHere = false;
			break;
		}
		if (line === "The swirling point zero suddenly collapses into itself.") {
			nexusclient.sys.pzHere = false;
			break;
		}
		if ((line === "Time has already been distorted at this location.") || (line === "Time has been strangely distorted here.")) {
			nexusclient.sys.speedupHere = true;
			break;
		}
		if ((line === "Lifting your hand, you call upon the void within, seeking to form a sphere of absolute zero temperature, but realize there is one here already.") || (line === "Air swirls around a point of absolute coldness here.")) {
			nexusclient.sys.pzHere = true;
			break;
		}
		if (line === "The vacuum sphere suddenly implodes, dragging you towards it.") {
			nexusclient.sys.vacsphere = false;
			break;
		}
		if ((xyz = nexusclient.sys.interruptRegex.exec(line)) !== null) {
			nexusclient.sys.chanTar = xyz[1];
			nexusclient.sys.interrupt = true;
			break;
		}
		if (nexusclient.sys.crystalHarvestedRegex.test(line)) {
			nexusclient.sys.harvestCacheCrystal();
			break;
		}
		if (line.includes("A clandestine cloning bay") || line.includes("shattered remains of a Vihana cloning room")) {
			let d = nexusclient._datahandler.GMCP.Location.desc;
			if (d.includes("flesh dissolved down to the bone")) {
				nexusclient.sys.currentFacilityBoss = "All-Seer";
			}
			if (d.includes("brains sucked out of their skulls")) {
				nexusclient.sys.currentFacilityBoss = "Inquisitor";
			}
			if (d.includes("their entrails mixed with sticky black ichor")) {
				nexusclient.sys.currentFacilityBoss = "Metalisk";
			}
		}
	}

	// get the last line in the block - this hopefully is always prompt (and if not then try to make it be)
	let prompt = data[data.length - 1];
	if (prompt.is_prompt) {
		// get elevation as from prompt
		nexusclient.sys.elevation = Object.values(prompt.parsed_line.chunks).map(object => object._txt).filter(item => item !== undefined)[1].replace('[','').replace(']','');
	}
	
}, "onBlock", true);

