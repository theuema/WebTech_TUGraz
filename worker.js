// Inspired by: https://dzone.com/articles/using-web-workers-improve

function applyGreyscale(pix, start, end) {
    for (var i = start; i < end; i += 4) {
        //standard formula for greyscale
        var grey = 0.299 * pix[i] + 0.587 * pix[i+1] + 0.114 * pix[i+2];
        pix[i] = grey;
        pix[i+1] = grey;
        pix[i+2] = grey;
    }
}

self.addEventListener('message', function (e) {
    console.log( "[WORKER] Start " + e.data.cmd);
    var start = e.data.start;
    var end = e.data.end;
    var imgd = e.data.imgd;
    var pix = imgd.data;

    var cmd = e.data.cmd;
    if ("greyscale" === cmd) {
        applyGreyscale(pix, start, end);
    }
    else {
        console.log("[WORKER] Command '" + cmd + "' not found!")
    }

    postMessage({'imgd': imgd, 'index': e.data.index, 'start': start, 'end': end});
});