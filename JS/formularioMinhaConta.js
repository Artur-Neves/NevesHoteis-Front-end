import {carregarTemplates} from "./adicionarTemplates.js";
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

const cep = document.getElementById("inputCep");
const estado = document.getElementById("inputEstado");
const bairro = document.getElementById("inputBairro");
const cidade = document.getElementById("inputCidade");
const logadouro = document.getElementById("inputLogadouro");
const alertTrigger = document.getElementById('liveAlertBtn')

buscarEstados();
cep.addEventListener("blur", ()=>{buscarInfoPorCep(cep.value);}); 
estado.addEventListener("click", buscarCidade);

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
    if (formularioEndereco.checkValidity()) {
        appendAlertEndereco('Nice, you triggered this alert message!', 'success');
        desabilitarBotoesEndereco();
    }
  });


  //Apis
  async function buscarEstados(){
    try {
      estado.innerHTML="<option value='0' selected>Seleciona um estado</option>";
      const primese = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const json = await primese.json();
      let listUfsOrdenados =json.sort((uf1,uf2)=> uf1.nome.localeCompare(uf2.nome));
      listUfsOrdenados.forEach(element => {
        estado.innerHTML+= `<option value='${element.id}'>${element.sigla}</option>`;
      });
    } catch (error) {
      console.log(error);
    }
  }
  async function buscarCidade(){
    let ufEscolhido = estado.value;
    if(! ufEscolhido == 0){
    try {
      cidade.innerHTML="<option value='0' selected>Seleciona uma cidade</option>";
      const primese = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufEscolhido}/municipios`);
      const json = await primese.json();
      json.forEach(element => {
        cidade.innerHTML+= `<option value='${element.nome}'>${element.nome}</option>`;
      });
    } catch (error) {
      console.log(error);
    }
  }
  }
  async function buscarInfoPorCep(cep){
    try{
    const primese = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json = await primese.json();
    
    logadouro.value=((logadouro.validity.valueMissing) ? json.logradouro: logadouro.value );
    bairro.value=((bairro.validity.valueMissing) ? json.bairro: bairro.value );
    for (let index = 0; index < estado.options.length; index++) {
      if(estado.options[index].text==json.uf){
        estado.selectedIndex=index;
      }
    }
    if( cidade.value==0){
      await buscarCidade()
      cidade.value=json.localidade;
    }
    
    }
    catch(e){
      console.log(e);
    }
  }
