// =============================================
// TYPED.JS
// =============================================

const typed = new Typed('#typing', {
    strings: ['AI & ML Student', 'Python Developer', 'Frontend Developer'],
    typeSpeed: 70,
    backSpeed: 50,
    backDelay: 1500,
    loop: true
});

// =============================================
// AOS INIT
// =============================================

AOS.init({
    duration: 900,
    once: true,
    offset: 60,
    easing: 'ease-out-cubic'
});

// =============================================
// LOADING SCREEN
// =============================================

window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1900);
});

// =============================================
// SCROLL PROGRESS BAR
// =============================================

const scrollProgress = document.getElementById('scrollProgress');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const percent = (scrolled / maxScroll) * 100;
    scrollProgress.style.width = percent + '%';
});

// =============================================
// NAVBAR — scroll effect + active link highlight
// =============================================

const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 130;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});

// =============================================
// HAMBURGER MENU
// =============================================

const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// =============================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// =============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// =============================================
// BACK TO TOP BUTTON
// =============================================

document.getElementById('backToTop').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// =============================================
// SKILL BARS — animate when skills section enters view
// =============================================

const skillsSection = document.querySelector('.skills');

if (skillsSection) {
    const skillObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.skill-fill').forEach(fill => {
                    fill.style.width = fill.getAttribute('data-width') + '%';
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.25 });

    skillObserver.observe(skillsSection);
}

// =============================================
// STAT COUNTER ANIMATION
// =============================================

const aboutSection = document.querySelector('.about');

if (aboutSection) {
    const countObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.querySelectorAll('.stat-number').forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    let current = 0;
                    const step = Math.ceil(target / 30);
                    const timer = setInterval(() => {
                        current += step;
                        if (current >= target) {
                            counter.textContent = target + '+';
                            clearInterval(timer);
                        } else {
                            counter.textContent = current;
                        }
                    }, 45);
                });
                countObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.4 });

    countObserver.observe(aboutSection);
}

// =============================================
// CERTIFICATE MODAL / LIGHTBOX
// =============================================

const certModal = document.getElementById('certModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalClose = document.getElementById('modalClose');

document.querySelectorAll('.open-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        modalImg.src = btn.getAttribute('data-img');
        modalTitle.textContent = btn.getAttribute('data-title');
        certModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

function closeModal() {
    certModal.classList.remove('active');
    document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);

certModal.addEventListener('click', e => {
    if (e.target === certModal) closeModal();
});

document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeModal();
});

// =============================================
// CONTACT FORM
// =============================================

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', e => {
        e.preventDefault();
        formStatus.textContent = "Message sent! I'll get back to you soon.";
        formStatus.className = 'form-status success';
        contactForm.reset();
        setTimeout(() => {
            formStatus.textContent = '';
            formStatus.className = 'form-status';
        }, 5000);
    });
}

// =============================================
// DARK / LIGHT MODE TOGGLE
// =============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

function applyTheme(theme) {
    if (theme === 'light') {
        document.body.classList.add('light');
        themeIcon.className = 'fas fa-sun';
    } else {
        document.body.classList.remove('light');
        themeIcon.className = 'fas fa-moon';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.contains('light');
    const newTheme = isLight ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
});

// =============================================
// PROJECT CARD TILT EFFECT
// =============================================

document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const tiltX = ((y - cy) / cy) * 5;
        const tiltY = ((cx - x) / cx) * 5;
        card.style.transform = `perspective(900px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-10px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});
