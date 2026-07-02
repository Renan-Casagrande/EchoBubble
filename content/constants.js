// EchoBubble - constants.js
// Todas as constantes do projeto em um lugar só

const ECHOBUBBLE = {

    VERSION: "1.1",

    CACHE_TTL_MS: 3600000, // 1 hora

    DEBOUNCE_MS: 400,

    SELECTORS: {
        mensagem: ".copyable-text [data-testid='selectable-text']",
        container: '[data-testid="msg-container"]'
    },

    BANDEIRAS: {
        af: "🇿🇦", // Africâner
        ar: "🇸🇦", // Árabe
        zh: "🇨🇳", // Chinês
        ko: "🇰🇷", // Coreano
        da: "🇩🇰", // Dinamarquês
        sk: "🇸🇰", // Eslovaco
        es: "🇪🇸", // Espanhol
        eo: "🌍",   // Esperanto
        fi: "🇫🇮", // Finlandês
        fr: "🇫🇷", // Francês
        el: "🇬🇷", // Grego
        hi: "🇮🇳", // Hindi
        nl: "🇳🇱", // Holandês
        hu: "🇭🇺", // Húngaro
        en: "🇺🇸", // Inglês
        id: "🇮🇩", // Indonésio
        it: "🇮🇹", // Italiano
        ja: "🇯🇵", // Japonês
        no: "🇳🇴", // Norueguês
        pl: "🇵🇱", // Polonês
        pt: "🇧🇷", // Português
        ru: "🇷🇺", // Russo
        sv: "🇸🇪", // Sueco
        th: "🇹🇭", // Tailandês
        tr: "🇹🇷", // Turco
        uk: "🇺🇦", // Ucraniano
        vi: "🇻🇳", // Vietnamita
    },

    DICIONARIO: {
        "ola":        "Hello",
        "olá":        "Hello",
        "bom dia":    "Good morning",
        "boa tarde":  "Good afternoon",
        "boa noite":  "Good night",
        "tudo bem?":  "How are you?",
        "td bem":     "How are you?",
        "valeu":      "Thanks",
        "obrigado":   "Thank you",
        "obrigada":   "Thank you",
        "por favor":  "Please",
        "de nada":    "You're welcome",
        "sim":        "Yes",
        "não":        "No",
        "tchau":      "Bye",
        "até mais":   "See you later"
    },

    DEFAULTS: {
        ativo:   true,
        origem:  "pt",
        destino: "en"
    }

};
