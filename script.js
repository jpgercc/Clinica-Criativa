// ====== CONFIGURAÇÕES GLOBAIS ======
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Inicializar todas as funcionalidades
    initMobileMenu();
    initSmoothScroll();
    initScrollAnimations();
    initHeaderScroll();
    initProductCards();
    initContactLinks();
    initScrollToTop();
    
    // Adicionar efeitos de carregamento
    document.body.classList.add('loaded');
}

// ====== MENU MOBILE ======
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (!hamburger || !navLinks) return;
    
    // Toggle menu mobile
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Animar hamburger
        animateHamburger(hamburger.classList.contains('active'));
    });
    
    // Fechar menu ao clicar nos links
    navItems.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            animateHamburger(false);
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('menu-open');
            animateHamburger(false);
        }
    });
}

function animateHamburger(isActive) {
    const spans = document.querySelectorAll('.hamburger span');
    
    if (isActive) {
        spans[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ====== SCROLL SUAVE ======
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ====== HEADER COM SCROLL ======
function initHeaderScroll() {
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Header que some/aparece no scroll
        if (scrollY > lastScrollY && scrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = scrollY;
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick);
}

// ====== ANIMAÇÕES DE SCROLL ======
function initScrollAnimations() {
    // Intersection Observer para animações
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    // Elementos para animar
    const animatedElements = document.querySelectorAll(`
        .product-card,
        .feature,
        .policy-item,
        .contact-link,
        .cta-section,
        .about-text,
        .about-visual
    `);
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Animação do indicador de scroll no hero
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            const rate = scrolled * -0.5;
            scrollIndicator.style.transform = `translateX(-50%) translateY(${rate}px)`;
            
            if (scrolled > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '1';
            }
        });
    }
}

// ====== INTERAÇÕES DOS CARDS DE PRODUTO ====== Excluir para manter o pop-up
function initProductCards() {
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        // Click para abrir link específico do produto
        card.addEventListener('click', function() {
            const productLink = this.getAttribute('data-link');
            if (productLink) {
                window.open(productLink, '_blank');
            }
        });

        card.style.cursor = 'pointer';
    });
}

// ====== LINKS DE CONTATO ======
function initContactLinks() {
    const contactLinks = document.querySelectorAll('.contact-link');
    
    contactLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Adicionar feedback visual
            this.style.transform = 'translateY(-5px) scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Analytics (se necessário)
            const platform = this.href.includes('instagram') ? 'Instagram' : 'Email';
            console.log(`Contato clicado: ${platform}`);
        });
    });
}

// ====== BOTÃO VOLTAR AO TOPO ======
function initScrollToTop() {
    // Criar botão
    const scrollBtn = document.createElement('button');
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
    scrollBtn.setAttribute('aria-label', 'Voltar ao topo');
    
    // Estilos do botão
    const btnStyles = document.createElement('style');
    btnStyles.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--gradient);
            color: white;
            border: none;
            cursor: pointer;
            font-size: 1.2rem;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(99, 102, 241, 0.3);
        }
        
        @media (max-width: 768px) {
            .scroll-to-top {
                bottom: 1rem;
                right: 1rem;
                width: 45px;
                height: 45px;
            }
        }
    `;
    
    if (!document.querySelector('#scroll-btn-styles')) {
        btnStyles.id = 'scroll-btn-styles';
        document.head.appendChild(btnStyles);
    }
    
    document.body.appendChild(scrollBtn);
    
    // Mostrar/esconder botão baseado no scroll
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    // Funcionalidade do botão
    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ====== UTILITÁRIOS ======
function debounce(func, wait) {
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

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ====== ANALYTICS E TRACKING ======
function trackEvent(category, action, label = null) {
    // Placeholder para Google Analytics ou outras ferramentas
    console.log('Event tracked:', { category, action, label });
    
    // Exemplo de implementação com gtag:
    // if (typeof gtag !== 'undefined') {
    //     gtag('event', action, {
    //         event_category: category,
    //         event_label: label
    //     });
    // }
}

// ====== PERFORMANCE MONITORING ======
function initPerformanceMonitoring() {
    // Monitorar tempo de carregamento
    window.addEventListener('load', function() {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log('Page load time:', loadTime + 'ms');
        
        // Enviar para analytics se necessário
        trackEvent('Performance', 'Page Load Time', loadTime);
    });
    
    // Monitorar interações
    document.addEventListener('click', function(e) {
        if (e.target.matches('.btn')) {
            const btnText = e.target.textContent.trim();
            trackEvent('Button', 'Click', btnText);
        }
    });
}

// ====== ACESSIBILIDADE ======
function initAccessibility() {
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-nav');
        }
    });
    
    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-nav');
    });
    
    // Skip links para acessibilidade
    const skipLink = document.createElement('a');
    skipLink.href = '#main';
    skipLink.textContent = 'Pular para o conteúdo principal';
    skipLink.className = 'skip-link sr-only';
    skipLink.addEventListener('focus', () => skipLink.classList.remove('sr-only'));
    skipLink.addEventListener('blur', () => skipLink.classList.add('sr-only'));
    
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Adicionar role main se não existir
    const main = document.querySelector('main') || document.querySelector('.hero');
    if (main && !main.id) {
        main.id = 'main';
    }
}

// ====== ERROR HANDLING ======
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
    // Enviar erro para serviço de monitoramento se necessário
});

window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    // Enviar erro para serviço de monitoramento se necessário
});

// ====== INICIALIZAÇÃO FINAL ======
// Inicializar recursos adicionais quando tudo estiver carregado
window.addEventListener('load', function() {
    initPerformanceMonitoring();
    initAccessibility();
    
    // Adicionar classe de carregamento completo
    document.body.classList.add('fully-loaded');
    
    console.log('🧠 Clínica Criativa - Site carregado com sucesso!');
});