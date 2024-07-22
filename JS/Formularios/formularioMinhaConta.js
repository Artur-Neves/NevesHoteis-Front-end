import {carregarTemplates} from "../adicionarTemplates.js";
import { verificarCampo, verificarOIndiceEscolhido } from "../validacoes/validacoesCampos.js";
import {pegarImagemPorCamera, mostrarImagem, tirarFoto, resetImage} from "../CapturarImagem.js";
import { buscarDadosMinhaConta, atualizarDadosPessoaisConta, atualizarEnderecoConta } from "../APIs/userApi.js";
import { buscarCidade } from "../APIs/consultarEndereco.js";
import { alerta } from "../alert.js";
carregarTemplates();



//Tabela do formulário pessoal
const lapisEditarPessoal = document.querySelector("[lapis='Pessoal']");
const desabilitarCampoPessoal = document.querySelector(".fieldsetPessoal");
const btnCancelarPessoal = document.getElementById("btnCancelarPessoal");
const btnSalvarPessoal = document.getElementById("btnSalvarPessoal");
const formularioPessoal = document.querySelector(".formularioPessoal");
const btnsFile = document.querySelector("[btnsFile]");
const btnAbrirCamera = document.querySelector("#btnAbrirCamera");
const btnEscolherFoto = document.querySelector("#btnEscolherImagem"); 
const btnFile = document.getElementById("inputFile");


//Tabela do formulário do endereço
const lapisEditarEndereco = document.querySelector("[lapis='Endereco']");
const desabilitarCampoEndereco = document.querySelector(".fieldsetEndereco");
const btnCancelarEndereco = document.getElementById("btnCancelarEndereco");
const btnSalvarEndereco = document.getElementById("btnSalvarEndereco");
const formularioEndereco = document.querySelector(".formularioEndereco");
const campos = document.querySelectorAll("[campo]");

const alert = document.getElementById('liveAlertPlaceholder');
const cpf = document.querySelector("[campo='cpf']");
const data_nascimento = document.querySelector("[campo='data_de_nascimento']");
const email = document.querySelector("[campo='email']");
const username = document.querySelector("[campo='username']");
const telefone = document.querySelector("[campo='telefone']");
const cep = document.querySelector("[campo='cep']");
const estado = document.getElementById("inputEstado");
const cidade = document.getElementById("inputCidade");
const bairro = document.getElementById("inputBairro");
const logadouro = document.getElementById("inputLogadouro")
const btnTirarFoto = document.querySelector("#btnTirarFoto");
const btnExcluirImage = document.querySelector(".btnExcluirImage");
let image =null;

btnAbrirCamera.addEventListener("click", async function (){await pegarImagemPorCamera()});

btnTirarFoto.addEventListener("click", function(){ image= tirarFoto()});



btnFile.addEventListener("change", async () => {
    image =  mostrarImagem();
});
buscarDadosDaConta();
campos.forEach(element => {
  element.addEventListener("blur", ()=>{verificarCampo(element,false);}); 
  element.addEventListener("keyup", ()=>{verificarCampo(element);}); 
});

function atualizarDadosPessoaisDaConta(dados){
  atualizarDadosPessoaisConta(dados).then(response=>{
    alerta("success", "Informações pessoais atualizadas com sucesso!", alert)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }).catch(erro=>{
    alerta("danger", erro, alert);
  })
} 
btnExcluirImage.addEventListener("click", ()=>{
  resetImage();
  image=null;
});


function atualizarEnderecoDaConta(dados){
  atualizarEnderecoConta(dados).then(response=>{
    alerta("success", "Informações de endereço atualizadas com sucesso!", alert)
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }).catch(erro=>{
    alerta("danger", erro, alert);
  })
} 



// formulario Pessoal

btnCancelarPessoal.addEventListener("click", ()=> {desabilitarBotoesPessoal(); buscarDadosDaConta();});
lapisEditarPessoal.addEventListener("click", (event)=>{event.preventDefault();
  desabilitarCampoPessoal.removeAttribute("disabled");
  habilitarBotoesPessoal();
  })
  btnExcluirImage.addEventListener("click", ()=>{
    resetImage();
    image=null;
  });
function desabilitarBotoesPessoal(){
    desabilitarCampoPessoal.setAttribute("disabled", "");
    lapisEditarPessoal.style.display="block";
    btnCancelarPessoal.style.display="none";
    btnSalvarPessoal.style.display="none";
    btnsFile.classList.replace("d-flex", "d-none");
    btnExcluirImage.classList.add("d-none");
}

function habilitarBotoesPessoal(){
    lapisEditarPessoal.style.display="none";
    btnCancelarPessoal.style.display="block";
    btnSalvarPessoal.style.display="block";
    btnsFile.classList.replace("d-none", "d-flex");
    if(image)
    btnExcluirImage.classList.remove("d-none");
}


  formularioPessoal.addEventListener("submit", function (event) {
    event.preventDefault();
    if (formularioPessoal.checkValidity()) {
        atualizarDadosPessoaisDaConta(getDadosPessoais())
        desabilitarBotoesPessoal();
    }
    else{
      formularioPessoal.classList.add("was-validated");
    }
  });

  
  //Formulario Endereco
  desabilitarBotoesEndereco();
  btnCancelarEndereco.addEventListener("click",()=> {desabilitarBotoesEndereco(); buscarDadosDaConta();});
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



  formularioEndereco.addEventListener("submit", function (event) {
    event.preventDefault();
    verificarOIndiceEscolhido();
    if (formularioEndereco.checkValidity()) {
        atualizarEnderecoDaConta(getDadosEndereco())
        desabilitarBotoesEndereco();
    }
    else{
      formularioEndereco.classList.add("was-validated");
    }
  });

  function buscarDadosDaConta(){
    buscarDadosMinhaConta().then(response=>{
      setUser(response)
      desabilitarBotoesPessoal();
    }).catch(erro=>{
      alerta("danger", erro.getMessage(), alert);
    })
  }

  function getDadosPessoais(){
    console.log(image)
    const formData = new FormData();
    if(image){
      formData.append("profilePicture", image)}
    formData.append("name", username.value)
    formData.append("birthDay", data_nascimento.value)
    formData.append("cpf", cpf.value)
    formData.append("phone", telefone.value)
    return formData
  }

  function getDadosEndereco(){
    return {
      name: username.value,
      birthDay: data_nascimento.value,
      cpf: cpf.value,
      phone: telefone.value,
      address: {
        cep: cep.value,
        state: estado.value,
        city: cidade.value,
        neighborhood: bairro.value,
        propertyLocation: logadouro.value
      }
    }
  }
  async function setUser(dados){
    if(dados.profilePicture){
      image = mostrarImagem(dados.profilePicture)}
    estado.selectedIndex=0
    cidade.value=0
    email.value = dados.userDto.login;
    cpf.value = dados.cpf
    data_nascimento.value = dados.birthDay  ;
    username.value = dados.name
    telefone.value = dados.phone
    if(dados.address){
    cep.value = dados.address.cep
    estado.value = dados.address.state
    if(cidade.value==0){
      await buscarCidade()
      cidade.value=dados.address.city;
    }
    bairro.value = dados.address.neighborhood
    logadouro.value = dados.address.propertyLocation
  }
  }