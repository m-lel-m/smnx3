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
		eval("nexusclient.sys.cooldowns = {"+r.cooldowns+"}");
		nexusclient.sys.sanity = r.sa;
		nexusclient.sys.nanites = r.nn;
	}
	if (m === "Char.Defences.List") {
		nexusclient.sys.defslist = [];
		for (var i of r) { nexusclient.sys.defslist.push(i.desc); }
	}
	if (m === "IRE.Target.Info") {
		nexusclient.sys.tarHealth = parseInt(r.hpperc.replace("%",""))
	}
	if (m === "Char.Defences.Add") {
		if (!nexusclient.sys.defslist||nexusclient.sys.defslist==undefined) {
			nexusclient.sys.defslist = [];
		}
		nexusclient.sys.defslist.push(r.desc);
	}
	if (m === "Char.Defences.Remove") {
		// nexusclient.sys.info(r);
	} 
	if (m === "Char.Items.List") {
		if (r.location !== "room") {return;}
		nexusclient.sys.itemsHere = [];
		r.items.forEach(function(el){
			for (let i = 0; i < nexusclient.sys.itemsHere.length; i++) {
				if (el.id === nexusclient.sys.itemsHere[i].id) return;
				}
			nexusclient.sys.itemsHere.push(el);
		});
		nexusclient.sys.calcTarsHere();
	}
	if (m === "Char.Items.Add") {
		if (r.location !== "room") {return;}
		for (let i = 0; i < nexusclient.sys.itemsHere.length; i++) {
		if (r.item.id === nexusclient.sys.itemsHere[i].id) {return;} }
		nexusclient.sys.itemsHere.push(r.item);
		nexusclient.sys.calcTarsHere();
	}
	if (m === "Char.Items.Remove") {
		if (r.location !== "room") {return;}
		for (let i = 0; i < nexusclient.sys.itemsHere.length; i++) {
			if (r.item.id === nexusclient.sys.itemsHere[i].id) {
				nexusclient.sys.itemsHere.splice(i,1);
				nexusclient.sys.calcTarsHere();
				return;
			}
		}
	}
	if (m === "Room.Info") {
		if (r.num !== nexusclient.sys.vnum) {
				nexusclient.sys.interrupt=false;
			}
		nexusclient.sys.vnum = r.num
	}
	return false;	
}