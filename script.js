function saibaMais() {
    alert("Você será redirecionado para saber mais sobre nossos serviços.");
    // window.location.href = "servicos.html";
}

function toggleMenu() {
    const navList = document.querySelector("nav ul");
    navList.classList.toggle("active");
}

// Lógica para o carrossel de serviços (apenas mobile)
document.addEventListener('DOMContentLoaded', () => {
    const servicosGrid = document.querySelector('.servicos-grid');
    const servicosWrapper = document.querySelector('.servicos-carrossel-wrapper');
    const mediaQueryMobile = window.matchMedia('(max-width: 768px)');

    let scrollInterval;
    let currentScroll = 0;
    const scrollSpeed = 0.5; // Velocidade da rolagem (pixels por frame). Ajuste se quiser mais rápido/lento.
    const originalItems = Array.from(servicosGrid.children); // Guarda os itens originais
    const originalItemsCount = originalItems.length;

    // A largura de um único conjunto de itens originais
    let originalScrollWidth = 0;

    function calculateOriginalScrollWidth() {
        originalScrollWidth = 0;
        // Calcula a largura total dos itens originais, incluindo gap.
        // Adiciona um padding extra para garantir a suavidade do loop se o último item não preencher a tela completamente.
        originalItems.forEach(item => {
            originalScrollWidth += item.offsetWidth + 20; // item.offsetWidth + gap (20px do CSS)
        });
        // Adiciona um ajuste final para que o reset aconteça no ponto certo
        originalScrollWidth += 20; // Ajuste para o padding lateral do wrapper ou algum respiro final
    }

    function startCarousel() {
        if (!servicosGrid || !servicosWrapper) return; // Garante que os elementos existem

        // Se o carrossel já está rodando, pare e reinicie para evitar múltiplos intervalos
        stopCarousel();

        // Remove quaisquer clones anteriores antes de adicionar novos
        while (servicosGrid.children.length > originalItemsCount) {
            servicosGrid.removeChild(servicosGrid.lastChild);
        }

        // Clona os itens originais e os adiciona ao final do grid
        // Clonamos todos os itens originais para garantir que tenhamos um "segundo ciclo" completo.
        originalItems.forEach(item => {
            const clone = item.cloneNode(true);
            servicosGrid.appendChild(clone);
        });

        // Recalcula a largura dos itens originais após as clonagens serem estabilizadas no DOM
        calculateOriginalScrollWidth();

        currentScroll = servicosWrapper.scrollLeft; // Pega a posição de scroll atual se houver

        scrollInterval = setInterval(() => {
            currentScroll += scrollSpeed;

            // Se o scroll passar da largura dos itens originais (onde as cópias começam),
            // reseta para o início sem que o usuário perceba.
            if (currentScroll >= originalScrollWidth) {
                currentScroll -= originalScrollWidth; // Subtrai a largura para manter a "velocidade" e posição relativa
            }
            servicosWrapper.scrollLeft = currentScroll;
        }, 20); // Atualiza a cada 20ms (aproximadamente 50fps)
    }

    function stopCarousel() {
        if (scrollInterval) {
            clearInterval(scrollInterval);
            scrollInterval = null;
            servicosWrapper.scrollLeft = 0; // Reseta a posição de scroll ao parar

            // Remove os clones para voltar ao estado original do desktop
            while (servicosGrid.children.length > originalItemsCount) {
                servicosGrid.removeChild(servicosGrid.lastChild);
            }
        }
    }

    function handleCarouselLogic() {
        if (mediaQueryMobile.matches) {
            // É mobile, inicia o carrossel
            startCarousel();
        } else {
            // Não é mobile, para o carrossel
            stopCarousel();
        }
    }

    // Inicializa a lógica do carrossel ao carregar a página
    handleCarouselLogic();

    // Adiciona um listener para reagir a mudanças no tamanho da tela
    mediaQueryMobile.addListener(handleCarouselLogic);

    // Opcional: Adiciona um listener para o evento resize, mas debounce é melhor para performance
    // window.addEventListener('resize', () => {
    //     // Debounce para evitar execuções excessivas durante o redimensionamento
    //     clearTimeout(window.resizeTimeout);
    //     window.resizeTimeout = setTimeout(() => {
    //         handleCarouselLogic();
    //     }, 200);
    // });
});