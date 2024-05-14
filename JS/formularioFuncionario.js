import {carregarTemplates} from "./adicionarTemplates.js";
import {olhoSenha, verificarCampo, focus, verificarOIndiceEscolhido} from "./validacoes/validacoesCampos.js";
carregarTemplates();

const campos = document.querySelectorAll("[campo]");
const alertaSucesso = document.getElementById('liveAlertPlaceholder');
const senha = document.querySelector("[campo='senha']");
const formulario = document.querySelector(".formulario");
const cpf = document.querySelector("[campo='cpf']");

olhoSenha(senha);




campos.forEach((campo)=>{
  campo.addEventListener("blur", function(){ verificarCampo(campo, false);});
  campo.addEventListener("keyup", function(){ verificarCampo(campo)});
 });


  
const appendAlert= (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertaSucesso.append(wrapper)
}


  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    verificarOIndiceEscolhido();
    if (formulario.checkValidity()) {
        appendAlert('Nice, you triggered this alert message!', 'success');
    }
    else{
      formulario.classList.add("was-validated");
    }
  });

  





  
  