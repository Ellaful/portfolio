// code snippets taken from https://www.youtube.com/watch?v=3RIQ7kkZBrw

// initialise the position variable
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 100;

function closeWindow(id) {
    win = document.getElementById(id);
    win.classList.add('hidden');
}

function openWindow(id) {
    win = document.getElementById(id);
    win.classList.remove('hidden');
    bringToFront(win);
}

// bring the window to the front
function bringToFront(win) {
  topZ += 1;
  win.style.zIndex = topZ;
}

// Move the window when the mouse is down and moving
document.querySelectorAll('.window-header').forEach(header => {
    header.addEventListener('mousedown', (e) => {
        if (e.target.closest('.actions')) return;

        activeWindow = header.closest('.window-wrapper');
        activeWindow.classList.remove('left-0', 'right-0', 'top-0', 'bottom-0', 'm-auto');

        topZ += 1;
        activeWindow.style.zIndex = topZ;

        offsetX = e.clientX - activeWindow.offsetLeft;
        offsetY = e.clientY - activeWindow.offsetTop;
    });
});

document.addEventListener('mousemove', (e) => {
    if (!activeWindow) return;

    activeWindow.style.left = (e.clientX - offsetX) + 'px';
    activeWindow.style.top = (e.clientY - offsetY) + 'px';
});

document.addEventListener('mouseup', () => {
    activeWindow = null;
});

// clicking on a window brings it to the front
document.querySelectorAll('.window-wrapper').forEach(win => {
  win.addEventListener('mousedown', () => {
    bringToFront(win);
  });
});

// header.addEventListener('mousedown', (e)=> {
//     isMouseDown = true;
//     offsetX = wrapper.offsetLeft - e.clientX;
//     offsetY = wrapper.offsetTop - e.clientY;
// });

// document.addEventListener('mousemove', (e)=> {
//     if (!isMouseDown) return;
//     e.preventDefault();
//     wrapper.style.left = (e.clientX + offsetX) + 'px';
//     wrapper.style.top = (e.clientY + offsetY) + 'px';

//     wrapper.classList.remove('left-0', 'right-0', 'top-0', 'bottom-0');
//     wrapper.style.left
// });

// document.addEventListener('mouseup', ()=> {
//     isMouseDown = false;
// });

// // Maximize button event listener -- add feature later
// function toggleMaximise() {
//     if (wrapper.classList.contains('w-full')) {
//         wrapper.classList.remove('w-full', 'h-full');
//     } else {
//         wrapper.classList.add('w-full', 'h-full');
//     }
// }