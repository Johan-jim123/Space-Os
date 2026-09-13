const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  if (!canvas || !canvas.parentElement) return;
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

var planets = [
  { name: 'MERCURY', r: 0.12, speed: 0.030, size: 4, color: '#a0a0a0', angle: 0.5 },
  { name: 'VENUS',   r: 0.20, speed: 0.022, size: 6, color: '#e3bb76', angle: 2.1 },
  { name: 'EARTH',   r: 0.28, speed: 0.016, size: 6, color: '#00d4ff', angle: 4.3 },
  { name: 'MARS',    r: 0.35, speed: 0.012, size: 5, color: '#ff4d4d', angle: 1.2 },
  { name: 'JUPITER', r: 0.50, speed: 0.007, size: 9, color: '#d39e68', angle: 5.5 },
  { name: 'SATURN',  r: 0.65, speed: 0.004, size: 8, color: '#e5c185', rings: true, angle: 3.1 },
  { name: 'URANUS',  r: 0.78, speed: 0.003, size: 7, color: '#4cf0f8', angle: 0.8 },
  { name: 'NEPTUNE', r: 0.90, speed: 0.002, size: 7, color: '#4169e1', angle: 2.7 }
];

var radarAngle = 0;

function drawRocket(x, y) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(-0.5);
  
  ctx.strokeStyle = '#00e1ff';
  ctx.fillStyle = '#020b14';
  ctx.lineWidth = 2;
  
  ctx.beginPath();
  ctx.moveTo(0, -12);
  ctx.lineTo(7, 12);
  ctx.lineTo(-7, 12);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = '#00e1ff';
  ctx.beginPath();
  ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
  ctx.fill();

  ctx.restore();
}

function loop() {
  if (!ctx) return;

  var w = canvas.width;
  var h = canvas.height;
  var cx = w / 2;
  var cy = h / 2;
  var maxR = Math.min(w, h) * 0.44;

  ctx.fillStyle = '#020b14';
  ctx.fillRect(0, 0, w, h);

  ctx.lineWidth = 1;
  ctx.strokeStyle = '#005f73';
  ctx.setLineDash([4, 6]);

  for (var i = 0; i < planets.length; i++) {
    var orbitR = planets[i].r * maxR;
    ctx.beginPath();
    ctx.arc(cx, cy, orbitR, 0, Math.PI * 2);
    ctx.stroke();
  }

  ctx.setLineDash([]);

  ctx.fillStyle = '#ffcc00';
  ctx.beginPath();
  ctx.arc(cx, cy, 10, 0, Math.PI * 2);
  ctx.fill();

  for (var i = 0; i < planets.length; i++) {
    var p = planets[i];
    p.angle = p.angle + p.speed * 0.4;
    
    var currentR = p.r * maxR;
    var px = cx + Math.cos(p.angle) * currentR;
    var py = cy + Math.sin(p.angle) * currentR;

    if (p.rings) {
      ctx.strokeStyle = 'rgba(229, 193, 133, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(px, py, p.size + 5, p.size - 2, 0.5, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(px, py, p.size, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#00e1ff';
    ctx.font = '11px monospace';
    ctx.fillText('[' + p.name + ']', px + p.size + 4, py + 4);
  }

  radarAngle = radarAngle + 0.015;
  var lineX = cx + Math.cos(radarAngle) * maxR;
  var lineY = cy + Math.sin(radarAngle) * maxR;

  ctx.strokeStyle = '#00e1ff';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(cx, cy);
  ctx.lineTo(lineX, lineY);
  ctx.stroke();

  drawRocket(cx - maxR * 0.75, cy - maxR * 0.35);

  requestAnimationFrame(loop);
}

loop();