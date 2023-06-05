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

// Interrupt lines

const interruptLines = [ 
".* scuttles a little ways away and extends its ovipositor, beginning to expel a fleshy series of softball-sized white eggs.",
".* cocks a leg and draws it back, ready to kick it powerfully at you.",
".* paws at the ground and lowers its head, preparing to charge at you.",
"Aggressive and swift, .* lunges towards you with a wide-open mouth, ready to bite down - hard.",
"Venom sacs at the base of .* stinger begin to pulse, signaling a viscious attack.",
"Spinning swiftly, .* winds up its tail to whip it towards you at astonishing speeds.",
".* hauls its body high and it looms above you, moments from a terrible, crushing crash.",
".* draws in a deep breath, its sides beginning to swell alarmingly.",
"A low growl rumbles from .*, and it wiggles its hindquarters, about to pounce at you.",
".* abruptly goes still, an ominous buzzing sound beginning to whirr beneath its thick carapace.",
"With an aggressive snarl, .* scampers right for you, its needlelike little fingers extended.",
"Opening its pincers wide, .* rears back on its four back legs, preparing to attack you.",
"Flying high, .* folds its wings and plunges downward, hurtling directly towards you.",
"A few tendrils of .* body lash around you, beginning to tighten and strangle.",
"Bunching itself sinuously backwards for a moment, .* begins to make rhythmic lurching movements and deep, glottal gagging noises, weirdly not unlike a cat that is about to vomit.",
".* shoots its trunk outwards and wraps it around you, beginning to tighten it slowly in a crushing grip.",
"Rearing back on its powerful hind legs and muscular, prehensile tail, .* coils itself tight, ready to spring.",
"Threshing through the ground, .* burrows directly towards you, claws extended.",
".* buzzes loudly and then divebombs you, stinger-end first.",
".* rolls and rumbles rockily across the ground, aiming to collide with you.",
"Spinning swiftly, .* winds up its tail to whip it towards you at astonishing speeds.",
"Light begins to focus deep within the body of .*, growing to an almost painful radiance.",
"Vibrating a little, .* begins to glow brightly, sparks dancing from its fur.",
"The heavy, bony carapace surrounding .* begins to open, preparing to close around you.",
"Tentacles from the bottom of .* body drift ominously towards you.",
".* writhes through the air and coils its body around you, beginning to tighten and strangle.",
"Surrounding you in the coils of its body, .* begins to squeeze with bone-crushing force.",
"A strange, odorless vapor begins to drift from the body of .*, spreading out across the area.",
"The rotors on a malfunctioning windmill drone begin to whir faster and faster, until they are blurry with dangerous speed.",
"Throwing back its grizzled head, .* lets out a high-pitched, wavering howl.",
"A low hum begins to whine from the blaster in .* hand, red lights along the barrel growing brighter and brighter.",
"The LED lights glittering in .* begin to flash a dull but penetrating red, and the fleshy blossom pulses urgently.",
"The thrashing root of a cyborg leech orchid seems to stretch out into a weird pink rope, coiling its sinuous girth firmly around .* nearest limb.",
".* begins to rattle, steam pouring from its body as the meters and dials on its mechanical body glow bright red.",
".* draws in a deep breath, its sides beginning to swell alarmingly.",
"A disturbingly enraged, high pitched whine screeches loudly from .*, and it begins to thrash at the earth with its powerful back legs.",
".* grows still and concentrates on something while glaring at you.",
"Staggering backwards, shoulder joint grinding, .* draws back one of its massive, stony limbs, preparing to swing it.",
"Reeling backwards, .* shoulders begin to lurch and heave in an alarming way, an incipient rumble gurgling up from its bloated midsection.",
"A formidable loan bot grows still and concentrates on something while glaring",
"A security bot begins to glow with an ominous red light, and a faint humming noise begins to sound deep within it",
"Tiny particles within a glittering cloud of nanites link themselves together to form molecule-thin chains of deadly razors. Ominously, the cloud begins to spin.",
"Moving backwards for a moment, a Vonikin Krel drug dealer begins to prepare a syringe that he pulls from a fleshy fold of his body.",
"An out-of-control FeTek assembly drone's curved beak begins to bob up and down erratically, the welding attachment beginning to glow even brighter.",
"A Vihana void crawler's chitin begins to shake, the plates vibrating against one another at a frequency that causes your head to ache as the vibrations sink into your core.",
"A high-pitched whistle of steam screams from a rampaging construction mech, and it begins to spin in a rapid circle, firing bolts and scrap metal in every direction.",
"Lifting its huge body up into the air,.*rears back in preparation, acid dripping from its mandibles.",
];

var regex = new RegExp(interruptLines.join("|"));

nexusclient.sys.isInterruptLine = function(line) {
	if (regex.test(line)) { return true; }
	else { return false; }
};

nexusclient.sys.class = get_variable("my_class");
if (nexusclient.sys.class === "B.E.A.S.T.") { nexusclient.sys.class = "BEAST"; }
nexusclient.sys.auto = false;
nexusclient.sys.tar = "";
nexusclient.sys.chanTar = "";
nexusclient.sys.interrupt = false;
nexusclient.sys.sys.health = {};
nexusclient.sys.sys.efficacy = {};
nexusclient.sys.prios = "has";
nexusclient.sys.tarAffs = 0;
nexusclient.sys.tarIsMech = false;
nexusclient.sys.systems = [
    "muscular",
    "internal",
    "sensory",
    "mind",
    "wetwiring"
];
nexusclient.sys.tarHealth = 100;
nexusclient.sys.tarsHere = 0;
nexusclient.sys.vnum = 0;
nexusclient.sys.vitalsWaiting = false;
nexusclient.sys.groupMode = false;
nexusclient.sys.groupLeader = false;

client.sys.onHealBalGained = function () {
    if (!client.sys.auto || !client.sys.bal)
        return;
    if (client.sys.configs.heal_full_after_room_clear.val && !client.sys.tarsHere) {
        client.sys.send(client.sys.getClassHeal());
        return;
    }
    if (client.sys.configs.heal_after_each_mob.val && client.sys.vitalsWaiting) {
        client.sys.send(client.sys.getClassHeal());
        return;
    }
};
client.sys.getClassHeal = function () {
    switch (client.sys.class) {
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
        client.sys.error("Invalid class " + client.sys.class + " provided to client.sys.getClassHeal");
        return false;
    }
};
client.sys.onKill = function () {
    client.sys.interrupt = false;
    client.sys.tarCheck();
    client.sys.furyOnKill();
    client.sys.beastOnKill();
    client.sys.tarAffs=0;
    client.sys.mltStrike = true;
    let v = client.sys.configs.heal_after_each_mob.val;
    if (!v)
        return;
    if (client.sys.hpperc < v) {
        client.sys.vitalsWaiting = true;
    }
};
client.sys.attack = function () {
    client.sys.send(client.sys.offense[client.sys.class]());
};
client.sys.tarCheck = function () {
    //is our target still here?
    if (client.sys.groupMode && !client.sys.groupLeader)
        return true;
    var mobsHere = client.sys.itemsHere;
    client.sys.debug(JSON.stringify(mobsHere));
    if (client.sys.tar !== "") {
        for (var i = 0; i < mobsHere.length; i++) {
            if (mobsHere[i].id === client.sys.tar)
                return true;
        }
    }
    //no, let's get a new one if we can.
    client.sys.debug(JSON.stringify(client.sys.mobs));
    client.sys.tarAffs=0;
    for (i = 0; i < client.sys.mobs.length; i++) {
        if (client.sys.ignores.includes(client.sys.mobs[i]))
            continue;
        //don't target this mob if we have ignored it.
        for (let k = 0; k < mobsHere.length; k++) {
            if (mobsHere[k].name.toLowerCase() === client.sys.mobs[i]) {
                client.sys.setTar(mobsHere[k].id);
                return true;
            }
        }
    }
    //no mob here to bash.
    display_notice("No mobs here.", "red");
    return false;
};
client.sys.setTar = function (t) {
    client.sys.tar = t;
    send_GMCP("IRE.Target.Set", client.sys.tar);
    //we do tarIsMech in setTar so that we use the right rotation even in following a leader
    client.sys.tarIsMech=false;
    var mobsHere = client.sys.itemsHere;
    var found = false;
    for (i = 0; i < client.sys.mechanicals.length; i++) {
        for (let k = 0; k < mobsHere.length; k++)
        {
            if (mobsHere[k].name.toLowerCase() === client.sys.mechanicals[i]) {
                client.sys.debug("tar is mechanical");
                client.sys.tarIsMech=true;
                found = true;
                break;
            }
        }
        if (found) break;
    }
    if (client.sys.groupMode && client.sys.groupLeader)
        client.sys.send("crt Target: " + client.sys.tar);
};
client.sys.calcTarsHere = function () {
    var res = 0;
    for (var i = 0; i < client.sys.itemsHere.length; i++) {
        for (var k = 0; k < client.sys.mobs.length; k++) {
            if (client.sys.itemsHere[i].name.toLowerCase() === client.sys.mobs[k]) {
                res++;
            }
        }
    }
    client.sys.tarsHere = res;
};
client.sys.needInterrupt = function () {
    if (!client.sys.interrupt) {
        return false; }
    switch (client.sys.class) {
    case "Engineer":

    case "Scoundrel":

    case "BEAST":

    case "Fury":

    case "Nanoseer":
        return "nano eyestrike " + client.sys.chanTar;
    default:
        client.sys.error("Invalid class " + client.sys.class + " provided to client.sys.sendHeal");
        return false;
    }
};
client.sys.reset = function () {
    client.sys.vitalsWaiting = false;
    client.sys.interrupt = false;
    client.sys.unstoppableReady = false;
    client.sys.tarStaggeringOrDazed = false;
    client.sys.speedupHere = false;
    client.sys.pzHere = false;
    client.sys.tar = "";
    client.sys.tarAffs = 0;
    client.sys.mltStrike = true;
    client.sys.tarIsMech = false;
};
client.sys.onDeath = function () {
    client.sys.reset();
    if (client.sys.auto) {
        display_notice("Nexus basher has stopped.");
        client.sys.auto = false;
    }
};
client.sys.needHeal = function () {
    if (client.sys.hpperc > client.sys.configs.hp_heal_threshold.val)
        return false;
    if (client.sys.healCd())
        return false;
    return client.sys.getClassHeal();
};
client.sys.healCd = function () {
    switch (client.sys.class) {
    case "Engineer":
        return false;
    case "Scoundrel":
        return "ab_Guile_stim" in client.sys.cooldowns;
    case "BEAST":
        return "ab_SuitTech_support" in client.sys.cooldowns;
    case "Fury":
        return "ab_Fulmination_suffuse" in client.sys.cooldowns;
    case "Nanoseer":
        return "ab_Voidism_embrace" in client.sys.cooldowns;
    default:
        client.sys.error("Invalid class " + client.sys.class + " provided to client.sys.sendHeal");
        return false;
    }
};
client.sys.needMend = function () {
    if (!client.sys.wwBal)
        return false;
    for (let sys in client.sys.sys.health) {
        if (client.sys.sys.health[sys] < 92.5 && client.sys.sys.efficacy[sys] === 100) {
            return "ww mend " + sys;
        }
    }
    return false;
};
client.sys.onBal = function () {
    if (!client.sys.auto)
        return;
    if (!client.sys.bal)
        return;
    let needInterrupt = client.sys.needInterrupt();
    if (needInterrupt) {
        client.sys.send(needInterrupt);
        return;
    }
    let needMend = client.sys.needMend();
    if (needMend) {
        client.sys.send(needMend);
        return;
    }
    let needHeal = client.sys.needHeal();
    if (needHeal) {
        client.sys.send(needHeal);
        return;
    }
    //we're gonna check for our target on every bal for now.
    let tarHere = client.sys.tarCheck();
    if (tarHere && !client.sys.vitalsWaiting)
        client.sys.attack();
};
client.sys.hider = function () {
    if (!client.sys.auto) return false;
    if (!client.sys.interrupt) return false;
    if (client.sys.hideIH) {
        gag_current_line();
    }
};

nexusclient.reflexes().run_function("Bashtargets", "", "smnx3");
nexusclient.reflexes().run_function("Trigger", "", "smnx3");

nexusclient.sys.info("smnx3 loaded!");