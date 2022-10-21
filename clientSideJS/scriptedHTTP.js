const { ftruncate } = require("fs");
const { features } = require("process");
const { fileURLToPath } = require("url");


// postig Text To Server:
function postMessage(msg){
    let request = new XMLHttpRequest();
    request.open("POST", "/login.php");
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send(msg);
}


// getting an http response onreadystatechange:
function getText(url, callback){
    let request = newe XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let type = requst.getResponseHeader("Content-Type");
            if(type.match(/^text/))
            callback(request.responseText);
        }
    }
    request.send(null);
}


// synchronouse responses:
function getTextSync(url){
    let request = new XMLHttpRequest();
    request.opent(null);
    request(null);

    if(request.status !== 200) throw new Error(request.statusText);

    let type = request.getResponseHeader("Content-Type");
    if(!type.match(/^text/))
    throw new Error("Expected textual response; got: " + type);

    return request.responseText;
}


// parsing the HTTP response
function get(url, callback){
    let request = new XMLHttpRequest();
    request.open("GET", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && request.status === 200){
            let type = request.getResponseHeader("Content-Type");
            if(type.indexOf("xml") !== -1 && request.responseXML)
            callback(request.responseXML);
            else if(type === "application/json")
            callback(JSON.parse(request.responseText));
        }   
     }
     request.send(null);
}


// encoding an object for an HTTP request
function encodeFormData(data){
    if(!data) return "";
    let pairs = [];

    for(let name in data){
        if(!data.hasOwnProperty(name)) continue;
        if(typeof data[name] === "function") continue;
        let value = data[name].toString();
        name = encodeURIComponent(name).replace("%20", "+");
        value = encodeURIComponent(value).replace("%20", "+");
        pairs.push(name + "=" + value);
    }
    return pairs.join('&');
}


// making an HTTP POST request with form-encoded data:
function postData(url, data, callback){
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && callback)
        callback(request);
    };
    request.setRequestHeader("Content-Type", "application/x-www-form-rulencoded");
    request.send(encodeFormData(data));
}


// making a GET request with form-encoded data:
function getData(url, data, callback){
    let request = new XMLHttpRequest();
    request.open("GET", url + "?" + encodeFormData(data));
    request.onreadystatechange = function(){
        if(request.readyState === 4 && callback) callback(request);
    }
    request.send(null);
}


// making an http POST requst with a json-encoded body
function postJSON(url, data, callback){
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && callback)
        callback(request);
    }
    request.setRequestHeader("Content-Type", "application/json");
    request.send(JSON.stringify(data));
}


// an HTTP POST request with an XML document as its body:
function postQuery(url, what, where, radius, callback){
    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && callback) callback(request);
    };

    let doc = document.implementation.createDocument("", "query", null);
    let query = doc.documentElement;
    let find = doc.createElement("find");
    query.appendChild(find)
    find.setAttribute("zipcode", where);
    find.setAttribute("redius", radius);
    find.appendChild(doc.createTextNode(what));
    request.send(doc);
}

// File upload with an HTTP POST request
whenReady(function(){
    let elts = document.getElementsByTagName("input");
    for(let i = 0; i < elts.length; i++){
        let input = elts[i];
        if(input.type != "file") continue;
        let url = input.getAttribute("data-uploadto");
        if(!url) continue;

        input.addEventListener("change", function(){
            let file = this.files[0];
            if(!file) return;
            let xhr = new XMLHttpRequest();
            xhr.open("POST", url);
            xhr.send(file);

        }, false);
    }
});

// POSTing multipart/form-data request body
function postFormData(url, data, callback){
    if(typeof FormData === "undefined")
    throw new Error("FormData is not implemented.");

    let request = new XMLHttpRequest();
    request.open("POST", url);
    request.onreadystatechange = function(){
        if(request.readyState === 4 && callback)
        callback(request)
    }
    let formdata = new FormData();
    for(let name in data){
        if(!data.hasOwnProperty(name)) continue;
        let value = data[name];
        if(typeof value === "function") continue;
        formdata.append(name, value);
    }
    request.send(formdata);
}

// monitoring HTTP upload progress
whenReady(function(){
    let elts = document.getElementsByClassName("fileDropTarget");
    for(let i = 0; i < elts.length; i++){
        let target = elts[i];
        let url = target.getAttribute("data-uploadto");
        if(!url) continue;
        createFileUploadDropTarget(target, url);
    }

    function createFileUploadDropTarget(target, url){
        let uploading = false;
        console.log(target, url);
        target.onragenter = function(e){
        let uploading = false;

        target.onragenter = function(e){
            if(uploading) return;
            let types = e.dataTransfer.types;
            if(types && ((types.contains && types.contains("Files")) ||
            (types.indexOf && types.indexOf("Files") !== -1)))
            {
                target.classList.add("wantdrop");
                return false;
            }};
            target.ondragover = function(e){
                if(uploading) return false;
            }
            target.ondragleave = function(e){
                if(!uploading) target.classList.remove("wantdrop");
            }
                if(!uploading) return false;
                let files = e.dataTransfer.files;

            }
            target.ondrop = function(e){
                if(uploading) return false;
                let files = e.dataTransfer.files;
                if(files && files.length){
                    uploading = true;
                    let message = "Uploading files: <ul>";
                    for(let i = 0; i < files.length; i++)
                        message += "<li>" + files[i].name + "</li>";
                    message += "</ul>";
                   target.innerHTML = message;
                   target.classList.remove("wantdrop");
                   target.classList.add("uploading");

                   let xhr = new XMLHttpRequest();
                   xhr.open("POST", url);
                   let body = new FormData();
                   for(let i = 0; i < files.length; i++) body.append(i, files[i]);
                   xhr.upload.onprogress = function(e){
                    if(e.lengthComputable){
                        target.innerHTML = message + Math.round(e.loaded/e.total * 100) + 
                        "% complete";
                    }
                   };
                   xhr.upload.onload = function(e){
                    uploading = false;
                    target.classList.remove("uploading");
                    target.innerHTML = "Drop files to upload";
                   };
                   xhr.send(body);
                   return false;
                }
                target.classList.remove("wantdrop");
            }
               
            }
        }
);