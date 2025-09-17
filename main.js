// main.js - PSR EMBALAGENS Landing Page JavaScript - Versão Otimizada

class PSREmbalagens {
    constructor() {
        this.isEmailJSLoaded = false;
        this.formSubmitted = false;
        this.init();
    }

    // Inicialização principal
    init() {
        // Aguardar DOM estar pronto
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeAll());
        } else {
            this.initializeAll();
        }
    }

    // Inicializar todas as funcionalidades
    initializeAll() {
        try {
            this.initPageLoading();
            this.initMobileMenu();
            this.initSmoothScrolling();
            this.initHeaderScrollEffect();
            this.initAnimations();
            this.initCounterAnimations();
            this.initSchemaOrg();
            this.initAboutCarousel();
            this.initFormHandling();
            this.initFAQ();
            this.initPhoneMask();
            this.loadEmailJS();
        } catch (error) {
            console.error('Erro na inicialização:', error);
        }
    }

    // Page loading animation
    initPageLoading() {
        document.body.style.opacity = '0';
        
        window.addEventListener('load', () => {
            document.body.style.opacity = '1';
            document.body.style.transition = 'opacity 0.3s ease';
        });
    }

    // Mobile Menu - Unificado
    initMobileMenu() {
        // REMOVER TODO ESTE MÉTODO - está causando conflito
        // O menu mobile já está funcionando corretamente no final do arquivo
        return;
    }

    // Smooth Scrolling
    initSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                
                const targetId = anchor.getAttribute('href');
                const target = document.querySelector(targetId);
                
                if (target) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Header scroll effect
    initHeaderScrollEffect() {
        const header = document.querySelector('header');
        if (!header) return;

        let lastScrollY = window.scrollY;
        let isScrolling = false;
        
        // Cache dos elementos para evitar consultas DOM repetidas
        const navLinks = header.querySelectorAll('a:not(.social-links a)');
        
        // Usar CSS classes ao invés de inline styles
        header.classList.add('header-transition');
        
        const handleScroll = () => {
            if (!isScrolling) {
                // Usar requestAnimationFrame para otimizar performance
                requestAnimationFrame(() => {
                    const currentScrollY = window.scrollY;
                    
                    // Batch todas as mudanças de classe
                    if (currentScrollY > 100) {
                        header.classList.add('header-scrolled');
                    } else {
                        header.classList.remove('header-scrolled');
                    }
                    
                    if (currentScrollY > lastScrollY && currentScrollY > 200) {
                        header.classList.add('header-hidden');
                    } else {
                        header.classList.remove('header-hidden');
                    }
                    
                    lastScrollY = currentScrollY;
                    isScrolling = false;
                });
            }
            isScrolling = true;
        };

        // Aumentar debounce para reduzir execuções
        window.addEventListener('scroll', this.debounce(handleScroll, 16), { passive: true });
        
        // Aplicar estilos iniciais via CSS class
        navLinks.forEach(link => {
            link.classList.add('nav-link-styled');
        });
    }

    // Animations
    initAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.animation = `fadeInUp 0.6s ease-out forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar todos os cards de produtos
        document.querySelectorAll('.produto-card').forEach((card, index) => {
            card.style.animationDelay = `${(index * 0.1) + 0.1}s`;
            observer.observe(card);
        });
        
        // Observar outros elementos animados
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    }

    // Counter animations
    initCounterAnimations() {
        if (!('IntersectionObserver' in window)) return;

        const animateCounter = (element, target) => {
            if (!element || isNaN(target)) return;
            
            let current = 0;
            const increment = target / 100;
            const duration = 2000;
            const stepTime = duration / 100;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                const displayValue = Math.floor(current);
                element.textContent = displayValue + '+';
            }, stepTime);
        };

        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const numberElement = entry.target.querySelector('.stat-number');
                    if (numberElement) {
                        const targetText = numberElement.textContent.replace('+', '');
                        const target = parseInt(targetText);
                        
                        if (!isNaN(target)) {
                            numberElement.textContent = '0+';
                            animateCounter(numberElement, target);
                        }
                    }
                    statObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        document.querySelectorAll('.stat-item').forEach(stat => {
            statObserver.observe(stat);
        });
    }

    // Schema.org - Otimizado
    initSchemaOrg() {
        // Verificar se já existe schema específico da PSR
        if (document.querySelector('script[type="application/ld+json"][data-psr="true"]')) {
            return;
        }
        
        const schemaData = {
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "PSR EMBALAGENS - Embalagens Brasília",
            "description": "Embalagens personalizadas e pronta entrega em Brasília DF. Especialistas em embalagens para delivery, festas e eventos.",
            "url": "https://psrembalagens.com.br",
            "telephone": "+55-61-99317-7107",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "SIA Trecho 10,05 PAV B-10B, BOX 07",
                "addressLocality": "Brasília",
                "addressRegion": "DF",
                "postalCode": "71200-100",
                "addressCountry": "BR"
            },
            "geo": {
                "@type": "GeoCoordinates",
                "latitude": -15.788638,
                "longitude": -47.946421
            },
            "openingHours": [
                "Mo-Fr 05:00-17:00",
                "Sa 05:00-12:00"
            ],
            "sameAs": [
                "https://www.facebook.com/profile.php?id=61578739646226",
                "https://www.instagram.com/psrembalagens/"
            ]
        };
        
        const schemaScript = document.createElement('script');
        schemaScript.type = 'application/ld+json';
        schemaScript.setAttribute('data-psr', 'true');
        schemaScript.textContent = JSON.stringify(schemaData, null, 2);
        
        document.head.appendChild(schemaScript);
        console.log('✅ Schema.org PSR injected');
    }

    // Carousel - Otimizado
    initAboutCarousel() {
        const carousel = document.getElementById('about-carousel');
        if (!carousel) return;
        
        const items = carousel.querySelectorAll('.carousel-item');
        const indicators = carousel.querySelectorAll('.carousel-indicator');
        const prevButton = carousel.querySelector('.carousel-prev');
        const nextButton = carousel.querySelector('.carousel-next');
        
        if (items.length === 0) return;
        
        let currentIndex = 0;
        let interval;
        
        const showSlide = (index) => {
            if (index < 0) index = items.length - 1;
            if (index >= items.length) index = 0;
            
            items.forEach(item => item.classList.remove('active'));
            indicators.forEach(indicator => indicator.classList.remove('active'));
            
            items[index].classList.add('active');
            if (indicators[index]) indicators[index].classList.add('active');
            
            currentIndex = index;
        };
        
        const nextSlide = () => showSlide(currentIndex + 1);
        const prevSlide = () => showSlide(currentIndex - 1);
        
        const startCarousel = () => {
            if (interval) clearInterval(interval);
            interval = setInterval(nextSlide, 5000);
        };
        
        const stopCarousel = () => {
            if (interval) clearInterval(interval);
        };
        
        // Event listeners
        nextButton?.addEventListener('click', () => {
            nextSlide();
            stopCarousel();
            startCarousel();
        });
        
        prevButton?.addEventListener('click', () => {
            prevSlide();
            stopCarousel();
            startCarousel();
        });
        
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                showSlide(index);
                stopCarousel();
                startCarousel();
            });
        });
        
        carousel.addEventListener('mouseenter', stopCarousel);
        carousel.addEventListener('mouseleave', startCarousel);
        
        showSlide(0);
        startCarousel();
    }

    // Form Handling - Sistema Unificado
    initFormHandling() {
        // Tentar encontrar o formulário (suporte a IDs diferentes)
        const form = document.getElementById('contact-form') || 
                    document.getElementById('contactForm') ||
                    document.querySelector('form[data-contact="true"]');
        
        if (!form) {
            console.warn('Formulário de contato não encontrado');
            return;
        }

        form.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Envio do formulário
    async handleFormSubmit(e) {
        e.preventDefault();
        
        if (this.formSubmitted) {
            this.showMessage('Aguarde um momento antes de enviar novamente.', 'warning');
            return;
        }

        const form = e.target;
        const formData = new FormData(form);
        
        // Coletar dados (suporte a diferentes nomes de campos)
        const data = {
            nome: formData.get('nome') || formData.get('name') || '',
            email: formData.get('email') || '',
            telefone: formData.get('telefone') || formData.get('phone') || '',
            mensagem: formData.get('mensagem') || formData.get('descricao') || formData.get('message') || ''
        };

        // Validação
        const validation = this.validateFormData(data);
        if (!validation.valid) {
            this.showMessage(validation.message, 'error');
            return;
        }

        // Preparar envio
        const submitButton = form.querySelector('button[type="submit"]');
        const originalText = submitButton.innerHTML;
        this.setButtonLoading(submitButton, true);
        this.formSubmitted = true;

        try {
            // Tentar EmailJS primeiro
            if (this.isEmailJSLoaded) {
                await this.sendEmailJS(data);
            } else {
                // Fallback para WhatsApp
                this.sendWhatsApp(data);
            }
            
            this.showSuccessMessage();
            form.reset();
            
        } catch (error) {
            console.error('Erro no envio:', error);
            this.showMessage('Erro ao enviar mensagem. Tente novamente.', 'error');
        } finally {
            this.setButtonLoading(submitButton, false, originalText);
            setTimeout(() => { this.formSubmitted = false; }, 3000);
        }
    }

    // Validação unificada
    validateFormData(data) {
        if (!data.nome || !data.email || !data.telefone || !data.mensagem) {
            return { valid: false, message: 'Todos os campos são obrigatórios.' };
        }
        
        if (data.nome.trim().split(' ').length < 2) {
            return { valid: false, message: 'Por favor, insira seu nome completo.' };
        }
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            return { valid: false, message: 'Email inválido.' };
        }
        
        if (data.mensagem.length < 10) {
            return { valid: false, message: 'A mensagem deve ter pelo menos 10 caracteres.' };
        }
        
        return { valid: true };
    }

    // EmailJS
    async loadEmailJS() {
        try {
            const publicKey = document.querySelector('meta[name="emailjs-public-key"]')?.content;
            const serviceId = document.querySelector('meta[name="emailjs-service-id"]')?.content;
            const templateId = document.querySelector('meta[name="emailjs-template-id"]')?.content;
            
            if (typeof emailjs !== 'undefined' && publicKey) {
                emailjs.init(publicKey);
                this.emailjsConfig = { serviceId, templateId };
                this.isEmailJSLoaded = true;
                console.log('✅ EmailJS carregado');
            }
        } catch (error) {
            console.warn('EmailJS não disponível, usando WhatsApp como fallback');
        }
    }

    async sendEmailJS(data) {
        const templateParams = {
            from_name: data.nome,
            from_email: data.email,
            phone: data.telefone,
            message: data.mensagem,
            reply_to: data.email
        };
        
        return emailjs.send(
            this.emailjsConfig.serviceId,
            this.emailjsConfig.templateId,
            templateParams
        );
    }

    // WhatsApp fallback
    sendWhatsApp(data) {
        const message = `Olá! Meu nome é ${data.nome}.

        📧 Email: ${data.email}
        📞 Telefone: ${data.telefone}

        💬 Mensagem: ${data.mensagem}

        Enviei este contato através do site da PSR Embalagens.`;

        const whatsappURL = `https://wa.me/5561993177107?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    }

    // FAQ
    initFAQ() {
        window.toggleFAQ = (number) => {
            const answer = document.getElementById(`faq-answer-${number}`);
            const icon = document.getElementById(`faq-icon-${number}`);
            
            if (!answer || !icon) return;
            
            // Fechar outras FAQs
            for (let i = 1; i <= 10; i++) {
                if (i !== number) {
                    const otherAnswer = document.getElementById(`faq-answer-${i}`);
                    const otherIcon = document.getElementById(`faq-icon-${i}`);
                    
                    if (otherAnswer && otherIcon) {
                        otherAnswer.classList.add('hidden');
                        otherIcon.classList.remove('ri-subtract-line', 'rotate-180');
                        otherIcon.classList.add('ri-add-line');
                    }
                }
            }
            
            // Toggle FAQ atual
            if (answer.classList.contains('hidden')) {
                answer.classList.remove('hidden');
                icon.classList.remove('ri-add-line');
                icon.classList.add('ri-subtract-line', 'rotate-180');
            } else {
                answer.classList.add('hidden');
                icon.classList.remove('ri-subtract-line', 'rotate-180');
                icon.classList.add('ri-add-line');
            }
            
            // Analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'click', {
                    'event_category': 'engagement',
                    'event_label': `faq_${number}`
                });
            }
        };
    }

    // Máscara de telefone
    initPhoneMask() {
        const phoneInput = document.getElementById('telefone') || 
                          document.querySelector('input[name="telefone"]') ||
                          document.querySelector('input[type="tel"]');
        
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length >= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 7) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                }
                e.target.value = value;
            });
        }
    }

    // Utility Methods
    setButtonLoading(button, loading, originalText = '') {
        if (loading) {
            button.innerHTML = '<i class="ri-loader-4-line animate-spin mr-2"></i>Enviando...';
            button.disabled = true;
        } else {
            button.innerHTML = originalText || button.innerHTML;
            button.disabled = false;
        }
    }

    showSuccessMessage() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white p-8 rounded-lg shadow-xl max-w-md mx-4 text-center">
                <div class="mb-4">
                    <i class="ri-check-double-line text-5xl text-green-500"></i>
                </div>
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Mensagem Enviada!</h3>
                <p class="text-gray-600 mb-6">
                    Obrigado pelo seu contato! Recebemos suas informações e entraremos em contato assim que possível.
                </p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        class="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors">
                    Fechar
                </button>
            </div>
        `;
        
        document.body.appendChild(modal);
        setTimeout(() => modal.remove(), 5000);
    }

    showMessage(message, type = 'info') {
        const colors = {
            error: 'bg-red-500',
            warning: 'bg-yellow-500',
            success: 'bg-green-500',
            info: 'bg-blue-500'
        };

        const icons = {
            error: 'ri-error-warning-line',
            warning: 'ri-alert-line',
            success: 'ri-check-line',
            info: 'ri-information-line'
        };

        const alertDiv = document.createElement('div');
        alertDiv.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 text-white ${colors[type]}`;
        alertDiv.innerHTML = `
            <div class="flex items-center">
                <i class="${icons[type]} mr-2"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-4 hover:text-gray-200">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(alertDiv);
        setTimeout(() => alertDiv.remove(), 5000);
    }

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

// Inicializar aplicação
const psrApp = new PSREmbalagens();

// Exportar para uso global se necessário
window.PSREmbalagens = psrApp;

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const mobileClose = document.getElementById('mobile-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link, .mobile-catalog-btn');

    // Abrir menu
    mobileMenuBtn.addEventListener('click', function() {
        mobileOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Previne scroll
    });

    // Fechar menu
    function closeMenu() {
        mobileOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restaura scroll
    }

    mobileClose.addEventListener('click', closeMenu);

    // Fechar ao clicar em link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fechar ao clicar fora do conteúdo
    mobileOverlay.addEventListener('click', function(e) {
        if (e.target === mobileOverlay) {
            closeMenu();
        }
    });

    // Fechar com tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileOverlay.classList.contains('active')) {
            closeMenu();
        }
    });
});

// Mobile Menu - Extraído do main.js 
class MobileMenu { 
    constructor() { 
        this.init(); 
    } 

    init() { 
        if (document.readyState === 'loading') { 
            document.addEventListener('DOMContentLoaded', () => this.initMobileMenu()); 
        } else { 
            this.initMobileMenu(); 
        } 
    } 

    initMobileMenu() { 
        const mobileMenu = document.getElementById('mobile-menu'); 
        const navLinks = document.querySelector('.nav-links'); 
    
        if (!mobileMenu || !navLinks) return; 
    
        mobileMenu.addEventListener('click', () => { 
            const isActive = navLinks.classList.contains('active'); 
            
            if (isActive) { 
                navLinks.classList.remove('active'); 
                mobileMenu.classList.remove('active'); 
            } else { 
                navLinks.classList.add('active'); 
                mobileMenu.classList.add('active'); 
            } 
        }); 
        
        // Fechar menu ao clicar no X (pseudo-elemento)
        navLinks.addEventListener('click', (e) => {
            const rect = navLinks.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const clickY = e.clientY - rect.top;
            
            // Área do botão X (canto superior direito)
            if (clickX > rect.width - 80 && clickY < 80) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    
        // Fechar menu ao clicar em links
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    navLinks.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    
        // Gerenciar resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
        
        // Fechar com tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        });
    } 
} 

// Inicializar Mobile Menu 
new MobileMenu();

// Registrar Service Worker para cache
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('✅ Service Worker registrado:', registration.scope);
            })
            .catch(function(error) {
                console.log('❌ Falha ao registrar Service Worker:', error);
            });
    });
}