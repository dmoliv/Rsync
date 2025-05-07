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
        navMenu.classList.toggle("active");
    });

    // Fechar o menu ao clicar em qualquer link
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navMenu.classList.remove("active");
        });
    });
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
