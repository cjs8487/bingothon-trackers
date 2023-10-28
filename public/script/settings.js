function set_setting_state(elementid, state) {
    if(elementid === "hide_tutorial") {
        toggle_state(document.getElementById("instructions"), !state, "hidden");
    }

    // Settings for the horizontal tracker only
    if(!(window.location.pathname.split("/")[1] === "horiz"))
        return;
    else if(elementid === "invert_layout") {
        var ele1 = document.getElementById("tracker_items_songs");
        var ele2 = document.getElementById("tracker_rewards_keys");
        [ele1, ele2].forEach(function (item, idx) { item.classList.remove("box1", "box2"); });
        if(state) {
            ele1.classList.add("box2");
            ele2.classList.add("box1");
        } else {
            ele1.classList.add("box1");
            ele2.classList.add("box2");
        }
    }
    else if(elementid === "is_small") {
        var oldlink = document.getElementById("size-css");
        var newlink = document.createElement("link");
        var newsize = state ? "/css/small-size.css" : "/css/standard-size.css";
        newlink.setAttribute("rel", "stylesheet");
        newlink.setAttribute("href", newsize);
        newlink.setAttribute("id", "size-css");
        document.getElementsByTagName("head").item(0).replaceChild(newlink, oldlink);
    }
}

// ===============================================
// Helpers for buttons to call settings
function swap_layout_orientation() {
    var curdirection = document.getElementById("tracker_items_songs").classList.contains("box1") ? false : true;
    rootRef.child("config").child("invert_layout").set(!curdirection);
}

function swap_size_css() {
    var curfile = document.getElementById("size-css").href.split("/").slice(-1)[0];
    var is_small = curfile === "standard-size.css" ? false : true;
    rootRef.child("config").child("is_small").set(!is_small);
}

// Hide the tutorial text
function hide_tutorial() {
    var ishidden = document.getElementById("instructions").classList.contains("hidden");
    rootRef.child("config").child("hide_tutorial").set(!ishidden);
}