// Variable to track currently selected desktop icon & z-index layer
var selectedIcon = undefined;
var biggestIndex = 10;

// Desktop Elements
var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenOpen = document.querySelector("#welcomeopen");
var welcomeScreenClose = document.querySelector("#welcomeclose");

var notesScreen = document.querySelector("#spaceNotesApp");
var notesScreenClose = document.querySelector("#notesClose");

var topBar = document.querySelector("#top");

// ==========================================
// 1. Live Telemetry Clock (UTC Flight Style)
// ==========================================
function updateClock() {
  let timmie = new Date().toLocaleTimeString();
  let timeText = document.querySelector("#timeElement");
  
  if (timeText) {
    timeText.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; padding: 4px 10px; background: rgba(8, 12, 20, 0.9); border: 1px solid rgba(0, 225, 255, 0.3); border-right: 3px solid #00e1ff; border-radius: 2px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); user-select: none;">
        <span class="telemetry-dot"></span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 10px; font-weight: bold; color: #00e1ff; letter-spacing: 1px;">UTC //</span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; font-weight: bold; color: #00e1ff; letter-spacing: 1.5px; text-shadow: 0 0 6px rgba(0, 225, 255, 0.6);">${timmie}</span>
      </div>
    `;
  }
}

if (!document.querySelector("#telemetry-clock-style")) {
  let styleEl = document.createElement("style");
  styleEl.id = "telemetry-clock-style";
  styleEl.innerHTML = `
    @keyframes blink-green {
      0%, 100% { opacity: 1; box-shadow: 0 0 6px #30d158; }
      50% { opacity: 0; box-shadow: none; }
    }
    .telemetry-dot {
      width: 6px;
      height: 6px;
      background-color: #30d158;
      border-radius: 50%;
      display: inline-block;
      animation: blink-green 1s steps(1, start) infinite;
    }
  `;
  document.head.appendChild(styleEl);
}

updateClock();
setInterval(updateClock, 1000);

// ==========================================
// 2. Window Layering & Depth Handling
// ==========================================
function handleWindowTap(windowElement) {
  if (!windowElement) return;
  biggestIndex++;  // Increment layer index
  windowElement.style.zIndex = biggestIndex;
  
  // Protect Top Bar
  if (topBar) {
    topBar.style.zIndex = biggestIndex + 1;
  }
}

function addWindowTapHandling(windowElement) {
  if (!windowElement) return;
  windowElement.addEventListener("mousedown", function(e) {
    e.stopPropagation();
    handleWindowTap(windowElement);
  });
}

// ==========================================
// 3. Window Dragging Logic
// ==========================================
function makeDraggable(element) {
  if (!element) return;

  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  var header = document.getElementById(element.id + "header") || element.querySelector(".window-header");
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    
    // Bring window to top on drag start
    handleWindowTap(element);

    // Clear any accidental text selection
    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    var iframe = element.querySelector("iframe");
    if (iframe) iframe.style.pointerEvents = "none";

    if (element.style.transform !== "none" && element.style.transform !== "") {
      element.style.left = element.offsetLeft + "px";
      element.style.top = element.offsetTop + "px";
      element.style.transform = "none";
    }

    initialX = e.clientX;
    initialY = e.clientY;

    document.onmouseup = stopDragging;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    }

    currentX = initialX - e.clientX;
    currentY = initialY - e.clientY;
    initialX = e.clientX;
    initialY = e.clientY;

    element.style.top = (element.offsetTop - currentY) + "px";
    element.style.left = (element.offsetLeft - currentX) + "px";
  }

  function stopDragging() {
    var iframe = element.querySelector("iframe");
    if (iframe) iframe.style.pointerEvents = "auto";

    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// ==========================================
// 4. Helper Functions for Window Control
// ==========================================
function openWindow(element) {
  if (element) {
    element.style.display = "block";
    handleWindowTap(element);
  }
}

function closeWindow(element) {
  if (element) {
    element.style.display = "none";
  }
}

// ==========================================
// 5. Icon Selection & Launcher Logic
// ==========================================
function selectIcon(element) {
  element.classList.add("selected");
  selectedIcon = element;
}

function deselectIcon(element) {
  if (element) {
    element.classList.remove("selected");
  }
  selectedIcon = undefined;
}

function handleIconTap(e, element) {
  if (e) e.stopPropagation();

  if (element.classList.contains("selected")) {
    deselectIcon(element);
  } else {
    if (selectedIcon !== undefined) {
      deselectIcon(selectedIcon);
    }
    selectIcon(element);

    // Launch window if Space Notes icon is tapped
    if (element.id === "notesOpen") {
      openWindow(notesScreen);
    }
  }
}

// Deselect icon when clicking on empty desktop space
document.body.addEventListener("mousedown", function(e) {
  if (e.target === document.body || e.target.id === "desktopApps") {
    if (selectedIcon !== undefined) {
      deselectIcon(selectedIcon);
    }
  }
});

// ==========================================
// 6. Event Listeners & Initialization
// ==========================================
if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function(e) {
    e.stopPropagation();
    openWindow(welcomeScreen);
  });
}

if (welcomeScreenClose) {
  welcomeScreenClose.addEventListener("click", function(e) {
    e.stopPropagation();
    closeWindow(welcomeScreen);
  });
}

if (notesScreenClose) {
  notesScreenClose.addEventListener("click", function(e) {
    e.stopPropagation();
    closeWindow(notesScreen);
  });
}

// Initialize drag and tap layering once DOM is loaded
window.addEventListener("DOMContentLoaded", function() {
  var welcomeEl = document.getElementById("welcome");
  var notesEl = document.getElementById("spaceNotesApp");

  makeDraggable(welcomeEl);
  makeDraggable(notesEl);

  addWindowTapHandling(welcomeEl);
  addWindowTapHandling(notesEl);
});