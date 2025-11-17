// ==========================================
// SENHORITA EXECUTIVA - JAVASCRIPT
// Funcionalidades: Scroll suave, animações, interações
// ==========================================

// ========== AGUARDAR CARREGAMENTO DO DOM ==========
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== SCROLL SUAVE PARA NAVEGAÇÃO ==========
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verifica se é um link de âncora interna
            if (href.startsWith('#')) {
                e.preventDefault();
                
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    // Fecha o menu mobile se estiver aberto
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }
                    
                    // Scroll suave até a seção
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ========== BOTÃO "VER COLEÇÃO" NO HERO ==========
    const btnHero = document.querySelector('.btn-hero');
    
    if (btnHero) {
        btnHero.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);
                
                if (targetSection) {
                    const navbarHeight = document.querySelector('.navbar').offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
    
    // ========== NAVBAR: MUDAR ESTILO AO ROLAR ==========
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Adiciona sombra na navbar ao rolar
        if (scrollTop > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // ========== ANIMAÇÕES DE SCROLL (INTERSECTION OBSERVER) ==========
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);
    
    // Observa todos os elementos com atributo data-aos
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
    
    // ========== FORMULÁRIO DE CONTATO ==========
    // ========== FORMULÁRIO DE CONTATO ==========
const contatoForm = document.querySelector('.contato-form');

if (contatoForm) {
    contatoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();
        
        if (!nome || !email || !telefone || !mensagem) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // monta a mensagem que vai pro WhatsApp
        const whatsappNumber = '5531995420062'; // DDD + número (exemplo)
        const whatsappMessage =
            `Olá! Meu nome é ${nome}.` +
            `\n\nMensagem: ${mensagem}` +
            `\n\nTelefone: ${telefone}` +
            `\nE-mail: ${email}`;

        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

        // abre o WhatsApp em outra aba/janela
        window.open(whatsappURL, '_blank');

        // opcional: limpa o formulário depois
        contatoForm.reset();
    });
}

    
    // ========== ADICIONA CLASSE ACTIVE NO MENU AO ROLAR ==========
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', function() {
        const scrollY = window.pageYOffset;
        const navbarHeight = navbar.offsetHeight;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - navbarHeight - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                // Remove active de todos os links
                navLinks.forEach(link => {
                    link.classList.remove('active');
                });
                
                // Adiciona active no link correspondente
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
    
    // ========== LAZY LOADING PARA IMAGENS ==========
    const images = document.querySelectorAll('img');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Se a imagem tiver data-src, carrega ela
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
    
    // ========== EFEITO PARALLAX LEVE NO HERO ==========
    const heroSection = document.querySelector('.hero-section');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.backgroundPositionY = scrolled * parallaxSpeed + 'px';
            }
        });
    }
    
    // ========== CONTADOR DE ANIMAÇÃO ==========
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start);
            }
        }, 16);
    }
    
    // ========== SMOOTH REVEAL PARA CARDS DE PRODUTOS ==========
    const produtoCards = document.querySelectorAll('.produto-card');
    
    produtoCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });
    
    // ========== TOOLTIP BOOTSTRAP (SE NECESSÁRIO) ==========
    // Ativa tooltips do Bootstrap se houver no HTML
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
    
    // ========== LOG DE INICIALIZAÇÃO ==========
    console.log('✨ Senhorita Executiva - Site carregado com sucesso!');
    
});

// ========== FUNÇÃO PARA SCROLL TO TOP ==========
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ========== DETECTAR ORIENTAÇÃO DO DISPOSITIVO ==========
window.addEventListener('orientationchange', function() {
    // Recarrega animações ou ajusta layout se necessário
    console.log('Orientação alterada');
});

// ========== PREVENÇÃO DE ERRO DE IMAGENS ==========
// Adiciona uma imagem de fallback caso alguma imagem não carregue
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        console.log('Erro ao carregar imagem:', e.target.src);
    }
}, true);
