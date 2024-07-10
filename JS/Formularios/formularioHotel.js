import { carregarTemplates } from "../adicionarTemplates.js";
import { verificarCampo, verificarOIndiceEscolhido } from "../validacoes/validacoesCampos.js";
import { mostrarMultiplasImagens } from "../CapturarImagem.js";
import { buscarPorId, atualizarHotel, cadastrarHotel } from "../APIs/hotelApi.js";
import { buscarCidade } from "../APIs/consultarEndereco.js";
import { alerta } from "../alert.js";
carregarTemplates();

const campos = document.querySelectorAll("[campo]");
const alert = document.getElementById("liveAlertPlaceholder");
const formulario = document.querySelector(".formulario");
const data_de_disponibilidade = document.querySelector(
  "[campo='data_de_disponibilidade']"
);
const hoje = new Date();
const nome = document.querySelector("[campo='username']");
const valorDiaria = document.querySelector("[campo='valor_diaria']");
const cep = document.querySelector("[campo='cep']");
const estado = document.getElementById("inputEstado");
const cidade = document.getElementById("inputCidade");
const bairro = document.getElementById("inputBairro");
const logadouro = document.getElementById("inputLogadouro");
const desabilitarCampos = document.querySelector("fieldset");
let title = document.getElementById("formularioTitulo");
const btnSubmit = document.querySelector("[type='submit']");
const btnReset = document.querySelector("#btnCancelar");
const inputFiles = document.querySelector("#inputFiles");
const wrapper = document.querySelector(".swiper-wrapper");
let swiper = atualizarSwiper();
data_de_disponibilidade.setAttribute("max", hoje.setFullYear(10));
data_de_disponibilidade.setAttribute("min", hoje);
const urlParam = new URLSearchParams(window.location.search);
const hotelId = urlParam.get("id");

if (hotelId) {
  modoEditar(hotelId);
  btnReset.addEventListener("click",()=>{  editar(hotelId)
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });})
}

function cadastrandoHotel(hotel){
  cadastrarHotel(hotel).then(response=>{
    alerta('success', 'Hotel cadastrado com sucesso!', alert);
    setTimeout(()=>{window.location.href=`${window.location.href.replace("#", "")}?id=${response.id}`}, 1000)
  }).catch(error=>{
    alerta("danger", error, alert);
  })
}

async function buscarHotelPorId(id) {
  try {
    return await buscarPorId(id);
  } catch (error) {
    alerta("danger", error, alert);}
}
function atualizarOHotel(id, HotelId){
  atualizarHotel(id, HotelId).then(response=>{
    alerta("success", "Hotel editado com sucesso", alert);}
  ).catch(error=>{
    alerta("danger", error, alert);
  }
  )
}

campos.forEach((campo) => {
  campo.addEventListener("blur", function () {
    verificarCampo(campo, false);
  });
  campo.addEventListener("keyup", function () {
    verificarCampo(campo);
  });
});

inputFiles.addEventListener("input", async () => {
  await mostrarMultiplasImagens(inputFiles);
  swiper.update();
  verificarCampo(inputFiles);
});


formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  verificarOIndiceEscolhido();
  verificarCampo(inputFiles);
  if (formulario.checkValidity() && hotelId) {
    atualizarOHotel(hotelId, getHotel());
}
else if(formulario.checkValidity()){
 cadastrandoHotel(getHotel());
}
else{
 formulario.classList.add("was-validated");
 alerta('danger', 'A operação não foi realizada!', alert)
}
window.location.href="#"
});
function modoEditar(id) {
  editar(id);
  title.innerHTML = "";
  btnSubmit.classList.replace("btn-outline-success", "btn-outline-warning");
  btnSubmit.textContent = "Editar";
}
async function editar(id){
  const dados = await buscarHotelPorId(id);
  setHotel(dados)
}

function modoExcluir() {
  // dataDisponibilidade =
  // nome =
  // cep =
  // estado =
  // cidade =
  // bairro = allowSlidePrev
  // logadouro =
  title.textContent = "Excluindo Hotel";
  desabilitarCampos.setAttribute("disabled", "");
  btnSubmit.classList.replace("btn-outline-success", "btn-outline-danger");
  btnSubmit.textContent = "Excluir";
  btnReset.classList.replace("btn-outline-danger", "btn-outline-success");
}


function getHotel(){
  return {
    name: nome.value,
    availabilityDate: data_de_disponibilidade.value,
    dailyValue: valorDiaria.value.replace(",","."),
    address: {
      cep: cep.value,
      state: estado.value,
      city: cidade.value,
      neighborhood: bairro.value,
      propertyLocation: logadouro.value
    }
  }
}
async function setHotel(dados){
  estado.selectedIndex=0
  cidade.value=0
  data_de_disponibilidade.value = dados.availabilityDate;
  nome.value = dados.name;
  cep.value = dados.address.cep;
  estado.value = dados.address.state
  if (cidade.value == 0) {
    await buscarCidade();
    cidade.value = dados.address.city;
  }
  valorDiaria.value = dados.dailyValue;
  bairro.value = dados.address.neighborhood;
  logadouro.value = dados.address.propertyLocation;
}


function atualizarSwiper() {
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
      "@0.3": {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      "@1.00": {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      "@1.50": {
        slidesPerView: 2,
        spaceBetween: 40,
      },
    },
  });
}
