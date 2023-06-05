nexusclient.sys = {};

nexusclient.sys.send = function (cmd) {
    nexusclient.send_commands(cmd, 1);
};

nexusclient.sys.info = function (m) {
    nexusclient.display_notice("[SYS-INFO]: " + m, "white");
};

nexusclient.sys.listcompare = function(a1, a2) {
	const array1Sorted = a1.slice().sort();
	const array2Sorted = a2.slice().sort();
	return array1Sorted.toString() == array2Sorted.toString();
}

nexusclient.sys.nanodefs = [
	{ name:'Rush', cmd:'nano rush' },
	{ name:'Channeling the Traveller', cmd:'channel traveller' },
	{ name:'Miniaturization', cmd:'nano miniaturization' },
	{ name:'Protect', cmd:'nano protect' },
	{ name:'Intercept (muscular)', cmd:'nano intercept muscular' },
	{ name:'Alertness', cmd:'alertness' },
	{ name:'Improved affinity towards the Conqueror', cmd:'oblivion affinity conqueror' },
	{ name:'Improved affinity towards the Progenitor', cmd:'oblivion affinity progenitor' }
]

nexusclient.sys.class = nexusclient.variables().get("my_class");
if (nexusclient.sys.class === "B.E.A.S.T.") { nexusclient.sys.class = "BEAST"; }
nexusclient.sys.systems = [
    "muscular",
    "internal",
    "sensory",
    "mind",
    "wetwiring"
];
nexusclient.sys.subsys = {};
nexusclient.sys.subsys.health = {};
nexusclient.sys.subsys.efficacy = {};
nexusclient.sys.auto = false;
nexusclient.sys.tar = "";
nexusclient.sys.chanTar = "";
nexusclient.sys.interrupt = false;
nexusclient.sys.prios = "has";
nexusclient.sys.tarIsMech = false;
nexusclient.sys.tarHealth = 100;
nexusclient.sys.tarsHere = 0;
nexusclient.sys.vnum = 0;
nexusclient.sys.hp_heal_threshold = 0.7;

nexusclient.sys.getClassHeal = function () {
    switch (nexusclient.sys.class) {
    case "Engineer":
        return false;
    case "Scoundrel":
        return "guile stim";
    case "BEAST":
        return "suit support";
    case "Fury":
        return "kith suffuse";
    case "Nanoseer":
        return "void embrace";
    default:
        nexusclient.sys.error("Invalid class " + nexusclient.sys.class + " provided to nexusclient.sys.getClassHeal");
        return false;
    }
};
nexusclient.sys.onKill = function () {
    nexusclient.sys.interrupt = false;
    nexusclient.sys.tarCheck();
};
nexusclient.sys.attack = function () {
    if (nexusclient.sys.tarIsMech) {
    	nexusclient.sys.send("nano zap " + nexusclient.sys.tar);
    	return;
    }
    nexusclient.sys.send("void freeze " + nexusclient.sys.tar);
};
nexusclient.sys.tarCheck = function () {
    var mobsHere = nexusclient.sys.itemsHere;
    if (nexusclient.sys.tar !== "") {
        for (var i = 0; i < mobsHere.length; i++) {
            if (mobsHere[i].id === nexusclient.sys.tar)
                return true;
        }
    }
    for (i = 0; i < nexusclient.sys.mobs.length; i++) {
        for (let k = 0; k < mobsHere.length; k++) {
            if (mobsHere[k].name.toLowerCase() === nexusclient.sys.mobs[i]) {
                nexusclient.sys.setTar(mobsHere[k].id);
                return true;
            }
        }
    }
    display_notice("No mobs here.", "red");
    return false;
};
nexusclient.sys.setTar = function (t) {
    nexusclient.sys.tar = t;
    send_GMCP("IRE.Target.Set", nexusclient.sys.tar);
    nexusclient.sys.tarIsMech=false;
    var mobsHere = nexusclient.sys.itemsHere;
    var found = false;
    for (i = 0; i < nexusclient.sys.mechanicals.length; i++) {
        for (let k = 0; k < mobsHere.length; k++)
        {
            if (mobsHere[k].name.toLowerCase() === nexusclient.sys.mechanicals[i]) {
                nexusclient.sys.tarIsMech=true;
                found = true;
                break;
            }
        }
        if (found) break;
    }
};
nexusclient.sys.calcTarsHere = function () {
    var res = 0;
    for (var i = 0; i < nexusclient.sys.itemsHere.length; i++) {
        for (var k = 0; k < nexusclient.sys.mobs.length; k++) {
            if (nexusclient.sys.itemsHere[i].name.toLowerCase() === nexusclient.sys.mobs[k]) {
                res++;
            }
        }
    }
    nexusclient.sys.tarsHere = res;
};
nexusclient.sys.needInterrupt = function () {
    if (!nexusclient.sys.interrupt) {
        return false; }
    switch (nexusclient.sys.class) {
    case "Engineer":
    case "Scoundrel":
    case "BEAST":
    case "Fury":
    case "Nanoseer":
        return "nano eyestrike " + nexusclient.sys.chanTar;
    default:
        nexusclient.sys.error("Invalid class " + nexusclient.sys.class + " provided to nexusclient.sys.sendHeal");
        return false;
    }
};
nexusclient.sys.reset = function () {
    nexusclient.sys.interrupt = false;
    nexusclient.sys.tar = "";
    nexusclient.sys.tarIsMech = false;
};
nexusclient.sys.onDeath = function () {
    nexusclient.sys.reset();
    if (nexusclient.sys.auto) {
        nexusclient.sys.info("You've died. Autohunting stopped.");
        nexusclient.sys.auto = false;
    }
};
nexusclient.sys.needHeal = function () {
    if (nexusclient.sys.hpperc > nexusclient.sys.hp_heal_threshold) {
        return false;
    }
    if (nexusclient.sys.healCd()) {
        return false;
    }
    return nexusclient.sys.getClassHeal();
};
nexusclient.sys.healCd = function () {
    switch (nexusclient.sys.class) {
    case "Engineer":
        return false;
    case "Scoundrel":
        return nexusclient.sys.cooldowns.includes("ab_Guile_stim");
    case "BEAST":
        return nexusclient.sys.cooldowns.includes("ab_SuitTech_support");
    case "Fury":
        return nexusclient.sys.cooldowns.includes("ab_Fulmination_suffuse");
    case "Nanoseer":
        return nexusclient.sys.cooldowns.includes("ab_Voidism_embrace");
    default:
        nexusclient.sys.error("Invalid class " + nexusclient.sys.class + " provided to nexusclient.sys.sendHeal");
        return false;
    }
};
nexusclient.sys.needMend = function () {
    if (!nexusclient.sys.wwBal) {
        return false;
    }
    for (let s in nexusclient.sys.subsys.health) {
        if (nexusclient.sys.subsys.health[s] < 92.5 && nexusclient.sys.subsys.efficacy[s] === 100) {
            return "ww mend " + s;
        }
    }
    return false;
};
nexusclient.sys.onBal = function () {
    if (!nexusclient.sys.auto)
        return;
    if (!nexusclient.sys.bal)
        return;
    let needInterrupt = nexusclient.sys.needInterrupt();
    if (needInterrupt) {
        nexusclient.sys.send(needInterrupt);
        return;
    }
    let needMend = nexusclient.sys.needMend();
    if (needMend) {
        nexusclient.sys.send(needMend);
        return;
    }
    let needHeal = nexusclient.sys.needHeal();
    if (needHeal) {
        nexusclient.sys.send(needHeal);
        return;
    }
    //we're gonna check for our target on every bal for now.
    let tarHere = nexusclient.sys.tarCheck();
    if (tarHere) {
        nexusclient.sys.attack();
    }
};

nexusclient.reflexes().run_function("Bashtargets", "", "smnx3");
nexusclient.reflexes().run_function("Trigger", "", "smnx3");
nexusclient.reflexes().run_function("Interrupts", "", "smnx3");

nexusclient.sys.info("smnx3 loaded!");