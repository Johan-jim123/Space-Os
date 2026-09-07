JJ-OS // DEEP_SPACE_DESKTOP
A high-tech, sci-fi themed web-based desktop environment featuring live telemetry, orbital radar modules, and a direction-aware rocket ship cursor.

About
JJ-OS is a client-side space-themed desktop simulation built with vanilla HTML, CSS, and JavaScript. It features a windowing system, draggable app windows, embedded iframes, a real-time UTC telemetry clock, and a custom physics-driven rocket ship cursor that handles cross-window tracking seamlessly.

Everything is self-contained. No heavy backend or frameworks required—pure modular web architecture with a deep blue/teal HUD aesthetic.

Features
Desktop Environment

Window Management — Draggable windows, dynamic z-index stacking, and active window focusing.

Telemetry Top Bar — Live blinking UTC clock and system diagnostics.

App Integration — Modular app window structure utilizing HTML5 iframe frames with cross-window communication (postMessage).

Custom Rocket Cursor

Direction-Aware Rotation — Utilizes vector math (Math.atan2) to dynamically angle the rocket ship in the direction of travel.

Thruster Particle Trail — Spawns glowing plasma sparks that fade and shrink dynamically behind the engine nozzle.

Iframe Synchronization — Centralized parent-child event listeners ensure the rocket cursor remains smooth and responsive even inside embedded app windows.

Built-In Apps & Modules

Star Chart (SYS // ORBITAL_RADAR) — Interactive HTML5 Canvas orbital plotter featuring 8 planets, orbital paths, radar sweep effects, and a click-to-inspect telemetry data panel.

Space Notes — Mission log repository with selectable historical logs and a live terminal-style text editor interface.

Welcome Console — System initialization window for user briefing.

Tech Stack
Core Structure: HTML5, Semantic DOM

Styling: CSS3, Flexbox, Custom Glassmorphic HUD variables (#00f0ff, #0077b6, #011627)

Scripting: Vanilla JavaScript (ES6+), Canvas 2D API, Trigonometric vector calculations

Architecture: Parent-child postMessage communication bridge for cross-iframe cursor tracking

Architecture
Plaintext
jj-os/
├── index.html                # Main desktop environment shell
├── style.css                 # Global styles, HUD theme, cursor & particle rules
├── script.js                 # OS orchestrator, drag logic, cursor vector calculations
├── starchart.html            # Star Chart app window (Canvas orbital radar & telemetry inspector)
├── starchart.js              # Orbital rendering and planet click-inspection logic
└── notes.html                # Space notes / mission log app
Getting Started
Clone the repository
git clone https://github.com/your-username/jj-os.git

Navigate into the directory
cd jj-os

Open index.html directly in your browser or run via a local live server

## Project Info

* **Theme**: Deep Space / Sci-Fi HUD
* **Design Language**: Dark Blue/Teal, Neon Cyan, Monospace Telemetry Grids
* **Status**: Active Development (v1.0.0)
