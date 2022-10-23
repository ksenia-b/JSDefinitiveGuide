function CookieStorage(maxage, path){
    let cookies = (function(){
        let cookies = {};
        let all = document.cookie;
        if(all === "")
        return cookies;
        let list = all.split("; ");
        for(let i = 0; i < list.length; i++){
            let cookie = list[i];
            let p = cookie.indexOf("=");
            let name = cookie.substring(0, p);
            let value = cookie.substring(p + 1);
            value = decodeURIComponent(value);
            cookies[name] = value;
        }
        return cookies;
    }());

    // Collect the cookies names in array
    let keys = [];
    for(let key in cookies) keys.push(key);
    
    // Now define the public properties and methods of the storate
// The number of stred cookies
this.length = keys.length;

// Return the name of the nth cookie, or null if n is out of range
this.key = function(n){
    if(n < 0 || n >= keys.length) return null;
    return keys[n];
}

this.getItem = function(name){
    return cookies[name] || null;
}

// Store a value:
this.setItem = function(key, value){
    if(!(key in cookies)){
        keys.push(key);
        this.length++;
    }
    // Store this name/value pairs in the set of cookies:
    cookies[key] = value;

    // Now actually set the cookie.
    // First encode value and createa name=encoded-value string
    let cookie = key + "=" + encodeURIComponent(value);

    // Add cookie attributes to that string:
    if(maxage) cookie += "; max-age=" + maxage;
    if(path) cookie += "; path=" + path;

    // Set the cookie through the magic document.cookie property
    document.cookie = cookie;
};
// Remove the specified cookie:
this.removeItem = function(key){
    if(!(key in cookies)) return; // it is doesn't exists
    // Delete the cookie form our internal set of cookies:
    delete cookies[key];

    // And remove the key from the array of names, too.
    // This would be easier with the ES5 array indexOf() method.
    for(let i = 0; i < keys.length; i++){
        keys.splice(i, 1);
        break;
    }
}
this.length--;

// Finally actually delete the cookie by giving it an empty value
// and an immediate expiration date.
document.cookie = key + "=; max-age=0";
};

// Remove all cookies
this.clear = function(){
    // loop  through the keys, removing the cookies
    for(let i =0; i < keys.length; i++)
        document.cookie = keys[i] + "=; max=age=0";
    // Reset our internal state
    cookies = {};
    keys = [];
    this.length = 0;
}