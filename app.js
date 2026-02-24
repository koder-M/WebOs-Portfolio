

let folderMenu = document.getElementById("folderMenu");
let selectedFolder = null;
let folders = [];
let folderCount = 0;
let desktop = document.querySelector("#desktop");
const menu = document.querySelector("#contextMenu");
document.getElementById("newFolderBtn").addEventListener("click", () => {

    let confirmCreate = confirm("Do you want to create a new folder?");

    if (confirmCreate) {
        createFolder();
    }
    menu.style.display = "none";
});
desktop.addEventListener("contextmenu", (e) => {
    if (e.target.closest(".folder")) return;

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









function loadFolders() {
    let data = localStorage.getItem("myFolders");
    if (data) {
        folders = JSON.parse(data);
        folderCount = folders.length;
        folders.forEach(folder => renderFolder(folder));
    }
}
loadFolders();


function saveFolders() {
    localStorage.setItem("myFolders", JSON.stringify(folders));
}


function createFolder() {

    folderCount++;

    let desktopRect = desktop.getBoundingClientRect();

    let folderWidth = 80;
    let folderHeight = 100;

    let maxX = desktopRect.width - folderWidth;
    let maxY = desktopRect.height - folderHeight;

    let x = Math.floor(Math.random() * maxX);
    let y = Math.floor(Math.random() * maxY);

    let newFolder = {
        id: folderCount,
        name: "Folder " + folderCount,
        x: x,
        y: y
    };

    folders.push(newFolder);
    renderFolder(newFolder);
    saveFolders();
}


// Rename
document.getElementById("renameFolder").addEventListener("click", () => {
    if (!selectedFolder) return;

    let newName = prompt("Rename Folder:", selectedFolder.folder.name);

    if (newName) {
        selectedFolder.folder.name = newName;
        selectedFolder.element.querySelector("p").textContent = newName;
        saveFolders();
    }

    folderMenu.style.display = "none";
});

// Delete
document.getElementById("deleteFolder").addEventListener("click", () => {
    if (!selectedFolder) return;

    folders = folders.filter(f => f.id !== selectedFolder.folder.id);
    selectedFolder.element.remove();

    saveFolders();
    folderMenu.style.display = "none";
});

// Hide folder menu
document.addEventListener("click", (e) => {
    if (!e.target.closest("#folderMenu")) {
        folderMenu.style.display = "none";
    }
});


function renderFolder(folder) {

    let div = document.createElement("div");
    div.classList.add("folder");

    div.style.left = folder.x + "px";
    div.style.top = folder.y + "px";

    div.innerHTML = `
        <img src="imgs/folder.png" />
        <p>${folder.name}</p>
    `;


    div.addEventListener("dblclick", () => {
        openFolderWindow(folder);
    });


    div.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        e.stopPropagation();
    
        selectedFolder = { folder, element: div };
    
        folderMenu.style.display = "block";
        folderMenu.style.left = e.pageX + "px";
        folderMenu.style.top = e.pageY + "px";
    });

    let dragging = false;
    let offsetX, offsetY;

    div.addEventListener("mousedown", (e) => {
        dragging = true;
        offsetX = e.offsetX;
        offsetY = e.offsetY;
    });

    document.addEventListener("mousemove", (e) => {
        if (!dragging) return;

        let desktopRect = desktop.getBoundingClientRect();

        let newX = e.pageX - offsetX;
        let newY = e.pageY - offsetY;

        let folderWidth = div.offsetWidth;
        let folderHeight = div.offsetHeight;

        let maxX = desktopRect.width - folderWidth;
        let maxY = desktopRect.height - folderHeight;

        newX = Math.max(0, Math.min(newX, maxX));
        newY = Math.max(0, Math.min(newY, maxY));

        div.style.left = newX + "px";
        div.style.top = newY + "px";

        folder.x = newX;
        folder.y = newY;
    });

    document.addEventListener("mouseup", () => {
        dragging = false;
        saveFolders();
    });

    desktop.appendChild(div);


    function openFolderWindow(folder) {

        let existing = document.getElementById("folderWin_" + folder.id);
        if (existing) {
            existing.style.display = "block";
            bringFront(existing.id);
            return;
        }
    
        let win = document.createElement("div");
        win.classList.add("window");
        win.id = "folderWin_" + folder.id;
    
        win.innerHTML = `
            <div class="tittle-bar">
                <div class="buttons">
                    <span class="btn close"></span>
                    <span class="btn minimize"></span>
                    <span class="btn maximize"></span>
                </div>
                <p>${folder.name}</p>
            </div>
    
            <div class="content">
                <h3>${folder.name}</h3>
                <p>This folder is empty.</p>
            </div>
        `;
    
        desktop.appendChild(win);
        win.style.display = "block";
        bringFront(win.id);
    
        // ===== CLOSE =====
        win.querySelector(".close").addEventListener("click", () => {
            win.style.display = "none";
        });
    
        // ===== MINIMIZE =====
        win.querySelector(".minimize").addEventListener("click", () => {
            minWindow(win.id);
        });
    
        // ===== MAXIMIZE =====
        win.querySelector(".maximize").addEventListener("click", () => {
            maxWindow(win.id);
        });
    
        // ===== DRAG SYSTEM (Same as your other windows) =====
        let bar = win.querySelector(".tittle-bar");
        let dragging = false;
        let offsetX = 0;
        let offsetY = 0;
    
        bar.addEventListener("mousedown", (e) => {
            dragging = true;
            offsetX = e.clientX - win.offsetLeft;
            offsetY = e.clientY - win.offsetTop;
            bringFront(win.id);
            bar.style.cursor = "grabbing";
        });
    
        document.addEventListener("mousemove", (e) => {
            if (!dragging) return;
            win.style.left = e.clientX - offsetX + "px";
            win.style.top = e.clientY - offsetY + "px";
        });
    
        document.addEventListener("mouseup", () => {
            dragging = false;
            bar.style.cursor = "grab";
        });
    
        win.addEventListener("mousedown", () => bringFront(win.id));
    }
}




