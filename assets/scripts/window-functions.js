// code snippets taken from https://www.youtube.com/watch?v=3RIQ7kkZBrw

// initialise the position variable
let activeWindow = null;
let offsetX = 0;
let offsetY = 0;
let topZ = 100;

let dragEnabled = false;

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

// set the mode based on the screen size
function setMode(isMobile) {
    dragEnabled = !isMobile;
    activeWindow = null;

    document.querySelectorAll(".window-wrapper").forEach(win => {
        if (isMobile) {
            // Mobile: fullscreen and fixed in place
            win.classList.add("mobile-window");

            win.style.left = "0px";
            win.style.top = "0px";
            win.style.transform = "none";
            win.style.width = "100vw";
            win.style.height = "100dvh";
        } else {
            // Desktop: remove mobile styles
            win.classList.remove("mobile-window");

            win.style.removeProperty("left");
            win.style.removeProperty("top");
            win.style.removeProperty("transform");
            win.style.removeProperty("width");
            win.style.removeProperty("height");
        }
    });
}

// Listen for changes in the screen size and update the mode accordingly
const mobileQuery = window.matchMedia("(max-width: 768px)");

setMode(mobileQuery.matches);

mobileQuery.addEventListener("change", (event) => {
    setMode(event.matches);
});

// Move the window when the mouse is down and moving
document.querySelectorAll(".window-header").forEach(header => {
    header.addEventListener("mousedown", (e) => {
        if (!dragEnabled) return;
        if (e.target.closest(".actions")) return;

        activeWindow = header.closest(".window-wrapper");

        activeWindow.classList.remove(
            "left-0",
            "right-0",
            "top-0",
            "bottom-0",
            "m-auto"
        );

        topZ += 1;
        activeWindow.style.zIndex = topZ;

        offsetX = e.clientX - activeWindow.offsetLeft;
        offsetY = e.clientY - activeWindow.offsetTop;
    });
});

document.addEventListener("mousemove", (e) => {
    if (!activeWindow || !dragEnabled) return;

    activeWindow.style.left = `${e.clientX - offsetX}px`;
    activeWindow.style.top = `${e.clientY - offsetY}px`;
});

document.addEventListener("mouseup", () => {
    activeWindow = null;
});

// clicking on a window brings it to the front
document.querySelectorAll('.window-wrapper').forEach(win => {
    win.addEventListener('mousedown', () => {
        bringToFront(win);
    });
});

// // maximise window
// function maximiseWindow(id) {
//   const win = document.getElementById(id);
//   const header = win.querySelector('.window-header');

//   if (win.dataset.maximized === "true") {
//     win.style.left = win.dataset.prevLeft;
//     win.style.top = win.dataset.prevTop;
//     win.style.width = win.dataset.prevWidth;
//     win.style.height = win.dataset.prevHeight;
//     win.classList.remove('fixed', 'inset-0', 'w-screen', 'h-screen');
//     win.classList.add('absolute');
//     win.dataset.maximized = "false";
//     header.style.cursor = 'move';
//     return;
//   }

//   win.dataset.prevLeft = win.style.left || win.offsetLeft + 'px';
//   win.dataset.prevTop = win.style.top || win.offsetTop + 'px';
//   win.dataset.prevWidth = win.style.width || win.offsetWidth + 'px';
//   win.dataset.prevHeight = win.style.height || win.offsetHeight + 'px';

//   win.classList.remove('absolute');
//   win.classList.add('fixed', 'inset-0', 'w-screen', 'h-screen');
//   win.style.left = '0px';
//   win.style.top = '0px';
//   win.dataset.maximized = "true";
//   header.style.cursor = 'default';
//   bringToFront(win);
// }

// // prevent drag when maximised
// document.querySelectorAll('.window-header').forEach(header => {
//   header.addEventListener('mousedown', (e) => {
//     if (e.target.closest('.actions')) return;

//     const active = header.closest('.window-wrapper');
//     if (active.dataset.maximized === "true") return;

//     activeWindow = active;
//     activeWindow.classList.remove('left-0', 'right-0', 'top-0', 'bottom-0', 'm-auto');
//     bringToFront(activeWindow);

//     offsetX = e.clientX - activeWindow.offsetLeft;
//     offsetY = e.clientY - activeWindow.offsetTop;
//   });
// });