var header = document.querySelector('header');
var can1 = document.getElementById("canvas1");
var can2 = document.getElementById("canvas2");
var ctx = can1.getContext("2d");
var ctx2 = can2.getContext("2d");

var lightning = [];
var core = { x: 0, y: 0, r: 30 };
var wallRadius = 0;
var num = 6;
var hue = 240; // Azul en HSL

function resizeCanvasToHeader() {
  const width = header.clientWidth;
  const height = header.clientHeight;

  can1.width = width;
  can1.height = height;
  can2.width = width;
  can2.height = height;

  core.x = width / 2;
  core.y = height / 2;
  wallRadius = Math.min(width / 2, height / 2);
}

function dis(x, y, x2, y2) {
  var xl = x2 - x;
  var yl = y2 - y;
  return Math.sqrt(xl ** 2 + yl ** 2);
}

function randFrom(min, max) {
  return (Math.random() * (max - min)) + min;
}

function map(val, min, max, min2, max2) {
  var diff1 = max - min;
  var diff2 = max2 - min2;
  return diff2 / diff1 * val;
}

function randBet(c1, c2) {
  var nArr = [c1, c2];
  return nArr[randFrom(0, 1)];
}

function light(ang, hue) {
  this.ang = ang;
  this.x = core.x + core.r;
  this.y = 0;
  this.num = 8;
  this.points = [];

  for (let j = 0; j < this.num; j++) {
    this.points.push({ x: core.r + (j / (this.num - 1)) * (wallRadius - core.r), y: 0 });
  }

  this.drift = Math.random() * 0.02 - 0.01;
  this.timer = 1;
  this.timerRate = 0.01;
  this.width = 3;
  this.fadeRate = randFrom(0.09, 0.2);
  this.angVel = 0.05;
  this.phase = 0;
  this.phaseDiff = randFrom(1.5, 1.9);
  var amp = 20;

  this.draw = function () {
    ctx.lineWidth = this.width * 1.3;
    ctx.strokeStyle = "hsl(" + hue + ",100%,50%)";
    ctx.save();
    ctx.translate(core.x, core.y);
    ctx.rotate(this.ang);
    ctx.beginPath();
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let j = 1; j < this.num; j++) {
      ctx.lineTo(this.points[j].x, this.points[j].y);
    }
    ctx.stroke();
    ctx.restore();

    // Glow render
    ctx2.lineWidth = this.width * 3;
    ctx2.strokeStyle = "hsl(" + hue + ",100%,50%)";
    ctx2.save();
    ctx2.translate(core.x, core.y);
    ctx2.rotate(this.ang);
    ctx2.beginPath();
    ctx2.moveTo(this.points[0].x, this.points[0].y);
    for (let j = 1; j < this.num; j++) {
      ctx2.lineTo(this.points[j].x, this.points[j].y);
    }
    ctx2.stroke();
    ctx2.beginPath();
    ctx2.arc(this.points[this.num - 1].x, this.points[this.num - 1].y, this.width * 3 + Math.random() * 10, 0, 2 * Math.PI);
    ctx2.fill();
    ctx2.restore();
  }

  this.upd = function () {
    this.ang += this.drift;
    this.width -= this.fadeRate;
    this.timer -= this.timerRate;

    if (this.width <= 0) {
      this.ang = Math.random() * 2 * Math.PI;
      this.width = 3;
      this.phaseDiff = randFrom(1.5, 1.9);
      this.fadeRate = randFrom(0.09, 0.2);
      this.timerRate = randFrom(0.01, 0.1);
    }

    if (this.timer <= 0) {
      this.phase = Math.random() * 2 * Math.PI;
      this.amp = randFrom(10, 20);
      this.angVel = randFrom(0.03, 0.07);
      this.timer = 1;
    }

    for (let j = 0; j < this.num; j++) {
      this.phase -= this.angVel;
      this.points[j].y = amp * (j - 0) * (this.num - 1 - j) * 0.1 * Math.sin(this.phase + (j * this.phaseDiff));
    }
  }
}

function gameMake() {
  for (let i = 0; i < num; i++) {
    lightning.push(new light(Math.random() * 2 * Math.PI, hue));
  }
}

function gameMove() {
  requestAnimationFrame(gameMove);
  ctx.clearRect(0, 0, can1.width, can1.height);
  ctx2.clearRect(0, 0, can1.width, can1.height);

  for (let i = 0; i < num; i++) {
    if (Math.random() > 0.1) lightning[i].draw();
    lightning[i].upd();
  }

  // Drawing core
  ctx.lineWidth = randFrom(3, 6);
  ctx2.lineWidth = ctx.lineWidth * 2;
  ctx.fillStyle = "rgb(50,50,50)";
  ctx.strokeStyle = "hsl(" + hue + ",100%,50%)";
  ctx.beginPath();
  ctx.arc(core.x, core.y, core.r, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx2.strokeStyle = "hsl(" + hue + ",100%,50%)";
  ctx2.beginPath();
  ctx2.arc(core.x, core.y, core.r, 0, 2 * Math.PI);
  ctx2.stroke();

  ctx.fillStyle = "hsl(" + hue + ",100%,50%)";
  ctx.beginPath();
  ctx.arc(core.x, core.y, core.r / 3, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();

  ctx2.fillStyle = "hsl(" + hue + ",100%,50%)";
  ctx2.beginPath();
  ctx2.arc(core.x, core.y, core.r / 3, 0, 2 * Math.PI);
  ctx2.fill();
  ctx2.stroke();

  // Drawing wall
  var grd = ctx.createRadialGradient(core.x, core.y, wallRadius, core.x, core.y, wallRadius + 100);
  grd.addColorStop(0, "rgba(0,0,0,0)");
  grd.addColorStop(0.01, "rgb(40,40,40)");
  grd.addColorStop(0.333, "rgb(40,40,40)");
  grd.addColorStop(0.343, "rgb(20,20,20)");
  grd.addColorStop(0.666, "rgb(20,20,20)");
  grd.addColorStop(0.766, "rgb(0,0,0)");
  ctx.fillStyle = grd;
  ctx.beginPath();
  ctx.arc(core.x, core.y, Math.max(can1.width, can1.height), 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
}

// Inicialización
resizeCanvasToHeader();
gameMake();
gameMove();

window.addEventListener('resize', () => {
  resizeCanvasToHeader();
  lightning = [];
  gameMake();
});
