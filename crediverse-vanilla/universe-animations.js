// CREDIVERSE UNIVERSE ANIMATIONS - JavaScript

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    createStarfield();
    initializeScrollAnimations();
    initializeInteractiveElements();
});

// ===== STARFIELD CREATION =====
function createStarfield() {
    const starfield = document.querySelector('.starfield');
    const starCount = 200;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.cssText = `
            position: absolute;
            width: ${Math.random() * 2 + 1}px;
            height: ${Math.random() * 2 + 1}px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.7 + 0.3};
            box-shadow: 0 0 ${Math.random() * 3 + 1}px rgba(255, 255, 255, 0.8);
            animation: twinkle ${Math.random() * 3 + 2}s infinite ${Math.random() * 5}s;
        `;
        starfield.appendChild(star);
    }
}

// ===== INTERSECTION OBSERVER FOR SCROLL ANIMATIONS =====
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe animation elements
    document.querySelectorAll('.step, .feature-card, .tier-card, .user-card').forEach(el => {
        observer.observe(el);
    });
}

// ===== INTERACTIVE ELEMENTS =====
function initializeInteractiveElements() {
    // Button hover effects with particles
    const buttons = document.querySelectorAll('.btn-primary, .btn-secondary, .btn-tier, .cosmic-btn');
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function(e) {
            createParticlesOnHover(e, this);
        });
    });

    // Navigation link animation
    const navLinks = document.querySelectorAll('.nav-link-cosmic');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ===== PARTICLE EFFECTS ON BUTTON HOVER =====
function createParticlesOnHover(e, button) {
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.className = 'hover-particle';
        particle.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: rgba(184, 75, 255, 0.8);
            border-radius: 50%;
            pointer-events: none;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            box-shadow: 0 0 10px rgba(184, 75, 255, 0.8);
        `;
        document.body.appendChild(particle);

        const angle = (Math.PI * 2 * i) / 5;
        const velocity = Math.random() * 3 + 2;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        animateParticle(particle, vx, vy);
    }
}

function animateParticle(particle, vx, vy) {
    let x = parseFloat(particle.style.left);
    let y = parseFloat(particle.style.top);
    let opacity = 1;

    const animate = () => {
        x += vx;
        y += vy;
        opacity -= 0.02;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.opacity = opacity;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };
    
    animate();
}

// ===== PARALLAX EFFECT =====
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    
    // Move galaxies slower (parallax)
    const galaxies = document.querySelectorAll('.galaxy, .nebula');
    galaxies.forEach((galaxy, index) => {
        const speed = 0.3 + (index * 0.05);
        galaxy.style.transform = `translateY(${scrolled * speed}px)`;
    });

    // Move planets with parallax
    const planets = document.querySelectorAll('.planet');
    planets.forEach((planet, index) => {
        const speed = 0.2 + (index * 0.05);
        planet.style.transform = `translateY(${scrolled * speed * -1}px)`;
    });

    // Update hero content opacity on scroll
    const hero = document.querySelector('.hero');
    if (hero) {
        const heroContent = hero.querySelector('.hero-content');
        const opacity = Math.max(0, 1 - (scrolled / 500));
        heroContent.style.opacity = opacity;
    }
});

// ===== ENHANCED INITIALIZATION =====
function initializeAnimations() {
    // Add stagger animation delays
    addStaggerAnimations();
    
    // Animate stat numbers on scroll to hero
    animateStatNumbers();
    
    // Create cosmic mouse trail
    createMouseTrail();
}

// ===== STAGGER ANIMATIONS =====
function addStaggerAnimations() {
    const cards = document.querySelectorAll('.feature-card, .tier-card, .user-card, .step');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

// ===== ANIMATE STAT NUMBERS =====
function animateStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');
    let animated = false;

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const numberMatch = text.match(/\d+/);
                    if (numberMatch) {
                        const target = parseInt(numberMatch[0]);
                        animateNumber(stat, target);
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) observer.observe(heroStats);
}

function animateNumber(element, target) {
    let current = 0;
    const increment = target / 30; // Animate over 30 frames
    const originalText = element.textContent;
    const suffix = originalText.replace(/\d+/g, '');

    const animate = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(animate);
        } else {
            element.textContent = target + suffix;
        }
    };

    animate();
}

// ===== COSMIC MOUSE TRAIL =====
function createMouseTrail() {
    let mouseX = 0;
    let mouseY = 0;
    let trailTimeout;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Create trail particle occasionally
        if (Math.random() > 0.7) {
            createTrailParticle(mouseX, mouseY);
        }
    });
}

function createTrailParticle(x, y) {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(0, 240, 255, 0.6);
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        box-shadow: 0 0 5px rgba(0, 240, 255, 0.8);
        z-index: 9999;
    `;
    document.body.appendChild(particle);

    let opacity = 1;
    let scale = 1;

    const animate = () => {
        opacity -= 0.05;
        scale += 0.02;
        particle.style.opacity = opacity;
        particle.style.transform = `scale(${scale})`;

        if (opacity > 0) {
            requestAnimationFrame(animate);
        } else {
            particle.remove();
        }
    };

    animate();
}

// ===== GLOW EFFECT ON ELEMENTS =====
function addGlowEffect() {
    document.querySelectorAll('.feature-card, .tier-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            card.style.setProperty('--glow-x', x + 'px');
            card.style.setProperty('--glow-y', y + 'px');
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--glow-x', '50%');
            card.style.setProperty('--glow-y', '50%');
        });
    });
}

// Add glow effect on load
addGlowEffect();

// ===== AMBIENT LIGHT EFFECT =====
function createAmbientLight() {
    const ambientLight = document.createElement('div');
    ambientLight.style.cssText = `
        position: fixed;
        width: 1000px;
        height: 1000px;
        background: radial-gradient(circle, rgba(184, 75, 255, 0.1), transparent);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        top: -400px;
        left: -400px;
    `;
    document.body.appendChild(ambientLight);

    document.addEventListener('mousemove', (e) => {
        ambientLight.style.left = (e.clientX - 500) + 'px';
        ambientLight.style.top = (e.clientY - 500) + 'px';
    });
}

createAmbientLight();

// ===== TEXT SHIMMER EFFECT =====
function addShimmerEffect() {
    const shimmerText = document.querySelectorAll('.cosmic-title, .section-title');
    
    shimmerText.forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.animation = 'shimmer 0.5s ease-out';
        });
    });
}

addShimmerEffect();

// ===== RIPPLE EFFECT ON BUTTONS =====
function addRippleEffect() {
    const buttons = document.querySelectorAll('button');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;

            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

addRippleEffect();

// Add ripple animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        100% {
            transform: scale(4);
            opacity: 0;
        }
    }

    @keyframes shimmer {
        0% {
            text-shadow: 
                0 0 10px rgba(0, 240, 255, 0),
                0 0 20px rgba(184, 75, 255, 0);
        }
        50% {
            text-shadow: 
                0 0 20px rgba(0, 240, 255, 0.8),
                0 0 40px rgba(184, 75, 255, 0.6);
        }
        100% {
            text-shadow: 
                0 0 10px rgba(0, 240, 255, 0),
                0 0 20px rgba(184, 75, 255, 0);
        }
    }
`;
document.head.appendChild(style);

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-out';

// Set opacity to 1 after a tiny delay to trigger transition
setTimeout(() => {
    document.body.style.opacity = '1';
}, 10);

// Log that animations are loaded
console.log('🌌 Crediverse Universe Animations Loaded Successfully!');
console.log('✨ Enjoy the cosmic experience!');
