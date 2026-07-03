// EchoBubble - constants.js
// Todas as constantes do projeto em um lugar só

const ECHOBUBBLE = {

    VERSION: "1.0.0",

    CACHE_TTL_MS: 3600000, // 1 hora

    DEBOUNCE_MS: 400,

    SELECTORS: {
        mensagem: ".copyable-text [data-testid='selectable-text']",
        container: '[data-testid="msg-container"]'
    },

    BANDEIRAS: {
        de: "🇩🇪", // Alemão
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
        "até mais":   "See you later",

        "blz":        "Okay",
        "beleza":     "Okay",
        "tranquilo":  "No problem",
        "de boa":     "It's all good",
        "fechado":    "Deal",
        "demorou":    "Sounds good",
        "tmj":        "We're together",
        "tamo junto": "We're together",
        "suave":      "All good",
        "show":       "Awesome",
        "massa":      "Awesome",
        "top":        "Great",
        "show de bola": "Awesome",
        "falou":      "See you",
        "flw":        "See you",
        "vlw":        "Thanks",
        "obg":        "Thanks",
        "obgd":       "Thank you",
        "obrigadão":  "Thanks a lot",
        "brigado":    "Thanks",
        "brigadão":   "Thanks a lot",

        "bom trabalho":  "Good job",
        "parabéns":      "Congratulations",
        "com certeza":   "Of course",
        "claro":         "Of course",
        "sem problemas": "No problem",
        "sem problema":  "No problem",
        "aguarde":       "Please wait",
        "espera aí":     "Hold on",
        "pera aí":       "Hold on",
        "já volto":      "I'll be right back",
        "até amanhã":    "See you tomorrow",
        "até logo":      "See you later",
        "até já":        "See you soon",

        "kk":            "Haha",
        "kkk":           "Haha",
        "kkkk":          "Hahaha",
        "kkkkk":         "Hahaha",
        "kkkkkk":        "Hahaha",
        "rs":            "Haha",
        "rss":           "Haha",
        "rsrs":          "Haha",
        "rsrsrs":        "Hahaha",

        "e aí":          "What's up?",
        "oi":            "Hi",
        "opa":           "Hey",
        "eae":           "Hey",
        "fala":          "Hey",
        "fala aí":       "Hey",
        "tudo certo":    "Everything okay?",
        "como vai":      "How are you?",

        "ok":            "Okay",
        "okay":          "Okay",
        "certo":         "Alright",
        "perfeito":      "Perfect",
        "combinado":     "Agreed",
        "entendi":       "I understand",
        "entendido":     "Understood",
        "pode ser":      "Sounds good",
    },

    DEFAULTS: {
        ativo:   true,
        origem:  "pt",
        destino: "en"
    }

};
