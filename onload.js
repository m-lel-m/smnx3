nexusclient.sys = {};

nexusclient.sys.send = function (cmd) {
    send_command(cmd, 1);
};

nexusclient.sys.info = function (m) {
    nexusclient.display_notice("[SYS-INFO]: " + m, "white");
};

nexusclient.sys.nanodefs = {
	{ name:'Rush', cmd:'nano rush' },
	{ name:'Channeling the Traveller', cmd:'channel traveller' },
	{ name:'Miniaturization', cmd:'nano miniaturization' },
	{ name:'Protect', cmd:'nano protect' },
	{ name:'Intercept (muscular)', cmd:'nano intercept muscular' },
	{ name:'Alertness', cmd:'alertness' },
	{ name:'Improved affinity towards the Conqueror', cmd:'oblivion affinity conqueror' },
	{ name:'Improved affinity towards the Progenitor', cmd:'oblivion affinity progenitor' }
}

nexusclient.sys.info("smnx3 loaded!");