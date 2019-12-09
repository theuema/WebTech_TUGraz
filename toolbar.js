// Get the Toolbar
var myToolbar = document.getElementById("myToolbar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the Toolbar, and add overlay effect
function toolbar_open() {
  if (myToolbar.style.display === 'block') {
    myToolbar.style.display = 'none';
    overlayBg.style.display = "none";
} else {
    myToolbar.style.display = 'block';
    overlayBg.style.display = "block";
}
}

// Close the Toolbar with the close button
function toolbar_close() {
  myToolbar.style.display = "none";
  overlayBg.style.display = "none";
}
