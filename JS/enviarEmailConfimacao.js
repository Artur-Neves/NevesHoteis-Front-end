import { envairOuReenviarTokenEmail, verifyTokenEmail, redefinirSenha } from "./APIs/userApi.js";
import { alerta } from "./alert.js";
import { olhoSenha, verificarCampo} from "./validacoes/validacoesCampos.js";
const formulario = document.querySelector(".formulario");
const reenviarEmail = document.querySelector("[reenviar]");
const reenviarLink = document.getElementById("reenviar-link");
const emailUsuario = document.getElementById("email-usuario");
const campoCodigo = document.getElementById("codigo");
const cronometro = document.querySelector("[cronometro]");
const alert = document.getElementById("alert-erro");
const senha = document.querySelector("[campo='senha'");
const senhaRepetida= document.querySelector("[campo=repeat__Senha");
let nIntervId=null;
var email;

configuracoes();

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formulario.checkValidity() && senha) {
    mudarSenha(email, senha.value, senhaRepetida.value, campoCodigo.value);
  }
  else if(formulario.checkValidity()){
    verifyToken(campoCodigo.value);
  }
});


function enviarOuReenviar(){
  console.log(email);
  reenviarEmail.classList.add("d-none");
  const tokenEmailDto = {
    email: email
  }
  envairOuReenviarTokenEmail(tokenEmailDto).then(response=>{
    if(response){
    sessionStorage.setItem("timer",response.time);
    cronometroReenviar();
    }
    else{
      console.log("erro")
    }
  }).catch(error =>{
    alerta("danger", error.message, alert);
    cronometroReenviar();
  });

}
function verifyToken(token){
  const tokenEmailDto = {
    email: email,
    token: ""+token
  }
  verifyTokenEmail(tokenEmailDto).then(response => {
       sessionStorage.setItem("menssagem-confirmacao", "Sua conta foi validada com sucesso!")
        window.location.href="login.html";
    
}).catch(error=>{
  alerta("danger",error.message, alert);
})
}


var contagemRegressiva = () => {
  if (sessionStorage.timer <= 0) {
    clearInterval(nIntervId);
    nIntervId=null;
    reenviarEmail.classList.remove("d-none");
    cronometro.innerHTML="";
    return;
  }
  sessionStorage.setItem("timer", sessionStorage.timer-1);
  initinalTimer();
};
function cronometroReenviar() {
  if (!nIntervId) {
    nIntervId = setInterval(contagemRegressiva, 1000);
  }
  
}
reenviarLink.addEventListener("click", enviarOuReenviar);


function initinalTimer() {
  const tempo = new Date(sessionStorage.timer * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    minute: "2-digit",
    second: "2-digit"
  });
  cronometro.innerHTML = `Espere <span class="fw-bold"> ${tempoFormatado}s </span> para solicitar o reenvio novamente.`;
}

function mudarSenha(email, novaSenha, senhaRepetida, token){
  const redefineSenhaJson={
    email: email,
    newPassword: novaSenha,
    repeatPassword: senhaRepetida,
    token: token
  }
  console.log(redefineSenhaJson);
  redefinirSenha(redefineSenhaJson).then(response => {
      sessionStorage.setItem("menssagem-confirmacao", "Sua senha foi alterada com sucesso!")
      window.location.href="login.html";
    
}).catch(error=>{
  alerta("danger", error.message, alert);
})
}

function configuracoes(){
  if ( emailUsuario && sessionStorage.getItem("email")){
    email = sessionStorage.getItem("email");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("cadastro");
    emailUsuario.textContent=email
  }
  else if (sessionStorage.getItem("cadastro")){
    email= JSON.parse(sessionStorage.getItem("cadastro")).loginDto.login;
    emailUsuario.textContent=email
  }
  else{
    window.location.href= "login.html"
  }
  
  if (senha && senhaRepetida) {
    senha.addEventListener("keyup", ()=>{ verificarCampo(senha)});
    senhaRepetida.addEventListener("keyup", ()=>{ verificarCampo(senhaRepetida)});
    olhoSenha(senha);
  }
  enviarOuReenviar(); 
}
