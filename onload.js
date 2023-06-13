nexusclient.sys = {};

nexusclient.sys.updateButtonOne = function() {
    if (nexusclient.sys.onShip) {
        var x = nexusclient.sys.shipsys.matscan;
        if (nexusclient.sys.shipsys.automine) {
            buttons_set_label(1, "MINE ("+x+")");
            buttons_set_highlight(1, 1);
            return;
        }
        if (!nexusclient.sys.shipsys.automine) {
            buttons_set_label(1, "MINE ("+x+")");
            buttons_set_highlight(1, 0);
            return;
        }
    }
    if (!nexusclient.sys.onShip) {
        if (nexusclient.sys.auto) {
            buttons_set_label(1, "HUNT");
            buttons_set_highlight(1, 1);
            return;
        }
        if (!nexusclient.sys.auto) {
            buttons_set_label(1, "HUNT");
            buttons_set_highlight(1, 0);
            return;
        }
    }

nexusclient.sys.filterElevation = function(arr) {
  var reg = /(ground|mid|high)/g;
  for (var el of arr) {
    if (el._txt !== undefined && el._txt.match(reg)) {
      return el._txt.match(reg)[0];
    }
  }
}

nexusclient.sys.onRoomChange = function(newRoomInfo) {
  if (newRoomInfo.num == -2) {
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"beacon"},type:"FlexLayout_SelectTab"});
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"shipvitals"},type:"FlexLayout_SelectTab"});
  } else {
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"room"},type:"FlexLayout_SelectTab"});
    nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"charvitals"},type:"FlexLayout_SelectTab"});
  }
  nexusclient.sys.harvestCacheCrystal();
}

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
        for (var aff of affs) { if (aff.includes(a)) { test[a].push(aff) } }
    }
    for (var v of Object.values(test)) {
        // remove all but the highest stack
        v.splice(0, v.length-1);
        // put these into the previousl generated aff list that didn't have any stacking affs
        if (v[0]) { result.push(v[0]); }}
    return result;
    // returned result should be a list of all affs, with stacking affs consolidated into one entry, listing only the highest stack of that aff
}

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

      set_custom_tab_html('charvitals', header);

      var html = "<div style='font-family:Cascadia Code;color:#ffffff;padding:5px'><label for='hp_perc'>HP: </label><meter id='hp_perc' value='"+hp_perc+"'>"+hp_perc_str+"</meter><br><label for='h_mu'>MU: </label><meter id='h_mu' value='"+h_mu+"'>"+h_mu+"</meter> ("+e_mu+")<br><label for='h_in'>IN: </label><meter id='h_in' value='"+h_in+"'>"+h_in+"</meter> ("+e_in+")<br><label for='h_se'>SE: </label><meter id='h_se' value='"+h_se+"'>"+h_se+"</meter> ("+e_se+")<br><label for='h_mi'>MI: </label><meter id='h_mi' value='"+h_mi+"'>"+h_mi+"</meter> ("+e_mi+")<br><label for='h_ww'>WW: </label><meter id='h_ww' value='"+h_ww+"'>"+h_ww+"</meter> ("+e_ww+")<p>Elevation: " + elev + "<br>WW Prios: " + wwprios + "<br>Tar: "+t+"</div>";

      append_custom_tab_html('charvitals', html);
}

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
    { name:'Channeling the Progenitor', cmd:'channel progenitor' },
    { name:'Miniaturization', cmd:'nano miniaturization' },
    { name:'Protect', cmd:'nano protect' },
    { name:'Intercept (muscular)', cmd:'nano intercept muscular' },
    //{ name:'Alertness', cmd:'alertness' },
    { name:'Improved affinity towards the Conqueror', cmd:'oblivion affinity conqueror' },
    { name:'Improved affinity towards the Traveller', cmd:'oblivion affinity traveller' }
]

nexusclient.sys.class = nexusclient._datahandler.GMCP.Vitals.class;
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
nexusclient.sys.tarIsMech = false;
nexusclient.sys.tarHealth = 100;
nexusclient.sys.tarsHere = 0;
nexusclient.sys.vnum = 0;
nexusclient.sys.hp_heal_threshold = 0.7;
nexusclient.sys.canFrenzy = true;
nexusclient.sys.keepupVacsphere = false;
nexusclient.sys.autoheal = true;

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
}

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
    send_GMCP("Char.Items.Room", "");
    nexusclient.sys.tarCheck();
    nexusclient.sys.mindsub = {};
};
nexusclient.sys.attack = function () {
    var cds = nexusclient.sys.cooldowns;
    if (nexusclient.sys.canFrenzy && cds.includes('ab_Oblivion_frenzy') && nexusclient.sys.sanity >= 400) {
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
    display_notice("No mobs here.", "red");
    return false;
};
nexusclient.sys.setTar = function (t) {
    nexusclient.sys.tar = t;
    send_GMCP("IRE.Target.Set", nexusclient.sys.tar);
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
};
nexusclient.sys.onDeath = function () {
    nexusclient.sys.reset();
    if (nexusclient.sys.auto) {
        nexusclient.sys.info("You've died. Autohunting stopped.");
        nexusclient.sys.auto = false;
      buttons_set_label(1, "AH OFF");
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
    var currentDefs = Object.values(nexusclient._datahandler.GMCP.Defences).map(object => object.desc);
    for (var d of nexusclient.sys.nanodefs) { 
        if (!currentDefs.includes(d.name)) {
            return d.cmd;
        }
    }
    if (nexusclient.sys.listcompare(nexusclient.sys.nanodefs, currentDefs)) {
        nexusclient.sys.info("All defups complete!");
        nexusclient.sys.needdefs = false;
    }
}

nexusclient.sys.onBal = function () {
    if (nexusclient.sys.needdefs) { send_command("defup"); }
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
    let playersHere = nexusclient._datahandler.GMCP.RoomPlayers;
    for (var item of nexusclient.sys.itemsHere) {
        if (item.name.includes("Ta-Deth crystal deposit") && playersHere.length == 0) {
            nexusclient.sys.send("harvest crystal")
            return;
        }
    }
    nexusclient.sys.info("No more crystals in room!");
}

nexusclient.sys.info("smnx3 loaded!");