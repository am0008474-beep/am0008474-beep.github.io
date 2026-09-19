/**
 * Ashish Kumar Maurya - Portfolio JavaScript
 * Interactive Features: Neural Canvas, Typewriter, AI Playground Simulators, Theme Switcher
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initTypewriter();
  initNeuralCanvas();
  initSkillsFilter();
  initPlayground();
  initMobileNav();
  initCopyButtons();
  initContactForm();
});

/* ==========================================================================
   1. THEME TOGGLE (Dark / Light Mode)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (!themeToggleBtn) return;

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('ashish-portfolio-theme', nextTheme);

    const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
    if (metaColorScheme) {
      metaColorScheme.content = nextTheme;
    }
  });

  // Listen to OS theme changes if user hasn't explicitly set preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('ashish-portfolio-theme')) {
      const theme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', theme);
    }
  });
}

/* ==========================================================================
   2. TYPEWRITER ANIMATION
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    "Machine Learning & AI Pipelines",
    "Computer Vision & OpenCV",
    "NLP & Sentiment Analysis",
    "Data Structures & Algorithms",
    "Scalable Intelligent Software",
    "B.Tech CSE (AI) @ BBDU Lucknow"
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingSpeed = 1800; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typingSpeed = 400; // Pause before starting next word
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ==========================================================================
   3. NEURAL PARTICLE CANVAS
   ========================================================================== */
function initNeuralCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor((width * height) / 22000), 55);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.6;
      this.vy = (Math.random() - 0.5) * 0.6;
      this.radius = Math.random() * 1.8 + 1;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }

    draw(theme) {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = theme === 'light' ? 'rgba(2, 132, 199, 0.45)' : 'rgba(56, 189, 248, 0.55)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';

    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const alpha = (1 - dist / 120) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = theme === 'light' 
            ? `rgba(2, 132, 199, ${alpha})` 
            : `rgba(99, 102, 241, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update & draw particles
    particles.forEach(p => {
      p.update();
      p.draw(theme);
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. SKILLS FILTER TABS
   ========================================================================== */
function initSkillsFilter() {
  const tabs = document.querySelectorAll('.filter-tab');
  const cards = document.querySelectorAll('.skill-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   5. INTERACTIVE AI PLAYGROUND (Simulators)
   ========================================================================== */
function initPlayground() {
  // A. NLP Sentiment Analyzer
  const sentimentInput = document.getElementById('sentiment-input');
  const analyzeBtn = document.getElementById('analyze-sentiment-btn');
  const resultBox = document.getElementById('sentiment-result');
  const sentimentBadge = document.getElementById('sentiment-badge');
  const sentimentConfidence = document.getElementById('sentiment-confidence');
  const sentimentMeter = document.getElementById('sentiment-meter');
  const sentimentDetail = document.getElementById('sentiment-detail');
  const chips = document.querySelectorAll('.chip-btn');

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      sentimentInput.value = chip.getAttribute('data-text');
      runSentimentAnalysis();
    });
  });

  if (analyzeBtn) {
    analyzeBtn.addEventListener('click', runSentimentAnalysis);
  }

  function runSentimentAnalysis() {
    const text = (sentimentInput.value || '').toLowerCase();
    if (!text.trim()) return;

    // Word lists for simulation
    const positiveWords = ['exceeded', 'expectations', 'fast', 'clean', 'helpful', 'resolved', 'flawless', 'great', 'good', 'love', 'exceptional', 'durable', 'works', 'astonishingly', 'best', 'happy', 'recommended'];
    const negativeWords = ['terrible', 'slow', 'latency', 'crashes', 'buggy', 'bugs', 'poor', 'bad', 'horrible', 'worst', 'broken', 'issue', 'failed', 'hate', 'delay', 'disappointing'];

    let posScore = 0;
    let negScore = 0;

    positiveWords.forEach(w => { if (text.includes(w)) posScore += 1.5; });
    negativeWords.forEach(w => { if (text.includes(w)) negScore += 1.5; });

    let sentiment = 'POSITIVE';
    let confidence = 92.4;

    if (posScore > negScore) {
      sentiment = 'POSITIVE';
      confidence = Math.min(85 + posScore * 4.2, 98.7);
    } else if (negScore > posScore) {
      sentiment = 'NEGATIVE';
      confidence = Math.min(82 + negScore * 4.5, 97.8);
    } else {
      sentiment = 'NEUTRAL';
      confidence = 78.5;
    }

    resultBox.classList.remove('hidden');
    sentimentConfidence.textContent = `${confidence.toFixed(1)}% Confidence`;
    sentimentMeter.style.width = `${confidence.toFixed(1)}%`;

    sentimentBadge.className = 'result-badge';
    sentimentMeter.className = 'meter-fill';

    if (sentiment === 'POSITIVE') {
      sentimentBadge.textContent = 'POSITIVE';
      sentimentDetail.textContent = 'TF-IDF n-gram vectorizer identified high positive polarity weights. Naive Bayes classification: Positive satisfaction.';
    } else if (sentiment === 'NEGATIVE') {
      sentimentBadge.textContent = 'NEGATIVE';
      sentimentBadge.classList.add('negative');
      sentimentMeter.classList.add('negative-meter');
      sentimentDetail.textContent = 'Model detected critical problem indicators and negative polarity markers. Recommended for prioritized team review.';
    } else {
      sentimentBadge.textContent = 'NEUTRAL';
      sentimentBadge.classList.add('neutral');
      sentimentMeter.classList.add('neutral-meter');
      sentimentDetail.textContent = 'Factual / objective feedback with balanced emotional polarity weights across token features.';
    }
  }

  // B. Health Risk ML Simulator
  const ageSlider = document.getElementById('param-age');
  const bpSlider = document.getElementById('param-bp');
  const cholSlider = document.getElementById('param-chol');
  const glucoseSlider = document.getElementById('param-glucose');

  const ageVal = document.getElementById('age-val');
  const bpVal = document.getElementById('bp-val');
  const cholVal = document.getElementById('chol-val');
  const glucoseVal = document.getElementById('glucose-val');

  const predictBtn = document.getElementById('predict-risk-btn');
  const riskResult = document.getElementById('risk-result');
  const riskBadge = document.getElementById('risk-badge');
  const riskConfidence = document.getElementById('risk-confidence');
  const riskMeter = document.getElementById('risk-meter');
  const riskDetail = document.getElementById('risk-detail');

  if (ageSlider && bpSlider && cholSlider && glucoseSlider) {
    ageSlider.addEventListener('input', () => ageVal.textContent = ageSlider.value);
    bpSlider.addEventListener('input', () => bpVal.textContent = bpSlider.value);
    cholSlider.addEventListener('input', () => cholVal.textContent = cholSlider.value);
    glucoseSlider.addEventListener('input', () => glucoseVal.textContent = glucoseSlider.value);
  }

  if (predictBtn) {
    predictBtn.addEventListener('click', () => {
      const age = parseInt(ageSlider.value, 10);
      const bp = parseInt(bpSlider.value, 10);
      const chol = parseInt(cholSlider.value, 10);
      const glucose = parseInt(glucoseSlider.value, 10);

      // Simulation algorithm reflecting clinical logistic regression / decision tree bounds
      let riskScore = 10;
      if (age > 45) riskScore += (age - 45) * 0.8;
      if (bp > 125) riskScore += (bp - 125) * 0.5;
      if (chol > 190) riskScore += (chol - 190) * 0.35;
      if (glucose > 105) riskScore += (glucose - 105) * 0.55;

      riskScore = Math.min(Math.max(riskScore, 10), 95);

      riskResult.classList.remove('hidden');
      riskMeter.style.width = `${riskScore}%`;

      riskBadge.className = 'result-badge';
      riskMeter.className = 'meter-fill';

      if (riskScore < 38) {
        riskBadge.textContent = 'LOW RISK';
        riskBadge.classList.add('low-risk');
        riskMeter.classList.add('low-risk-meter');
        riskConfidence.textContent = `${(100 - riskScore).toFixed(1)}% Health Baseline`;
        riskDetail.textContent = 'Random Forest Classifier predicts all primary clinical biometric indicators are well within healthy physiological ranges.';
      } else if (riskScore < 65) {
        riskBadge.textContent = 'MODERATE RISK';
        riskBadge.classList.add('neutral');
        riskMeter.classList.add('neutral-meter');
        riskConfidence.textContent = `${riskScore.toFixed(1)}% Risk Index`;
        riskDetail.textContent = 'Biometric features indicate borderline hypertension or glucose elevations. Suggests routine lifestyle adjustment and monitoring.';
      } else {
        riskBadge.textContent = 'ELEVATED RISK';
        riskBadge.classList.add('high-risk');
        riskMeter.classList.add('negative-meter');
        riskConfidence.textContent = `${riskScore.toFixed(1)}% Elevated Risk`;
        riskDetail.textContent = 'Key predictive features (BP/Glucose/Age correlation) cross diagnostic decision boundary. Recommended clinical consult.';
      }
    });
  }
}

/* ==========================================================================
   6. MOBILE NAVIGATION
   ========================================================================== */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const links = document.querySelectorAll('.nav-link');

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', !isExpanded);
    navMenu.classList.toggle('open');
  });

  links.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ==========================================================================
   7. COPY BUTTONS
   ========================================================================== */
function initCopyButtons() {
  const copyButtons = document.querySelectorAll('.copy-btn');

  copyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const textToCopy = btn.getAttribute('data-copy');
      if (!textToCopy) return;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalText = btn.textContent;
        btn.textContent = 'Copied! ✓';
        btn.style.background = 'var(--success)';
        btn.style.color = '#0a0f1d';

        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.background = '';
          btn.style.color = '';
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   8. CONTACT FORM (Mailto trigger)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const subject = document.getElementById('contact-subject').value;
    const message = document.getElementById('contact-message').value;

    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    const mailtoUrl = `mailto:am0008474@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;
  });
}
