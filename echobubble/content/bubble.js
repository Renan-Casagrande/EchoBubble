// EchoBubble - bubble.js
// Botão flutuante de status — clique para pausar/ativar

const Bubble = (() => {

    function criar() {
        const el = document.createElement("div");
        el.id = "echobubble-bubble";
        el.className = "echobubble-bubble";
        document.body.appendChild(el);

        el.addEventListener("click", () => {
            const config = Storage.obter();
            Storage.salvar({ ativo: !config.ativo });
            atualizar();
        });

        return el;
    }

    let bubble;

    function atualizar() {
        if (!bubble) return;
        const config = Storage.obter();
        const bandeira = ECHOBUBBLE.BANDEIRAS[config.destino] || "🌐";

        if (config.ativo) {
            bubble.textContent = `${bandeira} Tradução ativa`;
            bubble.classList.remove("echobubble-bubble--pausado");
            bubble.title = "Clique para pausar";
        } else {
            bubble.textContent = "⏸ Pausado — clique para ativar";
            bubble.classList.add("echobubble-bubble--pausado");
            bubble.title = "Clique para ativar";
        }
    }

    function init() {
        bubble = criar();
        atualizar();
        Storage.aoMudar(atualizar);
    }

    return { init, atualizar };

})();
