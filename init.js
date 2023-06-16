// declare/define everything that might need to be defined here

nexusclient.sys = {};
nexusclient.sys.subsys = {};
nexusclient.sys.subsys.health = {};
nexusclient.sys.subsys.efficacy = {};
nexusclient.sys.mindAffCount = 0;
nexusclient.sys.hasDistract = false;
nexusclient.sys.hasSluggish = false;
nexusclient.sys.mindSubsysDmg = 0;
nexusclient.sys.ongoingMindswap = false;
nexusclient.sys.tarEnveloped = false;
nexusclient.sys.canRattle = true;
nexusclient.sys.autoHunt = false;
nexusclient.sys.matFound = false;
nexusclient.sys.shipTraveling = false;
nexusclient.sys.matOnBeacon = false;
nexusclient.sys.autoMine = false;
nexusclient.sys.autoBeacon = false;
nexusclient.sys.matType = "any";
nexusclient.sys.shipBeacon = [];
nexusclient.sys.nanoDefs = [
    { name:'Rush', cmd:'nano rush' },
    { name:'Channeling the Progenitor', cmd:'channel progenitor' },
    { name:'Miniaturization', cmd:'nano miniaturization' },
    { name:'Protect', cmd:'nano protect' },
    { name:'Intercept (muscular)', cmd:'nano intercept muscular' },
    //{ name:'Alertness', cmd:'alertness' },
    { name:'Improved affinity towards the Conqueror', cmd:'oblivion affinity conqueror' },
    { name:'Improved affinity towards the Traveller', cmd:'oblivion affinity traveller' }
    ];
nexusclient.sys.class = nexusclient._variables.get("my_class");
if (nexusclient.sys.class === "B.E.A.S.T.") { nexusclient.sys.class = "BEAST"; }
nexusclient.sys.systems = [
    "muscular",
    "internal",
    "sensory",
    "mind",
    "wetwiring"
    ];
nexusclient.sys.auto = false;
nexusclient.sys.tar = "";
nexusclient.sys.chanTar = "";
nexusclient.sys.interrupt = false;
nexusclient.sys.tarIsMech = false;
nexusclient.sys.tarHealth = 100;
nexusclient.sys.tarsHere = 0;
nexusclient.sys.vnum = 0;
nexusclient.sys.hp_heal_threshold = 0.7;
nexusclient.sys.canFrenzy = true;
nexusclient.sys.keepupVacsphere = false;
nexusclient.sys.autoheal = true;
nexusclient.sys.freezeTracking = {};
nexusclient.sys.currentDefences = [];
nexusclient.sys.webhookList = {
    tells: "https://discord.com/api/webhooks/654432870953385995/VH2eq-7GQDsa0J52sdwmrTbo_ECC2PELZqTVkZJROA85llI5j_8C0p3nW55s7ZebarGS",
    scatterhome: "https://discord.com/api/webhooks/654426733914882068/MvlsrnUOnAmdBiyBuAB5zsjB2JRjTXvZtaBezwVMozHgthlhGQuLxNByzSJ6rsRMw3-s",
    rp: "https://discord.com/api/webhooks/860979685273763852/bFvlVsGNJRLhNRFqH1GBx8ee79Fv1lq2H3v08k-BNftaX74hQyRHRAp7kmd7HBQq3Z4_",
    otherinfo: "https://discord.com/api/webhooks/660354867092783114/ZlprrBXvLwMvOHeX6seo7EkNpor4Lr8eohM2o6IjxS7qFbPAvXYLlpb-CHYi-05KkJXr",
    other: "https://discord.com/api/webhooks/908619228037386290/ouy6Z_lL7pGq7cebeShFI34aHTQIKu7OAcvaykSRy4ja0hstwdjUMYVXI8hGpHiWqHPh",
    newbie: "https://discord.com/api/webhooks/654433078218981386/vw2k48uvh8S_dfWL0ITUn0naFyp3z3cWtCRKuEhEklGPdvsVk9KTPNbuAdzMF_W2bMO0",
    promo: "https://discord.com/api/webhooks/719996267723227192/LuoUilfAt0RYM2WJajH_hOboCjOHZiZHTeJiqYbJgiZ9eYVBbHOZ_FEo2kv4-TZ1_tH9",
    miningfeed: "https://discord.com/api/webhooks/719996267723227192/LuoUilfAt0RYM2WJajH_hOboCjOHZiZHTeJiqYbJgiZ9eYVBbHOZ_FEo2kv4-TZ1_tH9",
    fetek: "https://discord.com/api/webhooks/696435866339508305/UV01rQmNqDlXAyAea3o-rKn2R-rflYUBsF56ufyRF_syCdnBTfLtuzoQt1gsvlqfQS3e",
    dynasty: "https://discord.com/api/webhooks/654433984650018836/pPiDZgxOBh83aG_5fTOAjGFFlhKn2zjjJ9XfudO9rjmBAJbvhKKyQGO8g5G0Ug8NOD12",
    deathsights: "https://discord.com/api/webhooks/654113950765547520/obaAWAC-IRO1qrRniXwf31rubQUjEdGvNJNOZ0f_m0eNp_8nqFW2aIQHfvytggX7Snoi",
    crew: "https://discord.com/api/webhooks/700568247392534529/PRy2jqi4qoxFMttqBSepV801IiaqAS4vYid73GhOKXjmrjUS1FdHI5XZPT1pYEbHDo8a",
    conflict: "https://discord.com/api/webhooks/654580365796835338/J37NvrX21DfUbkIB8CjRVCr-BgGvCnSIEEFyxKxJ2_n5hh2WDX7Asg-m1syOvawGXjAW",
    commerce: "https://discord.com/api/webhooks/654462843206369280/R08Phd_YTT1GsZj42Qmgp6cetJXBi0TAlgtgVY_xUaKhmfGuiKEkxh8eox6AbGOGBO2Y",
    clans: "https://discord.com/api/webhooks/855196701853220884/qRyFROODieVKawCLUQVnp1fGBWjeV82-Zdksi-7oN5BgoqZ0bD1pjUzVxCz-n9ZpbN0Z",
    cesspool: "https://discord.com/api/webhooks/654419400245510164/0SCyKAy88ANsAWDNs267Gh9nZjAN_frblXEwtuP5w_MFCDZvmqTiJEqGsDw3XVuS4ahA",
};