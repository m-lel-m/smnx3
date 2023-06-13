nexusclient.sys.gmcp = function(m, r) {
	if (m === "Char.Vitals") {
		nexusclient.sys.systems.forEach(function(s){
			nexusclient.sys.subsys.health[s] = parseFloat(r[s]);
			nexusclient.sys.subsys.efficacy[s] = parseFloat(r[s+"_efficacy"]);
		});
		nexusclient.sys.bal = r.bal == "1" ? true : false;
		nexusclient.sys.wwBal = r.ww == "1" ? true : false;
		nexusclient.sys.hpperc = parseInt(r.hp)/parseInt(r.maxhp);
		nexusclient.sys.class = r.class;
		nexusclient.sys.prios = r.ww_prios;
		nexusclient.sys.cooldowns = nexusclient._datahandler.GMCP.Vitals.cooldowns;
		nexusclient.sys.sanity = r.sa;
		nexusclient.sys.nanites = r.nn;
		nexusclient.sys.canFrenzy = true;
		if (nexusclient._datahandler.GMCP.Vitals.ship_name != undefined) {
			nexusclient.sys.onShip = true;
			nexusclient.sys.shipsys.updateShipvitals();
		}
		else {
			nexusclient.sys.onShip = false;
			nexusclient.sys.updateCharvitals();
		}
		nexusclient.sys.updateButtonOne();
		nexusclient.sys.doAutoHeal();
	}

	if (m === "IRE.Target.Info") {
		
		nexusclient.sys.tarHealth = parseInt(r.hpperc.replace("%",""))
	}
  	if (m === "Char.Afflictions.List" || m === "Char.Afflictions.Add" || m === "Char.Afflictions.Remove") {
      	nexusclient.sys.affstring = nexusclient.sys.getCleanAffList(nexusclient._datahandler.GMCP.Afflictions).join(", ");
    }

	if (m === "Char.Items.List") {
		if (r.location !== "room") {return;}
		nexusclient.sys.itemsHere = [];
		r.items.forEach(function(el){
			for (var i in nexusclient.sys.itemsHere) {
				if (el.id === nexusclient.sys.itemsHere[i].id) {return;}
				}
			nexusclient.sys.itemsHere.push(el);
		});
		nexusclient.sys.calcTarsHere();
	}

	if (m === "Char.Items.Add") {
		if (r.location !== "room") {return;}
		for (var i in nexusclient.sys.itemsHere) {
		if (r.item.id === nexusclient.sys.itemsHere[i].id) {return;}
		nexusclient.sys.itemsHere.push(r.item);
		nexusclient.sys.calcTarsHere();
        }
	}

	if (m === "Char.Items.Remove") {
		if (r.location !== "room") {return;}
		for (var x in nexusclient.sys.itemsHere) {
			if (r.item.id === nexusclient.sys.itemsHere[x].id) {
				nexusclient.sys.itemsHere.splice(x,1);
				nexusclient.sys.calcTarsHere();
				return;
			}
		}
	}

	if (m === "Room.Info") {
		if (r.num !== nexusclient.sys.vnum) {
				nexusclient.sys.interrupt=false;
           		nexusclient.sys.vacsphere = false;
          		nexusclient.sys.onRoomChange(r);
			}
		nexusclient.sys.vnum = r.num
	}

	if (m === "Comm.Channel.Players") {
		const playerList = Object.values(r).map(object => object.name);
		if (!nexusclient.sdb.old_online) { nexusclient.sdb.old_online = []; }
		nexusclient.sdb.old_online = nexusclient.sdb.new_online;
		nexusclient.sdb.new_online = playerList;
		let oldList = nexusclient.sdb.old_online;
		let newList = nexusclient.sdb.new_online;

		let logouts = oldList.filter(x => !newList.includes(x));
		let logins = newList.filter(x => !oldList.includes(x));

		if (logins.length > 0) { 
			nexusclient.sdb.functions.lookupArray(logins);
			nexusclient.display_notice("Logged In: "+logins.join(", "), "yellow");
		}
		if (logouts.length > 0) { 
			nexusclient.sdb.functions.lookupArray(logouts);
			nexusclient.display_notice("Logged Out: "+logouts.join(", "), "yellow");
		}
	}

	if (m === "Comm.Channel.Text") {
		var chan = r.channel;
		if (chan.includes("tell")) { var chan = "tells"; }
		var msg = nexusclient.sys.stripAnsiCodes(r.text);
		nexusclient.sys.webhookMap(chan, msg);
	}

  	if (m === "IRE.CombatMessage") {
        nexusclient.sys.parseCombatMessage(r);
    }

	return false;	
}

nexusclient.sys.parseCombatMessage = function(r) {
	for (let msg in r) {
		msg = msg.toLowerCase();
		var caster = r[msg].caster;
		var target = r[msg].target;
		break;
	}
	switch (msg) {
	case "nanotech eyestrike":
	case "neural blinder":
		nexusclient.sys.interrupt = false;
		break;
	case "void vacuumsphere":
		nexusclient.sys.vacsphere = true;
		break;
	case "nanotech sluggish":
		nexusclient.sys.hasSluggish = true;
		break;
	case "nanotech mindswap start":
		nexusclient.sys.ongoingMindswap = true;
		break;
	case "nanotech envelop":
		nexusclient.sys.tarEnveloped = true;
		break;
	case "void rattle":
		nexusclient.sys.canRattle = false;
		break;
	case "nanotech sluggish fail":
		nexusclient.sys.hasDistract = false;
		break;
	case "oblivion speedup":
		nexusclient.sys.speedupHere = true;
		break;
	case "void point zero":
		nexusclient.sys.pzHere = true;
		break;
	case "voidism embrace":
		nexusclient.sys.sentHeal = false;
	default:
	}
	if (msg.includes("-> distraction")) {
		nexusclient.display_notice("Opponent has distraction! Can attempt to inflict sluggish!", 'red');
		nexusclient.mml.hasDistract = true;
		return;
	}
  	if (msg.includes("distraction ->")) {
      	nexusclient.display_notice("Opponent lost distraction!", 'red');
      	nexusclient.mml.hasDistract = false;
      	return;
    }
  	if (msg.includes("sluggish ->")) {
      	nexusclient.display_notice("Opponent lost sluggish!", 'red');
      	nexusclient.mml.hasSluggish = false;
      	return;
    }
    var myName = nexusclient._datahandler.GMCP.Status.first_name;
    if (msg === "void freeze" && myName == caster) {
    	target = target.toLowerCase();
    	nexusclient.sys.addFreeze(target, 1);
    	nexusclient.sys.showFreezeCount(target);
    	return;
    }
    if (msg === "void roomdrain" && myName == caster) {
    	for (var a of nexusclient.sys.itemsHere) {
    		if (a.attrib == "m") {
    			nexusclient.sys.addFreeze(a.name.toLowerCase(), 3);
    		}
    	}
    	for (var p of nexusclient._datahandler.GMCP.RoomPlayers) {
    		nexusclient.sys.addFreeze(p, 3);
    	}
    }
}