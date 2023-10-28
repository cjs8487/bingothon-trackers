// Valid things through url
// password=, hidecontrols=true, shrink=true

// Setting some global variables for user authentication
var uid = undefined;
var password_override = "";
var hidecontrols = false;
var authAttempted = false;
var forceShrink = false;
var rootRef = {};
var roomid = location.pathname.replace(/\/$/, "").split("/").pop().toLowerCase();
var urlquery = location.search.replace(/\/$/, "").split("?").pop().toLowerCase().split("&");

// Parse url controls
for(let i=0; i<urlquery.length; i++) {
    if(urlquery[i].includes("password=")) {
        password_override = urlquery[i].substr(urlquery[i].indexOf("=") + 1);
    }
    else if(urlquery[i].toLowerCase().includes("hidecontrols=true")) {
        hidecontrols = true;
    } 
    else if (urlquery[i].toLowerCase().includes("shrink=true")) {
        forceShrink = true;
    }
}

// Log the user in and do an initial db sync
function init(callback) {
    firebase.database().useEmulator("127.0.0.1", 9000)
    firebase.auth().useEmulator("http://127.0.0.1:9099")
    firebase.auth().onAuthStateChanged(function(user) {
    if(user) {
        uid = user.uid;
        rootRef = firebase.database().ref('games/' + roomid);
        callback();
    } else {
        console.log("Auth state not logged in");
        if(authAttempted) return;
        authAttempted = true;
        firebase.auth().signInAnonymously().catch(function(error) {
            console.log(error);
        });
    }});
}

// Initialize tracker elements using db on sync
function init_tracker() {
    var initialized = null;
    rootRef.child('items').on('child_added', function (data) {
        set_item_state(data.key, data.val());
    });
    rootRef.child('items').on('child_changed', function (data) {
        set_item_state(data.key, data.val());
    });
    rootRef.child('items').on('child_removed', function (data) {
        set_item_state(data.key, false);
    });
    rootRef.child('config').on('child_added', function (data) {
        set_setting_state(data.key, data.val());
    });
    rootRef.child('config').on('child_changed', function (data) {
        set_setting_state(data.key, data.val());
    });
    rootRef.child('config').on('child_removed', function (data) {
        set_setting_state(data.key, false);
    });
    rootRef.child('owner').on('value', function (data) {
        initialized = !!data.val();
        document.getElementById('notInitialized').hidden = initialized;
        document.getElementById('setPasscode').innerText = initialized ? 'Enter passcode' : 'Initialize room w/passcode';
        document.getElementById('ownerControls').hidden = !(initialized && (data.val() === uid));
    });
    setTimeout(() => {
        if (password_override === "")
            return;
         console.log("Override password set, handle it");
         if (initialized == false) //create room
        {
            set_password(password_override);
        }
        else //add to editors if room already exists
        {
            rootRef.child('editors').child(uid).set(password_override, function(error) {
                if(error) {
                    console.log("Did not add to editors on page load");
                    console.log(error);
                }
                else {
                    console.log("Added to editors successfully due password set in url");
                }
            });
        }
        if (forceShrink)
            rootRef.child("config").child("is_small").set(true);
     }, 2500); //small timeout to catch potential firebase delay
}

// Set up room via password
function set_password(presetPW = null) { //if preset password is provided, allow it to be used for auth
    var passcode = (presetPW != null) ? presetPW : document.getElementById("passcode").value;
    if (presetPW) //enter preset password into input field for clarity
        document.getElementById("passcode").value = presetPW;
    
    if (document.getElementById('notInitialized').hidden) {
        rootRef.child('editors').child(uid).set(passcode);
    } else {
        var editors = {};
        editors[uid] = true;
        rootRef.set({
            owner: uid,
            passcode: passcode,
            editors: editors
        });
    }
}

// Destroy the db entry
function destroy_firebase() {
    rootRef.set({});
}

// Reset the db but keep config and user info
function reset_firebase() {
    rootRef.child('items').set({});
    // rootRef.child('config').set({});
}
