var computeGreyValue = function (r, g, b) {
    //standard formula for greyscale
    return (0.299 * r + 0.587 * g + 0.114 * b);
};

var applyGreyscale = function (pix, len) {
    for (var i = 0; i < len; i += 4) {
        var grey = computeGreyValue(pix[i], pix[i+1], pix[i+2]);
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

var applyBlackAndWhite = function (pix, len) {
    for (var i = 0, n = len; i < n; i += 4) {
        var grey = computeGreyValue(pix[i], pix[i+1], pix[i+2]);
        //convert to black & white only
        grey = (grey > 127) ? grey = 255 : grey = 0;

        pix[i] = grey;
        pix[i+1] = grey;
        pix[i+2] = grey;
    }
};