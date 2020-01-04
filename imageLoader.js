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


    function setupCanvas(e) {
        var img = new Image()
        img.src = $id('imgPrime').getAttribute('src');
        img.onload = () => {
            //fit canvas to ratio of picture
            var hRatio = canvas.width / img.width;
            var vRatio = canvas.height / img.height;
            var ratio = Math.min(hRatio, vRatio);
            context.drawImage(img, 0, 0, img.width, img.height,
                0, 0, img.width * ratio, img.height * ratio);

            /*context.drawImage(img, 0, 0, img.width, img.height,     // source rectangle
                0, 0, canvas.width, canvas.height); // destination rectangle*/
        }
    }

    /**
     * Drawing operations
     */
    //Listeners for mouse movement
    document.addEventListener('mousemove', draw);
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
    }

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


})();
