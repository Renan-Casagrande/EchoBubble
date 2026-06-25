console.log("PolyLingua carregado!");

const bubble = document.createElement("div");

bubble.innerText = "🌎 Tradução ativa!";

bubble.style.position = "fixed";
bubble.style.bottom = "20px";
bubble.style.right = "20px";
bubble.style.background = "#7c4dff";
bubble.style.color = "white";
bubble.style.padding = "12px 18px";
bubble.style.borderRadius = "20px";
bubble.style.zIndex = "999999";
bubble.style.fontSize = "16px";

document.body.appendChild(bubble);