// EchoBubble - popup.js

const elAtivado = document.getElementById("ativado");
const elOrigem  = document.getElementById("origem");
const elDestino = document.getElementById("destino");
const elStatus  = document.getElementById("status");

chrome.storage.sync.get(["ativo", "origem", "destino"], (dados) => {
    elAtivado.checked = dados.ativo !== undefined ? dados.ativo : true;
    elOrigem.value    = dados.origem  || "pt";
    elDestino.value   = dados.destino || "en";
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
