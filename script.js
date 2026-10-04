var selectedIcon = undefined;
var biggestIndex = 10;

let currentUser = localStorage.getItem("jj_os_current_user") || "ASTRONAUT_01";
let userStorageKey = "jj_os_space_logs_" + currentUser;
let logData = {};
let activeKey = "LOG_001";

const defaultLogData = {
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

const THEMES = ["GALAXY", "SUN", "EARTH", "MARS"];

const music = new Audio('music.mp3');
music.loop = true;

function playmusic() {
  const musicBtn = document.getElementById("music");
  if (music.paused) {
    music.play();
    if (musicBtn) musicBtn.textContent = "pause";
  } else {
    music.pause();
    if (musicBtn) musicBtn.textContent = "music";
  }
}

function initThemeToggle() {
  if (document.getElementById("theme-toggle-btn")) return;

  if (!document.getElementById("jj-os-theme-style")) {
    let style = document.createElement("style");
    style.id = "jj-os-theme-style";
    style.innerHTML = `
      :root {
        --theme-color: #00e1ff;
        --theme-bg: #080c14;
        --theme-glow: rgba(0, 225, 255, 0.4);
      }

      body, #desktop, .desktop, #desktopApps {
        transition: background-image 0.5s ease-in-out !important;
        background-size: cover !important;
        background-position: center !important;
        background-repeat: no-repeat !important;
        background-attachment: fixed !important;
      }

      body.theme-galaxy,
      body.theme-galaxy #desktop,
      body.theme-galaxy .desktop {
        --theme-color: #00e1ff;
        --theme-bg: #080c14;
        --theme-glow: rgba(0, 225, 255, 0.4);
        background-image: url('./galaxy.png') !important;
        background-color: #080c14 !important;
      }

      body.theme-sun,
      body.theme-sun #desktop,
      body.theme-sun .desktop {
        --theme-color: #ffb703;
        --theme-bg: #1a0f00;
        --theme-glow: rgba(255, 183, 3, 0.5);
        background-image: url('./sun.png') !important;
        background-color: #1a0f00 !important;
      }

      body.theme-earth,
      body.theme-earth #desktop,
      body.theme-earth .desktop {
        --theme-color: #00f5a0;
        --theme-bg: #041814;
        --theme-glow: rgba(0, 245, 160, 0.4);
        background-image: url('./earth.png') !important;
        background-color: #041814 !important;
      }

      body.theme-mars,
      body.theme-mars #desktop,
      body.theme-mars .desktop {
        --theme-color: #ff4d4d;
        --theme-bg: #1a0a0a;
        --theme-glow: rgba(255, 77, 77, 0.5);
        background-image: url('./mars.png') !important;
        background-color: #1a0a0a !important;
      }

      #spaceNotesApp,
      #welcome,
      #starchart-window,
      .window,
      [id*="App"],
      [id*="window"] {
        border-color: var(--theme-color) !important;
        box-shadow: 0 0 15px var(--theme-glow) !important;
      }

      #spaceNotesApp *,
      #welcome *,
      #starchart-window *,
      .window-header,
      .window-title,
      .log-title,
      .log-subtext,
      .app-title,
      .desktop-icon-title {
        color: var(--theme-color) !important;
      }

      #spaceNotesApp button,
      #welcome button,
      #starchart-window button,
      .l-button,
      .new-log-btn {
        border-color: var(--theme-color) !important;
        color: var(--theme-color) !important;
      }

      #spaceNotesApp textarea,
      #spaceNotesApp input,
      #welcome input {
        border-color: var(--theme-color) !important;
        color: var(--theme-color) !important;
        background-color: rgba(0, 0, 0, 0.6) !important;
      }

      #theme-toggle-btn {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 999999;
        padding: 8px 14px;
        font-family: 'Consolas', 'Courier New', monospace;
        font-size: 11px;
        font-weight: bold;
        letter-spacing: 1px;
        cursor: pointer;
        border-radius: 2px;
        background: var(--theme-bg);
        border: 1px solid var(--theme-color);
        border-right: 3px solid var(--theme-color);
        color: var(--theme-color);
        box-shadow: 0 0 12px var(--theme-glow);
        backdrop-filter: blur(4px);
        transition: all 0.25s ease;
        display: flex;
        align-items: center;
        gap: 6px;
        user-select: none;
      }

      #theme-toggle-btn:hover {
        background: var(--theme-color);
        color: var(--theme-bg) !important;
      }
    `;
    document.head.appendChild(style);
  }

  const btn = document.createElement("button");
  btn.id = "theme-toggle-btn";

  let savedTheme = localStorage.getItem("jj_os_theme") || "GALAXY";
  if (!THEMES.includes(savedTheme)) savedTheme = "GALAXY";

  applyTheme(savedTheme);

  btn.innerHTML = `<span>MODE: </span><span id="theme-status-text">${savedTheme}</span>`;

  btn.addEventListener("click", function() {
    let currentIndex = THEMES.indexOf(savedTheme);
    let nextIndex = (currentIndex + 1) % THEMES.length;
    savedTheme = THEMES[nextIndex];

    applyTheme(savedTheme);
    document.getElementById("theme-status-text").textContent = savedTheme;
    localStorage.setItem("jj_os_theme", savedTheme);
    playTargetLockBeep();
  });

  document.body.appendChild(btn);
}

function applyTheme(themeName) {
  THEMES.forEach(t => document.body.classList.remove("theme-" + t.toLowerCase()));
  document.body.classList.add("theme-" + themeName.toLowerCase());
}

function updateClock() {
  let timmie = new Date().toLocaleTimeString();
  let timeText = document.querySelector("#timeElement");

  if (timeText) {
    timeText.innerHTML = `
      <div style="display: flex; align-items: center; gap: 8px; padding: 4px 10px; background: rgba(8, 12, 20, 0.9); border: 1px solid var(--theme-glow, rgba(0, 225, 255, 0.3)); border-right: 3px solid var(--theme-color, #00e1ff); border-radius: 2px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.8); user-select: none;">
        <span class="telemetry-dot"></span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 10px; font-weight: bold; color: var(--theme-color, #00e1ff); letter-spacing: 1px;">UTC //</span>
        <span style="font-family: 'Consolas', 'Courier New', monospace; font-size: 13px; font-weight: bold; color: var(--theme-color, #00e1ff); letter-spacing: 1.5px; text-shadow: 0 0 6px rgba(0, 225, 255, 0.6);">${timmie}</span>
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
    .star-node {
      cursor: pointer;
      transition: transform 0.2s ease, filter 0.2s ease;
    }
    .star-node:hover {
      transform: scale(1.4);
      filter: drop-shadow(0 0 8px #00e1ff);
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

  var topBar = document.querySelector("#top");
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

    var notesScreen = document.querySelector("#spaceNotesApp");
    var starChartScreen = document.querySelector("#starchart-window");

    if (element.id === "notesOpen") {
      openWindow(notesScreen);
    } else if (element.id === "starchartOpen") {
      openWindow(starChartScreen);
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

function playTargetLockBeep() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(880, audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1760, audioCtx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.15);
  } catch (err) {}
}

const cursor = document.querySelector('.cursor1');
let lastX = 0;
let lastY = 0;

function updateCursor(currentX, currentY) {
  if (!cursor) return;
  const deltaX = currentX - lastX;
  const deltaY = currentY - lastY;
  const distanceMoved = Math.hypot(deltaX, deltaY);

  if (distanceMoved > 1) {
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;

    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
    cursor.style.transform = `translate(-50%, -50%) rotate(${angle}deg)`;

    if (distanceMoved > 4) {
      createThrusterParticle(currentX, currentY, angle);
    }
  } else {
    cursor.style.left = `${currentX}px`;
    cursor.style.top = `${currentY}px`;
  }

  lastX = currentX;
  lastY = currentY;
}

document.addEventListener('mousemove', (e) => updateCursor(e.clientX, e.clientY));
document.addEventListener('mousedown', () => cursor && cursor.classList.add('clicking'));
document.addEventListener('mouseup', () => cursor && cursor.classList.remove('clicking'));

window.addEventListener('message', (e) => {
  const iframes = Array.from(document.querySelectorAll('iframe'));
  const sourceIframe = iframes.find(iframe => iframe.contentWindow === e.source);

  if (sourceIframe) {
    if (e.data.type === 'cursorMove') {
      const rect = sourceIframe.getBoundingClientRect();
      updateCursor(e.data.x + rect.left, e.data.y + rect.top);
    }
    if (e.data.type === 'cursorDown' && cursor) cursor.classList.add('clicking');
    if (e.data.type === 'cursorUp' && cursor) cursor.classList.remove('clicking');
  }
});

function createThrusterParticle(x, y, angleDeg) {
  const particle = document.createElement('div');
  particle.className = 'thruster-particle';

  const rad = (angleDeg - 90) * (Math.PI / 180);
  const offsetX = x - Math.cos(rad) * 12;
  const offsetY = y - Math.sin(rad) * 12;

  particle.style.left = `${offsetX}px`;
  particle.style.top = `${offsetY}px`;

  document.body.appendChild(particle);

  setTimeout(() => {
    particle.remove();
  }, 400);
}

function loadUserData() {
  currentUser = localStorage.getItem("jj_os_current_user") || "ASTRONAUT_01";
  userStorageKey = "jj_os_space_logs_" + currentUser;

  let savedLogs = localStorage.getItem(userStorageKey);
  if (savedLogs) {
    try {
      logData = JSON.parse(savedLogs);
    } catch (e) {
      logData = JSON.parse(JSON.stringify(defaultLogData));
    }
  } else {
    logData = JSON.parse(JSON.stringify(defaultLogData));
  }

  renderLogs();
}

function renderLogs() {
  const logContainer = document.getElementById("log-list") || document.querySelector(".log-list") || document.querySelector('.log-sidebar') || document.querySelector('.logs-container');
  const textarea = document.getElementById("log-editor") || document.querySelector("textarea");
  if (!logContainer) return;

  logContainer.innerHTML = "";
  let keys = Object.keys(logData);

  if (keys.length === 0) {
    logData = JSON.parse(JSON.stringify(defaultLogData));
    keys = Object.keys(logData);
  }

  keys.sort((a, b) => b.localeCompare(a, undefined, { numeric: true, sensitivity: 'base' }));

  if (!activeKey || !logData[activeKey]) {
    activeKey = keys[0];
  }

  keys.forEach(key => {
    const div = document.createElement("div");
    div.className = "log-item" + (key === activeKey ? " active" : "");
    div.dataset.key = key;

    div.innerHTML = `
      <span class="log-title">${key} //<br>FIELD_NOTES</span>
      <span class="log-subtext">SAVED_ENTRY</span>
    `;

    div.addEventListener("click", function() {
      document.querySelectorAll(".log-item").forEach(el => el.classList.remove("active"));
      div.classList.add("active");
      activeKey = key;
      const currentTextarea = document.getElementById("log-editor") || document.querySelector("textarea");
      if (currentTextarea) currentTextarea.value = logData[activeKey] || "";
    });

    logContainer.appendChild(div);
  });

  if (textarea) {
    textarea.value = logData[activeKey] || "";
  }
}

function createNewLog() {
  let maxNum = 0;
  Object.keys(logData).forEach(k => {
    let num = parseInt(k.replace(/\D/g, ''), 10);
    if (!isNaN(num) && num > maxNum) maxNum = num;
  });

  let nextNum = maxNum + 1;
  let logIndex = String(nextNum).padStart(3, "0");
  activeKey = "LOG_" + logIndex;

  const newEntryText = `[ TIME: 000:00:00:00 MET ]\n[ PILOT: ${currentUser} // DEEP_SPACE_OPS ]\n\n// FLIGHT LOG ${logIndex}: NEW ENTRY\n===========================================================\n\n> INPUT_`;

  logData[activeKey] = newEntryText;
  localStorage.setItem(userStorageKey, JSON.stringify(logData));

  renderLogs();

  const textarea = document.getElementById("log-editor") || document.querySelector("textarea");
  if (textarea) textarea.focus();
}

document.addEventListener("input", function(e) {
  if (e.target && e.target.matches("#log-editor, textarea, .log-input")) {
    if (activeKey) {
      logData[activeKey] = e.target.value;
      localStorage.setItem(userStorageKey, JSON.stringify(logData));
    }
  }
});

document.addEventListener("click", function(e) {
  if (e.target && e.target.closest("#new-log-btn, .l-button, .new-log-btn")) {
    createNewLog();
  }
});

window.addEventListener("DOMContentLoaded", function() {
  initThemeToggle();
  initializeWindow("welcome");
  initializeWindow("spaceNotesApp");
  initializeWindow("starchart-window");

  const musicBtn = document.getElementById("music");
  if (musicBtn) {
    musicBtn.addEventListener("click", playmusic);
  }

  var welcomeScreen = document.querySelector("#welcome");
  var welcomeScreenOpen = document.querySelector("#welcomeopen");
  var welcomeScreenClose = document.querySelector("#welcomeclose");

  var notesScreen = document.querySelector("#spaceNotesApp");
  var notesScreenClose = document.querySelector("#notesClose");

  var starChartScreen = document.querySelector("#starchart-window");
  var starChartClose = document.querySelector("#starchartClose");

  if (welcomeScreenOpen) welcomeScreenOpen.addEventListener("click", (e) => { e.stopPropagation(); openWindow(welcomeScreen); });
  if (welcomeScreenClose) welcomeScreenClose.addEventListener("click", (e) => { e.stopPropagation(); closeWindow(welcomeScreen); });
  if (notesScreenClose) notesScreenClose.addEventListener("click", (e) => { e.stopPropagation(); closeWindow(notesScreen); });
  if (starChartClose) starChartClose.addEventListener("click", (e) => { e.stopPropagation(); closeWindow(starChartScreen); });

  const usernamei = document.getElementById("username");
  const passwordi = document.getElementById("password");
  const loginbtn = document.getElementById("login-btn");
  const error = document.getElementById("login-error");

  let previous_users = localStorage.getItem("jj_os_users");
  let userdatabase = {};

  if (previous_users) {
    try {
      userdatabase = JSON.parse(previous_users);
    } catch (e) {
      userdatabase = {};
    }
  }

  function unlockSystem() {
    let loginBox = document.getElementById("login-screen") || document.querySelector("#welcome > div") || document.querySelector(".login-container") || document.querySelector("form");
    if (loginBox) loginBox.style.display = "none";

    let welcomeWin = document.getElementById("welcome");
    if (welcomeWin) welcomeWin.style.display = "block";

    if (window.parent) {
      try {
        let pLogin = window.parent.document.getElementById("login-screen") || window.parent.document.querySelector("#welcome > div");
        if (pLogin) pLogin.style.display = "none";
      } catch (e) {}
    }
  }

  function handleAuth() {
    if (!usernamei || !passwordi) return;

    let username = usernamei.value.trim().toUpperCase();
    let password = passwordi.value.trim();

    if (username === "" || password === "") {
      if (error) error.textContent = "MISSING CREDENTIALS";
      return;
    }

    if (userdatabase[username]) {
      if (userdatabase[username] === password) {
        localStorage.setItem("jj_os_current_user", username);
        loadUserData();
        unlockSystem();
      } else {
        if (error) error.textContent = "INVALID PASSCODE";
        passwordi.value = "";
      }
    } else {
      userdatabase[username] = password;
      localStorage.setItem("jj_os_users", JSON.stringify(userdatabase));
      localStorage.setItem("jj_os_current_user", username);
      loadUserData();
      unlockSystem();
    }
  }

  if (loginbtn) loginbtn.addEventListener("click", handleAuth);

  if (passwordi) {
    passwordi.addEventListener("keypress", function(e) {
      if (e.key === "Enter") handleAuth();
    });
  }

  const starChartContainer = document.querySelector("#starchart-window");
  if (starChartContainer) {
    const starTargets = starChartContainer.querySelectorAll(".star-node, circle, [data-star]");

    starTargets.forEach(star => {
      star.classList.add("star-node");
      star.addEventListener("click", (e) => {
        e.stopPropagation();
        playTargetLockBeep();

        const starName = star.getAttribute("data-name") || star.id || "UNKNOWN_SECTOR";
        const ra = (Math.random() * 24).toFixed(2);
        const dec = ((Math.random() * 180) - 90).toFixed(2);

        const targetInfo = `\n[ TARGET LOCK ACQUIRED ]\n> OBJECT: ${starName}\n> COORDS: RA ${ra}h / DEC ${dec}°\n> STATUS: TRACKING...`;

        const textarea = document.getElementById("log-editor") || document.querySelector("textarea");
        if (textarea) {
          textarea.value += "\n" + targetInfo;
          if (activeKey) {
            logData[activeKey] = textarea.value;
            localStorage.setItem(userStorageKey, JSON.stringify(logData));
          }
        }
      });
    });
  }

  loadUserData();
});