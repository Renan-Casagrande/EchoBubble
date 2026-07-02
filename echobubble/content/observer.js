// EchoBubble - observer.js
// Observa o DOM do WhatsApp e processa mensagens novas

const Observer = (() => {

    const processadas = new WeakSet();

    function criarBalao(textoTraduzido, erro = false) {
        const config = Storage.obter();
        const bandeira = ECHOBUBBLE.BANDEIRAS[config.destino] || "🌐";

        const el = document.createElement("div");
        el.className = "echobubble-traducao" + (erro ? " echobubble-traducao--erro" : "");
        el.dataset.echobubble = "true";
        el.innerHTML = `
            <span class="echobubble-flag">${erro ? "⚠️" : bandeira}</span>
            <span>${textoTraduzido}</span>
        `;
        return el;
    }

    function processarMensagem(msg) {
        if (processadas.has(msg)) return;
        processadas.add(msg);

        const container = msg.closest(ECHOBUBBLE.SELECTORS.container);
        if (!container) return;
        if (container.querySelector("[data-echobubble]")) return;

        const config = Storage.obter();
        Logger.info("🆕 Mensagem:", msg.innerText);

        Translator.traduzir(msg.innerText, config.origem, config.destino)
            .then(traduzido => {
                if (container.querySelector("[data-echobubble]")) return;

                // null = só emoji ou vazio, não mostra balão
                if (traduzido === null) return;

                // texto igual ao original = não traduziu
                const naoTraduzido = traduzido === msg.innerText.trim();
                container.appendChild(criarBalao(traduzido, naoTraduzido));
            });
    }

    function init() {
        const observer = new MutationObserver(() => {
            const config = Storage.obter();
            if (!config.ativo) return;

            document.querySelectorAll(ECHOBUBBLE.SELECTORS.mensagem)
                .forEach(processarMensagem);
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });

        Logger.info("Observer ativo");
    }

    return { init };

})();
