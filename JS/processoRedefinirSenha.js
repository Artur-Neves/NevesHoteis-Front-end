const formulario = document.querySelector(".formulario");
const campo = document.getElementById("emailRedefinirSenha");
let focus = true;
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (formulario.checkValidity()) {
      window.location.href =  "pedidoRedefinirSenha.html";
    }
  });

  campo.addEventListener("blur", function(){ verificarCampoTextValido(campo); focus=false});
  campo.addEventListener("keyup", function(){ verificarCampoTextValido(campo);});
  function verificarCampoTextValido(campo){
    const proximoElemento =  campo.nextElementSibling;
    if (!campo.validity.valid && !focus) {
      campo.classList.add("is-invalid");
      proximoElemento.style.display= "block";
      return
    }
    campo.classList.remove("is-invalid");
    proximoElemento.style.display= "none";
  }