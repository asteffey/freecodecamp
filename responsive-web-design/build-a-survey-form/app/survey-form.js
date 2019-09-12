window.onload = function() {
    var gender_description = document.getElementById("gender-description");
    var dropdown = document.getElementById("dropdown");
    dropdown.onchange = function() {
        if (this.value == "self-describe") {
            gender_description.style.display = "block";
        }
        else {
            gender_description.style.display = "none";
            gender_description.value = "";
        }
    }
}