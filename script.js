// Live Clock - NASA Flight Telemetry Style (1-Second Blink)
function updateClock() {
  let timmie = new Date().toLocaleTimeString();
  let timeText = document.querySelector("#timeElement");
  if (timeText) {
    timeText.innerHTML = `
      <style>
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
      </style>
      <div style="display: flex; align-items: center; gap: 8px; padding: 4px 10px; background: rgba(8, 12, 20, 0.9); border: 1px solid rgba(0, 225, 255, 0.3); border-right: 3px solid #00e1ff; border-radius: 2px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); user-select: none;">
        <span class="telemetry-dot"></span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 10px; font-weight: bold; color: #00e1ff; letter-spacing: 1px;">UTC //</span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; font-weight: bold; color: #00e1ff; letter-spacing: 1.5px; text-shadow: 0 0 6px rgba(0, 225, 255, 0.6);">${timmie}</span>
      </div>
    `;
  }
}
updateClock();
setInterval(updateClock, 1000);
function makeDraggable(element) {
  if (!element) return;

  var initialX = 0, initialY = 0, currentX = 0, currentY = 0;

  var header = document.getElementById(element.id + "header");
  if (header) {
    header.onmousedown = startDragging;
  } else {
    element.onmousedown = startDragging;
  }

  function startDragging(e) {
    e = e || window.event;
    
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

    // Prevent highlighting text while dragging
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

window.addEventListener("DOMContentLoaded", function() {
  makeDraggable(document.getElementById("welcome"));
});


var welcomeScreen = document.querySelector("#welcome")
function closeWindow(element) {
  element.style.display = "none"
}
function openWindow(element) {
  element.style.display = "block"
}
var welcomeScreenClose = document.querySelector("#welcomeclose")

var welcomeScreenOpen = document.querySelector("#welcomeopen")
if (welcomeScreenOpen) {
  welcomeScreenOpen.addEventListener("click", function() {
    openWindow(welcomeScreen);
  });
}

welcomeScreenClose.addEventListener("click", function() {
  closeWindow(welcomeScreen);
});

welcomeScreenOpen.addEventListener("click", function() {
  openWindow(welcomeScreen);
});