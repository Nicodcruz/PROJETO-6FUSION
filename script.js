// Função para o botão "Saiba Mais" da seção principal
function saibaMais() {
    alert("Você será redirecionado para saber mais sobre nossos serviços.");
    // window.location.href = "servicos.html";
}

// Função para o botão "Comece já" da nova seção de tipos de site
function saibaMaisTipos() {
    alert("Excelente! Entre em contato conosco para iniciarmos seu projeto.");
    // window.location.href = "contato.html";
}

// Função para o menu hamburguer em dispositivos móveis
function toggleMenu() {
    const navList = document.querySelector("nav ul");
    navList.classList.toggle("active");
}

// Lógica para o carrossel de serviços (ativado apenas em mobile)
document.addEventListener('DOMContentLoaded', () => {
    const servicosGrid = document.querySelector('.servicos-grid');
    const servicosWrapper = document.querySelector('.servicos-carrossel-wrapper');
    const mediaQueryMobile = window.matchMedia('(max-width: 768px)');

    let scrollInterval;
    let currentScroll = 0;
    const scrollSpeed = 0.5;
    let originalItems = Array.from(servicosGrid.children);
    let originalItemsCount = originalItems.length;
    let originalScrollWidth = 0;

    function calculateOriginalScrollWidth() {
        originalScrollWidth = 0;
        originalItems.forEach(item => {
            originalScrollWidth += item.offsetWidth + 20;
        });
        originalScrollWidth += 20;
    }

    function startCarousel() {
        if (!servicosGrid || !servicosWrapper) return;
        stopCarousel();

        originalItems = Array.from(servicosGrid.children);
        originalItemsCount = originalItems.length;

        while (servicosGrid.children.length > originalItemsCount) {
            servicosGrid.removeChild(servicosGrid.lastChild);
        }

        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            servicosGrid.appendChild(clone);
        });

        calculateOriginalScrollWidth();
        currentScroll = servicosWrapper.scrollLeft;

        scrollInterval = setInterval(() => {
            currentScroll += scrollSpeed;
            if (currentScroll >= originalScrollWidth) {
                currentScroll -= originalScrollWidth;
            }
            servicosWrapper.scrollLeft = currentScroll;
        }, 20);
    }

    function stopCarousel() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            servicosWrapper.scrollLeft = 0;

            originalItems = Array.from(servicosGrid.children).slice(0, originalItemsCount);
            while (servicosGrid.children.length > originalItems.length) {
                servicosGrid.removeChild(servicosGrid.lastChild);
            }
        }
    }

    function handleCarouselLogic() {
        if (mediaQueryMobile.matches) {
            startCarousel();
        } else {
            stopCarousel();
        }
    }

    handleCarouselLogic();
    mediaQueryMobile.addListener(handleCarouselLogic);


    // --- LÓGICA PARA A TROCA DE IMAGEM NA NOVA SEÇÃO (site-creation-showcase) ---

    // A imagem que será alterada
    const siteShowcaseImage = document.getElementById('site-showcase-image');
    // Todos os botões de seleção de tipo de site
    const typeButtons = document.querySelectorAll('.site-creation-showcase .type-button');

    // Mapeamento de tipos de site para caminhos de imagem DENTRO DA PASTA 'images/showcase/'
    const imageMap = {
        'loja-online': 'images/showcase/loja-online.png', // Caminho da imagem de Loja Online
        'servicos': 'images/showcase/servicos.png',
        'portfolio': 'images/showcase/portfolio.png',
        'blog': 'images/showcase/blog.png',
        'consultor': 'images/showcase/consultor.png',
        'restaurante': 'images/showcase/restaurante.png',
    };

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove a classe 'active' de todos os botões e adiciona ao botão clicado
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const type = button.dataset.type; // Pega o valor do atributo data-type
            const newImageSrc = imageMap[type]; // Obtém o caminho da nova imagem

            if (newImageSrc) {
                siteShowcaseImage.src = newImageSrc; // Altera a imagem
                siteShowcaseImage.alt = `Exemplo de site tipo ${type.replace('-', ' ')}`; // Atualiza o alt
            } else {
                console.warn(`Imagem não encontrada para o tipo: ${type}`);
            }
        });
    });

    // Garante que a imagem inicial seja a da 'loja-online' ao carregar a página
    // (A menos que já esteja definida no HTML)
    if (siteShowcaseImage && siteShowcaseImage.src.endsWith('loja-online.jpg') === false && imageMap['loja-online']) {
         siteShowcaseImage.src = imageMap['loja-online'];
         siteShowcaseImage.alt = "Exemplo de Loja Online";
    }
});