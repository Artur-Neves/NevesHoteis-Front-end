import { verificarCampo} from "./validacoes/validacoesCampos.js";
import { alerta } from "./alert.js";
import { existUser } from "./APIs/loginApi.js";
const formulario = document.querySelector(".formulario");
const campo = document.querySelector("[campo='email'");
const alert = document.getElementById("alert-erro");
let focus = true;
formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    if (formulario.checkValidity() && verificarLogin(campo.value)) {
      verificarLogin(email)
    }
  }); 

  function verificarLogin(email){
     existUser(email).then(response => { 
      sessionStorage.setItem("email", campo.value);
      window.location.href =  "redefinirSenha.html";
    }).catch(error => {
      alerta("danger", "Email não existe na base da dados", alert);
      return false;
    });
    return true;
   
  }

  campo.addEventListener("blur", function(){ verificarCampo(campo, false); });
  campo.addEventListener("keyup", function(){ verificarCampo(campo);});
