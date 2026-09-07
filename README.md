# Space-OS 🚀

A tiny sci-fi Space environment that runs entirely in your browser.

Space-OS is basically what happens when you look at your browser and think, *“Yeah… this needs to feel more like a spaceship.”* 🧑‍🚀

It’s built with plain HTML, CSS, and JavaScript. No massive frameworks, no 47-step build process, and absolutely no need to summon an ancient JavaScript wizard just to change a button.

## 🌌 What is this?

Space-OS is a passion project where I’m experimenting with how far you can push basic web technologies to make a browser feel like an actual operating system.

You get draggable windows, a live UTC telemetry clock, space logs, an interactive solar-system map, and a bunch of futuristic UI effects.

And then there’s the rocket cursor.

It actually changes direction based on where your mouse is moving, leaves behind plasma sparks, and keeps working even when you move across embedded apps.

Because apparently, having a normal cursor wasn't futuristic enough. 🚀

## 🛰️ What’s Built In

### ⭐ The Star Chart — `SYS // ORBITAL_RADAR`

An interactive solar-system radar built with HTML5 Canvas.

It includes all 8 planets, orbital paths, a radar-style grid, and a telemetry panel that appears when you click on a planet.

Yes, you can click planets.

No, unfortunately, clicking Jupiter does not launch a mission to Jupiter.

### 🚀 The Rocket Cursor

The cursor uses `Math.atan2()` to calculate the direction of movement and rotate the rocket accordingly.

In simpler terms:

**Mouse moves → math happens → rocket turns.**

There are also plasma particles trailing behind it, because apparently ordinary mouse movement wasn't dramatic enough.

### 🪟 Iframe Bridge

Iframes normally make mouse tracking annoying because they basically say:

> “Your mouse events? Yeah, those belong to me now.”

So Space-OS uses `postMessage` to send mouse-position data between the main desktop and embedded apps.

This lets the rocket cursor keep flying smoothly across app windows without losing its particle trail.

### 📝 Space Notes

A mission-log viewer containing historical flight telemetry and a terminal-style text editor.

Perfect for documenting extremely important scientific discoveries like:

`Day 47: Still haven't found aliens.`

### 💻 Welcome Console

The main boot-up terminal that greets new astronauts when Space-OS starts.

Think of it as mission control saying:

**“Welcome aboard. Please don't press random buttons.”**

## 🛠️ Tech Stack

**HTML5** — The structure holding the spaceship together.

**CSS3** — Handles the glassmorphism, HUD effects, animations, colors, and general *“we are definitely in the future”* appearance.

**Vanilla JavaScript** — Powers the window manager, clock, cursor system, interactions, and basically everything that makes the UI actually do stuff.

**Canvas 2D API** — Used for the orbital radar and planetary visualisation.

**Math & Trigonometry** — Because rockets apparently require mathematics even when they're just following a mouse.

**`postMessage`** — Handles communication between the main desktop and iframe-based applications.

## 📁 Project Structure

```text
space-os/
├── index.html        # Main desktop shell
├── style.css         # HUD styling, animations & cursor effects
├── script.js         # Window dragging, clock & rocket cursor logic
├── starchart.html    # Orbital radar app
├── starchart.js      # Planet positions & telemetry interactions
└── notes.html        # Space mission logs
```

Nothing too complicated.

Just a few files trying very hard to pretend they're an entire operating system.

## 🚀 Getting Started

Clone the repository and launch it locally:

```bash
# Clone the repository
git clone https://github.com/your-username/space-os.git

# Enter the spaceship
cd space-os

# Launch the mission
# Open index.html in your browser
# or use Live Server if you have it installed
```

And that's it.

No complicated setup.

No dependency apocalypse.

No `node_modules` folder weighing 900 MB because you installed a button.

Just HTML, CSS, JavaScript, and a suspicious amount of space-themed CSS.

## 🌠 Why I Built This

Space-OS started as an experiment to see whether vanilla web technologies could create something that *feels* like a real desktop environment.

It’s still a work in progress, but the goal is simple:

**Make the browser feel less like a browser and more like a spaceship.**

And maybe, eventually, make it good enough that mission control would actually approve it. 🚀
