var initialText = `Open a saved Image or drag a new Image onto the screen to start.`;
var rgbText = `The RGB color model is an additive color model. That means, adding together the three colors red, green, blue allows to produce a broad spectrum of colors. For example, adding together the two colors green and red results in yellow.

Each pixel of an image is defined by three values from 0 and 255 for red, green and blue, respectively. Hence, each pixel is a RGB tripple. Describing the example from above, rgb(255, 255, 0) means yellow.

Try to split the uploaded image into its three color channels by clicking and moving around the different layers. Try different combinations and have a look at the result!`;

var monochromeText = `A monochrome image does only exist of shades of a single color.

For our example we converted the image into grayscale, which is also known as black & white.`;
var negativeText = `To create the negative of an image, for each pixel, we have to take each RGB color value and separately substract it from 255 (which is the maximum value).

For example:
The negative of rgb(15, 250, 0) becomes rgb(255 - 15, 255 - 250, 255 - 0) = rgb(240, 5, 255)`;

var blackwhiteText = `For this example we used "real" black & white, i.e., each pixel does either have rgb(0,0,0) = black or rgb(255,255,255) = white`;
var alphaText = `Beside color information a pixel does also contain information about its capacity. 

The capacity is controlled by its alpha value which takes values from 0 to 1. 

An alpha value of 1 yields full capacity and an alpha value of zero means totally transparent.`;

var infobox = document.getElementById("infobox");

function setInitialText() {
    infobox.innerText = initialText;
}

function setRGBText() {
    infobox.innerText = rgbText;
}

function setMonochromeText() {
    infobox.innerText = monochromeText;
}

function setNegativeText() {
    infobox.innerText = negativeText;
}

function setBlackWhiteText() {
    infobox.innerText = blackwhiteText;
}

function setAlphaText() {
    infobox.innerText = alphaText;
}