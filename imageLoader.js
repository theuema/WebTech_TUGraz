var imageSize = 200;
var imageLoader = document.getElementById('imageLoader');
imageLoader.addEventListener('change', handleImage, false);
var canvas = document.getElementById('imageCanvas');
var ctx = canvas.getContext('2d');

var rgbSplitButton = document.getElementById('w3-bar-rgb');
rgbSplitButton.addEventListener('click', splitRGB, false);
var alphaSlider = document.getElementById('alpha-slider');
alphaSlider.addEventListener('change', changeAlphaValue, false);
var alphaLabel = document.getElementById('alpha-label');
var imgWidth, imgHeight, xPos = 350, yPos = 150;

function handleImage(e){
    var reader = new FileReader();
    reader.onload = function(event){
        var img = new Image();
        img.onload = function(){
            /*canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);*/
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            var ratio = img.width / img.height;
            if(img.width > img.height) {
                imgWidth = imageSize;
                imgHeight = imageSize / ratio;
            }
            else {
                imgWidth = imageSize * ratio;
                imgHeight = imageSize;
            }
            ctx.drawImage(img,xPos,yPos,imgWidth,imgHeight);
        }
        img.src = event.target.result;
    }
    reader.readAsDataURL(e.target.files[0]);     
}

function splitRGB() {
    var imgd = ctx.getImageData(xPos, yPos, imgWidth, imgHeight);
                    
    var pix = imgd.data;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let original = [...pix];

    //red
    for (var i = 0, n = pix.length; i < n; i += 4) {
        //This would be something that could be done by workers
        pix[i] = original[i];
        pix[i+1] = 0;
        pix[i+2] = 0;
    }
    ctx.putImageData(imgd, xPos, yPos+imgHeight/2);

    //green
    for (var i = 0, n = pix.length; i < n; i += 4) {
        //This would be something that could be done by workers
        pix[i] = 0;
        pix[i+1] = original[i+1];
        pix[i+2] = 0;
    }
    ctx.putImageData(imgd, xPos-imgWidth/2, yPos-imgHeight/2);

    for (var i = 0, n = pix.length; i < n; i += 4) {
        //This would be something that could be done by workers
        pix[i] = 0;
        pix[i+1] = 0;
        pix[i+2] = original[i+2];
    }
    ctx.putImageData(imgd, xPos+imgWidth/2, yPos-imgHeight/2);
}

function changeAlphaValue() {
    // https://stackoverflow.com/questions/36038679/html-canvas-inaccurately-sets-pixel-color-when-alpha-is-lower-than-one
    alphaLabel.innerText = alphaSlider.value;
    var alpha = parseFloat(alphaSlider.value) * 255;
    var imgd = ctx.getImageData(xPos, yPos, imgWidth, imgHeight);
    var pix = imgd.data;
    // This would be something that could be done by workers
    for (var i = 0, n = pix.length; i < n; i += 4) {
        pix[i+3] = alpha;
    }
    ctx.putImageData(imgd,xPos,yPos);
}