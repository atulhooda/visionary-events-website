// Gallery categories data - loaded from gallery-config.js
// galleryData is built in gallery-config.js
// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', currentTheme);
if (themeToggle) {
    themeToggle.textContent = currentTheme === 'dark' ? '☀️' : '🌙';
    
    themeToggle.addEventListener('click', () => {
        const theme = document.documentElement.getAttribute('data-theme');
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        
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

let currentCategory = 'corporate';
let currentModalIndex = 0;
let currentImages = [];
let currentPage = 0;
const imagesPerPage = 6;

// Initialize gallery
function initGallery() {
    loadGallery(currentCategory);
    setupCategoryTabs();
}

// Setup category tabs
function setupCategoryTabs() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategory = tab.dataset.category;
            currentPage = 0;
            loadGallery(currentCategory);
        });
    });
}

// Load gallery for selected category
function loadGallery(category) {
    const container = document.getElementById('galleryContainer');
    currentImages = galleryData[category];
    container.innerHTML = '';
    
    const startIndex = currentPage * imagesPerPage;
    const endIndex = Math.min(startIndex + imagesPerPage, currentImages.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const img = document.createElement('img');
        img.src = currentImages[i];
        img.alt = `${category} event ${i + 1}`;
        img.className = 'gallery-image';
        img.onclick = () => openModal(i);
        container.appendChild(img);
    }
}

// Change gallery page
function changeGalleryPage(direction) {
    const totalPages = Math.ceil(currentImages.length / imagesPerPage);
    currentPage += direction;
    
    if (currentPage >= totalPages) {
        currentPage = 0;
    } else if (currentPage < 0) {
        currentPage = totalPages - 1;
    }
    
    loadGallery(currentCategory);
}

// Modal functions
function openModal(index) {
    currentModalIndex = index;
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modalImage.src = currentImages[index];
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

function changeModalImage(direction) {
    currentModalIndex += direction;
    
    if (currentModalIndex >= currentImages.length) {
        currentModalIndex = 0;
    } else if (currentModalIndex < 0) {
        currentModalIndex = currentImages.length - 1;
    }
    
    const modalImage = document.getElementById('modalImage');
    modalImage.src = currentImages[currentModalIndex];
}

// Close modal on outside click
window.onclick = function(event) {
    const modal = document.getElementById('imageModal');
    if (event.target === modal) {
        closeModal();
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', initGallery);
