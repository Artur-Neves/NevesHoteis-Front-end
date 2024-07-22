import {carregarTemplates} from "../adicionarTemplates.js";
carregarTemplates();
import {olhoSenha, verificarCampo, focus, verificarOIndiceEscolhido, verificarSenhaValido} from "../validacoes/validacoesCampos.js";
import {mostrarImagem, resetImage} from "../CapturarImagem.js";
import { buscarPorId, atualizarEmployee, cadastrarEmployee } from "../APIs/funcionarioApi.js";
import { buscarCidade } from "../APIs/consultarEndereco.js";
import { alerta } from "../alert.js";
const campos = document.querySelectorAll("[campo]");
const alert = document.getElementById('liveAlertPlaceholder');
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
const urlParam = new URLSearchParams(window.location.search);
const funcionarioId = urlParam.get('id');
const senha = document.querySelector("[campo='senha']")
const divLougadoro = document.getElementById("divLogadouro");
const divSenha = document.getElementById("divSenha");
const imageEmplooye = document.getElementById("inputFile");
const btnExcluirImage = document.querySelector(".btnExcluirImage");
let image =null;
if (funcionarioId) {
  modoEditar(funcionarioId);
  btnReset.addEventListener("click",()=>{   
    editar(funcionarioId)
    window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });})
  divSenha.innerHTML=""
  divSenha.classList.add("d-none")
}
else{
  olhoSenha(senha)
  divLougadoro.classList.remove("col-sm-6")
  senha.addEventListener("focus", ()=>{
    verificarSenhaValido(senha);
  })
}

imageEmplooye.addEventListener("change", async () => {
  image = mostrarImagem();
});
btnExcluirImage.addEventListener("click", ()=>{
  resetImage();
  image=null;
});



function cadastrarFuncionario(funcionario){
  cadastrarEmployee(funcionario).then(response=>{
    alerta('success', 'Funcionario cadastrado com sucesso!', alert);
    setTimeout(()=>{window.location.href=`${window.location.href.replace("#", "")}?id=${response.id}`}, 1000)
  }).catch(error=>{
    alerta("danger", error, alert);
  })
}

async function buscarFuncionarioPorId(id){
  try{
    return   await buscarPorId(id);
  }
  catch(error){
    alerta("danger", error, alert);
  }
}
 function atualizarFuncionario(id, funcionario){
  atualizarEmployee(id, funcionario).then(response=>{
    alerta("success", "Funcionário editado com sucesso", alert);}
  ).catch(error=>{
    alerta("danger", error, alert);
  }
  )
}


campos.forEach((campo)=>{
  campo.addEventListener("blur", function(){ verificarCampo(campo, false);});
  campo.addEventListener("keyup", function(){ verificarCampo(campo)});
 });

  formulario.addEventListener("submit", function (event) {
    event.preventDefault();
    verificarOIndiceEscolhido();
    if (formulario.checkValidity() && funcionarioId) {
         atualizarFuncionario(funcionarioId, getFuncionario());
    }
    else if(formulario.checkValidity()){
      cadastrarFuncionario(getFuncionario());
    }
    else{
      formulario.classList.add("was-validated");
      alerta('danger', 'A operação não foi realizada!', alert)
    }
    window.location.href="#"
  });

  async function modoEditar(id){
    editar(id)
    title.parentElement.innerHTML=""
    email.setAttribute("disabled", "");
    btnSubmit.classList.replace("btn-outline-success","btn-outline-warning");
    btnSubmit.textContent="Editar";
  }
  async function editar(id){
    const dados = await buscarFuncionarioPorId(id);
    await setFunctionario(dados)
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

  function getFuncionario(){
    const formData = new FormData();
    if(image){
      formData.append("profilePicture", image)}
    formData.append("name", username.value)
    formData.append("birthDay", data_nascimento.value)
    formData.append("cpf", cpf.value)
    formData.append("phone", telefone.value)
    formData.append("address.cep", cep.value)
    formData.append("address.state", estado.value)
    formData.append("address.city", cidade.value)
    formData.append("address.neighborhood", bairro.value)
    formData.append("address.propertyLocation", logadouro.value)
    formData.append("user.login", email.value)
    formData.append("user.password", (senha) ? senha.value: null)
   
    return formData
  }
  async function setFunctionario(dados){
    if(dados.profilePicture){
      image =  mostrarImagem(dados.profilePicture)}
    estado.selectedIndex=0
    cidade.value=0
    email.value = dados.userDto.login;
    cpf.value = dados.cpf
    data_nascimento.value = dados.birthDay  ;
    username.value = dados.name
    telefone.value = dados.phone
    cep.value = dados.address.cep
    estado.value = dados.address.state
    if(cidade.value==0){
      await buscarCidade()
      cidade.value=dados.address.city;
    }
    bairro.value = dados.address.neighborhood
    logadouro.value = dados.address.propertyLocation
  }
  





  
  