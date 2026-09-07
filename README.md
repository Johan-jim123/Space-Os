# Space-OS

Space-OS is a browser-based desktop environment with a sci-fi/space theme. I built it using vanilla HTML, CSS, and JavaScript to experiment with creating an operating-system-style interface without using a large framework.

The project has draggable windows, a UTC clock, a solar-system visualisation, space logs, and a custom rocket cursor.

## Features

### Star Chart

The Star Chart is an HTML5 Canvas application that displays the Sun and 8 planets along with their orbital paths.

Clicking on a planet opens its telemetry information. The chart also has a radar-style grid to fit the overall interface.

### Rocket Cursor

The normal cursor is replaced with a rocket that follows the mouse.

The rocket uses `Math.atan2()` to calculate the angle between its previous and current mouse positions. This allows it to rotate according to the direction the mouse is moving.

It also generates small particle effects behind the rocket.

### Iframe Communication

Some of the Space-OS applications run inside iframes. This normally makes tracking the mouse from the main page difficult because mouse events are handled inside the iframe.

I worked around this using `postMessage()`. The iframe sends the mouse position to the main page, allowing the rocket cursor and its particle trail to continue working when moving across application windows.

### Space Notes

Space Notes is a simple mission-log application containing flight-related information and a terminal-style editor.

### Welcome Console

The Welcome Console is the main terminal shown when Space-OS starts. It provides the initial interface for entering the desktop environment.

## Technologies Used

HTML5 is used for the structure of the desktop and applications.

CSS3 handles the interface, animations, HUD elements, glass effects, and overall visual design.

JavaScript handles the window manager, clock, cursor movement, interactions, and application logic.

The Canvas 2D API is used for the Star Chart.

`postMessage()` is used for communication between the main page and iframe applications.

## Project Structure

```text
space-os/
├── index.html        # Main desktop and window container
├── style.css         # Global styling and cursor effects
├── script.js         # Desktop, window and cursor logic
├── starchart.html    # Star Chart application
├── starchart.js      # Planet and telemetry logic
└── notes.html        # Space Notes application
```

## Running the Project

Clone the repository:

```bash
git clone https://github.com/your-username/space-os.git
```

Then enter the project folder:

```bash
cd space-os
```

The project does not require a build system or external framework. You can open `index.html` directly in a modern browser, or use something like VS Code Live Server during development.

## Why I Built It
For the stardance programme and for my personal interest in space.

The project also gave me a chance to work with things I had not used much before, especially Canvas, mouse-event handling, iframe communication, and vector calculations.

It is still a work in progress, but the main idea is to keep adding small applications and make Space-OS feel more like a complete desktop environment.
