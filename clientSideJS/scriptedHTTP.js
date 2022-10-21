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