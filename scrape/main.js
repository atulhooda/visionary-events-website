// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    themeToggle.addEventListener('click', () => {
        const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    });
}

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Active Page Navigation
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-menu a').forEach(link => {
    const linkPage = link.getAttribute('href');
    link.classList.toggle('active', linkPage === currentPage || (currentPage === '' && linkPage === 'index.html'));
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = Object.fromEntries(new FormData(this));
        if (!data.name || !data.email || !data.phone || !data.eventType || !data.message) {
            alert('Please fill in all required fields.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            alert('Please enter a valid email address.');
            return;
        }
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(data.phone.replace(/\s/g, ''))) {
            alert('Please enter a valid phone number.');
            return;
        }
        alert('Thank you for your inquiry! We will get back to you within 24 hours.');
        this.reset();
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (window.scrollY > 100) {
        navbar.style.background = isDark ? 'rgba(26, 26, 26, 0.95)' : 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    } else {
        navbar.style.background = '';
        navbar.style.backdropFilter = 'none';
    }
});

// Quote Modal
function openQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) { modal.style.display = 'block'; document.body.style.overflow = 'hidden'; }
}

function closeQuoteModal() {
    const modal = document.getElementById('quoteModal');
    if (modal) { modal.style.display = 'none'; document.body.style.overflow = 'auto'; }
}

window.addEventListener('click', e => {
    const quoteModal = document.getElementById('quoteModal');
    if (e.target === quoteModal) closeQuoteModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeQuoteModal();
});

// SocialDrip credit: visible for 30s then fades out
const socialdripCredit = document.getElementById('socialdrip-credit');
if (socialdripCredit) {
    setTimeout(() => { socialdripCredit.style.opacity = '0'; }, 30000);
}
