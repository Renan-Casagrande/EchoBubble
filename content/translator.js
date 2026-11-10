// EchoBubble - translator.js
// Tradução via dicionário local ou API MyMemory (gratuita)
// Cache salvo no navegador + debounce de 400ms

const Translator = (() => {

    const CHAVE_CACHE = "echobubble_cache";
    const MAX_ITENS   = 2000;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const cache   = new Map();
    const pending = new Map();
    let bloqueadoAte = 0;
    let salvarTimer;

    // Carrega o cache salvo (sobrevive ao F5)
    const cacheCarregado = new Promise(resolve => {
        chrome.storage.local.get(CHAVE_CACHE, (dados) => {
            const salvo = dados[CHAVE_CACHE] || {};
            Object.entries(salvo).forEach(([chave, item]) => cache.set(chave, item));
            Logger.info(`Cache carregado: ${cache.size} traduções`);
            resolve();
        });
    });

    function _salvarCache() {
        clearTimeout(salvarTimer);
        salvarTimer = setTimeout(() => {
            // Mantém só as mais recentes
            if (cache.size > MAX_ITENS) {
                const ordenado = [...cache.entries()].sort((a, b) => a[1].tempo - b[1].tempo);
                ordenado.slice(0, cache.size - MAX_ITENS).forEach(([chave]) => cache.delete(chave));
            }
            chrome.storage.local.set({ [CHAVE_CACHE]: Object.fromEntries(cache) });
        }, 2000);
    }

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
        _salvarCache();
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

        // Limite diário atingido: nem tenta chamar a API
        if (Date.now() < bloqueadoAte) {
            resolve(null);
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

            // E-mail opcional do usuário: sobe o limite de 5.000 para 50.000/dia
            const email = Storage.obter().email;
            const emailParam = EMAIL_REGEX.test(email || "")
                ? `&de=${encodeURIComponent(email)}`
                : "";

            try {
                const resposta = await fetch(
                    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(texto)}&langpair=${langpair}${emailParam}`
                );
                const dados = await resposta.json();

                const status   = Number(dados.responseStatus);
                const textoApi = dados.responseData?.translatedText || "";
                const estourou = status === 429 || /MYMEMORY WARNING/i.test(textoApi);

                if (estourou) {
                    bloqueadoAte = Date.now() + 30 * 60 * 1000; // pausa 30 min
                    document.dispatchEvent(new CustomEvent("echobubble:limite"));
                    Logger.warn("Limite diário da MyMemory atingido");
                    callbacks.forEach(cb => cb(null));
                    return;
                }

                if (status !== 200) {
                    Logger.warn("API recusou:", status, dados.responseDetails);
                    callbacks.forEach(cb => cb(null));
                    return;
                }

                let resultado = texto;

                if (textoApi && textoApi !== texto) {
                    resultado = textoApi;
                }

                _cacheSet(chave, resultado);
                callbacks.forEach(cb => cb(resultado));

            } catch (erro) {
                Logger.error("Falha na API:", erro);
                callbacks.forEach(cb => cb(null));
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

        // Espera o cache salvo carregar antes de decidir chamar a API
        await cacheCarregado;

        const langpair = `${origem}|${destino}`;
        const blocos = _dividirTexto(limpo);

        Logger.info(`🌐 Tradução (${langpair}): ${blocos.length} bloco(s)`);

        const traducoes = await Promise.all(
            blocos.map(bloco => new Promise(resolve => {
                _debounce(bloco, langpair, resolve);
            }))
        );

        if (traducoes.some(t => t === null)) return null;

        return traducoes.join(" ");
    }

    return { traduzir };

})();