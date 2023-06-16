eventBus.subscribe("Char.Vitals", (data) => {
	nexusclient.sys.systems.forEach(function(s){
		nexusclient.sys.subsys.health[s] = parseFloat(data[s]);
		nexusclient.sys.subsys.efficacy[s] = parseFloat(data[s+"_efficacy"]);
		});
	nexusclient.sys.bal = data.bal == "1" ? true : false;
	nexusclient.sys.wwBal = data.ww == "1" ? true : false;
	nexusclient.sys.hpperc = parseInt(data.hp)/parseInt(data.maxhp);
	nexusclient.sys.class = data.class;
	nexusclient.sys.prios = data.ww_prios;
	nexusclient.sys.cooldowns = nexusclient._datahandler.GMCP.Vitals.cooldowns;
	nexusclient.sys.sanity = data.sa;
	nexusclient.sys.nanites = data.nn;
	nexusclient.sys.canFrenzy = true;
	if (data.ship_name != undefined) {
		nexusclient.sys.onShip = true;
		nexusclient.sys.updateShipvitals();
	}
	else {
		nexusclient.sys.onShip = false;
		nexusclient.sys.updateCharvitals();
	}
	nexusclient.sys.updateButtonOne();
	nexusclient.sys.doAutoHeal();
}, "onCharVitals", true);

eventBus.subscribe("Char.Status", (data) => {
	
}, "onCharStatus", true);

eventBus.subscribe("Char.Afflictions.List", (data) => {
	nexusclient.sys.affstring = nexusclient.sys.getCleanAffList(nexusclient._datahandler.GMCP.Afflictions).join(", ");
}, "onAfflictionsList", true);

eventBus.subscribe("Char.Afflictions.Add", (data) => {
	nexusclient.sys.affstring = nexusclient.sys.getCleanAffList(nexusclient._datahandler.GMCP.Afflictions).join(", ");
}, "onAfflictionsAdd", true);

eventBus.subscribe("Char.Afflictions.Remove", (data) => {
	nexusclient.sys.affstring = nexusclient.sys.getCleanAffList(nexusclient._datahandler.GMCP.Afflictions).join(", ");
}, "onAfflictionsRemove", true);

eventBus.subscribe("Char.Defences.List", (data) => {
	nexusclient.sys.currentDefences = Object.values(data).map(object => object.desc);
}, "onDefencesList", true);

eventBus.subscribe("Char.Defences.Add", (data) => {
	if (!nexusclient.sys.currentDefences.includes(data.desc)) {
    		nexusclient.sys.currentDefences.push(data.desc);
    	}
}, "onDefencesAdd", true);

eventBus.subscribe("Char.Defences.Remove", (data) => {
	
}, "onDefencesRemove", true);

eventBus.subscribe("Char.Items.List", (data) => {
	if (data.location !== "room") {return;}
		nexusclient.sys.itemsHere = [];
		data.items.forEach(function(el){
			for (var i in nexusclient.sys.itemsHere) {
				if (el.id === nexusclient.sys.itemsHere[i].id) {return;}
				}
			nexusclient.sys.itemsHere.push(el);
		});
		nexusclient.sys.calcTarsHere();
}, "onItemsList", true);

eventBus.subscribe("Char.Items.Add", (data) => {
	if (data.location !== "room") {return;}
		for (var i in nexusclient.sys.itemsHere) {
		if (data.item.id === nexusclient.sys.itemsHere[i].id) {return;}
		nexusclient.sys.itemsHere.push(data.item);
		nexusclient.sys.calcTarsHere();
        }
}, "onItemsAdd", true);

eventBus.subscribe("Char.Items.Remove", (data) => {
	if (data.location !== "room") {return;}
		for (var x in nexusclient.sys.itemsHere) {
			if (data.item.id === nexusclient.sys.itemsHere[x].id) {
				nexusclient.sys.itemsHere.splice(x,1);
				nexusclient.sys.calcTarsHere();
				return;
			}
		}
}, "onItemsRemove", true);

eventBus.subscribe("Room.Info", (data) => {
	if (data.num !== nexusclient.sys.vnum) {
		nexusclient.sys.interrupt=false;
        nexusclient.sys.vacsphere = false;
        nexusclient.sys.onRoomChange(data);
		}
	nexusclient.sys.vnum = data.num;
}, "onRoomInfo", true);

eventBus.subscribe("Room.Players", (data) => {
	
}, "onRoomPlayers", true);

eventBus.subscribe("Room.AddPlayer", (data) => {
	
}, "onRoomAddPlayer", true);

eventBus.subscribe("Room.RemovePlayer", (data) => {
	
}, "onRoomRemovePlayer", true);

eventBus.subscribe("Comm.Channel.Players", (data) => {
	const playerList = Object.values(data).map(object => object.name);
	if (!nexusclient.sdb.old_online) { nexusclient.sdb.old_online = []; }
	nexusclient.sdb.old_online = nexusclient.sdb.new_online;
	nexusclient.sdb.new_online = playerList;
	let oldList = nexusclient.sdb.old_online;
	let newList = nexusclient.sdb.new_online;
	let logouts = oldList.filter(x => !newList.includes(x));
	let logins = newList.filter(x => !oldList.includes(x));
	if (logins.length > 0) { 
		nexusclient.sdb.functions.lookupArray(logins);
		nexusclient.sys.playerTraffic("Logged In: "+logins.join(", "));
	}
	if (logouts.length > 0) { 
		nexusclient.sdb.functions.lookupArray(logouts);
		nexusclient.sys.playerTraffic("Logged Out: "+logouts.join(", "));
	}
}, "onCommChannelPlayers", true);

eventBus.subscribe("Comm.Channel.Text", (data) => {
	var chan = data.channel;
	if (chan.includes("tell")) { var chan = "tells"; }
	var msg = nexusclient.sys.stripAnsiCodes(data.text);
	nexusclient.sys.webhookMap(chan, msg);
}, "onCommChannelText", true);

eventBus.subscribe("IRE.CombatMessage", (data) => {
	var caster;
	var target;
	for (var msg in data) {
		msg = msg.toLowerCase();
		var caster = data[msg].caster;
		var target = data[msg].target;
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
		break;
	default:
	}
	if (msg.includes("-> distraction")) {
		nexusclient.sys.combatInfo("Opponent has distraction! Can attempt to inflict sluggish!");
		nexusclient.hasDistract = true;
		return;
	}
  	if (msg.includes("distraction ->")) {
      	nexusclient.sys.combatInfo("Opponent lost distraction!");
      	nexusclient.hasDistract = false;
      	return;
    }
  	if (msg.includes("sluggish ->")) {
      	nexusclient.sys.combatInfo("Opponent lost sluggish!");
      	nexusclient.hasSluggish = false;
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
    		if (a.name.includes("Overseer") || a.name.includes("Amaka")) {
    			nexusclient.sys.addFreeze(a.name.toLowerCase(), 3);
    			return;
    		}
    	}
    	for (var p of nexusclient._datahandler.GMCP.RoomPlayers) {
    		nexusclient.sys.addFreeze(p, 3);
    	}
    }
}, "onCombatMessage", true);





nexusclient.sys.reset = function() {
	nexusclient.sys.mindAffCount = 0;
	nexusclient.sys.hasDistract = false;
	nexusclient.sys.hasSluggish = false;
	nexusclient.sys.mindSubsysDmg = 0;
	nexusclient.sys.ongoingMindswap = false;
}

nexusclient.sys.onKill = function() {
	nexusclient.sys.reset();
	nexusclient.sys.tarEnveloped = false;
  	nexusclient.sys.auto = false;
}

nexusclient.sys.onDeath = function() {
  	nexusclient.sys.reset();
  	nexusclient.sys.tarEnveloped = false;
  	nexusclient.sys.canRattle = true;
  	nexusclient.sys.auto = false;
}

nexusclient.sys.addMindSubsysDmg = function(amt) {
  nexusclient.sys.mindSubsysDmg = nexusclient.sys.mindSubsysDmg + amt;
  var m = nexusclient.sys.mindSubsysDmg;
  gag_current_line();
  display_notice("[MIND-DMG] ",'cyan','',amt,'white',''," DEALT",'gray',''," | ",'white','',m,'cyan',''," TOTAL ", 'gray', '');
}

nexusclient.sys.addMindAffCount = function(amt) {
  nexusclient.sys.mindAffCount = to_number(nexusclient.sys.mindAffCount) + to_number(amt);
  var a = nexusclient.sys.mindAffCount;
  display_notice("[MIND-AFF] ",'cyan','',a,'white',''," TOTAL",'gray','');
}

nexusclient.sys.updateMindAff = function(tot) {
  nexusclient.sys.mindAffCount = tot;
  var a = nexusclient.sys.mindAffCount;
  display_notice("[MIND-AFF] ",'cyan','',a,'white',''," TOTAL",'gray','');
}
