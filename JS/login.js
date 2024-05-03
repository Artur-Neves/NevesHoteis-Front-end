const divLoginSenha = document.querySelectorAll("[campo-div]");
const campoLoginSenha = document.querySelectorAll("[required]");
const formulario = document.querySelector(".formulario");
const requisitosSenha =document.querySelectorAll(".requisito-senha-item");
var focus= true;



formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formulario.checkValidity()) {
    window.location.href = "index.html";
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
campoLoginSenha.forEach((campo) => {
    campo.addEventListener("blur", function (){
focus=false;
verificarCampoValido(campo);
});
campo.addEventListener("keyup", function(){verificarCampoValido(campo)})
});
 function verificarCampoValido(campo) {
    const proximoElemento =  campo.parentElement.nextElementSibling;
    if (!campo.validity.valid && !focus) {
      campo.classList.add("is-invalid");
      proximoElemento.style.display= "block";
      return
    }
    if (campo.getAttribute("type")=="password"){
        let erro = false;
        const senha = campo.value;
        requisitosSenha[1].style.color= (!senha.match(/[a-z]+/) ? "red" : "green");
        requisitosSenha[2].style.color= (!senha.match(/[A-Z]+/) ? "red" : "green");
        requisitosSenha[3].style.color= (!senha.match(/[0-9]+/) ? "red" : "green");
        requisitosSenha[0].style.color= ((campo.validity.tooShort || campo.validity.valueMissing) ? "red" : "green");
        if( !senha.match(/[a-z]+/)||!senha.match(/[A-Z]+/)|| !senha.match(/[0-9]+/) || campo.validity.tooShort || campo.validity.valueMissing){
          campo.setCustomValidity("error");
          proximoElemento.style.display= "block";
          return
        } 
          campo.setCustomValidity('');
    }
    else{
      proximoElemento.style.display= "none";
    }
    campo.classList.remove("is-invalid");
  
    
}
window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();
