if (!nexusclient.sys.shipsys) {nexusclient.sys.shipsys = {};}

nexusclient.sys.shipsys.matfound = false;
nexusclient.sys.shipsys.traveling = false;
nexusclient.sys.shipsys.matonbeacon = false;
nexusclient.sys.shipsys.automine = false;
nexusclient.sys.shipsys.autobeacon = false;
nexusclient.sys.shipsys.matscan = "any";
nexusclient.sys.shipsys.beacon = [];

nexusclient.reflexes().run_function("ShipTargets", "", "ship pkg");

nexusclient.sys.shipsys.getShipBearing = function(num) {
  const dirt = [ "", "n", "ne", "e", "se", "s", "sw", "w", "nw" ];
  var x = parseInt(num);
  return dirt[x];
}

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
}

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
}

nexusclient.sys.shipsys.getBeaconLineColor = function(beaconstring) {
  if (beaconstring.search("harvestable") > 0 || beaconstring.search("mineable") > 0) {
    return "#ffc20d";
  }
  if (beaconstring.search("pirate refinery") > 0 || beaconstring.search("pirate autofactory") > 0) {
    return "#f542ad";
  }
  return "#87AFC7";
}

nexusclient.sys.shipsys.parseBeaconStart = function() {
  nexusclient.sys.shipsys.beacon = [];
  var header = "<span style='font-family:Cascadia Code;color:#ffffff'>&nbsp;Ship Beacon<p>";

  nexusclient._ui._layout.set_custom_tab_html('beacon', "");
  
  nexusclient._ui._layout.append_custom_tab_html('beacon', header);

}

nexusclient.sys.shipsys.parseBeaconLine = function(dist, dir, sector, coords, beaconstring) {

  var temp = {
    "distance": dist,
    "direction": dir,
    "sector": sector,
    "coordinates": coords,
    "beaconobj": beaconstring
  };

  nexusclient.sys.shipsys.beacon.push(temp);

  nexusclient.sys.shipsys.updateBeaconTabLine(dist, dir, sector, coords, beaconstring);

}

nexusclient.sys.shipsys.updateBeaconTabLine = function(dist, dir, sector, coords, beaconstring) {

  var output = "&nbsp;[" + dist + " " + dir + "]<span style='font-family:Cascadia Code;color:#333333'>";
  var output = output.padEnd(69, "-");
  var coords = "<span style='font-family:Cascadia Code;color:#B6B6B4'> " + sector + " (" + coords + ")</span>";
  var output = output + "</span>";
  var color = nexusclient.sys.shipsys.getBeaconLineColor(beaconstring);
  var bstring = "<span style='font-family:Cascadia Code;color:" + color + "'>" + beaconstring + "</span>";
  var output = "<span style='font-family:Cascadia Code;font-size:12px'>" + output + bstring + coords + "</span><br>";

  nexusclient._ui._layout.append_custom_tab_html('beacon', output);

}

nexusclient.sys.shipsys.findMineInBeacon = function(typ) {

  if (typ == "ore") {
    var searcher = "mineable";
  }
  if (typ == "gas") {
    var searcher = "harvestable";
  }

  for (var i of nexusclient.sys.shipsys.beacon) {
    if (i.beaconobj.search(searcher) > 0) {
      return i;
    }
  }

  if (typ == "any") {
  for (var i of nexusclient.sys.shipsys.beacon) {
    if (i.beaconobj.search("mineable") > 0 || i.beaconobj.search("harvestable") > 0) {
      return i;
      }
    }
  }

  nexusclient.display_notice("No material type " + typ + " found.", "red");
  return false;
}

nexusclient.sys.shipsys.parseBeaconEnd = function() {
  nexusclient.sys.shipsys.updateTargetButtons();
  var x = nexusclient.sys.shipsys.matscan;

  if (!nexusclient.sys.shipsys.automine) { return; }
  if (!nexusclient.sys.shipsys.findMineInBeacon(x)) { return; }

  var i = nexusclient.sys.shipsys.findMineInBeacon(x);

  var s = i.coordinates.replace(",", " ");
  if (nexusclient.sys.shipsys.aroundAutopilotGoal(s, 4)) {
    nexusclient.sys.send("ship halt");
    nexusclient.sys.send("ship turn " + i.direction);
    nexusclient.sys.shipsys.matfound = true;
    return;
      }
  var s = i.sector + " " + s;
  nexusclient.sys.send("ship travel to " + s);
  nexusclient.display_notice("[SHIP] Autopilot Coords: " + s,'white');

}

nexusclient.sys.shipsys.aroundAutopilotGoal = function(goal, tolerance) {

  var c = nexusclient._datahandler.GMCP.Location.area;
  var t = parseInt(tolerance);
  const regex = /(\(\d+, \d+\))/g;
  var f = c.match(regex);
  var f = f[0].replace("(","");
  var f = f.replace(")","");
  var f = f.split(', ');
  var f1 = f[0];
  var f2 = f[1];

  var a = goal.split(' ');
  var a1 = a[0];
  var a2 = a[1];

  var diff1 = Math.abs(f1 - a1);
  var diff2 = Math.abs(f2 - a2);

  if (diff1 <= t && diff2 <= t) {
    return true;
  }

  return false;

}

nexusclient.sys.shipsys.updateTargetButtons = function() {
  if (!nexusclient.sys.shipsys.beacon) { return; }
	var b = nexusclient.sys.shipsys.beacon;
	nexusclient.sys.shipsys.shipButtonTargets = [];
	for (var ob of b) {
		for (var tr of nexusclient.sys.shipsys.shipTargets) {
			if (ob.beaconobj.includes(tr)) {
				var s = ob.beaconobj;
				var regex = /(\d+)/g;
				var found = s.match(regex);
				var tarId = found[0];
				var tarDir = ob.direction;
				var tarDist = ob.distance;
				var obj = {
					id: tarId,
					dir: tarDir,
					dist: tarDist,
					full: s,
					short: tr
				}
				nexusclient.sys.shipsys.shipButtonTargets.push(obj);
			}
		}
	}

	if (nexusclient.sys.shipsys.shipButtonTargets.length < 1) {return;}

	for (let buttonId = 2; buttonId < 9; buttonId++) {
		var i = buttonId-2;
		if (!nexusclient.sys.shipsys.shipButtonTargets[i]) {return;}
      var tlist = nexusclient.sys.shipsys.shipButtonTargets[i];
		nexusclient._ui._buttons.set(buttonId, "st " + tlist.short + "|ship turn " + tlist.dir, '', tlist.short + ":" + tlist.dist + " " + tlist.dir, '');
    nexusclient.sys.shipsys.shipTar = tlist.short;
	} 
}
