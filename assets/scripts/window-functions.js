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

        // stop dragging if the window is maximized
        const win = header.closest(".window-wrapper");

        if (win.classList.contains("maximized-window")) {
            return;
        }

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
const maximiseSound = new Audio("./assets/audio/maximize_008.ogg");
maximiseSound.volume = 0.5;

const minimiseSound = new Audio("./assets/audio/minimize_008.ogg");
minimiseSound.volume = 0.5;

function maximiseWindow(id) {
    const win = document.getElementById(id);
    const button = win.querySelector(".maximise-window i");

    const isMaximised = win.classList.toggle("maximized-window");

    if (isMaximised) {
        maximiseSound.currentTime = 0;
        maximiseSound.play().catch(error => {
            console.error("Maximise sound failed:", error);
        });

        button.classList.remove("fa-expand");
        button.classList.add("fa-compress");
    } else {
        minimiseSound.currentTime = 0;
        minimiseSound.play().catch(error => {
            console.error("Minimise sound failed:", error);
        });
        
        button.classList.remove("fa-compress");
        button.classList.add("fa-expand");
    }

    activeWindow = null;
    bringToFront(win);
}