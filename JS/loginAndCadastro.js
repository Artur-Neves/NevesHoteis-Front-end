import {olhoSenha, verificarCampo, focus} from "./validacoes/validacoesCampos.js";
const divLoginSenha = document.querySelectorAll("[campo-div]");
const senha = document.querySelector("[campo='senha']");
const email = document.querySelector("[campo='email]");
const username = document.querySelector("[username]");
const formulario = document.querySelector(".formulario");
const campos = document.querySelectorAll("[campo]");

olhoSenha(senha);

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formulario.checkValidity()) {
    window.location.href = (formulario.getAttribute("login")!=undefined)?  "index.html": "confirmacaoEmail.html";
  }
});

function ajustarTamanho() {
  if (window.innerWidth >= 768) {
    divLoginSenha.forEach((campo) => {
      campo.classList.add("input-group-lg");
    });

    return;
  }
  divLoginSenha.forEach((campo) => {
    campo.classList.remove("input-group-lg");
  });
}
      campos.forEach((campo)=>{
        campo.addEventListener("blur", function(){ verificarCampo(campo, false);});
        campo.addEventListener("keyup", function(){ verificarCampo(campo)});
       });
       window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();

