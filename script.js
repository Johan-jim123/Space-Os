var selectedIcon = undefined;
var biggestIndex = 10;

var welcomeScreen = document.querySelector("#welcome");
var welcomeScreenOpen = document.querySelector("#welcomeopen");
var welcomeScreenClose = document.querySelector("#welcomeclose");

var notesScreen = document.querySelector("#spaceNotesApp");
var notesScreenClose = document.querySelector("#notesClose");

var topBar = document.querySelector("#top");

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

function handleWindowTap(windowElement) {
  if (!windowElement) return;
  biggestIndex++;
  windowElement.style.zIndex = biggestIndex;
  
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
    
    handleWindowTap(element);

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

function initializeWindow(elementId) {
  var windowElement = document.getElementById(elementId);
  if (!windowElement) return;

  makeDraggable(windowElement);
  addWindowTapHandling(windowElement);
}

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

    if (element.id === "notesOpen") {
      openWindow(notesScreen);
    }
  }
}

document.body.addEventListener("mousedown", function(e) {
  if (e.target === document.body || e.target.id === "desktopApps") {
    if (selectedIcon !== undefined) {
      deselectIcon(selectedIcon);
    }
  }
});

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

window.addEventListener("DOMContentLoaded", function() {
  initializeWindow("welcome");
  initializeWindow("spaceNotesApp");
});

// 1. Data Store for Demo Logs
document.addEventListener('DOMContentLoaded', () => {
    const logData = {
        "LOG_004": 
            "[ TIME: 000:00:00:01 MET ]\n" +
            "[ NETWORK: JJ_OS_PRIMARY // DEEP_SPACE_OPS ]\n\n" +
            "// FLIGHT LOG 004: STANDARD OPERATING PROCEDURES & PROTOCOLS\n" +
            "===========================================================\n\n" +
            "RULE #1: DO NOT DIE.\n" +
            "  ├─ Breathing vacuum is highly unrecommended by flight medicine.\n" +
            "  └─ Keep suit pressure above 14.7 PSI at all times.\n\n" +
            "RULE #2: DO NOT PRESS THE RED BUTTON.\n" +
            "  ├─ Unless explicitly told to press the red button.\n" +
            "  └─ If pressed, refer immediately back to Rule #1.\n\n" +
            "RULE #3: HYDRATION & REFUELING PROTOCOLS.\n" +
            "  ├─ Coffee consumption is vital for orbital navigation.\n" +
            "  └─ Zero-G spill cleanup is the responsibility of the perpetrator.\n\n" +
            "RULE #4: ANOMALY DISCOVERY.\n" +
            "  ├─ If aliens are spotted, take a photo BEFORE screaming.\n" +
            "  └─ Do not attempt to feed space fauna.\n\n" +
            "> SYSTEM PROTOCOLS LOADED // STAY SAFE OUT THERE, ASTRONAUT",

        "LOG_003": 
            "[ TIME: 000:00:13:27 MET ]\n" +
            "[ NETWORK: VANGUARD_STATION // REV_01 ]\n\n" +
            "// FLIGHT LOG 003: ORBITAL COAST CONFIGURATION\n" +
            "00:12:12 - CDR (ARMSTRONG): Staging confirmed. Booster is safe.\n" +
            "00:13:27 - CAPCOM (MCC): Booster configured for orbital coast. Both spacecraft systems nominal.\n" +
            "00:18:30 - CAPCOM (MCC): Delta azimuth correction is +0.22. P52 platform alignment recommended.\n" +
            "00:39:10 - CAPCOM (MCC): Canary radar confirms stable circular orbit at 103.0 x 103.0 nautical miles.\n" +
            "00:39:31 - CDR (ARMSTRONG): Visual confirmed on Earth terminator line. Entering orbital night.\n\n" +
            "> INSERTION CHECKLIST COMPLETE // NO ABNORMALITIES DETECTED",

        "LOG_002": 
            "[ TIME: 055:54:00 MET ]\n" +
            "[ NETWORK: GOLDSTONE_TRACKING // CSM-109 ]\n\n" +
            "// FLIGHT LOG 002: CRYO TANK AGITATION TELEMETRY\n" +
            "055:53:20 - CAPCOM (KERWIN): Stand by for Cryo Fan switch toggles on O2 tanks 1 and 2.\n" +
            "055:54:10 - LMP (HAISE): Fan switches cycling now...\n" +
            "055:55:20 - CMP (SWIGERT): Okay, Houston, we've had a problem here.\n" +
            "055:55:35 - CAPCOM (KERWIN): This is Houston. Say again, please.\n" +
            "055:55:42 - CDR (LOVELL): Houston, we've had a Main B Bus Undervolt. O2 Tank 2 pressure reading ZERO.\n" +
            "055:57:05 - CAPCOM (KERWIN): We're looking at a telemetry glitch or sensor fail. Stand by for RCS dump...\n\n" +
            "> ALERT: BUS_B UNDERVOLT // SWITCHING TO LM AQUARIUS POWER PROTOCOL",

        "LOG_001": 
            "[ TIME: 078:31:46 MET ]\n" +
            "[ NETWORK: MADRID_STATION // LUNAR_REAR_PASS ]\n\n" +
            "// FLIGHT LOG 001: LUNAR ORBIT INSERTION (LOI-1)\n" +
            "078:31:46 - SYSTEMS: SPS Engine Ignition confirmed. Thrust vector: 20,000 lbs.\n" +
            "078:35:40 - CDR (SCOTT): Burn time 394 seconds. Guidance lock solid on P40 protocol.\n" +
            "078:38:20 - CMP (WORDEN): Shutdown on time. Chamber pressure dropping to zero.\n" +
            "078:40:12 - CAPCOM (GORDON): Acquisition of signal (AOS) confirmed via Madrid station.\n" +
            "078:41:00 - SYSTEMS: Elliptical lunar orbit established at 170.0 x 57.7 nautical miles.\n\n" +
            "> LOI BURNS COMPLETE // S-IVB IMPACT TELEMETRY DOCKED"
    };

    const textarea = document.querySelector('.log-input');
    const logItems = document.querySelectorAll('.log-item');
    const newLogBtn = document.querySelector('.new-log-btn');

    logItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            logItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const logKeys = ["LOG_004", "LOG_003", "LOG_002", "LOG_001"];
            const selectedKey = logKeys[index];

            if (textarea && logData[selectedKey]) {
                textarea.value = logData[selectedKey];
            }
        });
    });

    if (newLogBtn) {
        newLogBtn.addEventListener('click', () => {
            logItems.forEach(i => i.classList.remove('active'));
            const currentDate = new Date().toISOString().slice(0, 10);
            const currentTime = new Date().toUTCString().slice(17, 25);
            textarea.value = "[ TIMESTAMP: " + currentDate + " - " + currentTime + " UTC ]\n[ LOCATION: UNKNOWN ]\n\n// NEW MISSION LOG\n> INPUT_";
            textarea.focus();
        });
    }
});