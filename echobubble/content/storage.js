// EchoBubble - storage.js
// Gerencia configurações via chrome.storage.sync

const Storage = (() => {

    let config = { ...ECHOBUBBLE.DEFAULTS };
    const listeners = [];

    function carregar(callback) {
        chrome.storage.sync.get(["ativo", "origem", "destino"], (dados) => {
            if (dados.ativo  !== undefined) config.ativo  = dados.ativo;
            if (dados.origem)               config.origem = dados.origem;
            if (dados.destino)              config.destino = dados.destino;
            Logger.info("Config carregada:", config);
            if (callback) callback(config);
        });
    }

    function salvar(novaConfig) {
        Object.assign(config, novaConfig);
        chrome.storage.sync.set(novaConfig);
    }

    function obter() {
        return config;
    }

    function aoMudar(callback) {
        listeners.push(callback);
    }

    chrome.storage.onChanged.addListener((changes) => {
        if (changes.ativo   !== undefined) config.ativo   = changes.ativo.newValue;
        if (changes.origem  !== undefined) config.origem  = changes.origem.newValue;
        if (changes.destino !== undefined) config.destino = changes.destino.newValue;
        Logger.info("Config atualizada:", config);
        listeners.forEach(fn => fn(config));
    });

    return { carregar, salvar, obter, aoMudar };

})();
