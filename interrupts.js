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
"A bulky Vihana guard lets out a wailing screech at a pitch uncanny for so large a source."
];

var regex = new RegExp(interruptLines.join("|"));

nexusclient.sys.isInterruptLine = function(line) {
	if (regex.test(line)) { return true; }
	else { return false; }
};