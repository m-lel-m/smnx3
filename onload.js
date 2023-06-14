nexusclient.sys = {};
nexusclient.sys.subsys = {};
nexusclient.sys.subsys.health = {};
nexusclient.sys.subsys.efficacy = {};
nexusclient.sys.shipsys = {};
nexusclient.sys.shipsys.matfound = false;
nexusclient.sys.shipsys.traveling = false;
nexusclient.sys.shipsys.matonbeacon = false;
nexusclient.sys.shipsys.automine = false;
nexusclient.sys.shipsys.autobeacon = false;
nexusclient.sys.shipsys.matscan = "any";
nexusclient.sys.shipsys.beacon = [];
nexusclient.sys.nanodefs = [
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
nexusclient.sys.webhooklist = {
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

nexusclient.sys.import = function() {
    const urlList = [
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/bashtargets.js",
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/interrupts.js",
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/utils.js",
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/shipsys.js",
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/gmcp.js",
        "https://cdn.jsdelivr.net/gh/m-lel-m/smnx3@latest/trigger.js",        
        ];
    for (var url of urlList) {
        import(url).then( (console.log(url)) );
    }
};
nexusclient.sys.shipsys.updateButtonOne = function() {
    if (nexusclient.sys.onShip) {
        var x = nexusclient.sys.shipsys.matscan;
        if (nexusclient.sys.shipsys.automine) {
            nexusclient._ui._buttons.set(1, '', '', "MINE ("+x+")", '');
            nexusclient._ui._buttons.highlight_button(1, 1);
            return;
        }
        if (!nexusclient.sys.shipsys.automine) {
            nexusclient._ui._buttons.set(1, '', '', "MINE ("+x+")", '');
            nexusclient._ui._buttons.highlight_button(1, 0);
            return;
        }
    }
    if (!nexusclient.sys.onShip) {
        if (nexusclient.sys.auto) {
            nexusclient._ui._buttons.set(1, '', '', "HUNT", '');
            nexusclient._ui._buttons.highlight_button(1, 1);
            return;
        }
        if (!nexusclient.sys.auto) {
            nexusclient._ui._buttons.set(1, '', '', "HUNT", '');
            nexusclient._ui._buttons.highlight_button(1, 0);
            return;
        }
    }
};
nexusclient.sys.filterElevation = function(arr) {
  var reg = /(ground|mid|high)/g;
  for (var el of arr) {
    if (el._txt !== undefined && el._txt.match(reg)) {
      return el._txt.match(reg)[0];
    }
  }
};
nexusclient.sys.onRoomChange = function(newRoomInfo) {
  if (newRoomInfo.num == -2) {
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"beacon"},type:"FlexLayout_SelectTab"});
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"shipvitals"},type:"FlexLayout_SelectTab"});
  } else {
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"room"},type:"FlexLayout_SelectTab"});
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"charvitals"},type:"FlexLayout_SelectTab"});
  }
  nexusclient.sys.harvestCacheCrystal();
};
nexusclient.sys.getCleanAffList = function(obj) {
    var affs = Object.keys(obj);
    // declare list of stacking afflictions that exist in game
    const stackAffs = [ "Haemotoxin", "Bleeding", "Frozen", "Blazing" ];
    var test = {};
    // generate affliction list without any stacking affs
    var result = affs.filter(aff => !stackAffs.includes(aff.replace(/ x\d+/, "")));
    for (var a of stackAffs) {
        // generate lists for each individual stacking aff
        test[a] = []; 
        // populate with all stacks
        for (var aff of affs) { if (aff.includes(a)) { test[a].push(aff); } }
    }
    for (var v of Object.values(test)) {
        // remove all but the highest stack
        v.splice(0, v.length-1);
        // put these into the previousl generated aff list that didn't have any stacking affs
        if (v[0]) { result.push(v[0]); }}
    return result;
    // returned result should be a list of all affs, with stacking affs consolidated into one entry, listing only the highest stack of that aff
};
nexusclient.sys.updateCharvitals = function() {
      var t = nexusclient.sys.tar;
      var cl = nexusclient.sys.class;
      var sa = nexusclient.sys.sanity;
      var nn = nexusclient.sys.nanites;
      var hp_perc = nexusclient.sys.hpperc;
      var hp_perc_str = hp_perc + "%";
      var h_mu = nexusclient.sys.subsys.health.muscular/100;
      var h_in = nexusclient.sys.subsys.health.internal/100;
      var h_se = nexusclient.sys.subsys.health.sensory/100;
      var h_mi = nexusclient.sys.subsys.health.mind/100;
      var h_ww = nexusclient.sys.subsys.health.wetwiring/100;
      var e_mu = nexusclient.sys.subsys.efficacy.muscular;
      var e_in = nexusclient.sys.subsys.efficacy.internal;
      var e_se = nexusclient.sys.subsys.efficacy.sensory;
      var e_mi = nexusclient.sys.subsys.efficacy.mind;
      var e_ww = nexusclient.sys.subsys.efficacy.wetwiring;
      var elev = nexusclient.sys.elevation;
      var wwprios = nexusclient._datahandler.GMCP.Vitals.ww_prios;
      var o = nexusclient._datahandler.GMCP.Afflictions;
      var afflist = nexusclient.sys.getCleanAffList(o).join(", ");

      var header = "<span style='font-family:Cascadia Code;color:#ffffff;padding:5px'>Class: " + cl + "<br><span style='padding:5px'>Sanity: " + sa + "<br><span style='padding:5px'>Nanites: " + nn + "</span><p>";

      nexusclient._ui._layout.set_custom_tab_html('charvitals', header);

      var html = "<div style='font-family:Cascadia Code;color:#ffffff;padding:5px'><label for='hp_perc'>HP: </label><meter id='hp_perc' value='"+hp_perc+"'>"+hp_perc_str+"</meter><br><label for='h_mu'>MU: </label><meter id='h_mu' value='"+h_mu+"'>"+h_mu+"</meter> ("+e_mu+")<br><label for='h_in'>IN: </label><meter id='h_in' value='"+h_in+"'>"+h_in+"</meter> ("+e_in+")<br><label for='h_se'>SE: </label><meter id='h_se' value='"+h_se+"'>"+h_se+"</meter> ("+e_se+")<br><label for='h_mi'>MI: </label><meter id='h_mi' value='"+h_mi+"'>"+h_mi+"</meter> ("+e_mi+")<br><label for='h_ww'>WW: </label><meter id='h_ww' value='"+h_ww+"'>"+h_ww+"</meter> ("+e_ww+")<p>Elevation: " + elev + "<br>WW Prios: " + wwprios + "<br>Tar: "+t+"</div>";

      nexusclient._ui._layout.append_custom_tab_html('charvitals', html);
};
nexusclient.sys.addFreeze = function(target, stack) {
    if (!nexusclient.sys.freezeTracking[target]) {
        nexusclient.sys.freezeTracking[target] = {};
        nexusclient.sys.freezeTracking[target].count = 0;
    }
    nexusclient.sys.freezeTracking[target].count = nexusclient.sys.freezeTracking[target].count + stack;
};
nexusclient.sys.resetFreeze = function(target) {
    if (!nexusclient.sys.freezeTracking[target]) { return; }
    nexusclient.sys.freezeTracking[target].count = 0;
};
nexusclient.sys.resetAllFreeze = function() {
    for (var x of Object.keys(nexusclient.sys.freezeTracking)) {
        if (!x) { x = {}; }
        x.count = 0;
    }
};
nexusclient.sys.showFreezeCount = function(target) {
    if (!nexusclient.sys.freezeTracking[target]) {
        nexusclient.sys.notif(target + " not currently tracked.");
        return;
    }
    var x = nexusclient.sys.freezeTracking[target].count;
    nexusclient.sys.combatInfo("FreezeStacks (" + target + "): " + x);
};
nexusclient.sys.doAutoHeal = function() {
    if (nexusclient.sys.auto || nexusclient.dontinterrupt) { return; }
    if (nexusclient.sys.autoheal) { 
        let needHeal = nexusclient.sys.needHeal();
        if (needHeal && !nexusclient.sys.sentHeal) {
            nexusclient.sys.send(needHeal);
            nexusclient.sys.sentHeal = true;
            return;
        }
        let needMend = nexusclient.sys.needMend();
        if (needMend && !nexusclient.sys.sentMend) {
            nexusclient.sys.send(needMend);
            nexusclient.sys.sentMend = true;
            return;
        }
    } 
};
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
    }
};
nexusclient.sys.onKill = function () {
    nexusclient.sys.interrupt = false;
    nexusclient._datahandler.send_GMCP("Char.Items.Room", "");
    nexusclient.sys.tarCheck();
    nexusclient.sys.mindsub = {};
};
nexusclient.sys.attack = function () {
    var cds = nexusclient.sys.cooldowns;
    var defs = nexusclient.sys.currentDefences;
    if (nexusclient.sys.canFrenzy && !cds.includes('ab_Oblivion_frenzy') && !Object.keys(defs).includes("Oblivion Frenzy") && nexusclient.sys.sanity >= 400) {
        nexusclient.sys.send("oblivion frenzy");
    }
    if (nexusclient.sys.tarsHere >= 2 && !cds.includes("ab_Oblivion_speedup") && !nexusclient.sys.speedupHere && nexusclient.sys.sanity >= 400) {
        nexusclient.sys.send("oblivion speedup");
        return;
    }
    if (nexusclient.sys.tarIsMech) {
        nexusclient.sys.send("nano zap " + nexusclient.sys.tar);
        return;
    }
    if (nexusclient.sys.keepupVacsphere && !nexusclient.sys.vacsphere) {
        nexusclient.sys.send("void vacuumsphere");
        return;
    }
    nexusclient.sys.send("void freeze " + nexusclient.sys.tar);
};
nexusclient.sys.tarCheck = function () {
    var mobsHere = nexusclient.sys.itemsHere;
    if (nexusclient.sys.tar !== "") {
        for (var i in mobsHere) {
            if (mobsHere[i].id === nexusclient.sys.tar)
                return true;
        }
    }
    for (var i in nexusclient.sys.mobs) {
        for (var k in mobsHere) {
            if (mobsHere[k].name.toLowerCase() === nexusclient.sys.mobs[i]) {
                nexusclient.sys.setTar(mobsHere[k].id);
                return true;
            }
        }
    }
    nexusclient.sys.alert("No mobs here.");
    return false;
};
nexusclient.sys.setTar = function (t) {
    nexusclient.sys.tar = t;
    nexusclient._datahandler.send_GMCP("IRE.Target.Set", nexusclient.sys.tar);
    nexusclient.sys.tarIsMech=false;
    var mobsHere = nexusclient.sys.itemsHere;
    var found = false;
    for (var i in nexusclient.sys.mechanicals) {
        for (var k in mobsHere)
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
    for (var i in nexusclient.sys.itemsHere) {
        for (var k in nexusclient.sys.mobs) {
            if (nexusclient.sys.itemsHere[i].name.toLowerCase() === nexusclient.sys.mobs[k]) {
                res++;
            }
        }
    }
    nexusclient.sys.tarsHere = res;
};
nexusclient.sys.needInterrupt = function () {
    if (!nexusclient.sys.interrupt) {
        return false;
    }
    if (nexusclient.sys.class == "Nanoseer") {
        return "nano eyestrike " + nexusclient.sys.chanTar;
    }
};
nexusclient.sys.reset = function () {
    nexusclient.sys.interrupt = false;
    nexusclient.sys.vacsphere = false;
    nexusclient.sys.tar = "";
    nexusclient.sys.tarIsMech = false;
    nexusclient.sys.mindsub = {};
    nexusclient.sys.resetAllFreeze();
};
nexusclient.sys.onDeath = function () {
    nexusclient.sys.reset();
    if (nexusclient.sys.auto) {
        nexusclient.sys.info("You've died. Autohunting stopped.");
        nexusclient.sys.auto = false;
      nexusclient._ui._buttons.set(1, '', '', "AH OFF", '');
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
  var cds = nexusclient.sys.cooldowns;
  if (cds.includes("ab_Voidism_embrace")) {
    return true;
  } else { return false; }
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
nexusclient.sys.nextDefup = function() {
    nexusclient.sys.needdefs = true;
    var currentDefs = nexusclient.sys.currentDefences;
    for (var d of nexusclient.sys.nanodefs) { 
        if (!currentDefs.includes(d.name)) {
            nexusclient.sys.send(d.cmd);
            return;
        }
    }
    nexusclient.sys.info("All defups complete!");
    nexusclient.sys.needdefs = false;
};
nexusclient.sys.onBal = function () {
    if (nexusclient.sys.needdefs) { nexusclient.sys.nextDefup(); }
    if (!nexusclient.sys.auto) { return; }
    if (!nexusclient.sys.bal) { return; }
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
    let tarHere = nexusclient.sys.tarCheck();
    if (tarHere) {
        nexusclient.sys.attack();
    }
};
nexusclient.sys.harvestCacheCrystal = function() {
    let area = nexusclient._datahandler.GMCP.Location.areaname;
    let playersHere = nexusclient._datahandler.GMCP.RoomPlayers;
    if (!area.includes("wilderness")) { return; }
    for (var item of nexusclient.sys.itemsHere) {
        if (item.name.includes("Ta-Deth crystal deposit") && playersHere.length == 0) {
            nexusclient.sys.send("harvest crystal");
            return;
        }
    }
    nexusclient.sys.info("No crystals in room!");
};