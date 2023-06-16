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
      var wwprios = nexusclient.sys.wwPrios;
      var affs = nexusclient.sys.affstring;

      var header = "<span style='font-family:Cascadia Code;color:#ffffff;padding:5px'>Class: " + cl + "<br><span style='padding:5px'>Sanity: " + sa + "<br><span style='padding:5px'>Nanites: " + nn + "</span><p>";

      nexusclient._ui._layout.set_custom_tab_html('charvitals', header);

      var html = "<div style='font-family:Cascadia Code;color:#ffffff;padding:5px'><label for='hp_perc'>HP: </label><meter id='hp_perc' value='"+hp_perc+"'>"+hp_perc_str+"</meter><br><label for='h_mu'>MU: </label><meter id='h_mu' value='"+h_mu+"'>"+h_mu+"</meter> ("+e_mu+")<br><label for='h_in'>IN: </label><meter id='h_in' value='"+h_in+"'>"+h_in+"</meter> ("+e_in+")<br><label for='h_se'>SE: </label><meter id='h_se' value='"+h_se+"'>"+h_se+"</meter> ("+e_se+")<br><label for='h_mi'>MI: </label><meter id='h_mi' value='"+h_mi+"'>"+h_mi+"</meter> ("+e_mi+")<br><label for='h_ww'>WW: </label><meter id='h_ww' value='"+h_ww+"'>"+h_ww+"</meter> ("+e_ww+")<p>Elevation: " + elev + "<br>WW Prios: " + wwprios + "<br>Tar: "+t+"<p>Afflictions: "+affs+"</div>";

      nexusclient._ui._layout.append_custom_tab_html('charvitals', html);
};

nexusclient.sys.onBal = function () {
    if (nexusclient.sys.needdefs) { nexusclient.sys.nextDefup(); }
    if (!nexusclient.sys.autoHunt) { return; }
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
nexusclient.sys.nextDefup = function() {
    nexusclient.sys.needdefs = true;
    var currentDefs = nexusclient.sys.currentDefences;
    for (var d of nexusclient.sys.nanoDefs) { 
        if (!currentDefs.includes(d.name)) {
            nexusclient.sys.send(d.cmd);
            return;
        }
    }
    nexusclient.sys.info("All defups complete!");
    nexusclient.sys.needdefs = false;
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
nexusclient.sys.doAutoHeal = function() {
    if (nexusclient.sys.autoHunt || nexusclient.sys.dontInterrupt) { return; }
    if (nexusclient.sys.autoHeal) { 
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

nexusclient.sys.onRoomChange = function(newRoomInfo) {
    if (newRoomInfo.num == -2) {
        nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"beacon"},type:"FlexLayout_SelectTab"});
        nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"shipvitals"},type:"FlexLayout_SelectTab"});
    } else {
        nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"room"},type:"FlexLayout_SelectTab"});
        nexusclient.ui().layout().flexLayout.model.doAction({data:{tabNode:"charvitals"},type:"FlexLayout_SelectTab"});
    }
    let area = nexusclient._datahandler.GMCP.Location.areaname;
    let playersHere = nexusclient._datahandler.GMCP.RoomPlayers;
    if (!area.includes("wilderness")) { return; }
    for (let item of nexusclient.sys.itemsHere) {
        if (item.name.includes("Ta-Deth crystal deposit") && playersHere.length == 0) {
            nexusclient.sys.send("harvest crystal");
            return;
        }
    }
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

nexusclient.sys.reset = function() {
	nexusclient.sys.mindAffCount = 0;
	nexusclient.sys.hasDistract = false;
	nexusclient.sys.hasSluggish = false;
	nexusclient.sys.mindSubsysDmg = 0;
	nexusclient.sys.ongoingMindswap = false;
}

nexusclient.sys.onKill = function() {
	nexusclient.sys.reset();
	nexusclient.sys.tarEnveloped = false;
  	nexusclient.sys.autoHunt = false;
}

nexusclient.sys.onDeath = function() {
  	nexusclient.sys.reset();
  	nexusclient.sys.tarEnveloped = false;
  	nexusclient.sys.canRattle = true;
  	nexusclient.sys.autoHunt = false;
}
/*
yeah, these don't work yet

nexusclient.sys.addMindSubsysDmg = function(amt) {
  nexusclient.sys.mindSubsysDmg = nexusclient.sys.mindSubsysDmg + amt;
  var m = nexusclient.sys.mindSubsysDmg;
  gag_current_line();
  display_notice("[MIND-DMG] ",'cyan','',amt,'white',''," DEALT",'gray',''," | ",'white','',m,'cyan',''," TOTAL ", 'gray', '');
}

nexusclient.sys.addMindAffCount = function(amt) {
  nexusclient.sys.mindAffCount = to_number(nexusclient.sys.mindAffCount) + to_number(amt);
  var a = nexusclient.sys.mindAffCount;
  display_notice("[MIND-AFF] ",'cyan','',a,'white',''," TOTAL",'gray','');
}

nexusclient.sys.updateMindAff = function(tot) {
  nexusclient.sys.mindAffCount = tot;
  var a = nexusclient.sys.mindAffCount;
  display_notice("[MIND-AFF] ",'cyan','',a,'white',''," TOTAL",'gray','');
}
*/
