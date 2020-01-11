// Inspired by: https://dzone.com/articles/using-web-workers-improve

importScripts('imageOperations.js');

self.addEventListener('message', function (e) {
    console.log( "[WORKER] Start block  " + e.data.index + ": " + e.data.cmd);
    var imgd = e.data.imgd;
    var pix = imgd.data;
    var pix_len = e.data.len;
    var cmd = e.data.cmd;
    if ("greyscale" === cmd) {
        applyGreyscale(pix, pix_len);
    }
    else if ("negative" === cmd) {
        applyNegative(pix, pix_len);
    }
    else if ("blackandwhite" === cmd) {
        applyBlackAndWhite(pix, pix_len);
    }
    else {
        console.log("[WORKER] Command '" + cmd + "' not found!");
    }

    postMessage({'imgd': imgd, 'index': e.data.index});
});