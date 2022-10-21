function getScrollOffset(w){
    w = w || window; //The specified window or the current window if no arguments

    // this workds for all browsers except IE version 8 and before
    if(w.pageXOffset != null) return {
        x: w.pageXOffset, y:w.pageYOffset
    };

    // For IE (or any browser) in Standards mode:
    let d = w.document;
    if(document.compatMode == "CSS1Compat")
        return {
            x: d.documentElement.scrollLeft, y:d.documentElement.scrollTop
        };
        return {
            x: d.body.scrollLeft, y: d.body.scrollTop
        }
}