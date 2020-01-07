(function () {

    // getElementById
    function $id(id) {
        return document.getElementById(id);
    }

    // file drag hover
    function userActionsHover(e) {
        e.stopPropagation();
        e.preventDefault();
        e.target.className = (e.type == "dragover" ? "hover" : "");
    }

    // file selection
    function ImageLoaderHandler(e) {
        // cancel event and hover styling
        userActionsHover(e);

        //target.files = imageLoader; dataTransfer.files = DnD
        var files = e.target.files || e.dataTransfer.files;

        for (var i = 0, f; f = files[i]; i++) {
            ParseFile(f);
        }
    }

    // output file information
    function ParseFile(file) {

        // display image
        if (file.type.indexOf("image") == 0) {
            var reader = new FileReader();
            reader.readAsDataURL(file);

            //todo: open it right away on canvas??
            reader.onload = function (e) {
                $id("imgPrime").src = e.target.result;
                //$id("imgPrime").style.display = 'block';
                
                $id("imageCanvas").style.display = 'inline';
            }

            userActions.style.display = 'none';
        }
    }

    // initialize
    function Init() {
        var imageLoader = $id("imageLoader");
        var userActions = $id("userActions");

        // file select
        imageLoader.addEventListener("change", ImageLoaderHandler, false);

        // is XHR2 available?
        var xhr = new XMLHttpRequest();
        if (xhr.upload) {
            // file drop
            userActions.addEventListener("dragover", userActionsHover, false);
            userActions.addEventListener("dragleave", userActionsHover, false);
            userActions.addEventListener("drop", ImageLoaderHandler, false);
            userActions.style.display = "block";

        }

    }

    // call initialization file
    if (window.File && window.FileList && window.FileReader) {
        Init();
    }
    else {
        //error, Browser does not support FileReader
        //TODO check with a browser if this is correct, otherwise delete
        var p = document.createElement('p'),
            msg = document.createTextNode('Sorry, your browser does not support FileReader.');
        p.className = 'error';
        p.appendChild(msg);
        $id('userActions').innerHTML = '';
        $id('userActions').appendChild(p);
    }


    /**
     * Canvas Operations
     */

    //set up canvas
    var canvasLoader = $id('imgPrime');
    canvasLoader.addEventListener('load', setupCanvas);

    var canvas = $id('imageCanvas');
    var context = canvas.getContext('2d');


    //variables for canvas operations
    var imageSize = 200;
    var imgWidth, imgHeight;
    var xPos = (canvas.width - imageSize) / 2;
    var yPos = (canvas.height - imageSize) / 2;

    //rgb splitting
    var rgbSplitButton = $id('w3-bar-rgb');
    rgbSplitButton.addEventListener('click', splitRGB, false);
    var is_rgb_split = false;
    var rPosX, rPosY, gPosX, gPosY, bPosX, bPosY;

    //alpha slider
    var alphaSlider = $id('alpha-slider');
    alphaSlider.addEventListener('change', changeAlphaValue, false);
    var alphaLabel = $id('alpha-label');

    //for moving
    var imgdAll, imgdR, imgdG, imgdB;


    function setupCanvas(e) {
        var img = new Image()
        img.src = $id('imgPrime').getAttribute('src');
        img.onload = () => {
            /*//fit canvas to ratio of picture
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            context.drawImage(img, 0, 0, img.width, img.height,
                0, 0, img.width * ratio, img.height * ratio);*/

            context.clearRect(0, 0, canvas.width, canvas.height);

            var ratio = img.width / img.height;
            if(img.width > img.height) {
                imgWidth = imageSize;
                imgHeight = imageSize / ratio;
            }
            else {
                imgWidth = imageSize * ratio;
                imgHeight = imageSize;
            }
            context.drawImage(img,xPos,yPos,imgWidth,imgHeight);

            imgdAll = context.getImageData(xPos, yPos, imgWidth, imgHeight);

            /*context.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                0, 0, canvas.width, canvas.height); // destination rectangle*/

        }
    }

    function splitRGB() {
        if(is_rgb_split) {
            is_rgb_split = false;

            var pix = imgdR.data;
            let red_image = [...pix];

            pix = imgdG.data;
            let green_image = [...pix];

            pix = imgdB.data;
            let blue_image = [...pix];

            context.clearRect(0, 0, canvas.width, canvas.height);

            pix = imgdAll.data;

            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i] = red_image[i];
                pix[i+1] = green_image[i+1];
                pix[i+2] = blue_image[i+2];
                pix[i+3] = parseFloat(alphaSlider.value) * 255;
            }

            //move image to the red image
            xPos = rPosX;
            yPos = rPosY;

            context.putImageData(imgdAll, xPos, yPos);
        }
        else {
            is_rgb_split = true;

            imgdR = context.getImageData(xPos, yPos, imgWidth, imgHeight);
            imgdG = context.getImageData(xPos, yPos, imgWidth, imgHeight);
            imgdB = context.getImageData(xPos, yPos, imgWidth, imgHeight);

            context.clearRect(0, 0, canvas.width, canvas.height);

            var pix = imgdAll.data;
            let original = [...pix];

            //red
            pix = imgdR.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i] = original[i];
                pix[i+1] = 0;
                pix[i+2] = 0;
            }
            rPosX = xPos;
            rPosY = yPos+imgHeight/2;
            context.putImageData(imgdR, rPosX, rPosY);

            //green
            var pix = imgdG.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i] = 0;
                pix[i+1] = original[i+1];
                pix[i+2] = 0;
            }
            gPosX = xPos-imgWidth/2;
            gPosY = yPos-imgHeight/2;
            context.putImageData(imgdG, gPosX, gPosY);

            //blue
            var pix = imgdB.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i] = 0;
                pix[i+1] = 0;
                pix[i+2] = original[i+2];
            }
            bPosX = xPos+imgWidth/2;
            bPosY = yPos-imgHeight/2
            context.putImageData(imgdB, bPosX, bPosY);
        }
    }    

    /**
     * Moving operations 
     * (view-source:http://kti.tugraz.at/staff/vsabol/courses/mmis1/examples/canvas/11.html)
     */
    canvas.addEventListener( 'mousemove', onMouseMoveOnCanvas, false );
    canvas.addEventListener( 'mousedown', onMouseDownOnCanvas, false );
    canvas.addEventListener( 'mouseup', onMouseUpOnCanvas, false );

    var mouse_down = false;
    var x0 = -1;
    var y0 = -1;
    var move_col = '';

    function onMouseDownOnCanvas(evt) {         
        mouse_down = true;
    }
    
    function onMouseUpOnCanvas(evt) {
        mouse_down = false;
        x0 = -1;
        y0 = -1;
    }

    function onMouseMoveOnCanvas(evt) {         
        if (mouse_down) {
            var rect = canvas.getBoundingClientRect();
            xEvt = evt.clientX - rect.left;
            yEvt = evt.clientY - rect.top;
            if(is_rgb_split) {
                if((x0 == -1) || (y0 == -1)) {
                    if((xEvt > rPosX) && (xEvt < (rPosX + imgWidth)) && (yEvt > rPosY) && (yEvt < (rPosY + imgHeight))) {
                        x0 = xEvt;
                        y0 = yEvt;
                        move_col = 'r'
                    }
                    else if((xEvt > gPosX) && (xEvt < (gPosX + imgWidth)) && (yEvt > gPosY) && (yEvt < (gPosY + imgHeight))) {
                        x0 = xEvt;
                        y0 = yEvt;
                        move_col = 'g'
                    }
                    else if((xEvt > bPosX) && (xEvt < (bPosX + imgWidth)) && (yEvt > bPosY) && (yEvt < (bPosY + imgHeight))) {
                        x0 = xEvt;
                        y0 = yEvt;
                        move_col = 'b'
                    }
                    else {
                        return;
                    }
                }
                var dx = xEvt - x0;
                x0 = xEvt;
                var dy = yEvt - y0;
                y0 = yEvt;

                if(move_col == 'r') {
                    rPosX += dx;
                    rPosY += dy;
                }
                if(move_col == 'g') {
                    gPosX += dx;
                    gPosY += dy;
                }
                if(move_col == 'b') {
                    bPosX += dx;
                    bPosY += dy;
                }
            }
            else {
                if((x0 == -1) || (y0 == -1)) {
                    if((xEvt > xPos) && (xEvt < (xPos + imgWidth)) && (yEvt > yPos) && (yEvt < (yPos + imgHeight))) {
                        x0 = xEvt;
                        y0 = yEvt;
                    } else {
                        return;
                    }
                }
                var dx = xEvt - x0;
                x0 = xEvt;
                xPos += dx;                    
                var dy = yEvt - y0;
                y0 = yEvt;
                yPos += dy;
            }
            redraw();
        }
    }

    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        if(is_rgb_split) {
            //red
            context.putImageData(imgdR, rPosX, rPosY);

            //green
            var temp_imgd = context.getImageData(gPosX, gPosY, imgWidth, imgHeight);
            var pix = temp_imgd.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i+1] = imgdG.data[i+1]
                pix[i+3] = parseFloat(alphaSlider.value) * 255;
            }
            context.putImageData(temp_imgd, gPosX, gPosY);

            //blue
            temp_imgd = context.getImageData(bPosX, bPosY, imgWidth, imgHeight);
            pix = temp_imgd.data;
            for (var i = 0, n = pix.length; i < n; i += 4) {
                //This would be something that could be done by workers
                pix[i+2] = imgdB.data[i+2]
                pix[i+3] = parseFloat(alphaSlider.value) * 255;
            }
            context.putImageData(temp_imgd, bPosX, bPosY);
        } else {
            context.putImageData(imgdAll, xPos, yPos);
        }
    }


    /**
     * Drawing operations
     */
    //Listeners for mouse movement
    /*document.addEventListener('mousemove', draw);
    document.addEventListener('mousedown', setPosition);
    document.addEventListener('mouseup', releaseMouse);
    
    var pos = { x: 0, y: 0 };
    brushColor = "rgb(0, 0, 0)";

    // new position for mouse events, not working
    function setPosition(e) {
        //pos.x = e.clientX;
        //pos.y = e.clientY;
        context.beginPath();
    }

    function draw(e) {
        // mouse left button must be pressed
        if (e.buttons !== 1) return;

        //context.beginPath(); // begin
        context.lineWidth = 5;
        context.lineCap = 'round';
        context.strokeStyle = brushColor;
        //context.moveTo(e.layerX, e.layerY); // from
        //setPosition(e);
        //context.lineTo(pos.x, pos.y); // to
        context.lineTo(e.layerX, e.layerY);
        context.stroke();
    }

    function releaseMouse(e) {
        //set different color
        var colors = context.getImageData(e.layerX, e.layerY, 1, 1).data;
        brushColor = "rgb(" + colors[0] + ", " + colors[1] + ", " + colors[2] + ")";
    }*/

    //TODO: add more operations


    /**
     * Save the canvas image
     */
    $id('saveBtn').addEventListener('click', saveImage, false);

    function saveImage(e) {
        var image = canvas.toDataURL("image/png")
            .replace("image/png", "image/octet-stream");  
        window.location.href = image;

        e.preventDefault();   
    }

    function changeAlphaValue() {
        // https://stackoverflow.com/questions/36038679/html-canvas-inaccurately-sets-pixel-color-when-alpha-is-lower-than-one
        alphaLabel.innerText = alphaSlider.value;
        var alpha = parseFloat(alphaSlider.value) * 255;

        if(is_rgb_split) {
            //red
            var pix = imgdR.data;
            // This would be something that could be done by workers
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i+3] = alpha;
            }
            context.putImageData(imgdR,rPosX,rPosY);

            //green
            pix = imgdG.data;
            // This would be something that could be done by workers
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i+3] = alpha;
            }
            context.putImageData(imgdG,gPosX,gPosY);

            //blue
            pix = imgdB.data;
            // This would be something that could be done by workers
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i+3] = alpha;
            }
            context.putImageData(imgdB,bPosX,bPosY);
        }
        else {
            var pix = imgdAll.data;
            // This would be something that could be done by workers
            for (var i = 0, n = pix.length; i < n; i += 4) {
                pix[i+3] = alpha;
            }
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.putImageData(imgdAll,xPos,yPos);
        }
    }

})();
