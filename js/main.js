// When the user scrolls the page, execute stickyNavbar
window.onscroll = function() {stickyNavbar()};

// Get the navbar
var navbar = document.getElementById("navbar");

// Get the offset position of the navbar
var sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function stickyNavbar() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}

// Generate background image at random
function imgset() {
    //declare an array
    var randomImage = new Array();

    //insert the URL of images in array  
    randomImage[0] = "res/img/en-pop-gallery1.jpg";
    randomImage[1] = "res/img/en-pop-gallery2.jpg";
    randomImage[2] = "res/img/en-pop-gallery3.jpg";
    randomImage[3] = "res/img/en-pop-gallery4.jpg";
    randomImage[4] = "res/img/en-pop-gallery5.jpg";
	randomImage[5] = "res/img/en-pop-gallery6.jpg";
	randomImage[6] = "res/img/en-pop-gallery7.jpg";
	randomImage[7] = "res/img/en-pop-gallery8.jpg";
	randomImage[8] = "res/img/en-pop-gallery9.jpg";
	randomImage[9] = "res/img/en-pop-gallery10.jpg";
	randomImage[10] = "res/img/en-pop-gallery11.jpg";
	randomImage[11] = "res/img/en-pop-gallery12.jpg";
	randomImage[12] = "res/img/en-pop-gallery13.jpg";
	randomImage[13] = "res/img/en-pop-gallery14.jpg";

    //generate a number 
    var number = Math.floor(Math.random() * randomImage.length);

    //return the images generated by number 
    return randomImage[number];
}