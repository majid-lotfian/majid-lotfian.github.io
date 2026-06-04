// ── Navbar scroll effect ────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Mobile nav toggle ────────────────────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── Typewriter ───────────────────────────────────────────────
const titles = [
  'Foundation Model Researcher',
  'Applied AI Scientist',
  'Data Scientist',
  'ML Research Engineer',
  'NLP & LLM Engineer',
  'Postdoctoral Researcher',
];
let titleIndex = 0, charIndex = 0, deleting = false;
const el = document.getElementById('typewriter');

function type() {
  const word = titles[titleIndex];
  if (deleting) {
    el.textContent = word.slice(0, --charIndex);
  } else {
    el.textContent = word.slice(0, ++charIndex);
  }
  let delay = deleting ? 55 : 95;
  if (!deleting && charIndex === word.length)  { delay = 2200; deleting = true; }
  else if (deleting && charIndex === 0)         { deleting = false; titleIndex = (titleIndex + 1) % titles.length; delay = 350; }
  setTimeout(type, delay);
}
type();

// ── Publication filter tabs ──────────────────────────────────
document.querySelectorAll('.pub-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.pub-tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.tab;
    document.querySelectorAll('.pub-item').forEach(item => {
      item.classList.toggle('hidden', filter !== 'all' && item.dataset.type !== filter);
    });
  });
});

// ── Intersection Observer fade-in ────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.08 });

document.querySelectorAll(
  '.research-card, .project-card, .timeline-content, .pub-item, .stat-card, .edu-card, .skills-group, .contact-card'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});
