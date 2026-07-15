// --- 1. Preloader Logic ---
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        preloader.style.visibility = 'hidden';
    }, 1200);
});

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 2. Custom Cursor Logic ---
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;

            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;

            cursorOutline.animate({
                left: `${posX}px`,
                top: `${posY}px`
            }, { duration: 500, fill: "forwards" });
        });
    }

    // --- 3. Theme Toggle Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    const themeIcon = themeToggleBtn.querySelector('i');
    const heroTitle = document.getElementById('hero-title');
    const heroDesc = document.getElementById('hero-desc');

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            htmlElement.setAttribute('data-theme', 'light');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            heroTitle.innerText = "Pure Sound, Seamless Design.";
            heroDesc.innerText = "Hi-Res Audio, Adaptive transparency, lightweight comfort.";
        } else {
            htmlElement.setAttribute('data-theme', 'dark');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            heroTitle.innerText = "Experience Audio Perfection.";
            heroDesc.innerText = "Hybrid ANC, 50-hour battery, premium craftsmanship.";
        }
    });

    // --- 4. Login Modal Logic ---
    const accountBtn = document.querySelector('.account');
    const loginModal = document.getElementById('login-modal');
    const closeBtn = document.querySelector('.close-btn');

    accountBtn.addEventListener('click', (e) => {
        e.preventDefault();
        loginModal.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });

    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.classList.remove('active');
        }
    });

    // --- 5. Fetch JSON Data & Render Cards ---
    const featuresContainer = document.getElementById('features-container');

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(feature => {
                const card = document.createElement('div');
                card.classList.add('feature-card', 'fade-in'); 
                
                card.innerHTML = `
                    <i class="${feature.icon}"></i>
                    <h3>${feature.title}</h3>
                    <p style="color: var(--text-muted); font-size: 0.85rem;">${feature.desc}</p>
                `;
                
                featuresContainer.appendChild(card);
            });

            observeElements(); // تفعيل المراقب بعد إضافة البطاقات
        })
        .catch(error => console.error("Error loading features:", error));

    // --- 6. Scroll-triggered Animations (Intersection Observer) ---
    function observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); 
                }
            });
        }, observerOptions);

        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach(el => observer.observe(el));
    }

    observeElements();
});
