function getmap(){
    if(!navigator.geolocation) throw("Geolocation not supported");
    let image = document.createElement("img");
    navigator.geolocation.getCurrentPosition(setMapURL);
    return image;
}

function setMapURL(pos){
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    let accuracy = pos.coords.accuracy;

    let url = "http://map.google.com/maps/api/staticmap" + "?center" + latitude + "," + longitude + 
    "&size=640*640&sensor=true";

    // Set map zoom level using a rough heuristic
    let zoomlevel = 20;
    if(accuracy > 80)
    zoomlevel -= Math.round(Math.log(accuracy/50)/Math.LN2);
    url += "&zoom=" + zoomlevel;

    // Now display the map in the image object. Thanks, Google!
    image.src = url;
}