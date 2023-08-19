
var darkmodemoon = document.getElementById("darkmodemoon");
darkmodemoon.onclick = function(){
    document.body.classList.toggle("dark-theme");
    if(document.body.classList.contains("dark-theme")){
        darkmodemoon.src = "images/2995008_colors_colour_rainbow_colored_sun_icon.svg";
    }else{
        darkmodemoon.src = "images/9071075_dark_mode_icon.svg";
    }
}

const sidebar = document.querySelector('.sidebar');
const toggleButton = document.getElementById('sidebarToggle');

toggleButton.addEventListener('click', () => {
    sidebar.classList.toggle('open');
});

document.addEventListener('click', (event) => {
    const isToggleOrSidebar = toggleButton.contains(event.target) || sidebar.contains(event.target);
    const isCollapsed = sidebar.classList.contains('collapsed');

    if (!isToggleOrSidebar && !isCollapsed) {
        sidebar.classList.add('collapsed');
    }
});