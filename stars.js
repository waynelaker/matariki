// =============================================
// Matariki Stars — Shared Data & Utilities
// =============================================

const MATARIKI_STARS = [
  {
    id: 'matariki',
    name: 'Matariki',
    english: 'Alcyone',
    meaning: 'Connected to health and wellbeing',
    brightness: 1.0,
    x: 62, y: 52,
    glowColor: '#ffd54f',
    flashColor: 'rgba(255, 213, 79, 0.7)'
  },
  {
    id: 'pohutukawa',
    name: 'Pōhutukawa',
    english: 'Sterope',
    meaning: 'Connected to those who have passed',
    brightness: 0.4,
    x: 42, y: 90,
    glowColor: '#ef5350',
    flashColor: 'rgba(239, 83, 80, 0.7)'
  },
  {
    id: 'tupuanuku',
    name: 'Tupuānuku',
    english: 'Atlas',
    meaning: 'Connected to food grown in the ground',
    brightness: 0.75,
    x: 80, y: 59,
    glowColor: '#66bb6a',
    flashColor: 'rgba(102, 187, 106, 0.7)'
  },
  {
    id: 'tupuarangi',
    name: 'Tupuārangi',
    english: 'Electra',
    meaning: 'Connected to food from the sky',
    brightness: 0.72,
    x: 83, y: 44,
    glowColor: '#42a5f5',
    flashColor: 'rgba(66, 165, 245, 0.7)'
  },
  {
    id: 'waipunarangi',
    name: 'Waipuna-ā-Rangi',
    english: 'Celaeno',
    meaning: 'Connected to rain and water',
    brightness: 0.32,
    x: 18, y: 48,
    glowColor: '#26c6da',
    flashColor: 'rgba(38, 198, 218, 0.7)'
  },
  {
    id: 'waiti',
    name: 'Waitī',
    english: 'Maia',
    meaning: 'Connected to fresh water and its creatures',
    brightness: 0.65,
    x: 39, y: 63,
    glowColor: '#00bfa5',
    flashColor: 'rgba(0, 191, 165, 0.7)'
  },
  {
    id: 'waita',
    name: 'Waitā',
    english: 'Taygeta',
    meaning: 'Connected to the ocean and its creatures',
    brightness: 0.55,
    x: 25, y: 83,
    glowColor: '#7e57c2',
    flashColor: 'rgba(126, 87, 194, 0.7)'
  },
  {
    id: 'ururangi',
    name: 'Ururangi',
    english: 'Merope',
    meaning: 'Connected to the winds',
    brightness: 0.48,
    x: 48, y: 25,
    glowColor: '#ff7043',
    flashColor: 'rgba(255, 112, 67, 0.7)'
  },
  {
    id: 'hiwaiterangi',
    name: 'Hiwa-i-te-Rangi',
    english: 'Pleione',
    meaning: 'Connected to wishes and desires for the future',
    brightness: 0.3,
    x: 18, y: 69,
    glowColor: '#f48fb1',
    flashColor: 'rgba(244, 143, 177, 0.7)'
  }
];

// ---- Twinkling star-field background ----

function createStarField(container) {
  container = container || document.body;
  const field = document.createElement('div');
  field.className = 'star-field';
  field.setAttribute('aria-hidden', 'true');

  const count = 220;
  for (let i = 0; i < count; i++) {
    const s = document.createElement('div');
    s.className = 'bg-star';
    s.style.left = Math.random() * 100 + '%';
    s.style.top = Math.random() * 100 + '%';
    const size = Math.random() * 2 + 0.5;
    s.style.width = size + 'px';
    s.style.height = size + 'px';
    s.style.setProperty('--tw-delay', (Math.random() * 6) + 's');
    s.style.setProperty('--tw-dur', (Math.random() * 3 + 2) + 's');
    field.appendChild(s);
  }
  container.prepend(field);
}

// ---- Create the Matariki cluster inside a container ----

function createCluster(containerId, options) {
  options = options || {};
  const container = document.getElementById(containerId);
  if (!container) return;

  const interactive  = options.interactive || false;
  const showLabels   = options.showLabels  || false;
  const onStarClick  = options.onStarClick || null;
  const baseSize     = options.baseSize    || 8;
  const maxSize      = options.maxSize     || 20;

  MATARIKI_STARS.forEach(function (star) {
    const el = document.createElement('div');
    el.className = 'star';
    el.id = 'star-' + star.id;
    el.dataset.starId = star.id;

    const size = baseSize + (maxSize - baseSize) * star.brightness;
    el.style.left = star.x + '%';
    el.style.top  = star.y + '%';
    el.style.width  = size + 'px';
    el.style.height = size + 'px';
    el.style.setProperty('--flash-color', star.glowColor);
    el.style.setProperty('--star-glow', star.glowColor);
    el.style.setProperty('--star-brightness', star.brightness);
    el.style.setProperty('--spike-scale', 0.6 + star.brightness * 0.9);
    el.style.setProperty('--core-size', (2 + star.brightness * 4) + 'px');

    const inner = document.createElement('div');
    inner.className = 'star-inner';
    el.appendChild(inner);

    // Spikes (Lens flare cross)
    const spikeH = document.createElement('div');
    spikeH.className = 'spike spike-h';
    inner.appendChild(spikeH);

    const spikeV = document.createElement('div');
    spikeV.className = 'spike spike-v';
    inner.appendChild(spikeV);

    // Diagonal spikes for brighter stars
    if (star.brightness > 0.5) {
      const spikeD1 = document.createElement('div');
      spikeD1.className = 'spike spike-d1';
      inner.appendChild(spikeD1);

      const spikeD2 = document.createElement('div');
      spikeD2.className = 'spike spike-d2';
      inner.appendChild(spikeD2);
    }

    // Core bright star center
    const core = document.createElement('div');
    core.className = 'star-core';
    inner.appendChild(core);

    if (showLabels) {
      const lbl = document.createElement('span');
      lbl.className = 'star-label';
      lbl.textContent = star.name;
      el.appendChild(lbl);
    }

    if (interactive || onStarClick) {
      el.style.cursor = 'pointer';
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', star.name);
      el.tabIndex = 0;

      if (onStarClick) {
        el.addEventListener('click', function () { onStarClick(star.id, el); });
        el.addEventListener('keydown', function (e) {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onStarClick(star.id, el);
          }
        });
      }
    }

    container.appendChild(el);
  });
}

// ---- Flash a star (returns a Promise) ----

function flashStar(starId, duration) {
  duration = duration || 500;
  return new Promise(function (resolve) {
    const el = document.getElementById('star-' + starId);
    if (!el) { resolve(); return; }

    const star = MATARIKI_STARS.find(function (s) { return s.id === starId; });
    el.classList.add('star-flash');
    el.style.setProperty('--flash-color', star.glowColor);

    setTimeout(function () {
      el.classList.remove('star-flash');
      setTimeout(resolve, 100);
    }, duration);
  });
}

// ---- Helpers ----

function getStarById(id) {
  return MATARIKI_STARS.find(function (s) { return s.id === id; });
}

function shuffleArray(arr) {
  var shuffled = arr.slice();
  for (var i = shuffled.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var tmp = shuffled[i];
    shuffled[i] = shuffled[j];
    shuffled[j] = tmp;
  }
  return shuffled;
}

function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// ---- Fireworks (canvas-based particle effect) ----

function launchFireworks(durationMs) {
  durationMs = durationMs || 5000;
  var canvas = document.createElement('canvas');
  canvas.className = 'fireworks-canvas';
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  document.body.appendChild(canvas);
  var ctx = canvas.getContext('2d');

  var particles = [];
  var startTime = Date.now();

  function Particle(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    var angle = Math.random() * Math.PI * 2;
    var speed = Math.random() * 5 + 2;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.alpha = 1;
    this.decay = Math.random() * 0.02 + 0.008;
    this.size = Math.random() * 3 + 1.5;
  }

  var colors = ['#ffd54f', '#ef5350', '#66bb6a', '#42a5f5', '#7e57c2',
                '#ff7043', '#f48fb1', '#26c6da', '#00bfa5', '#ffffff'];

  function burst(x, y) {
    var color = colors[Math.floor(Math.random() * colors.length)];
    for (var i = 0; i < 60; i++) {
      particles.push(new Particle(x, y, color));
    }
  }

  var nextBurst = 0;
  function animate() {
    var elapsed = Date.now() - startTime;
    if (elapsed > durationMs && particles.length === 0) {
      canvas.remove();
      return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (elapsed < durationMs) {
      nextBurst -= 16;
      if (nextBurst <= 0) {
        burst(
          Math.random() * canvas.width * 0.6 + canvas.width * 0.2,
          Math.random() * canvas.height * 0.5 + canvas.height * 0.1
        );
        nextBurst = Math.random() * 300 + 100;
      }
    }

    for (var i = particles.length - 1; i >= 0; i--) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.06; // gravity
      p.alpha -= p.decay;

      if (p.alpha <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 6;
      ctx.shadowColor = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(animate);
  }

  animate();
}

// ---- Celebration glow for all stars ----

function celebrateAllStars() {
  MATARIKI_STARS.forEach(function (star, i) {
    setTimeout(function () {
      var el = document.getElementById('star-' + star.id);
      if (el) {
        el.classList.add('star-celebrate');
        el.style.setProperty('--flash-color', star.glowColor);
      }
    }, i * 120);
  });
}

function stopCelebration() {
  MATARIKI_STARS.forEach(function (star) {
    var el = document.getElementById('star-' + star.id);
    if (el) el.classList.remove('star-celebrate');
  });
}
