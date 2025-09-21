// Modern Portfolio Website JavaScript
// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    initializePortfolio();
});

function initializePortfolio() {
    initTypingAnimation();
    initDarkModeToggle();
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    initNavbarScroll();
    initSkillBarAnimations();
}

// Typing animation for hero section
function initTypingAnimation() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;

    const skills = ['Python', 'HTML', 'CSS', 'Flask', 'Git', 'PostgreSQL', 'MySQL', 'SQLite', 'SQLAlchemy', 'Django', 'C++'];
    let skillIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        const currentSkill = skills[skillIndex];
        
        if (isDeleting) {
            typingText.textContent = currentSkill.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentSkill.substring(0, charIndex + 1);
            charIndex++;
        }
        
        if (!isDeleting && charIndex === currentSkill.length) {
            setTimeout(() => isDeleting = true, 1500);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            skillIndex = (skillIndex + 1) % skills.length;
        }
        
        const speed = isDeleting ? 50 : 100;
        setTimeout(typeWriter, speed);
    }
    
    // Start typing animation after a delay
    setTimeout(typeWriter, 1000);
}

// Dark mode toggle functionality
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const html = document.documentElement;
    
    if (!darkModeToggle) return;
    
    // Check for saved theme preference or default to 'light'
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        html.classList.add('dark');
    }

    darkModeToggle.addEventListener('click', function() {
        html.classList.toggle('dark');
        
        // Save theme preference
        const theme = html.classList.contains('dark') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (!mobileMenuToggle || !mobileMenu) return;

    mobileMenuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = mobileMenu.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            // Skip empty or invalid hrefs
            if (!href || href === '#' || href.length <= 1) {
                return;
            }
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Trigger skill bar animation when skills section is visible
                if (entry.target.closest('#skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Initialize and observe all fade-in elements
    document.querySelectorAll('.fade-in-section').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-in-out, transform 0.6s ease-in-out';
        observer.observe(el);
    });
}

// Skill bar animations
function initSkillBarAnimations() {
    // Set initial state for skill bars
    document.querySelectorAll('.skill-bar').forEach(bar => {
        bar.style.width = '0%';
    });
}

function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width');
            bar.style.width = width + '%';
        }, index * 200);
    });
}


// Navbar background change on scroll
function initNavbarScroll() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('nav');
        if (!navbar) return;
        
        if (window.scrollY > 50) {
            navbar.classList.add('bg-white/95', 'dark:bg-gray-900/95');
            navbar.classList.remove('bg-white/90', 'dark:bg-gray-900/90');
        } else {
            navbar.classList.add('bg-white/90', 'dark:bg-gray-900/90');
            navbar.classList.remove('bg-white/95', 'dark:bg-gray-900/95');
        }
    });
}