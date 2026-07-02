// EchoBubble - content.js
// Ponto de entrada — inicializa todos os módulos

Logger.info(`v${ECHOBUBBLE.VERSION} carregado`);

Storage.carregar(() => {
    Bubble.init();
    Observer.init();
});
