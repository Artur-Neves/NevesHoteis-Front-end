const botao = document.getElementById("botao");

botao.addEventListener("mouseenter", function() {
    botao.style.left = Math.floor(Math.random() * 100) + "px";
    botao.style.top = Math.floor(Math.random() * 100) + "px";
});
botao.addEventListener("click", function() {
    botao.style.left = Math.floor(Math.random() * 100) + "px";
    botao.style.top = Math.floor(Math.random() * 100) + "px";
});
