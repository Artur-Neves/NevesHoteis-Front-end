import { loginApi } from "./APIs/loginApi.js";
import { cadastrarUsuario } from "./APIs/usuarioSimplesApi.js";
import {olhoSenha, verificarCampo, focus} from "./validacoes/validacoesCampos.js";

const divLoginSenha = document.querySelectorAll("[campo-div]");
const senha = document.querySelector("[campo='senha'");
const email = document.querySelector("[campo='email");
const username = document.querySelector("[username]");
const formulario = document.querySelector(".formulario");
const campos = document.querySelectorAll("[campo]");
const alert = document.querySelector("[alert]");

olhoSenha(senha);

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
    else{
      alert.classList.remove("d-none");
      console.log("Erro")
    }
  }).catch(error => {
    alert.classList.remove("d-none");
    console.log(error);
  })
}

function efetuarCadastro() {
const cadastro = {

}
  window.location.href= "confirmacaoEmail.html";
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

