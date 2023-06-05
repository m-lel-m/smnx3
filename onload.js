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

//Full list of mobs. Aggro mobs first.
nexusclient.sys.mobs = [

// Aggressive mobs

    // Level range 10-20
		// Coriolis
	    "a malfunctioning windmill drone",
	    "a needle-mouthed eel",

    // Level range 20-40
    	// Golpur
    	"an immense Rapasu worm",
    	"an enormous drakkafly",

		// Kashitir
		"a nightstalker",
		"a juvenile nightstalker",

		// Locorin
		"a blacktooth coroxodon",
		"a mossy shellback",
		"an enormous blacktooth coroxodon",

		// Lowtown
		"a shifty looking Nath-el",
		"a strung-out female Lowtowner",
		"a strung-out male Lowtowner",
		"an oversized heik-il vine",

		// Saksar
		"a male Selassian cultist",
		"a female Selassion cultist",
		"an immense reptillian predator",
		"a pack of small sharp-toothed reptiles",
		"a scale-feathered scorpion bird",
		"a sharp-toothed raptor",

		// Siva
		"a lean-ribbed skulf",
		"a large hairy skulf",
		"an immense alpha skulf",
		"a needle-mouthed eel",

	// Level range 40-50
		// Pylos
		"a depthless puddle of black liquid",
		"a tentacle-finned hookmaw",

		// Greenwilds
		"a luminous eel",
		"a king tangutan",

		// Tosmar
		"a vicious haerbist",


	// Level range 50-75
		// Anemoi
		"a ravenous tigrid",
		"a rabid cania",
		"a carnivorous black eagle",

		// Arrizuri
		"a ferocious atzaparaki",

		// Deisk
		"a terrifying mekmavaur",

		// FeTek
		"an out-of-control FeTek assembly drone",

		// HugTech
		"a malfunctioning remote manipulator",

		// Ixsei
		"a crystal-clawed rock giant",
		"a male Selassian mechanic",
		"a female Selassian mechanic",
		"a male Selassian Ophidian", 
		"a female Selassian Ophidian",
		"a male Selassian Viper",
		"a female Selassian Viper",
		"a male Selassian Venom",
		"a female Selassian Venom",
		"a male Selassian Neonate",
		"a female Selassian Neonate",

		// Jelle
		"a tough Bushraki drug runner",
		"a dour Bushraki looter",
		"a menacing Bushraki looter",
		"an off-duty Bushraki looter",
		"a virile heik-il vine",

		// New Dikamazi
		"the thrashing root of a cyborg leech orchid",
		"a cyborg leech orchid",
		"a rampaging construction mech",

		// Northern Usum
		"an immense rapasu worm",
		"an overfed skulf",
		"a lurking blacktooth coroxodon",

		// Prugita
		"a savage selakki",

		// Thait
		"a ferociously toothed moss lizard",

// Wilderness aggros

	// Anemoi
	"a diamond-backed scorptail",

	// Arrizuri
	"a fleshy-spined echidna",
	"a stalk-eyed mayaki",

	// Fogbound Marshes
	"a bone-crested sohemuu",
	"a spine-carapaced hari",

	// Folly Fault Path
	"a speckle-scaled sophilian",

	// Golpur
	"a broad-horned stripeback",

	// Ixsei
	"a crystal-headed tolma",
	"a silver-scaled spinehusk",

	// Jelle
	"a tangle-bodied tentacla",

	// Locorin
	"an eight-eyed hagda",

	// Oranc
	"a bioluminescent irktin",
	"a tough-skinned nesihorn",

	// Prugita
	"a stinger-footed hiver",
	"a scoop-tusked gliven",

	// Saksar
	"a spot-pelted kumta",
	"a ruby-pincered skitter",

	// Servius Fault
	"a green-spotted zemani",

	// Suiko
	"a long-legged trisurde",
	"a twin-headed henizu",
	"a metallic-furred fuber",

	// Thait
	"a purple-spotted fadeti",

	// Tosmar
	"a fleshy-crested denghoof",
	"a spike-headed kusowo",

	// Tranquility Deepness
	"an eyeless maw",

// Passive mobs

	// Level range 1-15
		// Dregs
		"a miniature mauve rodent",
		"a hairless vermilion rodent",
		"a vicious vermilion rodent",
		"a ravenous red rodent",

		// Marle
		"a Kronish Cross rockhopper",
		"a large Kronish Cross rockhopper",
		"a jumbo Kronish Cross rockhopper",
		"a miniature Kronish Cross rockhopper",
		"a stunted Kronish Cross rockhopper",

		// Mirror Lake
		"a water skipper",
		"a sparkling eel",
		"a small arboreal lizard",

		// Southern Usum Usutti
		"a yellow-feathered spiderax",
		"a spotted mouse",
		"a sleek shadow fox",
		"a submerged tentacle",
		"a medium-sized tentacle",
		"a red-backed water bug",

	// Level range 10-20
		// Bodean
		"an axropod",

		// Coriolis
		"a malfunctioning windmill drone",
		"a venomous copper flitwing",

		// Oldtown/Lower reaches/Undercity
		"a glitch-riddled security robot",
		"an aggressively malfunctioning drone",
		"a skull-featured female Bushraki gang member",
		"a skull-featured male Bushraki gang member",
		"a vibro-blade wielding Bushraki",
		"a savage dark-cloaked Bushraki",

		// Scrapston
		"a grime-slick eel",
		"a poisonous eel",

		// Tabby
		"a Ry'nari mutant wearing looted soldier fatigues",
		"a grotesquely mutated bird",
		"a horrifically mutated rodent",
		"a bile-skinned Amaian mutant",
		"a green-glowing Decheeran mutant",
		"a scab-scaled Ry'nari mutant",
		"a grotesque Nusriza mutant",
		"a mutant encased in ancient power armor",
		"a warty Ry'nari mutant",
		"a tatter-finned Amaian mutant",
		"a twisted Decheeran mutant",
		"a spine-skinned Nusriza mutant",

		// Whittler's hollow
		"a fat terraworm",
		"a meaty terraworm",
		"an iridescent opal beetle",

		//Zephyr
		"a buzzing lake darter",

	// Level range 20-40
		// Golpur
		"a flat balkrab",
		"a giant black tarak beetle",

		// Goribar
		"a small loam leech",
		"a saffron algerion",
		"a coral algerion",
		"a moss-hued algerion",
		"a large loam leech",
		"an azure algerion",
		"an oversized loam leech",
		"a loam leech",

		// Kashitir
		"an indigo malaca",
		"a Grethen silkmoth",
		"a collared malaca",

		// Locorin
		"a ruby-plumed eskama",

		// Lowtown
		"a juvenile heik-il vine",
		"a thrashing heik-il vine",
		"a sickly heik-il vine",

		// Oranc
		"a stealthy poison-tooth",
		"a green-scaled varrana",
		"a great strider",
		"a wind snake",
		"a Krona poacher",
		"a blue-crested ratika",

		// Praviskar
		"a merciless Bushraki occupier",
		"an avaricious Bushraki slaver",
		"a lightly armed Bushraki guardswoman",
		"a lightly armed Bushraki guardsman",
		"a heavily armed female Bushraki guard",
		"a heavily armed male Bushraki guard",

		// Saksar
		"a coiling skilth snake",
		"a blue-furred primate",
		"a brutish loroi mercenary",

		// Siva
		"a spot-scaled tridactyl",
		"a venomous tridactyl",

	// Level range 40-50
		// Delta Deck
		"a Fatar salvager",
		"an armored salvage bot",
		"a Bushraki mercenary",
		"a Fatar guardian",
		"an Elgan salvager",
		"a Decheeran salvager",
		"a Nusriza salvager",

		// Greenwilds
		"a hulking arboreal lizard",
		"a great white eagle",
		"a giant guerilla beetle",
		"a female tangutan",

		// Pylos
		"a slow-moving hunk of living coral",
		"an algae-covered calciburr",
		"a poison-spitting treefrog",
		"a delicately bulbous blinkfish",

		// Tosmar
		"a tundra snake",

	// Level range 50-75
		// Anemoi
		"a sly cania",
		"a caliginous eagle",
		"a brown-scaled tigrid",

		// Arrizuri
		"a sluggish atzaparaki",
		"a lumbering lasama",

		// HugTech
		"a fuzzy cerise tentacle plushie with half a face",
		"a bright bronze ice crab plushie with half a face",
		"a plump bronze haerbist plushie with half a face",
		"a tattered copper skulf plushie with half a face",
		"a charming rose eckin plushie with a dangling broken arm",
		"a plain silver spiderax plushie with a glitching voicebox",
		"a matted pink heik-il plushie with half a face",
		"a fuzzy orange giant-springer plushie with a dangling broken arm",
		"a plump white coroxodon plushie with half a face",
		"a bright aquamarine rat plushie",
		"a bright rose haerbist plushie with one eye hanging out",
		"a small turquoise needleback plushie with a moth-eaten hole in its torso",
		"a creepy black ventrat plushie with half a face",
		"a fuzzy cerise tentacle plushie with half a face",
		"a downy sapphire zhubeast plushie with a patchwork of parts",
		"a faded brown sandcrawler plushie with a glitching voicebox",
		"a tawdry navy sandcrawler plushie with a glitching voicebox",
		"a furry slate shellback plushie with half a face",
		"a plump silver quartz-creeper plushie with a moth-eaten hole in its torso",
		"a button-eyed indigo terraworm plushie with half a face",
		"a misshapen redberry atzaparaki plushie with one eye hanging out",
		"a feathery emerald zhubeast plushie with half a face",
		"a matted lilac merova plushie with a glitching voicebox",
		"a beady-eyed albino knockout rat",

		// Ixsei
		"a salt-crusted quartz creeper",

		// Jelle
		"a thrashing heik-il vine",
		"a monstrously huge heik-il vine",
		"a heavily armed male Bushraki guard",
		"a heavily armed female Bushraki guard",

		// New Dikamazi
		"a dilapidated construction mech",

		// Northern Usum
		"a blacktooth coroxodon",
		"a giant tosmarian condor",
		"a foraging zhubeast",
		"an alert giant springer",
		"a large hairy skulf",
		"a roosting tosmarian condor",
		"a two-headed zhubeast",
		"a juvenile rapasu worm",
		"a coiling skilth snake",
		"a giant springer",
		"an immense reptilian predator",

		// Prugita
		"a somnolent selakki",
		"a stationary sentry bot",
		"a well-armed security bot",
		"a Nabian guard",

		// Tranquility Deepness
		"a tentacle-limbed shapeshifter",

		// Thait
		"a needle-clawed moss lizard",
		"a horned lapine",
		"a three-eyed rosewing",

// Wilderness passives

	// Anemoi
	"a spiral-horned kegri", 

	// Fogbound Marshes
	"a dark-furred and floating fleel",

	// Locorin
	"a nightstalker",
	"a feathered draken lizard",

	// Prugita
	"a four-eared remes rat",

	// Thait
	"a star-nosed burrower",
];

// Mechanical mobs
nexusclient.sys.mechanicals = [
	"a cyborg leech orchid",
	"a rampaging construction mech",
	"a malfunctioning remote manipulator",
	"a fuzzy cerise tentacle plushie with half a face",
	"a bright bronze ice crab plushie with half a face",
	"a plump bronze haerbist plushie with half a face",
	"a tattered copper skulf plushie with half a face",
	"a charming rose eckin plushie with a dangling broken arm",
	"a plain silver spiderax plushie with a glitching voicebox",
	"a matted pink heik-il plushie with half a face",
	"a fuzzy orange giant-springer plushie with a dangling broken arm",
	"a plump white coroxodon plushie with half a face",
	"a bright aquamarine rat plushie",
	"a bright rose haerbist plushie with one eye hanging out",
	"a small turquoise needleback plushie with a moth-eaten hole in its torso",
	"a creepy black ventrat plushie with half a face",
	"a fuzzy cerise tentacle plushie with half a face",
	"a downy sapphire zhubeast plushie with a patchwork of parts",
	"a faded brown sandcrawler plushie with a glitching voicebox",
	"a tawdry navy sandcrawler plushie with a glitching voicebox",
	"a furry slate shellback plushie with half a face",
	"a plump silver quartz-creeper plushie with a moth-eaten hole in its torso",
	"a button-eyed indigo terraworm plushie with half a face",
	"a misshapen redberry atzaparaki plushie with one eye hanging out",
	"a feathery emerald zhubeast plushie with half a face",
	"a feathery emerald zhubeast plushie with half a face",
	"a matted lilac merova plushie with a glitching voicebox",
	"a dilapidated construction mech",
	"an out-of-control FeTek assembly drone",
	"a stationary sentry bot",
	"a well-armed security bot",
	"a glitch-riddled security robot",
	"an aggressively malfunctioning drone",
	"a malfunctioning windmill drone",
	"an armored salvage bot",
	"a search and rescue drone"
	];

nexusclient.sys.info("smnx3 loaded!");