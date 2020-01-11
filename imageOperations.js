var applyGreyscale = function (pix, len) {
    for (var i = 0; i < len; i += 4) {
        //standard formula for greyscale
        var grey = 0.299 * pix[i] + 0.587 * pix[i+1] + 0.114 * pix[i+2];
        pix[i] = grey;
        pix[i+1] = grey;
        pix[i+2] = grey;
    }
};

var applyNegative = function (pix, len) {
    for (var i = 0, n = len; i < n; i += 4) {
        pix[i] = 255 - pix[i];
        pix[i+1] = 255 - pix[i+1];
        pix[i+2] = 255 - pix[i+2];
    }
};