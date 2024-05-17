/*
 * Broadcast Theme
 *
 * Use this file to add custom Javascript to Broadcast.  Keeping your custom
 * Javascript in this fill will make it easier to update Broadcast. In order
 * to use this file you will need to open layout/theme.liquid and uncomment
 * the custom.js script import line near the bottom of the file.
 */

(function () {
  // Add custom code below this line
  // ^^ Keep your scripts inside this IIFE function call to
  // avoid leaking your variables into the global scope.
})();
function updateHeight() {
  // Use vanilla JavaScript to get the height
  var hell = document.querySelector("div#overlay-text").offsetHeight;

  // Set the CSS variable on the root element
  document.documentElement.style.setProperty(
    "--overlay-text-height",
    -hell + "px"
  );
}

// Add event listener for window resize
window.addEventListener("resize", updateHeight);
console.log(updateHeight);
// Call updateHeight initially to set the value on page load
document.addEventListener("DOMContentLoaded", (event) => {
  updateHeight();
});
