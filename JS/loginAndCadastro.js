const divLoginSenha = document.querySelectorAll("[campo-div]");
const senha = document.querySelector("[senha]");
const email = document.querySelector("[email]");
const username = document.querySelector("[username]");
const formulario = document.querySelector(".formulario");
const requisitosSenha =document.querySelectorAll(".requisito-senha-item");
const campos = document.querySelectorAll("[campo]");
const olho = document.querySelector(".olho");
var focus= true;

olhoSenha();

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
        campo.addEventListener("blur", function(){ verificarCampo(campo); focus=false;});
        campo.addEventListener("keyup", function(){ verificarCampo(campo)});
        
       });
 
function verificarCampo(campo){
switch (campo.type) {
    case "password":
    verificarSenhaValido(campo);
    break;
    case "text":
      verificarCampoTextValido(campo);
    break;
    case "email":
      verificarCampoTextValido(campo);
    break;
  default:
    new console.error();
    break;
}

}
function verificarSenhaValido(campo) {
  const proximoElemento =  campo.parentElement.nextElementSibling;
  proximoElemento.style.display= "block";
       const valorCampo = campo.value;
        requisitosSenha[1].style.color= (!valorCampo.match(/[a-z]+/) ? "red" : "green");
        requisitosSenha[2].style.color= (!valorCampo.match(/[A-Z]+/) ? "red" : "green");
        requisitosSenha[3].style.color= (!valorCampo.match(/[0-9]+/) ? "red" : "green");
        requisitosSenha[0].style.color= ((campo.validity.tooShort || campo.validity.valueMissing) ? "red" : "green");
        if(requisitosSenha.values().filter(req=>req.style.color=="red").length>0){
          campo.setCustomValidity("error");
          return
        } 
          campo.setCustomValidity('');
          campo.classList.remove("is-invalid");
    }

    function olhoSenha(){
      olho.addEventListener('mousedown', function() {
        senha.type = 'text';
      });
      
      olho.addEventListener('mouseup', function() {
        senha.type = 'password';
      });
      
      olho.addEventListener('mousemove', function() {
        senha.type = 'password';
      });
      olho.addEventListener('touchstart', function() {
        senha.type = 'text';
      });
      
      olho.addEventListener('touchend', function() {
        senha.type = 'password';
      });
      
      olho.addEventListener('touchmove', function() {
        senha.type = 'password';
      });
    }

function verificarCampoTextValido(campo){
  const proximoElemento =  campo.parentElement.nextElementSibling;
    
  if (!campo.validity.valid && !focus) {
    campo.classList.add("is-invalid");
    proximoElemento.style.display= "block";
    return
  }
  campo.classList.remove("is-invalid");
  proximoElemento.style.display= "none";
}
window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();

