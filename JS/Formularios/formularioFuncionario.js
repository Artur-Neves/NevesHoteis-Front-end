import {carregarTemplates} from "../adicionarTemplates.js";
carregarTemplates();
import {olhoSenha, verificarCampo, focus, verificarOIndiceEscolhido, verificarSenhaValido} from "../validacoes/validacoesCampos.js";
import {mostrarImagem} from "../CapturarImagem.js";


const campos = document.querySelectorAll("[campo]");
const alertaSucesso = document.getElementById('liveAlertPlaceholder');
const senha = document.querySelector("[campo='senha']");
const formulario = document.querySelector(".formulario");
const cpf = document.querySelector("[campo='cpf']");
const data_nascimento = document.querySelector("[campo='data_de_nascimento']");
const email = document.querySelector("[campo='email']");
const username = document.querySelector("[campo='username']");
const telefone = document.querySelector("[campo='telefone']");
const cep = document.querySelector("[campo='cep']");
const estado = document.getElementById("inputEstado");
const cidade = document.getElementById("inputCidade");
const bairro = document.getElementById("inputBairro");
const logadouro = document.getElementById("inputLogadouro");
const desabilitarCampos = document.querySelector("fieldset");
data_nascimento.setAttribute("max", new Date());
let title = document.getElementById("formularioTitulo");
const btnSubmit= document.querySelector("[type='submit']");
const btnReset= document.querySelector("#btnCancelar");


olhoSenha(senha);

 modoEditar();


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
        modoEditar();
    }
    else{
      verificarSenhaValido(senha);
      formulario.classList.add("was-validated");
    }
  });

  function modoEditar(){
    // senha =
    // cpf = 
    // data_nascimento = 
    // username = 
    // telefone = 
    // cep = 
    // estado = 
    // cidade = 
    // bairro = 
    // logadouro = 
    title.textContent="Editando Funcionário"
    email.setAttribute("disabled", "");
    btnSubmit.classList.replace("btn-outline-success","btn-outline-warning");
    btnSubmit.textContent="Editar";
  }

  function modoExcluir(){
    // senha =
    // cpf = 
    // data_nascimento = 
    // username = 
    // telefone = 
    // cep = 
    // estado = 
    // cidade = 
    // bairro = 
    // logadouro = 
    title.textContent="Excluindo Funcionário"
    desabilitarCampos.setAttribute("disabled", "");
    btnSubmit.classList.replace("btn-outline-success","btn-outline-danger");
    btnSubmit.textContent="Excluir";
    btnReset.classList.replace("btn-outline-danger","btn-outline-success");
    document.querySelector("[btnsFile]").classList.add("d-none");
  }

  





  
  