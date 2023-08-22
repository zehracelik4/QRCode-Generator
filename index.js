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

const textEl = document.querySelector('#data');
const sizeEl = document.querySelector('#size');
const logoEl = document.querySelector('#icons');
const marginEl = document.querySelector('#margin');
const dotModeEl = document.querySelector('#dot');
const dotColorEl1 = document.querySelector('#dot-color-1');
const dotColorEl2 = document.querySelector('#dot-color-2');
const buttontextEl = document.querySelector('#buttontext');
const buttonContainerEl = document.querySelector('#buttonContainer');

let qrCode;

let op= {
    width: 100,
    height: 100,
    type: "png",
    data: textEl.value,
    image: "",
    dotsOptions: {
        color: "#4267b2",
        type: "rounded",
        gradient: {
            "type": "linear",
            "colorStops": [
                {
                    "offset": 0,
                    "color": "#000000"
                },
                {
                    "offset": 1,
                    "color": "#000"
                }
            ]
        }
    },
    backgroundOptions: {
        color: "#fff",
    }
};

render();

sizeEl.addEventListener('input', e=>{
    op.width = e.target.value * 10;
    op.height = e.target.value * 10;
    render();
});

marginEl.addEventListener('input', e=>{
    op.imageOptions = {margin: e.target.value};
    render();
});

textEl.addEventListener('keyup', e=>{
    op.data = e.target.value;
    render();
});

dotModeEl.addEventListener('change', e=>{
    op.dotsOptions.type = e.target.value;
    render();
});

dotColorEl1.addEventListener('input', e=>{
    op.dotsOptions.gradient.colorStops[0].color = e.target.value;
    render();
});

dotColorEl2.addEventListener('input', e=>{
    op.dotsOptions.gradient.colorStops[1].color = e.target.value;
    render();
});


function render() {
qrCode = new QRCodeStyling(op);
let canvasEl = document.querySelector('#canvas');
canvasEl.innerHTML = '';

if (op.data) {
    qrCode.append(canvasEl);
    canvasEl.nextElementSibling.innerHTML = `${op.width}px x ${op.height}px`;
    buttonContainerEl.style.display = "flex";
} else {
    canvasEl.nextElementSibling.innerHTML = '';
    buttonContainerEl.style.display = "none";
}
}

function browse() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.addEventListener('change', handleFileUpload);
    input.click();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function() {
            const uploadedImage = reader.result;
            placeImageInQRCode(uploadedImage);
        };
        reader.readAsDataURL(file);
    }
}

logoEl.addEventListener('change', e => {
    const selectedLogo = e.target.value;
    placeImageInQRCode(selectedLogo);
});

logoEl.addEventListener('change', e => {
    const selectedLogo = e.target.value;
    if (selectedLogo === "Facebook Logo") {
        placeImageInQRCode("images/facebook.png"); 
    } else if (selectedLogo === "Instagram Logo") {
        placeImageInQRCode("images/instagram.png");
    } else if (selectedLogo === "Twitter Logo") {
        placeImageInQRCode("images/twitter.png"); 
    } else if (selectedLogo === "Github Logo") {
        placeImageInQRCode("images/github.png"); 
    }
});

function placeImageInQRCode(imageSrc) {
    op.image = imageSrc;
    render();
}

render();

buttontextEl.addEventListener('click', e=> {
    qrCode.download({name:'qrcode', extension:'png'});
});