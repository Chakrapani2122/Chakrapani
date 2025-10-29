// Optimized Data Science Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupFloatingNav();
        this.setupScrollEffects();
        this.setupAnimations();
        this.setupContactForm();
        this.setupSkillBars();
    }

    // Navigation System
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link, .nav-menu-item');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // In macOS mode, swap window content instead of scrolling
                if (document.body.classList.contains('macos-mode')) {
                    e.preventDefault();
                    const targetId = link.getAttribute('href').replace('#', '');
                    if (window.__macOSDesktop) {
                        window.__macOSDesktop.loadSection(targetId);
                    }
                    return;
                }

                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    this.updateActiveNav(link);
                    this.closeFloatingNav();
                }
            });
        });

        // Update active nav on scroll (disabled in macOS mode)
        window.addEventListener('scroll', this.debounce(() => {
            if (!document.body.classList.contains('macos-mode')) {
                this.updateActiveNavOnScroll();
            }
        }, 10));
    }

    updateActiveNav(activeLink) {
        document.querySelectorAll('.nav-link, .nav-menu-item').forEach(link => {
            link.classList.remove('active');
        });
        if (activeLink) activeLink.classList.add('active');
        
        const targetId = activeLink ? activeLink.getAttribute('href') : null;
        if (!targetId) return;
        document.querySelectorAll('.nav-link, .nav-menu-item').forEach(item => {
            if (item.getAttribute('href') === targetId) {
                item.classList.add('active');
            }
        });
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('.section, .hero-section');
        const navLinks = document.querySelectorAll('.nav-link, .nav-menu-item');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Floating Navigation
    setupFloatingNav() {
        const navToggleBtn = document.getElementById('navToggleBtn');
        const navMenu = document.getElementById('navMenu');
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        // Floating navigation (disabled in macOS mode via CSS)
        if (navToggleBtn && navMenu) {
            navToggleBtn.addEventListener('click', () => {
                navMenu.classList.toggle('active');
            });
            
            navMenu.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-menu-item')) {
                    navMenu.querySelectorAll('.nav-menu-item').forEach(item => {
                        item.classList.remove('active');
                    });
                    e.target.classList.add('active');
                    navMenu.classList.remove('active');
                }
            });
            
            document.addEventListener('click', (e) => {
                if (!navToggleBtn.contains(e.target) && !navMenu.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
            
            navToggleBtn.addEventListener('dblclick', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
        
        // Mobile menu toggle
        if (menuToggle && navLinks) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navLinks.classList.toggle('open');
                
                const expanded = menuToggle.classList.contains('active');
                menuToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
                
                document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
            });
            
            // Close mobile menu when clicking on a link
            navLinks.addEventListener('click', (e) => {
                if (e.target.classList.contains('nav-link')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('open');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    closeFloatingNav() {
        const navMenu = document.getElementById('navMenu');
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    }

    // Scroll Effects
    setupScrollEffects() {
        const navbar = document.querySelector('.navbar');
        
        window.addEventListener('scroll', () => {
            if (document.body.classList.contains('macos-mode')) return;
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Animations
    setupAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.triggerElementAnimation(entry.target);
                }
            });
        }, observerOptions);

        const animateElements = document.querySelectorAll(
            '.section-header, .skill-category, .timeline-item, .project-card, .expertise-item, .cert-category, .publication-item'
        );
        animateElements.forEach(el => observer.observe(el));
    }

    triggerElementAnimation(element) {
        if (element.classList.contains('timeline-item')) {
            element.classList.add('visible');
        } else if (element.classList.contains('skill-category')) {
            element.classList.add('fade-in');
            this.animateSkillBars(element);
        } else if (element.classList.contains('project-card')) {
            element.classList.add('scale-in');
        } else {
            const rect = element.getBoundingClientRect();
            const centerX = window.innerWidth / 2;
            
            if (rect.left < centerX) {
                element.classList.add('fade-in-left');
            } else {
                element.classList.add('fade-in-right');
            }
        }
    }

    // Skill Bars Animation
    setupSkillBars() {
        // Triggered by intersection observer
    }

    animateSkillBars(skillCategory) {
        if (skillCategory.dataset.animated) {
            return;
        }
        skillCategory.dataset.animated = true;

        const skillItems = skillCategory.querySelectorAll('.skill-item');
        
        skillItems.forEach((item, index) => {
            setTimeout(() => {
                const progressBar = item.querySelector('.skill-progress');
                if (!progressBar) {
                    console.debug('[animateSkillBars] no .skill-progress found for item', item, index);
                    return;
                }
                
                let skillLevel = item.dataset.skill;

                if (!skillLevel) {
                    skillLevel = '85%'; // Fallback
                }

                // normalize skillLevel (ensure ends with %)
                if (/^[0-9.]+$/.test(skillLevel)) {
                    skillLevel = skillLevel + '%';
                }
                
                progressBar.style.width = skillLevel;
                console.debug('[animateSkillBars] animated to', skillLevel, 'for item', index);
            }, index * 150);
        });
    }

    // Contact Form
    setupContactForm() {
        const contactForm = document.querySelector('.contact-form');
        
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(contactForm);
            });

            const inputs = contactForm.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', (e) => this.validateField(e.target));
                input.addEventListener('input', (e) => this.clearValidation(e.target));
            });
        }
    }

    async handleFormSubmission(form) {
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.innerHTML;
        const successMessage = document.getElementById('form-success');
        
        submitBtn.innerHTML = '<span>Sending...</span>';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(form);
            
            const response = await fetch('https://formspree.io/f/myzedaon', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                successMessage.style.display = 'block';
                successMessage.textContent = 'Thank you! Your message has been sent successfully.';
                successMessage.className = 'form-message form-success';
                form.reset();
                
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);
            } else {
                throw new Error('Form submission failed');
            }
            
        } catch (error) {
            console.error('Form submission error:', error);
            successMessage.style.display = 'block';
            successMessage.textContent = 'Sorry, there was an error sending your message. Please try again.';
            successMessage.className = 'form-message form-error';
            
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        } finally {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        this.clearValidation(field);

        if (field.hasAttribute('required') && !value) {
            isValid = false;
            message = 'This field is required';
        } else if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                message = 'Please enter a valid email address';
            }
        }

        if (!isValid) {
            field.style.borderColor = 'var(--danger)';
            this.showValidationMessage(field, message);
        } else {
            field.style.borderColor = 'var(--success)';
        }

        return isValid;
    }

    clearValidation(field) {
        field.style.borderColor = 'var(--gray-200)';
        const existingMessage = field.parentNode.querySelector('.validation-message');
        if (existingMessage) {
            existingMessage.remove();
        }
    }

    showValidationMessage(field, message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'validation-message';
        messageEl.textContent = message;
        messageEl.style.color = 'var(--danger)';
        messageEl.style.fontSize = '0.875rem';
        messageEl.style.marginTop = '0.5rem';
        
        field.parentNode.appendChild(messageEl);
    }

    // Utility Functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// === macOS Desktop Implementation ===
class MacOSDesktop {
    constructor() {
        this.desktopEl = document.getElementById('macDesktop');
        this.dockEl = document.getElementById('macDockItems');
        this.clockEl = document.getElementById('menubarClock');
        this.store = document.getElementById('main'); // hidden source of sections
        this.zIndex = 100;
        this.state = 'window'; // window | desktop | launchpad

        // Section mapping: id -> {title, icon}
        this.sectionMap = [
            { id: 'home', title: 'Home', icon: '🏠' },
            { id: 'about', title: 'About', icon: '👤' },
            { id: 'skills', title: 'Skills', icon: '🛠️' },
            { id: 'experience', title: 'Experience', icon: '💼' },
            { id: 'projects', title: 'Projects', icon: '🚀' },
            { id: 'certifications', title: 'Certifications', icon: '🎓' },
            { id: 'publications', title: 'Publications', icon: '📚' },
            { id: 'contact', title: 'Contact', icon: '✉️' }
        ];

        this.enable();
    }

    enable() {
        document.body.classList.add('macos-mode');
        this.buildDock();
        this.buildLaunchpad();
        this.buildWindow();
        this.startClock();
        // Desktop click to go to desktop when no overlays
        if (this.desktopEl) {
            this.desktopEl.addEventListener('click', (e) => {
                if (e.target === this.desktopEl) {
                    this.showDesktop();
                }
            });
        }
        // ESC to show desktop
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.showDesktop();
        });
    }

    startClock() {
        const update = () => {
            const now = new Date();
            const opts = { weekday: 'short', hour: 'numeric', minute: '2-digit' };
            if (this.clockEl) this.clockEl.textContent = now.toLocaleString(undefined, opts);
        };
        update();
        setInterval(update, 1000 * 30);
    }

    buildDock() {
        // Clear dock first
        if (this.dockEl) this.dockEl.innerHTML = '';

        // Launchpad item
        const lp = document.createElement('li');
        lp.className = 'dock-item';
        lp.setAttribute('role', 'tab');
        lp.dataset.windowId = 'launchpad';
        lp.innerHTML = `<div class="dock-icon" aria-label="App Library">⬛️</div><div class="dock-label">App Library</div>`;
        lp.addEventListener('click', () => this.toggleLaunchpad());
        this.dockEl.appendChild(lp);

        // Section items
        this.sectionMap.forEach(({ id, title, icon }) => {
            const li = document.createElement('li');
            li.className = 'dock-item';
            li.setAttribute('role', 'tab');
            li.dataset.windowId = id;
            li.innerHTML = `<div class="dock-icon">${icon}</div><div class="dock-label">${title}</div>`;
            li.addEventListener('click', () => this.loadSection(id));
            this.dockEl.appendChild(li);
        });
    }

    buildLaunchpad() {
        // Create overlay
        this.launchpadEl = document.createElement('div');
        this.launchpadEl.className = 'mac-launchpad';
        const grid = document.createElement('div');
        grid.className = 'lp-grid';

        this.sectionMap.forEach(({ id, title, icon }) => {
            const item = document.createElement('button');
            item.className = 'lp-item';
            item.setAttribute('aria-label', `${title}`);
            item.innerHTML = `<div class="lp-icon">${icon}</div><div class="lp-title">${title}</div>`;
            item.addEventListener('click', () => {
                this.loadSection(id);
                this.toggleLaunchpad(false);
            });
            grid.appendChild(item);
        });

        this.launchpadEl.appendChild(grid);
        document.body.appendChild(this.launchpadEl);

        // Dismiss on backdrop click
        this.launchpadEl.addEventListener('click', (e) => {
            if (e.target === this.launchpadEl) this.toggleLaunchpad(false);
        });
    }

    toggleLaunchpad(force) {
        const active = typeof force === 'boolean' ? force : !this.launchpadEl.classList.contains('active');
        this.launchpadEl.classList.toggle('active', active);
        this.state = active ? 'launchpad' : (this.isWindowVisible() ? 'window' : 'desktop');
    }

    buildWindow() {
        // Create one main window
        const win = document.createElement('div');
        win.className = 'mac-window fullscreen';
        win.dataset.windowId = 'main';
        win.dataset.focused = 'true';
        this.mainWindowEl = win;

        // Titlebar
        const titlebar = document.createElement('div');
        titlebar.className = 'mac-titlebar';

        const lights = document.createElement('div');
        lights.className = 'mac-traffic-lights';
        const btnClose = document.createElement('span'); btnClose.className = 'mac-btn close';
        const btnMin = document.createElement('span'); btnMin.className = 'mac-btn min';
        const btnFull = document.createElement('span'); btnFull.className = 'mac-btn full';
        lights.append(btnClose, btnMin, btnFull);

        this.titleEl = document.createElement('div');
        this.titleEl.className = 'mac-title';
        this.titleEl.textContent = 'Portfolio';

        const titleRight = document.createElement('div');
        titleRight.style.webkitAppRegion = 'no-drag';

        titlebar.append(lights, this.titleEl, titleRight);

        // Content wrapper
        this.contentWrap = document.createElement('div');
        this.contentWrap.className = 'mac-content';

        win.append(titlebar, this.contentWrap);
        this.desktopEl.appendChild(win);

        // Controls
        btnClose.addEventListener('click', () => this.closeWindow());
        btnMin.addEventListener('click', () => this.minimizeWindow());
        btnFull.addEventListener('click', () => this.toggleWindowSize());
        // Double-click titlebar to maximize/restore
        titlebar.addEventListener('dblclick', () => this.toggleWindowSize());

        // Load initial section
        this.loadSection('home');
    }

    // State helpers
    isWindowVisible() {
        if (!this.mainWindowEl) return false;
        return !this.mainWindowEl.classList.contains('closed') && !this.mainWindowEl.classList.contains('minimized');
    }

    ensureWindowVisible() {
        if (!this.mainWindowEl) return;
        this.toggleLaunchpad(false);
        this.mainWindowEl.classList.remove('closed', 'minimized');
        this.mainWindowEl.style.display = '';
        this.state = 'window';
        this.focusWindow();
    }

    showDesktop() {
        // Hide launchpad and window to show wallpaper only
        this.toggleLaunchpad(false);
        if (this.mainWindowEl) {
            // Prefer minimize (opacity 0 + pointer-events none) to reveal wallpaper smoothly
            this.mainWindowEl.classList.add('minimized');
        }
        this.state = 'desktop';
    }

    minimizeWindow() {
        if (!this.mainWindowEl) return;
        this.toggleLaunchpad(false);
        this.mainWindowEl.classList.add('minimized');
        this.mainWindowEl.classList.remove('closed');
        this.state = 'desktop';
    }

    closeWindow() {
        if (!this.mainWindowEl) return;
        this.toggleLaunchpad(false);
        this.mainWindowEl.classList.add('closed');
        this.mainWindowEl.classList.remove('minimized');
        this.state = 'desktop';
    }

    // Toggle between fullscreen and windowed sizes
    toggleWindowSize() {
        const win = this.mainWindowEl;
        if (!win) return;

        const isFullscreen = win.classList.contains('fullscreen');
        if (isFullscreen) {
            // Switch to windowed size and center
            win.classList.remove('fullscreen');
            // Set a reasonable size (CSS already gives width/height via percentages)
            const desiredW = Math.min(1000, Math.floor(window.innerWidth * 0.82));
            const desiredH = Math.min(680, Math.floor(window.innerHeight * 0.78));
            const left = Math.max(12, Math.floor((window.innerWidth - desiredW) / 2));
            const top = Math.max(40, Math.floor((window.innerHeight - desiredH) / 2));
            win.style.width = desiredW + 'px';
            win.style.height = desiredH + 'px';
            win.style.left = left + 'px';
            win.style.top = top + 'px';
            win.style.right = 'auto';
            win.style.bottom = 'auto';
        } else {
            // Go back to fullscreen
            win.classList.add('fullscreen');
            // Let CSS control size/placement
            win.style.left = '';
            win.style.top = '';
            win.style.right = '';
            win.style.bottom = '';
            win.style.width = '';
            win.style.height = '';
        }
        this.focusWindow();
    }

    loadSection(id) {
        const sectionMeta = this.sectionMap.find(s => s.id === id);
        if (!sectionMeta) return;

        const target = document.getElementById(id);
        if (!target) return;

        // Ensure window is visible when loading a section
        this.ensureWindowVisible();

        // Move current content back to store
        if (this.contentWrap.firstElementChild) {
            this.store.appendChild(this.contentWrap.firstElementChild);
        }
        // Move target section into window
        this.contentWrap.appendChild(target);
        // Update title
        this.titleEl.textContent = `${sectionMeta.title}`;

        // Focus window
        this.focusWindow();
    }

    focusWindow() {
        // Single window focus; ensure it's on top
        const win = this.desktopEl.querySelector('.mac-window');
        if (win) {
            this.zIndex += 1;
            win.style.zIndex = String(1000 + this.zIndex);
        }
    }

    // Utility
    debounce(fn, wait) {
        let t;
        return (...args) => { clearTimeout(t); t = setTimeout(() => fn.apply(this, args), wait); };
    }
}

// Initialize Portfolio and macOS Desktop
document.addEventListener('DOMContentLoaded', () => {
    const app = new Portfolio();
    try {
        window.__macOSDesktop = new MacOSDesktop();
    } catch (e) {
        console.error('macOS desktop init failed', e);
    }
    
    // Add smooth scrolling for all internal links (disabled in macOS mode)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (document.body.classList.contains('macos-mode')) return; // handled by nav logic
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Add CSS animations
const animationCSS = `
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes scaleIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.fade-in {
  animation: fadeInUp 0.6s ease-out;
}

.fade-in-left {
  animation: fadeInLeft 0.6s ease-out;
}

.fade-in-right {
  animation: fadeInRight 0.6s ease-out;
}

.scale-in {
  animation: scaleIn 0.5s ease-out;
}

.timeline-item {
  opacity: 0;
  transform: translateX(-50px);
  transition: all 0.6s ease;
}

.timeline-item.visible {
  opacity: 1;
  transform: translateX(0);
}

.timeline-item:nth-child(even) {
  transform: translateX(50px);
}

.timeline-item:nth-child(even).visible {
  transform: translateX(0);
}

.form-success {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid var(--success);
  color: var(--success);
}

.form-error {
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid var(--danger);
  color: var(--danger);
}

.validation-message {
  animation: slideDown 0.3s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
`;

const style = document.createElement('style');
style.textContent = animationCSS;
document.head.appendChild(style);