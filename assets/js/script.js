document.addEventListener("DOMContentLoaded", function() {
    console.log("Página carregada com sucesso!");
});


//Botão Aréa do cliente
document.addEventListener("DOMContentLoaded", function () {
    const btnCliente = document.querySelector(".btn-cliente");

    if (btnCliente) {
        btnCliente.addEventListener("click", function (event) {
            event.preventDefault(); // Impede a navegação caso o botão tenha um link
            alert("Função ainda não disponível");
        });
    }
});


// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    const btnOrcamento = document.querySelectorAll(".btn-orcamento");

    btnOrcamento.forEach(function (botao) {
        botao.addEventListener("click", function (event) {
            event.preventDefault();

            const telefone = "5511963318992";
            const mensagem = "Olá, gostaria de receber um orçamento da Rsync";
            const url = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
            
            window.open(url, "_blank"); // Abre o WhatsApp diretamente
        });
    });
});



//MENU HAMBURGUER
document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector(".menu-toggle");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-menu li a");

    // Função para alternar o menu ao clicar no hambúrguer
    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("active");
        menuToggle.classList.toggle("open", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    // Fechar o menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
            menuToggle.classList.remove("open");
            menuToggle.textContent = "☰";
        });
    });
});


// SCROLL: header dinâmico, barra de progresso e botão voltar ao topo
document.addEventListener("DOMContentLoaded", function () {
    const progressBar = document.querySelector(".scroll-progress");
    const backToTop = document.querySelector(".back-to-top");
    let ticking = false;

    function updateOnScroll() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        document.body.classList.toggle("scrolled", scrollTop > 60);

        if (progressBar) {
            progressBar.style.width = progress + "%";
        }

        if (backToTop) {
            backToTop.classList.toggle("visible", scrollTop > 400);
        }

        ticking = false;
    }

    window.addEventListener("scroll", function () {
        if (!ticking) {
            requestAnimationFrame(updateOnScroll);
            ticking = true;
        }
    });

    updateOnScroll();

    if (backToTop) {
        backToTop.addEventListener("click", function () {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});


// SCROLLSPY: destaca no menu o link da seção visível
document.addEventListener("DOMContentLoaded", function () {
    const sectionIds = ["home", "services", "specialties", "about", "footer"];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    const navLinks = document.querySelectorAll(".nav-menu a");

    if (!sections.length || !navLinks.length) return;

    const spy = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active"));
                const activeLink = document.querySelector('.nav-menu a[href="#' + entry.target.id + '"]');
                if (activeLink) activeLink.classList.add("active");
            }
        });
    }, { rootMargin: "-45% 0px -50% 0px" });

    sections.forEach(section => spy.observe(section));
});


// SCROLL REVEAL: anima elementos ".reveal" quando entram na tela
document.addEventListener("DOMContentLoaded", function () {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const STEP_MS = 90;
    const MAX_STEPS = 4;

    // Calcula a posição de cada elemento dentro do seu grupo de irmãos ".reveal"
    // para escalonar a entrada (ex.: os 4 cards de Serviços um após o outro).
    const groupCount = new Map();
    revealEls.forEach(function (el) {
        const parent = el.parentElement;
        const step = groupCount.get(parent) || 0;
        el.dataset.revealStep = Math.min(step, MAX_STEPS);
        groupCount.set(parent, step + 1);
    });

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;

            const el = entry.target;
            const delayMs = Number(el.dataset.revealStep || 0) * STEP_MS;
            const durationMs = (parseFloat(getComputedStyle(el).transitionDuration) || 0.6) * 1000;

            // O atraso é aplicado só durante a entrada (inline, no próprio elemento)
            // e removido depois, para nunca atrasar transições futuras como o hover.
            el.style.transitionDelay = delayMs + "ms";
            el.classList.add("is-visible");

            window.setTimeout(function () {
                el.style.transitionDelay = "";
            }, delayMs + durationMs + 60);

            observer.unobserve(el);
        });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));
});


//DESTAQUE NA FUNÇÃO DE SMOOTH NO HEADER E FOOTER
document.addEventListener("DOMContentLoaded", function () {
    const navLinks = document.querySelectorAll(".nav-menu a, .footer-nav a"); // Captura links do HEADER e FOOTER

    navLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            event.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetId === "home") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: "smooth" });

                // Aplicar o efeito de esmaecimento apenas em "Sobre" e "Contato"
                if (targetId === "about" || targetId === "footer" || targetId === "contact") {
                    targetSection.classList.add("fade-highlight");
                    setTimeout(() => {
                        targetSection.classList.remove("fade-highlight");
                    }, 1500);
                }
            }
        });
    });
});
