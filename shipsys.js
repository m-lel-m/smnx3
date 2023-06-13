nexusclient.sys.shipsys.setShipTargetList = function() {
    nexusclient.sys.shipsys.shipTargets = [
        "Ishvana",
        "Vihana",
        "devourer",
        "vessel"
        ];
    nexusclient.sys.shipsys.updateTargetButtons();
    nexusclient.sys.shipInfo("Ship target list updated!");
};
nexusclient.sys.shipsys.getShipBearing = function(num) {
    const dirt = [ "", "n", "ne", "e", "se", "s", "sw", "w", "nw" ];
    var x = parseInt(num);
    return dirt[x];
};
nexusclient.sys.shipsys.toggleAutomine = function() {
    if (nexusclient.sys.shipsys.automine) {
        nexusclient.sys.shipsys.automine = false;
        nexusclient.sys.shipsys.updateButtonOne();
        return;
    }
    if (!nexusclient.sys.shipsys.automine) {
        nexusclient.sys.shipsys.automine = true;
        nexusclient.sys.shipsys.updateButtonOne();
        return;
    }
};
nexusclient.sys.shipsys.updateShipvitals = function() {
    var ship_name = nexusclient._datahandler.GMCP.Vitals.ship_name;
    var dir = nexusclient._datahandler.GMCP.Vitals.ship_bearing;
    var dir = nexusclient.sys.shipsys.getShipBearing(dir);
    var ship_speed = nexusclient._datahandler.GMCP.Vitals.ship_speed;
    var hull_perc = (parseInt(nexusclient._datahandler.GMCP.Vitals.ship_hull)/parseInt(nexusclient._datahandler.GMCP.Vitals.ship_hull_max));
    var shield_perc = (parseInt(nexusclient._datahandler.GMCP.Vitals.ship_shield)/parseInt(nexusclient._datahandler.GMCP.Vitals.ship_shield_max));
    var cap_perc = (parseInt(nexusclient._datahandler.GMCP.Vitals.ship_cap)/parseInt(nexusclient._datahandler.GMCP.Vitals.ship_cap_max));
    var hull_perc_str = (hull_perc * 100) + "%";
    var shield_perc_str = (shield_perc * 100) + "%";
    var cap_perc_str = (cap_perc * 100) + "%";
    var cap_dmg = nexusclient._datahandler.GMCP.Vitals.ship_dmg_cap;
    var eng_dmg = nexusclient._datahandler.GMCP.Vitals.ship_dmg_engine;
    var sen_dmg = nexusclient._datahandler.GMCP.Vitals.ship_dmg_sensor;
    var shi_dmg = nexusclient._datahandler.GMCP.Vitals.ship_dmg_shield;
    var sim_dmg = nexusclient._datahandler.GMCP.Vitals.ship_dmg_sim;
    var loc = nexusclient._datahandler.GMCP.Location.areaname;
    var header = "<span style='font-family:Cascadia Code;color:#ffffff;padding:5px;font-size:1.1em'>" + loc + "</span><br><span style='font-family:Cascadia Code;color:#ffffff;padding:5px'>Ship: " + ship_name + "<br><span style='padding:5px'>Bearing: " + dir + "<br><span style='padding:5px'>Speed: " + ship_speed + "</span><p>";
    nexusclient._ui._layout.set_custom_tab_html('shipvitals', header);
    var html = "<span style='font-family:Cascadia Code;color:#ffffff;padding:5px'><label for='hull_perc'>Hull: &nbsp;&nbsp;</label><meter id='hull_perc' value='"+hull_perc+"'>"+hull_perc_str+"</meter><br><span style='padding:5px'><label for='shield_perc'>Shield: </label><meter id='shield_perc' value='"+shield_perc+"'>"+shield_perc_str+"</meter><br><span style='padding:5px'><label for='cap_perc'>Cap: &nbsp;&nbsp;&nbsp;</label><meter id='cap_perc' value='"+cap_perc+"'>"+cap_perc_str+"</meter><p><p style='font-family:Cascadia Code;color:#ffffff;padding:5px'>Ship Damage<br>Cap: "+cap_dmg+"<br>Eng: "+eng_dmg+"<br>Sen: "+sen_dmg+"<br>Shi: "+shi_dmg+"<br>Sim: "+sim_dmg+"</p>";
    nexusclient._ui._layout.append_custom_tab_html('shipvitals', html);
};
nexusclient.sys.shipsys.getBeaconLineColor = function(beaconstring) {
    if (beaconstring.search("harvestable") > 0 || beaconstring.search("mineable") > 0) {
        return "#ffc20d";
    }
    if (beaconstring.search("pirate refinery") > 0 || beaconstring.search("pirate autofactory") > 0) {
        return "#f542ad";
    }
    return "#87AFC7";
};
nexusclient.sys.shipsys.parseBeaconStart = function() {
    nexusclient.sys.shipsys.beacon = [];
    var header = "<span style='font-family:Cascadia Code;color:#ffffff'>&nbsp;Ship Beacon<p>";
    nexusclient._ui._layout.set_custom_tab_html('beacon', "");
    nexusclient._ui._layout.append_custom_tab_html('beacon', header);
};
nexusclient.sys.shipsys.parseBeaconLine = function(dist, dir, sector, coords, beaconstring) {
    var tempObj = {
        "distance": dist,
        "direction": dir,
        "sector": sector,
        "coordinates": coords,
        "beaconobj": beaconstring
    };
    nexusclient.sys.shipsys.beacon.push(tempObj);
    nexusclient.sys.shipsys.updateBeaconTabLine(dist, dir, sector, coords, beaconstring);
};
nexusclient.sys.shipsys.updateBeaconTabLine = function(dist, dir, sector, coords, beaconstring) {
    var output = "&nbsp;[" + dist + " " + dir + "]<span style='font-family:Cascadia Code;color:#333333'>";
    var output = output.padEnd(69, "-");
    var coords = "<span style='font-family:Cascadia Code;color:#B6B6B4'> " + sector + " (" + coords + ")</span>";
    var output = output + "</span>";
    var color = nexusclient.sys.shipsys.getBeaconLineColor(beaconstring);
    var bstring = "<span style='font-family:Cascadia Code;color:" + color + "'>" + beaconstring + "</span>";
    var output = "<span style='font-family:Cascadia Code;font-size:12px'>" + output + bstring + coords + "</span><br>";
    nexusclient._ui._layout.append_custom_tab_html('beacon', output);
};
nexusclient.sys.shipsys.findMineInBeacon = function(typ) {
    if (typ == "ore") { var searcher = "mineable"; }
    if (typ == "gas") { var searcher = "harvestable"; }
    if (typ == "any") { var searcher = /(mineable|harvestable)/; }
    for (var item of nexusclient.sys.shipsys.beacon) {
        if (item.beaconobj.search(searcher) > 0) {
            return item;
        }
    }
    nexusclient.sys.alert("No material type [" + typ + "] found.");
    return false;
};
nexusclient.sys.shipsys.parseBeaconEnd = function() {
    nexusclient.sys.shipsys.updateTargetButtons();
    var matType = nexusclient.sys.shipsys.matscan;
    if (!nexusclient.sys.shipsys.automine) { return; }
    let miningString = nexusclient.sys.shipsys.findMineInBeacon(matType);
    if (!miningString) { return; }
    var miningCoords = miningString.coordinates.replace(",", " ");
    if (nexusclient.sys.shipsys.aroundAutopilotGoal(miningCoords, 4)) {
        nexusclient.sys.send("ship halt");
        nexusclient.sys.send("ship turn " + miningString.direction);
        nexusclient.sys.shipsys.matfound = true;
        return;
    }
    var miningCoords = miningString.sector + " " + miningCoords;
    nexusclient.sys.send("ship travel to " + miningCoords);
    nexusclient.sys.shipInfo("Autopilot Coords: " + miningCoords);
};
nexusclient.sys.shipsys.aroundAutopilotGoal = function(goal, tolerance) {
    var spaceCoords = nexusclient._datahandler.GMCP.Location.area;
    var checkNum = parseInt(tolerance);
    var regex = /(\(\d+, \d+\))/g;
    var found = spaceCoords.match(regex);
    var found = found[0].replace("(","");
    var found = found.replace(")","");
    var found = found.split(', ');
    var foundXCoord = found[0];
    var foundYCoord = found[1];
    var goalCoords = goal.split(' ');
    var goalXCoord = goalCoords[0];
    var goalYCoord = goalCoords[1];
    var diffX = Math.abs(foundXCoord - goalXCoord);
    var diffY = Math.abs(foundYCoord - goalYCoord);
    if (diffX <= checkNum && diffY <= checkNum) {
        return true;
    }
    return false;
};
nexusclient.sys.shipsys.getTargetFromBeacon = function(beacon) {
    // this function returns the object in the beacon array provided
    var tarList = nexusclient.sys.shipsys.shipTargets;
    for (var tar of tarList) {
        for (var obj of beacon) {
            if (obj.beaconobj.includes(tar)) {
                return obj;
            }
        }
    }
};
nexusclient.sys.shipsys.updateTargetButtons = function() {
  if (!nexusclient.sys.shipsys.beacon) { return; }
	var beacon = nexusclient.sys.shipsys.beacon;
	for (var tar of nexusclient.sys.shipsys.shipTargets) {
		for (var obj of beacon) {
			if (obj.beaconobj.includes(tar)) {
                for (let buttonId = 2; buttonId < 9; buttonId++) {
                   nexusclient._ui._buttons.set(buttonId, "st " + tar + "|ship turn " + obj.direction, '', tar + " [" + obj.distance + " " + obj.direction + "]", '');
                   nexusclient.sys.shipInfo("Target Found: " + tar + " [" + obj.distance + " " + obj.direction + "]");
               }
			}
		}
	}
};