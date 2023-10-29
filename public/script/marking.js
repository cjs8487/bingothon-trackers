// When the page loads, attach functions to each tag and initialize some icons
window.onload = function() {
    var elemlist = document.body.getElementsByTagName("*");
    for(let i=0; i<elemlist.length; i++) {
        cllist = elemlist[i].classList;
        if(cllist.contains("cycle")) {
            let noloop = elemlist[i].classList.contains("noloop");
            elemlist[i].addEventListener("click", function(e) { cycle(e, this, false, noloop); });
            elemlist[i].addEventListener("contextmenu", function(e) { cycle(e, this, true, noloop); })
        }
        if(cllist.contains("toggle")) {
            elemlist[i].addEventListener("click", function(e) { toggle(e, this); });
            elemlist[i].addEventListener("contextmenu", function(e) { toggle(e, this); })
        }
        if(cllist.contains("badge")) {
            elemlist[i].addEventListener("click", function(e) { badge(e, this, "left"); });
            elemlist[i].addEventListener("contextmenu", function(e) { badge(e, this, "right"); });
        }
        if(cllist.contains("counter")) {
            elemlist[i].addEventListener("click", function(e) { count(e, this, "up", (e.shiftKey) ? 5 : 1); });
            elemlist[i].addEventListener("contextmenu", function(e) { count(e, this, "down", (e.shiftKey) ? 5 : 1); });
        }
        if(cllist.contains("split")) {
            elemlist[i].addEventListener("click", function(e) { split(e, this, "left"); });
            elemlist[i].addEventListener("contextmenu", function(e) { split(e, this, "right"); });
        }
        if(cllist.contains("cycletoggle")) {
            elemlist[i].addEventListener("click", function(e) { cycletoggle(e, this); });
            elemlist[i].addEventListener("contextmenu", function(e) { cycletoggle(e, this); });
        }
    }
    init(init_tracker);
    if(hidecontrols)
        document.getElementById("roomcontrols").hidden = true;
};

//  Cycle object handler
function cycle(e, element, reverse, noloop) {
    e.preventDefault();
    var opts = items[element.id]["opts"];
    var curstate = -1;
    for(let i=0; i<opts.length; i++)
        curstate = element.classList.contains(opts[i]) ? i : curstate;
    if(reverse) {
        var newstate = noloop ?
            (curstate-1 < 0 ? 0 : curstate-1) :
            (curstate-1 < 0 ? opts.length-1 : curstate-1);
    } else {
        var newstate = noloop ?
            (curstate+1 >= opts.length ? curstate : curstate+1) :
            (curstate+1 >= opts.length ? 0 : curstate+1)
    }
    console.log(newstate)
    rootRef.child("items").child(element.id).set(newstate);
}

// Toggle object handler
function toggle(e, element) {
    e.preventDefault();
    var curstate = !element.classList.contains("false");
    rootRef.child("items").child(element.id).set(!curstate);
}

// Badge object handler
function badge(e, element, clicktype) {
    e.preventDefault();
    var baseid = element.id + "_base";
    var badgeid = element.id + "_badge";
    var curstate_item = !document.getElementById(baseid).classList.contains("false");
    var curstate_badge = !document.getElementById(badgeid).classList.contains("hidden");

    if(clicktype === "left") {
        rootRef.child("items").child(baseid).set(!curstate_item);
        rootRef.child("items").child(badgeid).set(curstate_badge);
    } else if(clicktype === "right") {
        rootRef.child("items").child(baseid).set(curstate_item);
        rootRef.child("items").child(badgeid).set(!curstate_badge);
    } else {
        console.log(`Clicktype ${clicktype} not recognized`);
    }
}

// Count object handler
function count(e, element, direction, delta) {
    e.preventDefault();
    var curstate = element.innerHTML === "" ? 0 : parseInt(element.innerHTML, 10);
    var mincount = items[element.id]["minimum"];
    var maxcount = items[element.id]["maximum"];
    if(direction === "up") {
        var newstate = (curstate+delta > maxcount) ? maxcount : curstate + delta;
    } else if(direction === "down") {
        var newstate = (curstate-delta < mincount) ? mincount : curstate-delta;
    } else {
        console.log(`Direction of count, ${direction}, must be up or down.`)
    }
    rootRef.child("items").child(element.id).set(newstate);
}

// Split object handler
function split(e, element, clicktype) {
    e.preventDefault();
    var curstate = items[element.id]["opts"].indexOf(element.classList[2]); // Need a better way of handling this
    var newstate = undefined;
    if(clicktype === "left") {
        switch(curstate) {
            case 0: newstate = 1; break;
            case 1: newstate = 0; break;
            case 2: newstate = 3; break;
            case 3: newstate = 2; break;
        }
    } else if(clicktype === "right") {
        switch(curstate) {
            case 0: newstate = 2; break;
            case 1: newstate = 3; break;
            case 2: newstate = 0; break;
            case 3: newstate = 1; break;
        }
    } else {
        console.log(`Clicktype ${clicktype} not recognized`);
    }
    rootRef.child("items").child(element.id).set(newstate);
}

// CT object handler
function cycletoggle(e, element) {
    e.preventDefault();
    if(e.shiftKey) {
        var toggle_element = document.getElementById(items[element.id]["toggle_obj"]);
        toggle(e, toggle_element);
    } else {
        var cycle_element = document.getElementById(items[element.id]["cycle_obj"]);
        cycle(e, cycle_element, !(e.button === 0), cycle_element.classList.contains("noloop"));
    }
}

// Function to update tracker state on db changes
function set_item_state(elementid, state) {
    var element = document.getElementById(elementid);
    if(element.classList.contains("cycle") || element.classList.contains("split") || element.classList.contains("ct_cycle")) {
        if(state === false) {
            set_item_state(elementid, 0);
            return;
        }
        element.classList.remove("false", ...items[elementid]["opts"]);
        element.classList.add(items[elementid]["opts"][state]);
        element.style=`background-image:url('/images/${items[elementid]["opts"][state]}.png')`
        if(state === 0 && items[elementid]["disable_zero"])
            element.classList.add("false");
    }
    else if(element.classList.contains("toggle") || element.classList.contains("ct_toggle")) {
        toggle_state(element, state, "false");
    }
    else if(element.classList.contains("badge-item")) {
        if(elementid.slice(-4) === "base")
            toggle_state(element, state, "false");
        else if(elementid.slice(-5) === "badge")
            toggle_state(element, state, "hidden");
    }
    else if(element.classList.contains("counter")) {
        element.classList.remove("false");
        if(state === 0) { 
            element.innerHTML = "";
            if(!element.classList.contains("false"))
                element.classList.add("false")
        }
        else if(state === false)
            set_item_state(elementid, 0);
        else
            element.innerHTML = state;
    }
}

// Toggle helper function
function toggle_state(element, state, target) {
    if(state)
        element.classList.remove(target);
    else
        if(!element.classList.contains(target))
            element.classList.add(target);
}



// ===============================================================
// Build the cycle objects
function build_cycle(itemid, advcycle) {
    var loop = items[itemid]["loop"] ? "" : " noloop";
    var disable_zero = items[itemid]["disable_zero"] ? " false" : ""
    var classes = `${advcycle}cycle ${items[itemid]["size"]}${loop} ${items[itemid]["opts"][0]}${disable_zero}`;
    return `<div class="${classes}" id="${itemid}"></div>`;
}

// Build the toggle objects
function build_toggle(itemid, advtoggle) {
    var classes = `${advtoggle}toggle ${items[itemid]["size"]} false`;
    return `<div class="${classes}" id="${itemid}" style=background-image:url('/images/${itemid}.png');></div>`;
}

// Build the counter objects
function build_counter(itemid) {
    var classes = `counter ${items[itemid]["size"]} false`;
    return `<div class="${classes}" id="${itemid}" style=background-image:url('/images/${itemid}.png');></div>`;
}

// Build the badge objects
function build_badge(itemid) {
    return `<div class="badge ${items[itemid]["size"]}" id="${itemid}">
        <div class="badge-item ${items[itemid]["opts"][0]} false" id="${itemid.concat("_base")}"></div>
        <div class="badge-item ${items[itemid]["opts"][1]} hidden" id="${itemid.concat("_badge")}"></div>
        </div>`;
}

// Build the split items
function build_split(itemid) {
    var classes = `split ${items[itemid]["size"]} ${items[itemid]["opts"][0]} false`;
    return `<div class="${classes}" id="${itemid}"></div>`;
}

// Build the cycle toggle advanced object
function build_cycletoggle(itemid) {
    var cycleobj = build_cycle(items[itemid]["cycle_obj"], "ct_");
    var toggleobj = build_toggle(items[itemid]["toggle_obj"], "ct_");
    return `<div class="cycletoggle ${items[itemid]["size"]}" id="${itemid}">${cycleobj}${toggleobj}</div>`;
}

function build_item(itemid) {
    try {
        if (items[itemid]["type"] === "cycle")
            return build_cycle(itemid, "");
        else if (items[itemid]["type"] === "toggle")
            return build_toggle(itemid, "");
        else if (items[itemid]["type"] === "counter")
            return build_counter(itemid);
        else if (items[itemid]["type"] === "badge")
            return build_badge(itemid);
        else if (items[itemid]["type"] === "split")
            return build_split(itemid);
        else if (items[itemid]["type"] === "cycletoggle")
            return build_cycletoggle(itemid);
        else
            console.log("Couldn't build itemid: ", itemid);
    } catch (e) {
        console.log("Couldn't build itemid: ", itemid);
    }
}

// Build entire tracker from scratch
function build_tracker(trackerid, itemgrid) {
    var trackerhtml = "";
    for(let i=0; i<itemgrid.length; i++) {
        trackerhtml += `<div class="row">`;
        for(let j=0; j<itemgrid[i].length; j++) {
            trackerhtml += build_item(itemgrid[i][j]).concat(" ");
        }
        trackerhtml += "</div>";
    }
    document.getElementById(trackerid).innerHTML = trackerhtml;
}