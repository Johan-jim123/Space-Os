const canvas = document.getElementById('star-canvas');
const ctx = canvas.getContext('2d');
const coordDisplay = document.getElementById('star-coords');

let width, height;
const stars = [];
const STAR_COUNT = 45;

function resize() {
  width = canvas.width = canvas.parentElement.clientWidth;
  height = canvas.height = canvas.parentElement.clientHeight;
}
for (let i = 0; i < STAR_COUNT; i++) {
  stars.push({
    x: Math.random() * (width || 300),
    y: Math.random() * (height || 200),
    radius: Math.random() * 1.2 + 0.5,
    alpha: Math.random(),
    pulse: Math.random() * 0.02 + 0.005
  });
}
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