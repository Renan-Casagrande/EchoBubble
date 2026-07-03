// EchoBubble - logger.js
// Logger centralizado — troque DEBUG para false em produção

const Logger = (() => {

    const DEBUG = false;
    const PREFIX = "[EchoBubble]";

    return {

        info(...msg) {
            if (DEBUG) console.log(PREFIX, ...msg);
        },

        warn(...msg) {
            if (DEBUG) console.warn(PREFIX, ...msg);
        },

        error(...msg) {
            console.error(PREFIX, ...msg);
        }

    };

})();
