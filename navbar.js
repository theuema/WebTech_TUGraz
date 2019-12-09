// Get the Sidebar
var myNavbar = document.getElementById("myNavbar");

// Get the DIV with overlay effect
var overlayBg = document.getElementById("myOverlay");

// Toggle between showing and hiding the sidebar, and add overlay effect
function navbar_open() {
  if (myNavbar.style.display === 'block') {
    myNavbar.style.display = 'none';
    overlayBg.style.display = "none";
} else {
    myNavbar.style.display = 'block';
    overlayBg.style.display = "block";
}
}

// Close the sidebar with the close button
function navbar_close() {
  myNavbar.style.display = "none";
  overlayBg.style.display = "none";
}
