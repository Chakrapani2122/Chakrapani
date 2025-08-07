// Ensure default theme is light on page load
window.addEventListener('DOMContentLoaded', function() {
    const themeToggleSwitch = document.getElementById('theme-toggle');
    if (themeToggleSwitch) {
        themeToggleSwitch.checked = false;
        document.body.classList.add('light-theme');
    }
});

// Smooth scrolling for navigation links and active nav highlighting
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function (e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        }
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
        });
        this.classList.add('active');
    });
});

// Improved mobile menu toggle
const menuToggleBtn = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
if (menuToggleBtn && navLinks) {
    menuToggleBtn.addEventListener('click', function() {
        const expanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !expanded);
        navLinks.classList.toggle('open');
    });
}

// Accessibility: focus/active states
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('focus', function () {
        this.classList.add('active');
    });
    link.addEventListener('blur', function () {
        this.classList.remove('active');
    });
});

// Theme toggle logic
const themeToggleSwitch = document.getElementById('theme-toggle');
if (themeToggleSwitch) {
    themeToggleSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
    });
}
    });
}
    link.addEventListener('blur', function () {
        this.classList.remove('active');
    });
});

// Theme toggle logic
const themeToggleSwitch = document.getElementById('theme-toggle');
if (themeToggleSwitch) {
    themeToggleSwitch.addEventListener('change', () => {
        document.body.classList.toggle('light-theme');
    });
}
