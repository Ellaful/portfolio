// code taken from https://www.youtube.com/watch?v=3RIQ7kkZBrw

let wrapper = document.getElementById('window-wrapper');
let header = wrapper.querySelector('#window-header');
isMouseDown = false;

// initialise the position variable
let offsetX = 0;
let offsetY = 0;

function toggleMaximise() {
    if (wrapper.classList.contains('w-full')) {
        wrapper.classList.remove('w-full', 'h-full');
    } else {
        wrapper.classList.add('w-full', 'h-full');
    }
}

function closeWindow() {
    wrapper.classList.add('hidden');
}

function openWindow() {
    wrapper.classList.remove('hidden');
}

// Maximize button event listener -- add feature later
header.addEventListener('mousedown', (e)=> {
    isMouseDown = true;
    offsetX = wrapper.offsetLeft - e.clientX;
    offsetY = wrapper.offsetTop - e.clientY;
});

document.addEventListener('mousemove', (e)=> {
    if (!isMouseDown) return;
    e.preventDefault();
    wrapper.style.left = (e.clientX + offsetX) + 'px';
    wrapper.style.top = (e.clientY + offsetY) + 'px';

    wrapper.classList.remove('left-0', 'right-0', 'top-0', 'bottom-0');
    wrapper.style.left
});

document.addEventListener('mouseup', ()=> {
    isMouseDown = false;
});