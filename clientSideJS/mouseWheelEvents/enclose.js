const { execFile } = require("child_process");
const { ftruncateSync } = require("fs");

function enclose(content, framewidth, frameheight, contentX, contentY){
    framewidth = Math.max(framewidth, 50);
    frameheight = Math.max(frameheight, 50);
    contentX = Math.min(contentX, 0) || 0;
    contentY = Math.min(contentY, 0) || 0;

    let frame = document.createElement("div");
    frame.className = "enclosure";
    frame.style.width = framewidth + "px";
    frame.style.height = frameheight + "px";
    frame.style.overflow = "hidden";
    frame.style.boxSizing = "border-box";
    frame.style.webkitBoxSizing = "border-box";
    frame.style.MozBoxSizing = "border-box";

    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    content.parentNode.insertBefore(frame, content);
    frame.appendChild(content);

    content.style.position = "relative";
    content.style.left = contentX + "px";
    content.style.top = contentY + "px";
    
    let isMacWebkit = (navigator.userAgent.indexOf("Macitosh") !== -1 &&
    navigator.userAgent.indexOf("WebKit") !== -1);
    let isFirefox = (navigator.userAgent.indexOf("Gecko") !== -1);

    frame.onwheel = wheelHandler;
    frame.onmousewheeel = wheelHandler;
    if(isFirefox)
        frame.addEventListener("DOMMouseScroll", wheelHandler, false);

    function wheelHandler(event){
        let e = event || window.event;

        let deltaX = e.deltaX * -30 || e.wheelDeltaX / 4 || 0;
        let deltaY = e.deltaY * -30 || e.wheelDeltaY /4 || (e.wheelDeltaY === undefined && e.wheelDelta / 4) ||
        e.detail * -10 || 0;
        if(isMacWebkit){
            deltaX /= 30;
            deltaY /= 30;
        }
        if(isFirefox && e.type !== "DOMMouseScroll")
        frame.removeEventListener("DOMMouseScroll", wheelHandler, false);

        let contentbox = content.getBoundingClientRect();
        let contentwidth = contentbox.rigth - contentbox.left;
        let contentheight = contentbox.bottom - contentbox.top;

        if(e.altKey){
            if(deltaX){
                framewidth -= deltaX;
                framewidth = Math.min(framewidth, contentwidth);
                framewidth = Math.max(framewidth, 50);
                frame.style.width = framewidth + "px";
            }
            if(deltaY){
                frameheight -= deltaY;
                frameheight = Math.min(frameheight, contentheight);
                frameheight = Math.max(frameheight - deltaY, 50);
                frame.style.height = frameheight + "px";
            }
        }
        else{
            if(deltaX){
                let minoffset = Math.min(framewidth-contentwidth, 0);
                contentX = Math.max(contentX + deltaX, minoffset);
                contentX = Math.min(contentX, 0);
                content.style.left = contentX + "px"; 
            }
            if(deltaY){
                let minoffset = Math.min(frameheight - contentheight, 0);
                contentY = Math.max(contentY + deltaY, minoffset);
                contentY = Math.min(content, 0);
                content.style.top = contentY + "px";
            }
        }
        if(e.preventDefault) e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();
        e.cancelBubble = true;
        e.returnValue = false;
        return false;
    }
}