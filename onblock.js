eventBus.subscribe("onBlock", (data) => {
	var xyz;
	nexusclient.sys.interruptRegex = /^(\w+)(\s+)(.+)(\s+)\((.*)channeling attack(.*)\)$/;
	nexusclient.sys.crystalHarvestedRegex = /^After meticulous and exacting labor, you finish polishing .+ crystal, and it drops free into your hand, pulsing with a soft, internal glow\.$/;
	// iterate over all lines of the received block
	for (var l of data) {
		if (l.line !== "" && l.line !== undefined) {
		var line = l.parsed_line.text();

		if (line === "You have recovered your balance.") {
			nexusclient.sys.onBal();
			continue;
		}
		if (((xyz = /You have slain (.+)\./.exec(line)) !== null) ||
			((xyz = /As (.+) perishes, you notice a facility security keycard drop from/.exec(line)) !== null) ||
			line === "The training dummy collapses to a useless pile of debris."
		) {
			if (xyz[1]) {
				nexusclient.sys.resetFreeze(xyz[1].toLowerCase());
			}			
		    nexusclient.sys.onKill();
			continue;
		}
		if (nexusclient.sys.isInterruptLine(line)) {
			nexusclient.sys.send("ih");
			continue;
		}
		if (line.includes("You collapse to the ground, killed")) {
			nexusclient.sys.onDeath();
			continue;
		}
		if (line === "The time distortion effect ends.") {
			nexusclient.sys.speedupHere = false;
			continue;
		}
		if (line === "The swirling point zero suddenly collapses into itself.") {
			nexusclient.sys.pzHere = false;
			continue;
		}
		if ((line === "Time has already been distorted at this location.") || (line === "Time has been strangely distorted here.")) {
			nexusclient.sys.speedupHere = true;
			continue;
		}
		if ((line === "Lifting your hand, you call upon the void within, seeking to form a sphere of absolute zero temperature, but realize there is one here already.") || (line === "Air swirls around a point of absolute coldness here.")) {
			nexusclient.sys.pzHere = true;
			continue;
		}
		if (line === "The vacuum sphere suddenly implodes, dragging you towards it.") {
			nexusclient.sys.vacsphere = false;
			continue;
		}
		if (line === "You break out of your frenzy." || line === "You can again whip yourself into a frenzy.") {
			var cds = nexusclient.sys.cooldowns;
			if (!nexusclient.sys.currentDefences.includes("Damage +25%") && !cds.includes("frenzy") && !nexusclient.sys.dontInterrupt) {
				nexusclient.sys.send("oblivion frenzy");
			}
			continue;
		}
		if ((xyz = /Intelligence reports indicate that (.+)\./.exec(line)) !== null) {
			nexusclient.sys.send("ftk " + xyz[1]);
			continue;
		}
		if (line === "[Mindsim]: WETWIRING REGEN COMPLETE." || line === "As you move, your wetwiring ceases regenerating your systems.") {
			nexusclient.sys.dontInterrupt = false;
			var cds = nexusclient.sys.cooldowns;
			if (!nexusclient.sys.currentDefences.includes("Damage +25%") && !cds.includes("frenzy")) {
				nexusclient.sys.send("oblivion frenzy");
			}
			continue;
		}
		if (line === "[Mindsim]: WETWIRING REGEN ACTIVATING.") {
			nexusclient.sys.dontInterrupt = true;
			continue;
		}
		if ((xyz = /Your nanites report that .+ wetwiring has cured a mind affliction\./.exec(line)) !== null) {
			nexusclient.sys.mindAffCount = nexusclient.sys.mindAffCount - 1;
			nexusclient.sys.combatInfo("MIND AFFS: " + nexusclient.sys.mindAffCount);
			continue;
		}
		if (line.includes("wetwiring is once again susceptible to rattling.")) {
			nexusclient.sys.canRattle = true;
			nexusclient.sys.combatInfo("CAN RATTLE AGAIN!");
			continue;
		}	
		if ((xyz = /Mind afflictions\:\s+(\d+)/.exec(line)) !== null) {
			nexusclient.sys.mindAffCount = parseInt(xyz[1]);
			nexusclient.sys.combatInfo("MIND AFFS: " + xyz[1]);
			continue;
		}
		if (line.includes("Your nanites are no longer enveloping")) {
			nexusclient.sys.tarEnveloped = false;
			nexusclient.sys.combatInfo("LOST ENVELOP ON TARGET!");
			continue;
		}
		if ((xyz = /You discern that the nanites have delivered (\w+), bringing the mind affliction total to (\d+)\./.exec(line)) !== null) {
			nexusclient.sys.mindAffCount = parseInt(xyz[2]);
			nexusclient.sys.combatInfo("MIND AFFS: " + xyz[2] + " | " + xyz[1]);
			continue;
		}
		if ((xyz = /Mind status\:\s+(\d+)\%/.exec(line)) !== null) {
			nexusclient.sys.mindSubsysDmg = 100 - parseInt(xyz[1]);
			nexusclient.sys.combatInfo("MIND SUBSYS DMG: " + nexusclient.sys.mindSubsysDmg);
			continue;
		}
		if ((xyz = /Freeze level\:\s+(\d+)/.exec(line)) !== null) {
			nexusclient.sys.combatInfo("FREEZE COUNT: " + xyz[1]);
			if (nexusclient.sys.analyzeTarget) {
				nexusclient.sys.freezeTracking[nexusclient.sys.analyzeTarget].count = parseInt(xyz[1]);
			}
			var affs = parseInt(nexusclient.sys.mindAffCount);
			var mind = parseInt(nexusclient.sys.mindSubsysDmg);
			if (affs >= 7 && mind >= 77) {
				nexusclient.sys.send("crt Target in Mindmelt range!")
			} else {
				var affsNeeded = 6 - affs;
				var mindNeeded = 75 - mind;
				nexusclient.sys.combatInfo("NEED AFFS: " + affsNeeded + " | NEED MIND DMG: " + mindNeeded);
			}
			continue;
		}
		if (line.includes("The group of nanites ceases disrupting")) {
			nexusclient.sys.ongoingMindswap = false;
			nexusclient.sys.combatInfo("MINDSWAP STOPPED!");
			continue;
		}
		if ((xyz = /^Subsystem Damage Dealt\: (\d+) (\w+), (.+)$/.exec(line)) !== null) {
			var subsysDmg = parseInt(xyz[1])/100;
			var subsysType = xyz[2];
			var subsysTar = xyz[3];
			if (subsysType == "mind") {
				nexusclient.sys.mindSubsysDmg = nexusclient.sys.mindSubsysDmg + subsysDmg;
			}
			nexusclient.sys.subsys.dmgDealt[subsysType] = subsysDmg + nexusclient.sys.subsys.dmgDealt[subsysType];
			nexusclient.sys.combatInfo("SUBSYS-DMG: " + subsysDmg + " " + subsysType + " | TOTAL: " + nexusclient.sys.subsys.dmgDealt[subsysType] + " | " + subsysTar);
			continue;
		}
		if ((xyz = nexusclient.sys.interruptRegex.exec(line)) !== null) {
			nexusclient.sys.chanTar = xyz[1];
			nexusclient.sys.interrupt = true;
			continue;
		}
		if (line.includes("The doors to the drone docking bay of your ship open")) {
			nexusclient.sys.shipDronesDeployed = true;
			nexusclient.sys.send("ship compress");
			continue;
		}
		if (line === "Your drones return to their docking bay as they cannot find any more gas.") {
			nexusclient.sys.shipDronesDeployed = false;
			continue;
		}
		if (nexusclient.sys.crystalHarvestedRegex.test(line)) {
			var playersHere = nexusclient._datahandler.GMCP.RoomPlayers;
			for (let item of nexusclient.sys.itemsHere) {
				if (item.name.includes("Ta-Deth crystal deposit") && playersHere.length == 0 && nexusclient.sys.modeTDHarvesting.value) {
					nexusclient.sys.send("harvest crystal");
					break;
				}
			}
			continue;
		}
		if (line === "A clandestine cloning bay." || line === "The shattered remains of a Vihana cloning room.") {
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
			if (!nexusclient.sys.sentFacInfo) {
				nexusclient.sys.send("crt Facility Boss: " + nexusclient.sys.currentFacilityBoss);
				nexusclient.sys.sentFacInfo = true;
				nexusclient.sys.send("facility status");
			}
			continue;
		}
		if (l.line.includes("[38;5;088;48;5;233m")) {
			nexusclient.sys.send("clan ophidiance tell " + line);
			continue;
		}
		if (line === "You enter the facility.") {
			nexusclient.sys.send("landmarks remember fac");
			nexusclient.sys.facilitySearchList = [];
			nexusclient.sys.modeSearching.value = false;
			nexusclient.sys.sentFacInfo = false;
			continue;
		}
		if (line === "You leave the facility.") {
			nexusclient.sys.send("landmarks forget fac");
			continue;
		}
		if (line === "You already know a landmark with that name.") {
			nexusclient.sys.send("landmarks forget fac");
			nexusclient.sys.send("landmarks remember fac");
			continue;
		}
		if (line.includes("moves in to attack you.")) {
			nexusclient._datahandler.send_GMCP("Char.Items.Room", "");
			continue;
		}
		if ((xyz = /Mobs in the facility have gained the (\w+) ability\./.exec(line)) !== null) {
			nexusclient.sys.send("crt New affix: " + xyz[1]);
			continue;
		}
		if ((xyz = /The Vihana in this Facility have the following affixes\: (\w+)\./.exec(line)) !== null) {
			nexusclient.sys.send("crt Current affix(es): " + xyz[1]);
			continue;
		}
		if ((xyz = /(.+) has cured the effects of Frozen\./.exec(line)) !== null) {
			nexusclient.sys.resetFreeze(xyz[1].toLowerCase());
			continue;
		}
		if ((xyz = /(.+) has cured some of the effects of Frozen\./.exec(line)) !== null) {
			nexusclient.sys.addFreeze(xyz[1].toLowerCase(), -1);
			continue;
		}
		if ((xyz = /crate(\d+)\s+a facility loot crate/.exec(line)) !== null) {
			nexusclient.sys.facilityCrateId = xyz[1];
			nexusclient.sys.info("Loot crate ID noted. LOOT CRATE to open.");
			continue;
		}
		if (line === "You are no longer in the throes of battle.") {
			nexusclient.sys.resetAllFreeze();
			continue;
		}

		if (line.includes("[NPCs]:")) {

			continue;
		}
		if (l.is_prompt) {
			var elev = line.match(/ground|mid|high/);
			if (elev !== null) {
				elev = elev[0];
				if (elev !== nexusclient.sys.elevation) {
					nexusclient.sys.elevation = elev;
					nexusclient.sys.updateCharvitals();
				}
			}
			continue;
		}
	}	}
}, "onBlock", true);

