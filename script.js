const textEl = document.querySelector('#data');
const sizeEl = document.querySelector('#size');
const logoEl = document.querySelector('#logo');
const clearEl = document.querySelector('#clear');
const marginEl = document.querySelector('#margin');
const dotModeEl = document.querySelector('#dot');
const dotColorEl1 = document.querySelector('#dot-color-1');
const dotColorEl2 = document.querySelector('#dot-color-2');
const bgEl = document.querySelector('#bg-color');
const dlEl = document.querySelector('#btn-dl');


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

bgEl.addEventListener('input', e=>{
    op.backgroundOptions.color = e.target.value;
    render();
});

var qrCode;
function render()
{
    qrCode = new QRCodeStyling(op);
    let canvasEl = document.querySelector('#canvas');
    canvasEl.innerHTML='';
    qrCode.append(canvasEl);
    canvasEl.nextElementSibling.innerHTML = `${op.width}px x ${op.height}px`
}

function browse(){
    logoEl.click();
}

logoEl.addEventListener('change', e=> {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onload = ()=> {
        op.image = reader.result;
        render();
    },
    reader.readAsDataURL(file);
});

clearEl.addEventListener('click', e=>{
    delete op.image;
    render();
});

dlEl.addEventListener('click', e=> {
    qrCode.download({name:'qr', extension:'png'});
});

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