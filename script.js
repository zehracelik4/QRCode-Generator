document.addEventListener('DOMContentLoaded', function() {
    const darkmodemoon = document.getElementById("darkmodemoon");
    const body = document.body;


    const darkModePreference = localStorage.getItem('darkModePreference');
    if (darkModePreference === 'enabled') {
    body.classList.add('dark-theme');
    darkmodemoon.src = "images/2995008_colors_colour_rainbow_colored_sun_icon.svg";
    }

    darkmodemoon.onclick = function() {
    body.classList.toggle("dark-theme");

    if (body.classList.contains("dark-theme")) {
        darkmodemoon.src = "images/2995008_colors_colour_rainbow_colored_sun_icon.svg";
        localStorage.setItem('darkModePreference', 'enabled');
    } else {
        darkmodemoon.src = "images/9071075_dark_mode_icon.svg";
        localStorage.setItem('darkModePreference', 'disabled');
    }
    };
});
