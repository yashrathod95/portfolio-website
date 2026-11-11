
const root = document.documentElement;
const toggle = document.getElementById('theme-toggle');
function setTheme(t) {
  root.setAttribute('data-theme', t);
  toggle.textContent = t === 'light' ? '☀️' : '🌙';
  try { localStorage.setItem('theme', t); } catch (e) {}
}
let saved = 'dark';
try { saved = localStorage.getItem('theme') || 'dark'; } catch (e) {}
setTheme(saved);
toggle.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'light' ? 'dark' : 'light'));
 
// Mobile menu
const links = document.querySelector('.nav-links');
document.getElementById('menu-btn').addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));
 
// Highlight current section in navbar
const navLinks = [...links.querySelectorAll('a')];
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('main section').forEach(s => observer.observe(s));
 
// Project "View Details" buttons
document.querySelectorAll('.more-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const open = btn.nextElementSibling.classList.toggle('show');
    btn.textContent = open ? 'Hide Details' : 'View Details';
  });
});
 
// Contact form validation
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
  e.preventDefault();
  const name = document.getElementById('f-name').value.trim();
  const email = document.getElementById('f-email').value.trim();
  const msg = document.getElementById('f-msg').value.trim();
  let ok = true;
  const setErr = (id, text) => { document.getElementById(id).textContent = text; if (text) ok = false; };
  setErr('name-err', name.length < 2 ? 'Enter your name (at least 2 characters).' : '');
  setErr('email-err', /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Enter a valid email address.');
  setErr('msg-err', msg.length < 10 ? 'Message must be at least 10 characters.' : '');
  const success = document.getElementById('form-success');
  if (ok) { success.textContent = 'Thanks ' + name + '! Your message passed validation.'; form.reset(); }
  else { success.textContent = ''; }
});