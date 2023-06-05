nexusclient.sys.gmcp = function(m, r) {
	var m = args.gmcp_method;
	var r = args.gmcp_args;
	if (m === "Char.Vitals") {
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
	} else if (m === "Char.Defences.Add") {
		if (!nexusclient.sys.defslist||nexusclient.sys.defslist==undefined) {nexusclient.sys.defslist = [];}
		nexusclient.sys.defslist.push(r.desc);
		console.log(r);
		console.log(r.desc);
	} else if (m === "Char.Defences.Remove") {
		// nexusclient.sys.info(r);
	} 
	return false;	
}