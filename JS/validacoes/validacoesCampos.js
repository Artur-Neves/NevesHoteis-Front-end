import {validarCPF} from "./validarCPF.js"
import * as consultarEndereco from "/JS/APIs/consultarEndereco.js";
const requisitosSenha =document.querySelectorAll(".requisito-senha-item");
const olho = document.querySelector(".olho");
const data_nascimento = document.querySelector("[campo='data_de_nascimento']");
const select = document.querySelectorAll("select");
data_nascimento.setAttribute("max", new Date());
export let focus =true;
// descobrir o campo
 export function verificarCampo(campo, focus){
    switch (campo.getAttribute("campo")) {
        case "senha":
        verificarSenhaValido(campo);
        break;
        case "email":
          verificarCampoTextValido(campo, focus);
        break;
        case "username":
          verificarCampoTextValido(campo, focus);
        break;
        case "cpf":
          verificarCPF(campo);
        break;
        case "cep":
          verificarCEP(campo);
        break;
        case "data_de_nascimento":
          verificarDataDeNascimento(campo);
        break;
      default:
        new console.error();
        break;
    }}
// senha
function verificarSenhaValido(campo) {
    const proximoElemento =  campo.parentElement.nextElementSibling;
    proximoElemento.style.display= "block";
         const valorCampo = campo.value;
          requisitosSenha[1].style.color= (!valorCampo.match(/[a-z]+/) ? "red" : "green");
          requisitosSenha[2].style.color= (!valorCampo.match(/[A-Z]+/) ? "red" : "green");
          requisitosSenha[3].style.color= (!valorCampo.match(/[0-9]+/) ? "red" : "green");
          requisitosSenha[0].style.color= ((campo.validity.tooShort || campo.validity.valueMissing) ? "red" : "green");
          if(requisitosSenha.values().filter(req=>req.style.color=="red").length>0){
            campo.setCustomValidity("error");
            return
          } 
            campo.setCustomValidity('');
            campo.classList.remove("is-invalid");
      }
  
      export function olhoSenha(senha){
        olho.addEventListener('mousedown', function() {
          senha.type = 'text';
        });
        
        olho.addEventListener('mouseup', function() {
          senha.type = 'password';
        });
        
        olho.addEventListener('mousemove', function() {
          senha.type = 'password';
        });
        olho.addEventListener('touchstart', function() {
          senha.type = 'text';
        });
        
        olho.addEventListener('touchend', function() {
          senha.type = 'password';
        });
        
        olho.addEventListener('touchmove', function() {
          senha.type = 'password';
        });

      }
  
      //verificar texto válido
  function verificarCampoTextValido(campo, focus){
    const proximoElemento =  campo.parentElement.nextElementSibling;
      
    if (!campo.validity.valid && !focus) {
      campo.classList.add("is-invalid");
      proximoElemento.style.display= "block";
      return
    }
    campo.classList.remove("is-invalid");
    proximoElemento.style.display= "none";
  }

  //CPF
  function verificarCPF(campo){
   campo.setCustomValidity(validarCPF(campo));
  }

  //Data de nascimento
  function verificarDataDeNascimento(campo){
    console.log(new Date());
    const hoje = new Date();
    if (campo!=null){
      if (new Date(campo.value)>hoje.setFullYear(hoje.getFullYear()-10)){
        campo.setCustomValidity("você tem que possuir pelo menos 10 anos para ter uma conta neste site ");
        return;
      }
      campo.setCustomValidity("");
    }
  }
  // CEP
  function verificarCEP(campo){
    const value = campo.value;
    if(value.includes("-", 0)){
      value = value.replace("-", "");
    }

    if(value.length>8 || value.length<8){
      campo.setCustomValidity("tamanho pequeno");
      return
    }
    campo.setCustomValidity("");
    consultarEndereco.buscarInfoPorCep(value);
  }

  // validações select
  export function verificarOIndiceEscolhido(){
    select.forEach((item)=>{
      if (item.value==0){
        item.setCustomValidity("selecione um item");
      }
      else{
        item.setCustomValidity("");
      }

    })
  }

