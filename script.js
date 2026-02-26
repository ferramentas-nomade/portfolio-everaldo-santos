/* ============================================
  Everaldo Silva dos Santos- PORTFOLIO JAVASCRIPT
   HTML/CSS/JS Puro
   ============================================ */

// Variáveis globais
const fullName = 'Everaldo Silva dos Santos';
let splashProgress = 0;
let typedIndex = 0;
let countersAnimated = false;

// Elementos do DOM
const splashScreen = document.getElementById('splashScreen');
const typedNameEl = document.getElementById('typedName');
const splashProgressEl = document.getElementById('splashProgress');
const splashPercentEl = document.getElementById('splashPercent');
const particlesContainer = document.getElementById('particles');
const geoLinesContainer = document.getElementById('geoLines');
const countersSection = document.getElementById('counters');
const counterProjects = document.getElementById('counterProjects');
const counterYears = document.getElementById('counterYears');
const counterCountries = document.getElementById('counterCountries');

// ============================================
// CRIAR PARTÍCULAS
// ============================================
function createParticles() {
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.animationDelay = `${i * 0.7}s`;
    particle.style.left = `${5 + i * 12}%`;
    particle.style.top = `${15 + (i % 4) * 20}%`;
    particlesContainer.appendChild(particle);
  }
}

// ============================================
// CRIAR LINHAS GEOMÉTRICAS
// ============================================
function createGeoLines() {
  for (let i = 0; i < 5; i++) {
    const line = document.createElement('div');
    line.className = 'geo-line';
    line.style.animationDelay = `${i * 0.3}s`;
    line.style.top = `${20 + i * 15}%`;
    geoLinesContainer.appendChild(line);
  }
}

// ============================================
// EFEITO DE DIGITAÇÃO
// ============================================
function typeWriter() {
  if (typedIndex <= fullName.length) {
    typedNameEl.innerHTML = fullName.slice(0, typedIndex) + '<span class="cursor">|</span>';
    typedIndex++;
    setTimeout(typeWriter, 100);
  }
}

// ============================================
// BARRA DE PROGRESSO DO SPLASH
// ============================================
function updateSplashProgress() {
  const interval = setInterval(() => {
    if (splashProgress >= 100) {
      clearInterval(interval);
      return;
    }
    splashProgress += 4;
    splashProgressEl.style.width = `${splashProgress}%`;
    splashPercentEl.textContent = `${splashProgress}%`;
  }, 70);
}

// ============================================
// ESCONDER SPLASH SCREEN
// ============================================
function hideSplash() {
  setTimeout(() => {
    splashScreen.classList.add('hidden');
    // Iniciar observadores após splash
    initScrollObservers();
  }, 3500);
}

// ============================================
// ANIMAÇÃO DE CONTADORES
// ============================================
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;

  const targetProjects = 25;
  const targetYears = 32;
  const targetCountries = 2;
  const duration = 2000;
  const steps = 60;
  const stepDuration = duration / steps;

  let step = 0;
  const interval = setInterval(() => {
    step++;
    const progress = step / steps;
    
    // Easing function - easeOutQuart
    const easeOutQuart = 1 - Math.pow(1 - progress, 4);

    counterProjects.textContent = Math.floor(targetProjects * easeOutQuart);
    counterYears.textContent = Math.floor(targetYears * easeOutQuart);
    counterCountries.textContent = Math.floor(targetCountries * easeOutQuart);

    if (step >= steps) {
      counterProjects.textContent = targetProjects;
      counterYears.textContent = targetYears;
      counterCountries.textContent = targetCountries;
      clearInterval(interval);
    }
  }, stepDuration);
}

// ============================================
// OBSERVADORES DE SCROLL
// ============================================
function initScrollObservers() {
  // Observer para contadores
  const countersObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        countersObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  countersObserver.observe(countersSection);

  // Observer para seções (scroll reveal)
  const sections = document.querySelectorAll('.section, .quote-section');
  const sectionsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  sections.forEach((section) => {
    sectionsObserver.observe(section);
  });

  // Observer para timeline de empresas
  const companyItems = document.querySelectorAll('.company-item');
  const companyObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  companyItems.forEach((item) => {
    companyObserver.observe(item);
  });
}

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  // Criar elementos dinâmicos
  createParticles();
  createGeoLines();

  // Iniciar animações do splash
  typeWriter();
  updateSplashProgress();
  hideSplash();

  // Inicializar formulário de contato
  initContactForm();
});

// ============================================
// FORMULÁRIO DE CONTATO - Envia via mailto:
// ============================================
const EVERALDO_EMAIL = 'everaldosilva31@outlook.com'; // ← Altere para o email desejado

function initContactForm() {
  const form = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Coletar dados do formulário
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    // Montar corpo do email
    const body = 
`Nome: ${name}
Email: ${email}
Assunto: ${subject}

Mensagem:
${message}

---
Enviado através do portfólio de Everaldo Silva dos Santos`;

    // Criar link mailto:
    const mailtoLink = `mailto:${EVERALDO_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // Abrir cliente de email
    window.location.href = mailtoLink;

    // Mostrar mensagem de sucesso
    formMessage.className = 'form-message success';
    formMessage.innerHTML = `
      <strong>✓ Abrindo seu aplicativo de email!</strong><br>
      Se não abrir automaticamente, envie diretamente para: <strong>${EVERALDO_EMAIL}</strong>
    `;

    // Limpar formulário após 2 segundos
    setTimeout(() => {
      form.reset();
    }, 2000);
  });
}
