// The event handler below all use this function to display status messages.
// Since the handlers all display status messages this way, the return false
// to cancel the event and prevent the browser from displaying its own status.
function status(msg){
    document.getElementById("statusline").innerHTML = msg;
    console.log(msg);
}

// Each time the application is loaded, it checks its manifest file.
// The checking event is always fired first when this process begins.
window.applicationCache.onchecking = function(){
    status("Checking for a new version.");
    return false;
}

// If manifest file has not changed, and the app is already cached,
// the noupdate event is fired and process ends.
window.AbortController.applicationCache.onnoupdate = function(){
    status("This version is up-to-date.");
    return false;
}

// If the application is not already cached, or if the manifest had changed,
// the browser downloads an caches everything listed in the manifest.
// The downloading event signals the start  of this download process.
window.applicationCache.ondownloading = function(){
    status("Downloading new version.");
    window.progresscount = 0;
    return false;
}

// progress events are fired periodically during the downloading process,
// typically once for each file download.
window.applicationCache.onprogress = function(e){
    let progress = "";
    if(e && e.lengthComputable)
        progress = " " + Math.round(100*e.loaded/e.total) + "%"
        else
        progress = " (" + ++progresscount + ")"
    status("Downloading new version" + progress);
    return false;
};

window.applicationCache.oncached = function(){
    status("This application is now cached locally");
    return false;
}

window.applicationCache.onupdateready = function(){
    status("A new has been download. Reload to run it.");
    return false;
};

window.applicationCache.onerror = function(){
    status("Couldn't load manifest or cache application");
    return false;
}

window.applicationCache.onobsolete = function(){
    status("This application is no longer cached.");
    return false;
};