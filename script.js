// ============================================================
// KRISHNAPRASAD R — PORTFOLIO SCRIPT
// ============================================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Mobile hamburger ----
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  if (navLinks.classList.contains('open')) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  }
});

navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

// ---- Typewriter effect ----
const roles = [
  'Flutter Developer',
  'Mobile App Engineer',
  'Cross-Platform Specialist',
  'UI/UX Enthusiast',
  'Performance Optimizer'
];
let roleIdx = 0, charIdx = 0, isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWrite() {
  const current = roles[roleIdx];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && charIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    isDeleting = false;
    roleIdx = (roleIdx + 1) % roles.length;
    delay = 400;
  }

  setTimeout(typeWrite, delay);
}
typeWrite();

// ---- Counter animation ----
function animateCounter(el, target, suffix = '') {
  const duration = 2000;
  const startTime = performance.now();
  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(eased * target);
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-num').forEach(el => {
        const target = parseInt(el.dataset.target);
        animateCounter(el, target);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ---- Scroll reveal ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ---- Particle canvas ----
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas, { passive: true });

const particles = [];
const PARTICLE_COUNT = 60;

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.4;
    this.vy = (Math.random() - 0.5) * 0.4;
    this.radius = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.2;
    this.color = ['#3B82F6', '#2563EB', '#60A5FA'][Math.floor(Math.random() * 3)];
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
    if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = this.opacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(59, 130, 246, ${0.1 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ---- Active nav link highlight ----
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinkEls.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => sectionObserver.observe(s));

// ---- Add active nav style dynamically ----
const style = document.createElement('style');
style.textContent = `.nav-link.active { color: var(--accent) !important; }`;
document.head.appendChild(style);

// ---- Resume Modal Logic ----
const resumeModal = document.getElementById('resumeModal');
const heroResumeBtn = document.getElementById('heroResumeBtn');
const aboutResumeBtn = document.getElementById('aboutResumeBtn');
const closeModal = document.getElementById('closeModal');
const resumeForm = document.getElementById('resumeForm');
const visitorEmail = document.getElementById('visitorEmail');
const formGroup = visitorEmail?.parentElement;

function openModal() {
  resumeModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeResumeModal() {
  resumeModal.classList.remove('active');
  document.body.style.overflow = '';
  if (formGroup) formGroup.classList.remove('error');
  resumeForm.reset();
}

if (heroResumeBtn) heroResumeBtn.addEventListener('click', openModal);
if (aboutResumeBtn) aboutResumeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

if (closeModal) closeModal.addEventListener('click', closeResumeModal);

resumeModal?.addEventListener('click', (e) => {
  if (e.target === resumeModal) closeResumeModal();
});

if (resumeForm) {
  resumeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailValue = visitorEmail.value.trim().toLowerCase();

    // Strict Regex
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    // Blacklisted prefixes (abc, 123, test, etc.)
    const blacklist = ['abc', '123', 'test', 'user', 'admin', 'fake', 'example', 'guest', 'none', 'temp'];
    const prefix = emailValue.split('@')[0];

    // Proper Validation: Format + Length + Blacklist
    const isInvalidPrefix = blacklist.some(item => prefix === item || prefix.length < 3);
    const isNumericPrefix = /^\d+$/.test(prefix); // Blocks pure numbers like 123@

    if (emailRegex.test(emailValue) && !isInvalidPrefix && !isNumericPrefix) {
      formGroup.classList.remove('error');

      // --- LOGGING ENGINE ---
      const timestamp = new Date().toLocaleString();
      const logEntry = { email: emailValue, time: timestamp };

      // Save to LocalStorage (Persist locally in browser)
      let emailLog = JSON.parse(localStorage.getItem('resume_downloads') || '[]');
      emailLog.push(logEntry);
      localStorage.setItem('resume_downloads', JSON.stringify(emailLog));

      // Trigger Download
      const link = document.createElement('a');
      link.href = 'resume.pdf';
      link.download = 'Krishnaprasad_R_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Success feedback
      const submitBtn = resumeForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerText;
      submitBtn.innerText = '✅ Success! Downloading...';
      submitBtn.disabled = true;

      // Close modal after delay
      setTimeout(() => {
        closeResumeModal();
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
      }, 2000);
    } else {
      formGroup.classList.add('error');
      const errorMsg = document.getElementById('emailError');
      if (isInvalidPrefix || isNumericPrefix) {
        errorMsg.innerText = 'Please provide a professional, valid email address.';
      } else {
        errorMsg.innerText = 'Please enter a valid email format.';
      }
    }
  });
}

// ---- Owner Feature: Download Email Log ----
// Press 'Shift + L' on the website to download the email log as a text file
document.addEventListener('keydown', (e) => {
  if (e.shiftKey && e.key === 'L') {
    const log = localStorage.getItem('resume_downloads');
    if (!log || log === '[]') {
      alert('No downloads logged yet!');
      return;
    }

    const logData = JSON.parse(log);
    let logContent = 'RESUME DOWNLOAD LOG\n====================\n\n';
    logData.forEach(entry => {
      logContent += `[${entry.time}] ${entry.email}\n`;
    });

    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resume_downloads_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
