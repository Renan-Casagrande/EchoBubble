// EchoBubble - popup.js

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const elAtivado     = document.getElementById("ativado");
const elOrigem      = document.getElementById("origem");
const elDestino     = document.getElementById("destino");
const elEmail       = document.getElementById("email");
const elStatus      = document.getElementById("status");
const elEmailStatus = document.getElementById("emailStatus");

chrome.storage.sync.get(["ativo", "origem", "destino", "email"], (dados) => {
    elAtivado.checked = dados.ativo !== undefined ? dados.ativo : true;
    elOrigem.value    = dados.origem  || "pt";
    elDestino.value   = dados.destino || "en";
    elEmail.value     = dados.email   || "";

    if (dados.email) {
        elEmailStatus.textContent = "✅ E-mail salvo";
        elEmailStatus.style.color = "#4caf50";
    }

    atualizarStatus();
});

elAtivado.addEventListener("change", () => {
    chrome.storage.sync.set({ ativo: elAtivado.checked });
    atualizarStatus();
});

elOrigem.addEventListener("change", () => {
    chrome.storage.sync.set({ origem: elOrigem.value });
    mostrarSalvo();
});

elDestino.addEventListener("change", () => {
    chrome.storage.sync.set({ destino: elDestino.value });
    mostrarSalvo();
});

// Salva o e-mail sozinho, 0,6s depois de parar de digitar
let timerEmail;
elEmail.addEventListener("input", () => {
    clearTimeout(timerEmail);
    timerEmail = setTimeout(() => {
        const valor = elEmail.value.trim();

        if (valor === "") {
            chrome.storage.sync.set({ email: "" });
            elEmailStatus.textContent = "E-mail removido";
            elEmailStatus.style.color = "#999";
            return;
        }

        if (!EMAIL_REGEX.test(valor)) {
            elEmailStatus.textContent = "❌ E-mail inválido";
            elEmailStatus.style.color = "#d32f2f";
            return;
        }

        chrome.storage.sync.set({ email: valor });
        elEmailStatus.textContent = "💾 E-mail salvo!";
        elEmailStatus.style.color = "#4caf50";
    }, 600);
});

function atualizarStatus() {
    elStatus.textContent = elAtivado.checked ? "✅ Ativa" : "⏸ Pausada";
    elStatus.style.color = elAtivado.checked ? "#4caf50" : "#999";
}

let timer;
function mostrarSalvo() {
    elStatus.textContent = "💾 Salvo!";
    elStatus.style.color = "#3B82F6";
    clearTimeout(timer);
    timer = setTimeout(atualizarStatus, 1500);
}