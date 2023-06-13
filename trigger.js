nexusclient.sys.trigger = function(c) {
	var l = nexusclient.current_line.line;
	nexusclient.sys.interruptRegex = /^(\w+)(\s+)(.+)(\s+)\((.*)channeling attack(.*)\)$/;
	let crystalHarvestedRegex = /^After meticulous and exacting labor, you finish polishing .+ crystal, and it drops free into your hand, pulsing with a soft, internal glow\.$/;

	if (c === "You have recovered your balance.") {
		nexusclient.sys.onBal(); 
		return;
	}
	if (c.includes("You have slain")) {
		nexusclient.sys.onKill();
		return;
	}
	if (nexusclient.sys.isInterruptLine(c)) {
		nexusclient.sys.send("ih");
		return;
	}
	if (c.includes("You collapse to the ground, killed")) {
		nexusclient.sys.onDeath();
		return;
	}
	if (c === "You can once again embrace the surrounding energies.") {
		// nexusclient.sys.onHealBalGained();
		return;
	} 
	if ((xyz = nexusclient.sys.interruptRegex.exec(c)) !== null) {
		nexusclient.sys.chanTar = xyz[1];
		nexusclient.sys.interrupt = true;
		return;
    }
    if (c === "You can again whip yourself into a frenzy.") {
      	nexusclient.sys.canFrenzy = true;
      	return;
    }
  	if (c === "The time distortion effect ends.") {
		nexusclient.sys.speedupHere = false;
		return;
	}
	if (c === "The swirling point zero suddenly collapses into itself.") {
		nexusclient.sys.pzHere = false;
		return;
	}
	if ((c === "Time has already been distorted at this location.") || (c === "Time has been strangely distorted here.")) {
		nexusclient.sys.speedupHere = true;
		return;
	}
	if ((c === "Lifting your hand, you call upon the void within, seeking to form a sphere of absolute zero temperature, but realize there is one here already.") || (c === "Air swirls around a point of absolute coldness here.")) {
		nexusclient.sys.pzHere = true;
		return;
    }
	if (c === "The vacuum sphere suddenly implodes, dragging you towards it.") {
    	nexusclient.sys.vacsphere = false;
    	return;
    }
    if (crystalHarvestedRegex.test(c)) {
    	nexusclient.sys.harvestCacheCrystal();
    }
    if (l.includes("A clandestine cloning bay") || l.includes("shattered remains of a Vihana cloning room")) {
      	var d = nexusclient._datahandler.GMCP.Location.desc;
      	if (d.includes("flesh dissolved down to the bone")) {
      		nexusclient.sys.currentFacilityBoss = "All-Seer";
        }
      	if (d.includes("brains sucked out of their skulls")) {
      		nexusclient.sys.currentFacilityBoss = "Inquisitor";
        }
      	if (d.includes("their entrails mixed with sticky black ichor")) {
      		nexusclient.sys.currentFacilityBoss = "Metalisk";
        }
        return;
    }
	if (nexusclient.current_line.is_prompt) {
      	var line_arr = nexusclient.current_line.parsed_line.chunks;
      	var e = nexusclient.sys.filterElevation(line_arr);
      	if (nexusclient.sys.elevation != e) {
      		nexusclient.sys.elevation = e;
      		if (nexusclient.sys.auto) { nexusclient.sys.onBal(); }
      		send_GMCP("Char.Items.Room", "");
      		nexusclient.sys.updateCharvitals();
        }
		if (nexusclient.sys.affstring) { display_notice(nexusclient.sys.affstring); }
		return;
    }
    	
	return false;
}

nexusclient.sys.echoTrigger = function(r) {
	display_notice(r);
	nexusclient.sys.trigger(r);
}