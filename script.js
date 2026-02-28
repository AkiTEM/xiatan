/**
 * Delícias da Xia Tân - JavaScript Interativo
 * www.xiatan.com.br
 */

// Inicialização quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    initializeHeader();
    initializeCarousel();
    initializeMenuFilters();
    initializeForms();
    initializeScrollAnimations();
    initializeSmoothScroll();
    initializeXiaFloat();
});

// ==================== HEADER ====================
function initializeHeader() {
    const header = document.getElementById('header');
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    menuToggle?.addEventListener('click', () => {
        nav.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Close menu on link click (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('active');
            menuToggle?.classList.remove('active');
            
            // Update active link
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });

    // Update active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== CARROSSEL ====================
function initializeCarousel() {
    const track = document.getElementById('carousel-track');
    const prevBtn = document.getElementById('carousel-prev');
    const nextBtn = document.getElementById('carousel-next');
    
    if (!track || !prevBtn || !nextBtn) return;

    const items = track.querySelectorAll('.carousel-item');
    const itemWidth = items[0]?.offsetWidth || 0;
    const gap = 32; // 2rem
    let currentIndex = 0;
    let maxIndex = items.length - getVisibleItems();
    let autoPlayInterval;

    function getVisibleItems() {
        const width = window.innerWidth;
        if (width < 768) return 1;
        if (width < 1024) return 2;
        return 3;
    }

    function updateCarousel() {
        const offset = currentIndex * (itemWidth + gap);
        track.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
        if (currentIndex < maxIndex) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = maxIndex;
        }
        updateCarousel();
    }

    // Auto-play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay();
    });

    // Responsive handling
    window.addEventListener('resize', () => {
        maxIndex = items.length - getVisibleItems();
        if (currentIndex > maxIndex) {
            currentIndex = maxIndex;
        }
        updateCarousel();
    });

    // Touch/Swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
        stopAutoPlay();
    });

    track.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
        startAutoPlay();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
    }

    // Mouse drag support (desktop)
    let isDragging = false;
    let startX = 0;
    let currentX = 0;

    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.cursor = 'grabbing';
        stopAutoPlay();
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        currentX = e.clientX;
    });

    track.addEventListener('mouseup', () => {
        if (!isDragging) return;
        isDragging = false;
        track.style.cursor = 'grab';
        
        const diff = startX - currentX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide();
            } else {
                prevSlide();
            }
        }
        startAutoPlay();
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.cursor = 'grab';
            startAutoPlay();
        }
    });

    startAutoPlay();
}

// ==================== FILTROS DO CARDÁPIO ====================
function initializeMenuFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuCards = document.querySelectorAll('.menu-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');

            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Filter cards with animation
            menuCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ==================== FORMULÁRIOS ====================
function initializeForms() {
    const orderForm = document.getElementById('order-form');
    const contactForm = document.getElementById('contact-form');

    // Order form submission
    orderForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(orderForm);
        const data = Object.fromEntries(formData.entries());
        
        // Create WhatsApp message
        const message = `
*Nova Encomenda - Delícias da Xia Tân*

*Nome:* ${data.name}
*Telefone:* ${data.phone}
*E-mail:* ${data.email}
*Data da Encomenda:* ${data.date}
*Produto:* ${data.product}
*Forma de Entrega:* ${data.delivery}

*Detalhes:*
${data.details}
        `.trim();

        const whatsappUrl = `https://wa.me/5511984626618?text=${encodeURIComponent(message)}`;
        
        // Show success message
        showNotification('Redirecionando para WhatsApp...', 'success');
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            orderForm.reset();
        }, 1000);
    });

    // Contact form submission
    contactForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData.entries());
        
        // Create WhatsApp message
        const message = `
*Contato - Delícias da Xia Tân*

*Nome:* ${data.name}
*E-mail:* ${data.email}

*Mensagem:*
${data.message}
        `.trim();

        const whatsappUrl = `https://wa.me/5511984626618?text=${encodeURIComponent(message)}`;
        
        // Show success message
        showNotification('Redirecionando para WhatsApp...', 'success');
        
        // Redirect to WhatsApp
        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            contactForm.reset();
        }, 1000);
    });

    // Date input minimum date (today)
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }

    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            if (value.length > 6) {
                value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
            } else if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            
            e.target.value = value;
        });
    });
}

// ==================== NOTIFICAÇÕES ====================
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        background: ${type === 'success' ? '#4CAF50' : '#FF69B4'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 16px rgba(0,0,0,0.2);
        z-index: 10000;
        animation: slideIn 0.3s ease;
        font-weight: 600;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Add animations to notification
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== SCROLL ANIMATIONS ====================
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements
    const elementsToAnimate = document.querySelectorAll(`
        .menu-card,
        .testimonial-card,
        .order-option,
        .about-text,
        .about-image,
        .value-item,
        .carousel-card
    `);

    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Parallax effect for about section
    const parallaxSection = document.querySelector('.parallax-section');
    if (parallaxSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const parallaxBg = parallaxSection.querySelector('.parallax-bg');
            if (parallaxBg) {
                parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
            }
        });
    }
}

// ==================== SMOOTH SCROLL ====================
function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Skip if it's just "#"
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== WHATSAPP HELPER ====================
function openWhatsApp(productName) {
    const message = `Olá! Gostaria de encomendar: *${productName}*`;
    const whatsappUrl = `https://wa.me/5511984626618?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Make function available globally for onclick handlers
window.openWhatsApp = openWhatsApp;

// ==================== PERFORMANCE OPTIMIZATIONS ====================

// Lazy loading images
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src || img.src;
    });
} else {
    // Fallback for browsers that don't support lazy loading
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
    document.body.appendChild(script);
}

// ==================== EASTER EGGS / SPECIAL EFFECTS ====================

// Confetti effect on logo click (fun interaction)
const heroLogo = document.querySelector('.hero-logo');
let clickCount = 0;

heroLogo?.addEventListener('click', () => {
    clickCount++;
    
    if (clickCount === 5) {
        createConfetti();
        showNotification('🎉 Você descobriu uma surpresa! Use o código XIATAN10 para 10% de desconto!', 'success');
        clickCount = 0;
    }
});

function createConfetti() {
    const colors = ['#FF69B4', '#FFA500', '#8B4513', '#FFF8DC'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            opacity: 1;
            z-index: 10000;
            pointer-events: none;
            border-radius: 50%;
        `;
        
        document.body.appendChild(confetti);
        
        const fallDuration = 2000 + Math.random() * 2000;
        const sway = (Math.random() - 0.5) * 200;
        
        confetti.animate([
            { transform: 'translateY(0) translateX(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) translateX(${sway}px) rotate(360deg)`, opacity: 0 }
        ], {
            duration: fallDuration,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}

// ==================== ANALYTICS & TRACKING ====================

// Track button clicks (ready for analytics integration)
function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    
    // Integration ready for Google Analytics, Facebook Pixel, etc.
    // Example: gtag('event', action, { 'event_category': category, 'event_label': label });
}

// Track important interactions
document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productName = e.target.closest('.menu-card')?.querySelector('h3')?.textContent;
        trackEvent('Encomendas', 'click', productName || 'Produto');
    });
});

document.querySelector('.whatsapp-float')?.addEventListener('click', () => {
    trackEvent('Contato', 'click', 'WhatsApp Float');
});

// ==================== SERVICE WORKER (PWA Ready) ====================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment when service-worker.js is created
        // navigator.serviceWorker.register('/service-worker.js')
        //     .then(registration => console.log('SW registered:', registration))
        //     .catch(error => console.log('SW registration failed:', error));
    });
}

// ==================== ACCESSIBILITY IMPROVEMENTS ====================

// Keyboard navigation enhancement
document.addEventListener('keydown', (e) => {
    // ESC to close mobile menu
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const menuToggle = document.getElementById('menu-toggle');
        nav?.classList.remove('active');
        menuToggle?.classList.remove('active');
    }
});

// Focus visible only on keyboard navigation
let isMouseUser = true;

document.addEventListener('mousedown', () => {
    isMouseUser = true;
    document.body.classList.add('mouse-user');
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        isMouseUser = false;
        document.body.classList.remove('mouse-user');
    }
});

// ==================== XIA FLOAT ====================
function initializeXiaFloat() {
    const floatEl = document.getElementById('xia-float');
    const bubbleEl = document.getElementById('xia-float-bubble');
    if (!floatEl || !bubbleEl) return;

    // Após 4s: esconde o balão
    setTimeout(() => {
        bubbleEl.classList.add('hide');
    }, 4000);

    // Após 5.5s: esconde o botão inteiro
    setTimeout(() => {
        floatEl.classList.add('hide');
        floatEl.addEventListener('animationend', () => {
            floatEl.style.display = 'none';
        }, { once: true });
    }, 5500);
}

// ==================== CONSOLE EASTER EGG ====================
console.log('%c🍰 Delícias da Xia Tân 🍰', 'font-size: 24px; font-weight: bold; color: #FF69B4;');
console.log('%c✨ Feitas com Amor e Dedicação ✨', 'font-size: 16px; color: #FFA500;');
console.log('%cwww.xiatan.com.br', 'font-size: 14px; color: #8B4513;');
console.log('%c\nProcurando algo? Entre em contato: contato@xiatan.com.br', 'font-size: 12px; color: #666;');

console.log('%c\n🎨 Site desenvolvido com:', 'font-size: 14px; font-weight: bold;');
console.log('• HTML5 Semântico\n• CSS3 com animações\n• JavaScript Vanilla\n• Design Responsivo\n• Otimizado para Performance');
