const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resize() {
    canvas.width = canvas.parentElement.clientWidth;
    canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resize);
resize();
const planets = [
    { name: "SUN", distance: 0, size: 10, speed: 0, angle: 0, color: "#ffcc00", desc: "TYPE: Yellow Dwarf Star\nTEMP: ~5,500°C\nMASS: 99.8% of Solar System" },
    { name: "MERCURY", distance: 35, size: 3, speed: 0.025, angle: Math.random() * Math.PI * 2, color: "#a8a8a8", desc: "TYPE: Terrestrial\nORBIT: 88 Days\nINFO: Closest to Sun, extreme temperature swings." },
    { name: "VENUS", distance: 60, size: 4, speed: 0.015, angle: Math.random() * Math.PI * 2, color: "#e0c38c", desc: "TYPE: Terrestrial\nORBIT: 225 Days\nINFO: Hottest planet due to runaway greenhouse effect." },
    { name: "EARTH", distance: 90, size: 4.5, speed: 0.01, angle: Math.random() * Math.PI * 2, color: "#00f0ff", desc: "TYPE: Terrestrial\nORBIT: 365 Days\nINFO: Home world. Supports abundant liquid water & life." },
    { name: "MARS", distance: 120, size: 3.5, speed: 0.008, angle: Math.random() * Math.PI * 2, color: "#ff4d4d", desc: "TYPE: Terrestrial\nORBIT: 687 Days\nINFO: The Red Planet. Features massive extinct volcanoes." },
    { name: "JUPITER", distance: 160, size: 7.5, speed: 0.003, angle: Math.random() * Math.PI * 2, color: "#c99a63", desc: "TYPE: Gas Giant\nORBIT: 12 Years\nINFO: Largest planet. Famous for the Great Red Spot storm." },
    { name: "SATURN", distance: 205, size: 6, speed: 0.002, angle: Math.random() * Math.PI * 2, color: "#e6c280", hasRings: true, desc: "TYPE: Gas Giant\nORBIT: 29 Years\nINFO: Encircled by complex system of icy rings." },
    { name: "URANUS", distance: 245, size: 5, speed: 0.0012, angle: Math.random() * Math.PI * 2, color: "#55ffff", desc: "TYPE: Ice Giant\nORBIT: 84 Years\nINFO: Rotates almost completely on its side." },
    { name: "NEPTUNE", distance: 280, size: 5, speed: 0.0008, angle: Math.random() * Math.PI * 2, color: "#2753f1", desc: "TYPE: Ice Giant\nORBIT: 165 Years\nINFO: Dark, cold, and whipped by supersonic winds." }
];

let radarAngle = 0;
let selectedPlanet = null;

canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    let found = false;

    planets.forEach(p => {
        const hitRadius = Math.max(p.size + 8, 12);
        const dist = Math.hypot(mouseX - p.currentX, mouseY - p.currentY);

        if (dist <= hitRadius) {
            selectedPlanet = p;
            found = true;
        }
    });

    if (!found) selectedPlanet = null;
});

function animate() {
    ctx.fillStyle = 'rgba(2, 11, 20, 0.25)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    planets.forEach(p => {
        if (p.distance > 0) {
            ctx.beginPath();
            ctx.arc(cx, cy, p.distance, 0, Math.PI * 2);
            ctx.strokeStyle = 'rgba(0, 240, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);
        }

        p.angle += p.speed;
        p.currentX = cx + Math.cos(p.angle) * p.distance;
        p.currentY = cy + Math.sin(p.angle) * p.distance;

        ctx.beginPath();
        ctx.arc(p.currentX, p.currentY, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = (selectedPlanet === p) ? 18 : 8;
        ctx.shadowColor = (selectedPlanet === p) ? '#00f0ff' : p.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        if (p.hasRings) {
            ctx.beginPath();
            ctx.ellipse(p.currentX, p.currentY, p.size * 2.2, p.size * 0.7, Math.PI / 6, 0, Math.PI * 2);
            ctx.strokeStyle = "rgba(230, 194, 128, 0.7)";
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        if (selectedPlanet === p) {
            ctx.beginPath();
            ctx.arc(p.currentX, p.currentY, p.size + 6, 0, Math.PI * 2);
            ctx.strokeStyle = '#00f0ff';
            ctx.lineWidth = 1.5;
            ctx.stroke();
        }

        if (p.distance > 0) {
            ctx.fillStyle = 'rgba(0, 240, 255, 0.7)';
            ctx.font = '10px monospace';
            ctx.fillText(`[${p.name}]`, p.currentX + 8, p.currentY - 6);
        }
    });
    radarAngle += 0.015;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    const radarLength = Math.max(canvas.width, canvas.height);
    ctx.lineTo(cx + Math.cos(radarAngle) * radarLength, cy + Math.sin(radarAngle) * radarLength);
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.4)';
    ctx.lineWidth = 1;
    ctx.stroke();

    if (selectedPlanet) {
        const boxX = 15;
        const boxY = canvas.height - 125;
        const boxW = 360;
        const boxH = 125;

        ctx.fillStyle = 'rgba(2, 14, 26, 0.9)';
        ctx.fillRect(boxX, boxY, boxW, boxH);
        ctx.strokeStyle = '#00f0ff';
        ctx.lineWidth = 1;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        ctx.fillStyle = '#00f0ff';
        ctx.font = 'bold 12px monospace';
        ctx.fillText(`>> DATA_INSPECT // ${selectedPlanet.name}`, boxX + 10, boxY + 20);

        ctx.beginPath();
        ctx.moveTo(boxX + 10, boxY + 26);
        ctx.lineTo(boxX + boxW - 10, boxY + 26);
        ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
        ctx.stroke();
        ctx.fillStyle = '#d1d5db';
        ctx.font = '10px monospace';
        const lines = selectedPlanet.desc.split('\n');
        lines.forEach((line, index) => {
            ctx.fillText(line, boxX + 10, boxY + 45 + (index * 18));
        });
    }

    requestAnimationFrame(animate);
}

animate();