// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.add('scrolled'); // Always keep slight background for readability or toggle?
        if(window.scrollY < 10){
           navbar.classList.remove('scrolled');
        }
    }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    const icon = mobileMenuBtn.querySelector('i');
    if(navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    }
});

// Scroll Reveal Animation (Intersection Observer)
const revealElements = document.querySelectorAll('.reveal');

const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Stop observing once animated
            observer.unobserve(entry.target);
        }
    });
};

const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

revealElements.forEach(el => {
    revealObserver.observe(el);
});

// Interactive Starfield Background
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let width, height;
let stars = [];

function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    stars = [];
    
    // Create stars
    const numStars = Math.floor(width * height / 4000);
    for (let i = 0; i < numStars; i++) {
        stars.push({
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 1.5 + 0.5,
            vx: Math.random() * 0.2 - 0.1,
            vy: Math.random() * 0.2 - 0.1,
            opacity: Math.random()
        });
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, width, height);
    
    stars.forEach(star => {
        star.x += star.vx;
        star.y += star.vy;
        
        // Wrap around
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
        
        // Twinkle
        star.opacity += Math.random() * 0.05 - 0.025;
        if (star.opacity < 0.1) star.opacity = 0.1;
        if (star.opacity > 1) star.opacity = 1;
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity * 0.5})`;
        ctx.fill();
    });
}

// Mouse interaction with starfield
let mouseX = 0;
let mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Parallax effect on mouse move (subtle)
    stars.forEach(star => {
        const dx = (mouseX - width/2) * 0.0001;
        const dy = (mouseY - height/2) * 0.0001;
        star.x -= dx * star.radius;
        star.y -= dy * star.radius;
    });
});

window.addEventListener('resize', init);

// Initial call
init();
animate();

// ==========================================================================
//   Custom Cursor & Particles
// ==========================================================================
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const cursorGlow = document.querySelector('.cursor-glow');

let mX = window.innerWidth / 2;
let mY = window.innerHeight / 2;
let outlineX = mX;
let outlineY = mY;

document.addEventListener('mousemove', (e) => {
    mX = e.clientX;
    mY = e.clientY;
    
    // Update dot and glow instantly
    cursorDot.style.left = `${mX}px`;
    cursorDot.style.top = `${mY}px`;
    cursorGlow.style.left = `${mX}px`;
    cursorGlow.style.top = `${mY}px`;
    
    createTrailParticle(mX, mY);
});

function animateCursor() {
    outlineX += (mX - outlineX) * 0.2;
    outlineY += (mY - outlineY) * 0.2;
    
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
    
    requestAnimationFrame(animateCursor);
}
animateCursor();

// Interactive Hover Effects
const interactiveEls = document.querySelectorAll('a, button, .achievement-card, .btn');
interactiveEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        // Check if element has a specific glow color and match it
        const computedStyle = getComputedStyle(document.documentElement);
        if(el.querySelector('.blue-glow') || el.classList.contains('blue-glow')) {
             document.documentElement.style.setProperty('--accent-primary', computedStyle.getPropertyValue('--accent-blue'));
        } else if(el.querySelector('.red-glow') || el.classList.contains('red-glow')) {
             document.documentElement.style.setProperty('--accent-primary', computedStyle.getPropertyValue('--accent-red'));
        } else if(el.querySelector('.green-glow') || el.classList.contains('green-glow')) {
             document.documentElement.style.setProperty('--accent-primary', computedStyle.getPropertyValue('--accent-green'));
        }
    });
    
    el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
        const computedStyle = getComputedStyle(document.documentElement);
        document.documentElement.style.setProperty('--accent-primary', computedStyle.getPropertyValue('--accent-blue'));
    });
});

let lastParticleTime = 0;
function createTrailParticle(x, y) {
    const now = Date.now();
    if (now - lastParticleTime < 30) return; // limit spawn rate
    if (Math.random() > 0.4) return;
    lastParticleTime = now;
    
    const particle = document.createElement('div');
    particle.className = 'trail-particle';
    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;
    document.body.appendChild(particle);
    
    setTimeout(() => {
        particle.style.opacity = '0';
        particle.style.transform = `scale(0.2) translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px)`;
    }, 10);
    
    setTimeout(() => {
        particle.remove();
    }, 600);
}
