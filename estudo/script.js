// ========================================
// PORTFÓLIO - SCRIPT COMPLETO
// ========================================

// ========================================
// 1. MENU RESPONSIVO (Mobile)
// ========================================

// Opção: Criar um menu hambúrguer para celular
// (Adicione um botão no HTML se quiser usar isso)

// ========================================
// 2. SCROLL SUAVE (Links da navegação)
// ========================================

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                duration: 800
            });
        }
    });
});

// ========================================
// 3. EFEITO DE DIGITAÇÃO NO TÍTULO
// ========================================

// Esconde o título original e faz ele digitar sozinho
function criarEfeitoDigitacao() {
    const titulo = document.querySelector('header h1');
    if (!titulo) return;
    
    const textoOriginal = titulo.textContent;
    titulo.textContent = '';
    titulo.style.opacity = '1';
    
    let index = 0;
    const intervalo = setInterval(() => {
        if (index < textoOriginal.length) {
            titulo.textContent += textoOriginal[index];
            index++;
        } else {
            clearInterval(intervalo);
        }
    }, 100);
}

// Ativa após 1 segundo
setTimeout(criarEfeitoDigitacao, 500);

// ========================================
// 4. ANIMAÇÃO DOS CARDS AO SCROLL
// ========================================

function animarCardsAoScroll() {
    const cards = document.querySelectorAll('.projeto-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `all 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });
}

// Ativa quando a página carregar
document.addEventListener('DOMContentLoaded', animarCardsAoScroll);

// ========================================
// 5. CONTADOR DE VISUALIZAÇÕES (Simulação)
// ========================================

function criarContador() {
    // Conta quantas vezes a página foi visualizada (localStorage)
    let visualizacoes = localStorage.getItem('portfolio_visitas') || 0;
    visualizacoes = parseInt(visualizacoes) + 1;
    localStorage.setItem('portfolio_visitas', visualizacoes);
    
    // Mostra no console (ou pode exibir no rodapé)
    console.log(`📊 Este portfólio foi visualizado ${visualizacoes} vezes!`);
    
    // Opção: adicionar no rodapé
    const footer = document.querySelector('footer p:last-child');
    if (footer) {
        footer.textContent += ` · 👁️ ${visualizacoes} visitas`;
    }
}

document.addEventListener('DOMContentLoaded', criarContador);

// ========================================
// 6. EFEITO DE PARALLAX SUAVE
// ========================================

function parallaxEffect() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const header = document.querySelector('header');
        if (header && scrolled < 500) {
            header.style.transform = `translateY(${scrolled * 0.05}px)`;
            header.style.opacity = 1 - (scrolled / 800);
        }
    });
}

// Ativa apenas se a tela for maior que 768px
if (window.innerWidth > 768) {
    document.addEventListener('DOMContentLoaded', parallaxEffect);
}

// ========================================
// 7. VALIDAÇÃO DE FORMULÁRIO
// ========================================

function validarFormulario() {
    const form = document.querySelector('form');
    if (!form) return;
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nome = document.getElementById('nome');
        const email = document.getElementById('email');
        const mensagem = document.getElementById('mensagem');
        
        let erros = [];
        
        // Valida nome
        if (!nome.value.trim()) {
            erros.push('Nome é obrigatório');
            nome.style.borderColor = '#ef4444';
        } else {
            nome.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        }
        
        // Valida email
        if (!email.value.trim() || !email.value.includes('@')) {
            erros.push('Email inválido');
            email.style.borderColor = '#ef4444';
        } else {
            email.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        }
        
        // Valida mensagem
        if (!mensagem.value.trim() || mensagem.value.length < 10) {
            erros.push('Mensagem deve ter pelo menos 10 caracteres');
            mensagem.style.borderColor = '#ef4444';
        } else {
            mensagem.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        }
        
        if (erros.length > 0) {
            alert('❌ ' + erros.join('\n'));
        } else {
            // Simula envio
            const botao = form.querySelector('button');
            const textoOriginal = botao.textContent;
            botao.textContent = '📤 Enviando...';
            botao.disabled = true;
            
            setTimeout(() => {
                alert('✅ Mensagem enviada com sucesso!');
                form.reset();
                botao.textContent = textoOriginal;
                botao.disabled = false;
            }, 1500);
        }
    });
    
    // Remove erro ao digitar
    document.querySelectorAll('form input, form textarea').forEach(campo => {
        campo.addEventListener('input', function() {
            this.style.borderColor = 'rgba(99, 102, 241, 0.3)';
        });
    });
}

document.addEventListener('DOMContentLoaded', validarFormulario);

// ========================================
// 8. MODO ESCURO/CLARO (TOGGLE)
// ========================================

function criarToggleTema() {
    // Cria o botão automaticamente
    const header = document.querySelector('header');
    if (!header) return;
    
    const toggle = document.createElement('button');
    toggle.innerHTML = '🌙';
    toggle.className = 'toggle-tema';
    toggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: rgba(255,255,255,0.1);
        border: 1px solid rgba(255,255,255,0.15);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        z-index: 999;
        color: #fff;
    `;
    
    toggle.addEventListener('mouseenter', () => {
        toggle.style.transform = 'scale(1.1)';
    });
    toggle.addEventListener('mouseleave', () => {
        toggle.style.transform = 'scale(1)';
    });
    
    let temaEscuro = true;
    
    toggle.addEventListener('click', () => {
        temaEscuro = !temaEscuro;
        const body = document.body;
        
        if (temaEscuro) {
            body.style.background = '#0a0a0f';
            body.style.color = '#e8e8f0';
            toggle.innerHTML = '🌙';
        } else {
            body.style.background = '#f0f0f5';
            body.style.color = '#1a1a2e';
            toggle.innerHTML = '☀️';
            
            // Ajusta cores para o tema claro
            document.querySelectorAll('.container, section, .projeto-card, .contato-info .item, form, table')
                .forEach(el => {
                    el.style.background = 'rgba(0,0,0,0.03)';
                    el.style.borderColor = 'rgba(0,0,0,0.06)';
                });
        }
    });
    
    document.body.appendChild(toggle);
}

// Ativa depois de 2 segundos para não atrapalhar a carga
setTimeout(criarToggleTema, 2000);

// ========================================
// 9. DIGITAÇÃO NO SUBTÍTULO (Efeito extra)
// ========================================

function digitarSubtitulo() {
    const subtitulo = document.querySelector('.subtitle');
    if (!subtitulo) return;
    
    const texto = subtitulo.textContent;
    subtitulo.textContent = '';
    
    let index = 0;
    const intervalo = setInterval(() => {
        if (index < texto.length) {
            subtitulo.textContent += texto[index];
            index++;
        } else {
            clearInterval(intervalo);
        }
    }, 50);
}

// Ativa após o título terminar (2 segundos)
setTimeout(digitarSubtitulo, 2000);

// ========================================
// 10. EFEITO DE PARTÍCULAS NO FUNDO
// ========================================

function criarParticulas() {
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.3;
    `;
    document.body.prepend(canvas);
    
    const ctx = canvas.getContext('2d');
    let width, height;
    let particulas = [];
    
    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);
    
    // Cria partículas
    for (let i = 0; i < 50; i++) {
        particulas.push({
            x: Math.random() * width,
            y: Math.random() * height,
            raio: Math.random() * 1.5 + 0.5,
            velocidadeX: (Math.random() - 0.5) * 0.5,
            velocidadeY: (Math.random() - 0.5) * 0.5
        });
    }
    
    function animar() {
        ctx.clearRect(0, 0, width, height);
        
        particulas.forEach(p => {
            p.x += p.velocidadeX;
            p.y += p.velocidadeY;
            
            if (p.x < 0 || p.x > width) p.velocidadeX *= -1;
            if (p.y < 0 || p.y > height) p.velocidadeY *= -1;
            
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.raio, 0, Math.PI * 2);
            ctx.fillStyle = '#818cf8';
            ctx.fill();
        });
        
        // Conexões entre partículas próximas
        for (let i = 0; i < particulas.length; i++) {
            for (let j = i + 1; j < particulas.length; j++) {
                const dx = particulas[i].x - particulas[j].x;
                const dy = particulas[i].y - particulas[j].y;
                const distancia = Math.sqrt(dx * dx + dy * dy);
                
                if (distancia < 120) {
                    ctx.beginPath();
                    ctx.moveTo(particulas[i].x, particulas[i].y);
                    ctx.lineTo(particulas[j].x, particulas[j].y);
                    ctx.strokeStyle = `rgba(129, 140, 248, ${0.1 * (1 - distancia / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animar);
    }
    
    animar();
}

// Ativa apenas no desktop para performance
if (window.innerWidth > 768) {
    setTimeout(criarParticulas, 3000);
}

// ========================================
// 11. RELÓGIO NO RODAPÉ (Bônus)
// ========================================

function adicionarRelogio() {
    const footer = document.querySelector('footer p:last-child');
    if (!footer) return;
    
    const relogio = document.createElement('span');
    relogio.style.marginLeft = '10px';
    relogio.style.color = '#5a5a6a';
    footer.appendChild(relogio);
    
    function atualizarRelogio() {
        const agora = new Date();
        const horas = String(agora.getHours()).padStart(2, '0');
        const minutos = String(agora.getMinutes()).padStart(2, '0');
        relogio.textContent = `🕐 ${horas}:${minutos}`;
    }
    
    atualizarRelogio();
    setInterval(atualizarRelogio, 30000);
}

setTimeout(adicionarRelogio, 3000);

// ========================================
// 12. EFEITO DE CLIQUE NOS CARDS (Ripple)
// ========================================

function criarEfeitoRipple() {
    document.querySelectorAll('.projeto-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(129, 140, 248, 0.15);
                transform: scale(0);
                animation: rippleAnim 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
            
            // Adiciona o style da animação se não existir
            if (!document.getElementById('ripple-style')) {
                const style = document.createElement('style');
                style.id = 'ripple-style';
                style.textContent = `
                    @keyframes rippleAnim {
                        from { transform: scale(0); opacity: 1; }
                        to { transform: scale(2); opacity: 0; }
                    }
                `;
                document.head.appendChild(style);
            }
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

document.addEventListener('DOMContentLoaded', criarEfeitoRipple);

// ========================================
// 13. FERRAMENTAS PARA DESENVOLVEDORES (Console)
// ========================================

console.log('%c🚀 Portfólio de Dennis', 'font-size: 24px; font-weight: bold; color: #818cf8;');
console.log('%c💻 Desenvolvedor em formação', 'font-size: 14px; color: #c4c4dc;');
console.log('%c📂 Confira meu projeto SmartStudy: https://smartstudy-505a2.web.app/', 'font-size: 14px; color: #a78bfa;');

// ========================================
// 14. ANIMAÇÃO DE CARREGAMENTO (Loading)
// ========================================

function criarLoading() {
    // Adiciona um loader sutil
    const loader = document.createElement('div');
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: #0a0a0f;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        transition: opacity 0.8s ease;
        font-size: 2rem;
        font-weight: 900;
        background: linear-gradient(135deg, #818cf8, #c084fc);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    `;
    loader.textContent = '● ● ●';
    
    document.body.prepend(loader);
    
    // Remove após o carregamento
    window.addEventListener('load', () => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.remove();
        }, 800);
    });
}

criarLoading();

// ========================================
// FIM DOS SCRIPTS
// ========================================
console.log('✅ Portfólio carregado com sucesso!');