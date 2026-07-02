// EchoBubble - translator.js
// Tradução via dicionário local ou API MyMemory (gratuita)
// Cache com expiração de 1 hora + debounce de 400ms

const Translator = (() => {

    const cache   = new Map();
    const pending = new Map();

    function _cacheGet(chave) {
        const item = cache.get(chave);
        if (!item) return null;
        if (Date.now() - item.tempo > ECHOBUBBLE.CACHE_TTL_MS) {
            cache.delete(chave);
            return null;
        }
        return item.texto;
    }

    function _cacheSet(chave, texto) {
        cache.set(chave, { texto, tempo: Date.now() });
    }

    function _dicionario(texto, origem, destino) {
        if (origem !== "pt" || destino !== "en") return null;
        return ECHOBUBBLE.DICIONARIO[texto.toLowerCase().trim()] || null;
    }

    function _debounce(texto, langpair, resolve) {
        const chave = `${texto}||${langpair}`;

        const cached = _cacheGet(chave);
        if (cached) {
            resolve(cached);
            return;
        }

        if (pending.has(chave)) {
            pending.get(chave).push(resolve);
            return;
        }

        pending.set(chave, [resolve]);

        setTimeout(async () => {
            const callbacks = pending.get(chave) || [];
            pending.delete(chave);

            try {
                const resposta = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}`
                );
                const dados = await resposta.json();
                let resultado = texto;

                if (
                    dados.responseData?.translatedText &&
                    dados.responseData.translatedText !== texto
                ) {
                    resultado = dados.responseData.translatedText;
                }

                _cacheSet(chave, resultado);
                callbacks.forEach(cb => cb(resultado));

            } catch (erro) {
                Logger.error("Falha na API:", erro);
                callbacks.forEach(cb => cb(texto));
            }

        }, ECHOBUBBLE.DEBOUNCE_MS);
    }

    function _temTexto(texto) {
        return texto.replace(/[\p{Emoji}]/gu, "").trim().length > 0;
    }

    function _dividirTexto(texto, limite = 490) {
        if (texto.length <= limite) return [texto];
        const blocos = [];
        let inicio = 0;
        while (inicio < texto.length) {
            let fim = inicio + limite;
            // Tenta cortar no espaço mais próximo pra não quebrar palavra
            if (fim < texto.length) {
                const espaco = texto.lastIndexOf(" ", fim);
                if (espaco > inicio) fim = espaco;
            }
            blocos.push(texto.substring(inicio, fim).trim());
            inicio = fim;
        }
        return blocos;
    }

    async function traduzir(texto, origem = "pt", destino = "en") {
        const limpo = texto.trim();
        if (!limpo || !_temTexto(limpo)) return null;

        const local = _dicionario(limpo, origem, destino);
        if (local) {
            Logger.info("📚 Dicionário:", limpo, "→", local);
            return local;
        }

        const langpair = `${origem}|${destino}`;
        const blocos = _dividirTexto(limpo);

        Logger.info(`🌐 API (${langpair}): ${blocos.length} bloco(s)`);

        const traducoes = await Promise.all(
            blocos.map(bloco => new Promise(resolve => {
                _debounce(bloco, langpair, resolve);
            }))
        );

        return traducoes.join(" ");
    }

    return { traduzir };

})();
