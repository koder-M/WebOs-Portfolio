const menu = document.querySelector("#contextMenu");
window.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    menu.style.display = "block";
    menu.style.left = e.pageX + "px";
    menu.style.top = e.pageY + "px";
});
window.addEventListener("click", (e) => {
    if (!e.target.closest("#contextMenu")) menu.style.display = "none";
});

let arr = [
    "wal1.jpg",
    "wal2.jpg",
    "wal3.jpg",
    "wal4.jpg",
    "wal5.jpg",
    "wal6.jpg",
    "wal7.jpg",
    "wal8.jpg",
    "wal9.jpg",
    "wal10.jpg"
];
  
let main = document.querySelector("main");
let lastIndex = -1;

function changeWal() {
  let ran;

  do {
    ran = Math.floor(Math.random() * arr.length);
  } while (ran === lastIndex);

  lastIndex = ran;

  main.style.backgroundImage = `url('imgs/${arr[ran]}')`;
}


let topZ = 2030000000;
function bringFront(winId) {
    topZ++;
    const el = document.getElementById(winId);
    el.style.zIndex = topZ;
    el.dataset.minimized = "false";
}

function openWindow(winId) {
    const w = document.getElementById(winId);
    if (!w) return;
    w.style.display = "block";
    w.style.opacity = "1";
    w.style.transform = "scale(1)";
    bringFront(winId);
}

let finder = document.querySelector(".finder");
let nots = document.querySelector(".nots");
let brwsr = document.querySelector(".brwsr");

finder.addEventListener("click", function(){
    openWindow("finderWin");
})
brwsr.addEventListener("click", function(){
    openWindow("browserWin");
})
nots.addEventListener("click", function(){
    openWindow("notesWin");
})

// Close window
function closeWindow(winId) {
    const w = document.getElementById(winId);
    w.style.opacity = "0";
    w.style.transform = "scale(0.9)";
    setTimeout(() => w.style.display = "none", 220);
}

let close =  document.querySelector('.close');
close.addEventListener("click", function(){
    closeWindow("finderWin");
})
let notesbtn = document.querySelector("#notesWin1");
notesbtn.addEventListener("click", function(){
    closeWindow("notesWin");
})

let browserbtn = document.querySelector("#browserWin1");
browserbtn.addEventListener("click", function(){
    closeWindow("browserWin");
})


let mini =  document.querySelector('.minimize');
mini.addEventListener("click", function(){
    minWindow("finderWin");
})

let notesmini = document.querySelector("#notesWin2");
notesmini.addEventListener("click", function(){
    minWindow("notesWin");
})

let brwsmini = document.querySelector("#browserWin2");
brwsmini.addEventListener("click", function(){
    minWindow("browserWin");
})
// Minimize
function minWindow(winId) {
    const w = document.getElementById(winId);
    w.style.transform = "scale(0.28)";
    w.style.opacity = "0.35";
    w.dataset.minimized = "true";
}

function maxWindow(winId) {
    const w = document.getElementById(winId);
    if (w.dataset.maximized === "true") {
        w.style.width = "480px";
        w.style.height = "300px";
        w.style.top = "130px";
        w.style.left = "150px";
        w.dataset.maximized = "false";
    } else {
        w.style.width = "100vw";
        w.style.height = "100vh";
        w.style.top = "0";
        w.style.left = "0";
        w.dataset.maximized = "true";
    }
    bringFront(winId);
}

let max = document.querySelector(".maximize");
max.addEventListener("click", function() {
    maxWindow("finderWin");
})

let notesMax = document.querySelector("#notesWin3");
notesMax.addEventListener("click", function() {
    maxWindow("notesWin");
})

let browserMax = document.querySelector("#browserWin3");
browserMax.addEventListener("click", function() {
    maxWindow("browserWin");
})


let windows = document.querySelectorAll(".window");
windows.forEach(win => {
    const bar = win.querySelector(".tittle-bar");
    let dragging = false;
    let offsetX = 0;
    let offsetY= 0;

    bar.addEventListener("mousedown", (e) => {
        console.log();
        dragging = true;
        offsetX = e.clientX - win.offsetLeft;
        offsetY = e.clientY - win.offsetTop;
        bringFront(win.id);
        bar.style.cursor = "grabbing";

    });
    document.addEventListener("mousemove",(e) => {
        if(!dragging){
            return
        }
        win.style.left = e.clientX - offsetX + "px";
        win.style.top = e.clientY - offsetY + "px";
    });
    document.addEventListener("mouseup", () => {
        dragging = false;
        bar.style.cursor = "grab";
    });
    win.addEventListener("mousedown", () => bringFront(win.id));
})


