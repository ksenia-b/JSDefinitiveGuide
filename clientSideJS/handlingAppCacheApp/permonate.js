let editor, statusline, savebutton, idletimer;

// The first time applicaiton loads
window.onload = function(){
    if(localStorage.note == null) localStorage.note = "";
    if(localStorage.lastModified == null) localStorage.lastModified = 0;
    if(localStorage.lastSaved == null) localStorage.lastSaved = 0;

    editor = document.getElementById("editor");
    statusline = document.getElementById("statusline");
    savebutton = document.getElementById("savebutton");

    // editor.value = localStorage.note;
    // editor.disable = true;

    editor.addEventListener("input", function(e){
        // Save new value to local storage:
        localStorage.note = editor.value;
        localStorage.lastModified = Date.now();
        // Reset the idle timer:
        if(idletimer) clearTimeout(idletimer);
        idletimer = setTimeout(save, 5000);
        // Enable the save button:
        savebutton.disable = false;
    }, false);

    // Each itme the application loads, try to sync up with the server:
    sync();


    savebutton.addEventListener('click', function() {
        debugger
        save()
    })
};

// Save to the server before navigating away from the page:
window.onbeforeunload = function(){
    if(localStorage.lastModified < localStorage.lastSaved)
        save();
};

// If we go offline, let the user know
window.onoffline = function(){
    status("Offline");
}

// When we come online again, sync up.
window.ononline = function(){
    sync();
};

// Notify the user if there is a new version of this application available.
// we could also force a reaload here with location.reload()
// window.applicationCache.onupdateready = function(){
//     status("A new version of this application is available. Reload to run it.")
// };

// Also let the user know if hte is not a new version available.
// window.applicationCache.onnoupdate = function(){
//     status("You are running the latest version of hte application.");
// }

// Upload the note text to the server (if we're online).
// Will be automatically cached after 5 seconds of inactivity whenevenever
// the note has been modified.
function save(){
    if(idletimer) clearTimeout(idletimer);
    idletimer = null;
    console.log(editor, statusline, savebutton, idletimer);
    debugger

    if(navigator.onLine){
        let xhr = new XMLHttpRequest();
        xhr.open("PUT", "/note");
        xhr.send(editor.value);
        xhr.onload = function(){
            localStorage.lastSaved = Date.now();
            savebutton.disable = true;
        };
        xhr.onerror = function (error) {
            console.error(error);
            debugger
        }
    }
}


// Check for a new version of the note on the server. If a newer
// version is not found, save the current version to the server.
function sync(){
    if(navigator.onLine){
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "/note");
        xhr.send();
       xhr.onload = function(){
        let remoteModTime = 0;
        if(xhr.status == 200){
            let remoteModTime = xhr.getResponseHeader("Last-Modified");
            remoteModTime = new Date(remoteModTime).getTime();
        }
        if(remoteModTime > localStorage.lastModified){
            status("Newer note found on server.");
            let userit = confirm("There is a newer version of the note \n " +
            "on the server. Click Ok to use that version \n" +
            "version and overwrite the server.");
            let now = Date.now();
            if(useit){
                editor.value = localStorage.note = xhr.responseText;
                localStorage.lastSaved = now;
                status("Newer version download.");
            }
            else 
            status("Ignoring newer version of the note.");
            localStorage.lastModified = now;
        }
        else status("You are editing the current version of the note.");

        if(localStorage.lastModified > localStorage.lastSaved){
            save();
        }
        editor.disable = false;
        editor.focus();
       }
    }
    else{
         // if we are currently offline, we can't sync
         status("Can't sync while offline.");
         editor.disable = false;
         editor.focus();
    }
};

