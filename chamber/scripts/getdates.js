document.addEventListener("DOMContentLoaded", function() {
    var lastModified = document.lastModified;
    console.log("Last Modified Date and Time: " + lastModified);
    document.getElementById("lastModified").innerHTML = "<br>Last Modified: " + lastModified;
});