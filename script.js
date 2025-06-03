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
            originalScrollWidth += item.offsetWidth + 20; // 20px is the gap
        });
        originalScrollWidth += 20; // Add last gap
    }

    function startCarousel() {
        if (!servicosGrid || !servicosWrapper) return;
        stopCarousel();

        originalItems = Array.from(servicosGrid.children);
        originalItemsCount = originalItems.length;

        // Clear existing clones if any
        while (servicosGrid.children.length > originalItemsCount) {
            servicosGrid.removeChild(servicosGrid.lastChild);
        }

        // Clone items to create an infinite loop effect
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            servicosGrid.appendChild(clone);
        });
        originalItems.forEach(item => { // Clone again for smoother transition back
            const clone = item.cloneNode(true);
            servicosGrid.appendChild(clone);
        });

        calculateOriginalScrollWidth();
        currentScroll = servicosWrapper.scrollLeft;

        scrollInterval = setInterval(() => {
            currentScroll += scrollSpeed;
            if (currentScroll >= servicosWrapper.scrollWidth / 2) { // Reset when halfway through cloned content
                currentScroll -= (servicosWrapper.scrollWidth / 2);
            }
            servicosWrapper.scrollLeft = currentScroll;
        }, 20);
    }

    function stopCarousel() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            servicosWrapper.scrollLeft = 0;

            // Remove cloned items
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


    // --- LÓGICA PARA A TROCA DE IMAGEM NA SEÇÃO "Liberdade para criar um site" ---

    const siteShowcaseImage = document.getElementById('site-showcase-image');
    const typeButtons = document.querySelectorAll('.site-creation-showcase .type-button');

    const imageMapSiteCreation = { // Renomeado para evitar conflito
        'loja-online': 'images/showcase/loja-online.png',
        'servicos': 'images/showcase/servicos.png',
        'portfolio': 'images/showcase/portfolio.png',
        'blog': 'images/showcase/blog.png',
        'consultor': 'images/showcase/consultor.png',
        'restaurante': 'images/showcase/restaurante.png',
    };

    typeButtons.forEach(button => {
        button.addEventListener('click', () => {
            typeButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const type = button.dataset.type;
            const newImageSrc = imageMapSiteCreation[type];

            if (newImageSrc) {
                siteShowcaseImage.src = newImageSrc;
                siteShowcaseImage.alt = `Exemplo de site tipo ${type.replace('-', ' ')}`;
            } else {
                console.warn(`Imagem não encontrada para o tipo: ${type}`);
            }
        });
    });

    if (siteShowcaseImage && !siteShowcaseImage.src.includes('loja-online.png') && imageMapSiteCreation['loja-online']) {
        siteShowcaseImage.src = imageMapSiteCreation['loja-online'];
        siteShowcaseImage.alt = "Exemplo de Loja Online";
    }

    // --- LÓGICA PARA A NOVA SEÇÃO "Visão Geral" ---

    const visaogeralOptionItems = document.querySelectorAll('.visao-geral .option-item');
    const visaogeralImages = document.querySelectorAll('.image-display .visao-geral-image');

    // Mapeamento direto do data-content do item de opção para o data-image da imagem
    const visaogeralImageMap = {
        'tudo-em-um': 'tudo-em-um',
        'conecte-contas': 'conecte-contas',
        'escreva-emails': 'escreva-emails',
        'acesse-arquivos': 'acesse-arquivos'
    };

    visaogeralOptionItems.forEach(item => {
        item.addEventListener('click', () => {
            // Remove 'active' de todos os itens de opção
            visaogeralOptionItems.forEach(opt => opt.classList.remove('active'));
            // Adiciona 'active' ao item clicado
            item.classList.add('active');

            const contentType = item.dataset.content;
            const targetImageDataType = visaogeralImageMap[contentType];

            // Esconde todas as imagens do Outlook
            visaogeralImages.forEach(img => img.classList.remove('active'));

            // Mostra a imagem correspondente
            if (targetImageDataType) {
                const targetImage = document.querySelector(`.visao-geral-image[data-image="${targetImageDataType}"]`);
                if (targetImage) {
                    targetImage.classList.add('active');
                } else {
                    console.warn(`Imagem com data-image="${targetImageDataType}" não encontrada.`);
                }
            }
        });
    });

    // Inicializa a seção "Visão Geral" ativando o primeiro item e sua imagem
    // Garante que "Tudo em um só lugar" e sua imagem estejam ativos ao carregar
    if (visaogeralOptionItems.length > 0) {
        visaogeralOptionItems[0].click(); // Simula um clique no primeiro item para ativar
    }
});