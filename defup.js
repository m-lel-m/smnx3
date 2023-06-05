nexusclient.sys.verb_def = function() {
	for (var d of nexusclient.sys.nanodefs) { 
		if !nexusclient.sys.defslist.includes(d.name) { nexusclient.sys.send(d.cmd); return; }
		else { nexusclient.sys.info("all defups complete"); }
	}
}