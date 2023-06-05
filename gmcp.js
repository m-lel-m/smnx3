nexusclient.sys.gmcp = function(m, r) {
	if (m === "Char.Vitals") {
		nexusclient.sys.systems.forEach(function(sys){
			nexusclient.sys.sys.health[sys] = parseFloat(r[sys]);
			nexusclient.sys.sys.efficacy[sys] = parseFloat(r[sys+"_efficacy"]);
		});
		nexusclient.sys.bal = r.bal == "1" ? true : false;
		nexusclient.sys.wwBal = r.ww == "1" ? true : false;
		nexusclient.sys.hpperc = parseInt(r.hp)/parseInt(r.maxhp);
		nexusclient.sys.class = r.class;
		nexusclient.sys.prios = r.ww_prios;
		eval("nexusclient.sys.cooldowns = {"+r.cooldowns+"}");
		nexusclient.sys.sanity = r.sa;
		nexusclient.sys.nanites = r.nn;
	} else if (m === "Char.Defences.List") {
		nexusclient.sys.defslist = [];
		for (var i of r) { nexusclient.sys.defslist.push(i.desc); }
	} else if (m === "IRE.Target.Info") {
		nexusclient.sys.tarHealth = parseInt(r.hpperc.replace("%",""))
	}
	return false;	
}