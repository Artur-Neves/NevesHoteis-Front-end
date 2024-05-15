import {carregarTemplates} from "../adicionarTemplates.js";
import {verificarCampo, verificarOIndiceEscolhido} from "../validacoes/validacoesCampos.js";
carregarTemplates();

const campos = document.querySelectorAll("[campo]");
const alertaSucesso = document.getElementById('liveAlertPlaceholder');
const formulario = document.querySelector(".formulario");
const data_de_disponibilidade = document.querySelector("[campo='data_de_disponibilidade']");
const hoje= new Date();
data_de_disponibilidade.setAttribute("max", hoje.setFullYear(10));
data_de_disponibilidade.setAttribute("min", hoje);

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

  





  
  