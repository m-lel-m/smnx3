client.sys.gmcp = function(m, r) {
	if (m === "Char.Vitals") {
		client.sys.systems.forEach(function(sys){
			client.sys.sys.health[sys] = parseFloat(r[sys]);
			client.sys.sys.efficacy[sys] = parseFloat(r[sys+"_efficacy"]);
		});
		client.sys.bal = r.bal == "1" ? true : false;
		client.sys.wwBal = r.ww == "1" ? true : false;
		client.sys.hpperc = parseInt(r.hp)/parseInt(r.maxhp);
		client.sys.class = r.class;
		client.sys.prios = r.ww_prios;
		eval("client.sys.cooldowns = {"+r.cooldowns+"}");
		client.sys.sanity = r.sa;
		client.sys.nanites = r.nn;
	} else if (m === "Char.Defences.List") {
		client.sys.defslist = [];
		for (var i of r) { client.sys.defslist.push(i.desc); }
	} else if (m === "IRE.Target.Info") {
		client.sys.tarHealth = parseInt(r.hpperc.replace("%",""))
	}
	return false;	
}