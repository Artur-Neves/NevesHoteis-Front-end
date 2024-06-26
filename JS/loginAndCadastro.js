import { loginApi } from "./APIs/loginApi.js";
import { cadastrarSimpleUser } from "./APIs/usuarioSimplesApi.js";
import { alerta } from "./alert.js";
import {olhoSenha, verificarCampo, focus} from "./validacoes/validacoesCampos.js";

const divLoginSenha = document.querySelectorAll("[campo-div]");
const senha = document.querySelector("[campo='senha'");
const email = document.querySelector("[campo='email'");
const username = document.querySelector("[campo='username");
const formulario = document.querySelector(".formulario");
const campos = document.querySelectorAll("[campo]");
const alert = document.getElementById("alert-erro");

olhoSenha(senha);
if(sessionStorage.getItem("menssagem-confirmacao")){
  alerta("success ", sessionStorage.getItem("menssagem-confirmacao"), alert);
  sessionStorage.removeItem("menssagem-confirmacao");
}

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formulario.checkValidity()) {
    if (formulario.getAttribute("login")!=undefined)
    efetuarLogin();   
  else
  efetuarCadastro();
  }
});

function efetuarLogin(){
  const login ={
    login: email.value,
    password: senha.value
  }
  loginApi(login).then(response=>{
    if(response.token){
    localStorage.setItem("authToken", response.token);
    window.location.href = "index.html";
    }
  }).catch(error=>{
    if(error.message=="Usuário desabilitado"){
      sessionStorage.setItem("email", email.value);
      setTimeout(window.location.href="confirmacaoEmail.html", 500);
    }
    alerta("danger",error.message, alert);
  })
}

function efetuarCadastro() {
const cadastro = {
  name: username.value,
  loginDto:{
    login: email.value,
    password: senha.value
  }
}
cadastrarSimpleUser (cadastro).then(response=>{
  if(response){
    sessionStorage.setItem("cadastro",  JSON.stringify(response));
    window.location.href= "confirmacaoEmail.html";
  }
}).catch(error=>{
  alerta("danger", error.message, alert);
});
  
}


function ajustarTamanho() {
  if (window.innerWidth >= 768) {
    divLoginSenha.forEach((campo) => {
      campo.classList.add("input-group-lg");
    });

    return;
  }
  divLoginSenha.forEach((campo) => {
    campo.classList.remove("input-group-lg");
  });
}
      campos.forEach((campo)=>{
        campo.addEventListener("blur", function(){ verificarCampo(campo, false);});
        campo.addEventListener("keyup", function(){ verificarCampo(campo)});
       });
       window.addEventListener("resize", ajustarTamanho);
ajustarTamanho();

