import {carregarTemplates} from "../adicionarTemplates.js";
import {verificarCampo, verificarOIndiceEscolhido} from "../validacoes/validacoesCampos.js";
import {mostrarMultiplasImagens} from "../CapturarImagem.js"
carregarTemplates();

const campos = document.querySelectorAll("[campo]");
const alertaSucesso = document.getElementById('liveAlertPlaceholder');
const formulario = document.querySelector(".formulario");
const data_de_disponibilidade = document.querySelector("[campo='data_de_disponibilidade']");
const hoje= new Date();
const nome = document.querySelector("[campo='username']");
const valorDiaria =document.querySelector("[campo='data_de_disponibilidade']")
const cep = document.querySelector("[campo='cep']");
const estado = document.getElementById("inputEstado");
const cidade = document.getElementById("inputCidade");
const bairro = document.getElementById("inputBairro");
const logadouro = document.getElementById("inputLogadouro");
const desabilitarCampos = document.querySelector("fieldset");
let title = document.getElementById("formularioTitulo");
const btnSubmit= document.querySelector("[type='submit']");
const btnReset= document.querySelector("#btnCancelar");
const inputFiles = document.querySelector("#inputFiles");
const wrapper = document.querySelector(".swiper-wrapper");
let swiper = atualizarSwiper();
data_de_disponibilidade.setAttribute("max", hoje.setFullYear(10));
data_de_disponibilidade.setAttribute("min", hoje);


campos.forEach((campo)=>{
  campo.addEventListener("blur", function(){ verificarCampo(campo, false);});
  campo.addEventListener("keyup", function(){ verificarCampo(campo)});
 });


inputFiles.addEventListener("input", async ()=>{
  await mostrarMultiplasImagens(inputFiles); 
  swiper.update(); verificarCampo(inputFiles)});
  
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
    verificarCampo(inputFiles);
    if (formulario.checkValidity()) {
        appendAlert('Nice, you triggered this alert message!', 'success');
    }
    else{
      formulario.classList.add("was-validated");
    }
  });
  function modoEditar(){
    // dataDisponibilidade = 
    // nome = 
    // cep = 
    // estado = 
    // cidade = 
    // bairro = 
    // logadouro =  
    title.textContent="Editando Hotel"
    btnSubmit.classList.replace("btn-outline-success","btn-outline-warning");
    btnSubmit.textContent="Editar";
  }

  function modoExcluir(){
  
    // dataDisponibilidade = 
    // nome = 
    // cep = 
    // estado = 
    // cidade = 
    // bairro = allowSlidePrev
    // logadouro = 
    title.textContent="Excluindo Hotel"
    desabilitarCampos.setAttribute("disabled", "");
    btnSubmit.classList.replace("btn-outline-success","btn-outline-danger");
    btnSubmit.textContent="Excluir";
    btnReset.classList.replace("btn-outline-danger","btn-outline-success");
  }
function atualizarSwiper(){
  return new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 20,
    allowSlideNext: true,
    allowSlidePrev: true,
  
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    breakpoints: {
      '@0.3': {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      '@1.00': {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      '@1.50': {
        slidesPerView: 2,
        spaceBetween: 40,
      }
    },
  });
}
  





  
  