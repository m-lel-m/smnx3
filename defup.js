client.sys.verb_def = function() {
	for (var d of client.sys.nanodefs) { 
		if !client.sys.defslist.includes(d.name) { client.sys.send(d.cmd); return; }
		else { display_notice("all defups complete", "green"); }
	}
}