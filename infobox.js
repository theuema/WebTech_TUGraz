var initialText = `Open a saved Image or drag a new Image onto the screen to start.`;
var rgbText = `The RGB color model is an additive color model. That means, adding together the three colors red, green, blue allows to produce a broad spectrum of colors. For example, adding together the two colors green and red results in yellow.

Each pixel of an image is defined by three values from 0 and 255 for each color red, green and blue, respectively. Hence, each pixel is a RGB tripple. Describing the example from above, rgb(255, 255, 0) means yellow.

We splitted the uploaded image into its three color channels. Try different combinations and have a look at the result!
Overlapping all three channel should result in your original image

Hint: Click again on the RGB-Splitter button to merge the channels.`;

var greyscaleboxText = `A monochrome image does only exist of shades of a single color.

For our example we converted the image into grayscale, which is also known as black & white.

We used a standard formula to calculate the grey value for each pixel of the image:
grey = (0.299 * red + 0.587 * green + 0.114 * blue)`;
var negativeText = `To create the negative of an image, for each pixel, we have to take each RGB color value and separately substract it from 255 (which is the maximum value).

For example:
The negative of rgb(15, 250, 0) becomes rgb(255 - 15, 255 - 250, 255 - 0) which is rgb(240, 5, 255)`;

var blackwhiteText = `For this example we used "real" black & white, i.e., depending on its grey value each pixel is either black or  = white

The color is derived from the following mapping:
grey > 127: rgb(255, 255, 255) = white
grey <= 127: rgb(0,0,0) = black`;
var alphaText = `Beside color information a pixel does also contain information about its capacity. 

The capacity is controlled by its alpha value which takes values from 0 to 1. 

An alpha value of 1 yields full capacity and an alpha value of zero means totally transparent.`;

var infoboxTitle = document.getElementById("infobox-title")
var infobox = document.getElementById("infobox");

function setInitialText() {
    infoboxTitle.innerText = "Welcome";
    infobox.innerText = initialText;
}

function setRGBText() {
    infoboxTitle.innerText = "RGB color model";
    infobox.innerText = rgbText;
}

function setGreyscaleText() {
    infoboxTitle.innerText = "Greyscale";
    infobox.innerText = greyscaleboxText;
}

function setNegativeText() {
    infoboxTitle.innerText = "Negative";
    infobox.innerText = negativeText;
}

function setBlackWhiteText() {
    infoboxTitle.innerText = "Black & White";
    infobox.innerText = blackwhiteText;
}

function setAlphaText() {
    infoboxTitle.innerText = "Alpha Value";
    infobox.innerText = alphaText;
}