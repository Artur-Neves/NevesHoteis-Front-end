import {carregarTemplates} from "./adicionarTemplates.js";
import { verificarCampo, verificarOIndiceEscolhido } from "./validacoes/validacoesCampos.js";
carregarTemplates();

//Tabela do formulário pessoal
const lapisEditarPessoal = document.querySelector("[lapis='Pessoal']");
const desabilitarCampoPessoal = document.querySelector(".fieldsetPessoal");
const btnCancelarPessoal = document.getElementById("btnCancelarPessoal");
const btnSalvarPessoal = document.getElementById("btnSalvarPessoal");
  const alertaSucessoPessoal = document.getElementById('liveAlertPlaceholderPessoal')
const formularioPessoal = document.querySelector(".formularioPessoal");


//Tabela do formulário do endereço
const lapisEditarEndereco = document.querySelector("[lapis='Endereco']");
const desabilitarCampoEndereco = document.querySelector(".fieldsetEndereco");
const btnCancelarEndereco = document.getElementById("btnCancelarEndereco");
const btnSalvarEndereco = document.getElementById("btnSalvarEndereco");
const alertaSucessoEndereco = document.getElementById('liveAlertPlaceholderEndereco')
const formularioEndereco = document.querySelector(".formularioEndereco");
const cep = document.querySelector("[campo='cep']");
const campos = document.querySelectorAll("[campo]");

campos.forEach(element => {
  element.addEventListener("blur", ()=>{verificarCampo(element,false);}); 
  element.addEventListener("keyup", ()=>{verificarCampo(element);}); 
});



// formulario Pessoal
desabilitarBotoesPessoal();
btnCancelarPessoal.addEventListener("click", desabilitarBotoesPessoal);
lapisEditarPessoal.addEventListener("click", (event)=>{event.preventDefault();
  desabilitarCampoPessoal.removeAttribute("disabled");
  habilitarBotoesPessoal();
  })
function desabilitarBotoesPessoal(){
    desabilitarCampoPessoal.setAttribute("disabled", "");
    lapisEditarPessoal.style.display="block";
    btnCancelarPessoal.style.display="none";
    btnSalvarPessoal.style.display="none";
}

function habilitarBotoesPessoal(){
    lapisEditarPessoal.style.display="none";
    btnCancelarPessoal.style.display="block";
    btnSalvarPessoal.style.display="block";
}

const appendAlertPessoal = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertaSucessoPessoal.append(wrapper)
}


  formularioPessoal.addEventListener("submit", function (event) {
    event.preventDefault();
    if (formularioPessoal.checkValidity()) {
        appendAlertPessoal('Nice, you triggered this alert message!', 'success');
        desabilitarBotoesPessoal();
    }
    else{
      formularioPessoal.classList.add("was-validated");
    }
  });

  
  //Formulario Endereco
  desabilitarBotoesEndereco();
  btnCancelarEndereco.addEventListener("click", desabilitarBotoesEndereco);
  lapisEditarEndereco.addEventListener("click", (event)=>{event.preventDefault();
    desabilitarCampoEndereco.removeAttribute("disabled");
    habilitarBotoesEndereco();
    })
  function desabilitarBotoesEndereco(){
    desabilitarCampoEndereco.setAttribute("disabled", "");
    lapisEditarEndereco.style.display="block";
    btnCancelarEndereco.style.display="none";
    btnSalvarEndereco.style.display="none";
}

function habilitarBotoesEndereco(){
    lapisEditarEndereco.style.display="none";
    btnCancelarEndereco.style.display="block";
    btnSalvarEndereco.style.display="block";
}

const appendAlertEndereco = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertaSucessoEndereco.append(wrapper)
}


  formularioEndereco.addEventListener("submit", function (event) {
    event.preventDefault();
    verificarOIndiceEscolhido();
    if (formularioEndereco.checkValidity()) {
        appendAlertEndereco('Nice, you triggered this alert message!', 'success');
        desabilitarBotoesEndereco();
    }
    else{
      formularioEndereco.classList.add("was-validated");
    }
  });
  


