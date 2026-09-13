const targets = [];
let currentCoords = { x: 0, y: 0, ra: '', dec: '' };

const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');
const clockEl = document.getElementById('clock');
const targetNameInput = document.getElementById('targetName');
const raInput = document.getElementById('targetRA');
const decInput = document.getElementById('targetDec');
const form = document.getElementById('targetForm');
const targetList = document.getElementById('targetList');

function resizeCanvas() {
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
  drawSky();
}
window.addEventListener('resize', resizeCanvas);

const backgroundStars = Array.from({ length: 150 }, () => ({
  x: Math.random(),
  y: Math.random(),
  size: Math.random() * 1.5,
  alpha: Math.random()
}));

function drawSky() {
  ctx.fillStyle = '#02040a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  backgroundStars.forEach(star => {
    ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
    ctx.fillRect(star.x * canvas.width, star.y * canvas.height, star.size, star.size);
  });

  if (currentCoords.x && currentCoords.y) {
    ctx.strokeStyle = '#00e1ff';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(currentCoords.x, currentCoords.y, 12, 0, Math.PI * 2);
    ctx.moveTo(currentCoords.x - 18, currentCoords.y);
    ctx.lineTo(currentCoords.x + 18, currentCoords.y);
    ctx.moveTo(currentCoords.x, currentCoords.y - 18);
    ctx.lineTo(currentCoords.x, currentCoords.y + 18);
    ctx.stroke();
  }

  targets.forEach(t => {
    ctx.fillStyle = '#ff0055';
    ctx.beginPath();
    ctx.arc(t.x, t.y, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#ffffff';
    ctx.font = '10px monospace';
    ctx.fillText(t.name, t.x + 8, t.y + 3);
  });
}

function updateCoords(x, y) {
  const raHours = Math.floor((x / canvas.width) * 24);
  const raMins = Math.floor(((x / canvas.width) * 1440) % 60);
  const decDegrees = Math.floor(((canvas.height - y) / canvas.height) * 180 - 90);

  currentCoords = {
    x,
    y,
    ra: `${String(raHours).padStart(2, '0')}h ${String(raMins).padStart(2, '0')}m`,
    dec: `${decDegrees >= 0 ? '+' : ''}${decDegrees}° 00'`
  };

  raInput.value = currentCoords.ra;
  decInput.value = currentCoords.dec;
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  updateCoords(x, y);
  drawSky();
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (!currentCoords.x) return;

  const newTarget = {
    name: targetNameInput.value.toUpperCase(),
    ra: currentCoords.ra,
    dec: currentCoords.dec,
    x: currentCoords.x,
    y: currentCoords.y
  };

  targets.push(newTarget);
  renderTargetList();
  
  targetNameInput.value = '';
  drawSky();
});

function renderTargetList() {
  targetList.innerHTML = '';
  targets.forEach(t => {
    const li = document.createElement('li');
    li.className = 'target-card';
    li.innerHTML = `
      <strong>${t.name}</strong><br>
      RA: ${t.ra} | DEC: ${t.dec}
    `;
    targetList.appendChild(li);
  });
}

function updateClock() {
  const now = new Date();
  clockEl.textContent = `UTC: ${now.toUTCString().split(' ')[4]}`;
}
setInterval(updateClock, 1000);

resizeCanvas();
updateClock();