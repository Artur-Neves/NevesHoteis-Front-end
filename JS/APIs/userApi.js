import { apiClient } from "./apiClient.js";
export async function loginApi(credenciais) {
    return await apiClient("/user/login", {
        method: "POST",
        body:  JSON. stringify(credenciais)
    } );}

export async function envairOuReenviarTokenEmail(tokenEmailDto){
    return await apiClient(`/email-token`, {
        method: "POST",
        body:  JSON. stringify(tokenEmailDto)
    } );}

export async function verifyTokenEmail(tokenEmailDto){
        return await apiClient(`/email-token/verify`, {
            method: "POST",
            body:  JSON. stringify(tokenEmailDto)
        } );}
export async function redefinirSenha(redefineSenhaJson){
    return await apiClient(`/user/redefine-password`, {
        method: "PUT",
        body:  JSON. stringify(redefineSenhaJson)
    } );}
export async function existUser(email){
        return await apiClient(`/user/${email}`);}

export async function buscarDadosMinhaConta(){
   return await apiClient(`/user/myAccount`);}

export async function atualizarDadosPessoaisConta(credenciais){
    return await apiClient(`/user/updatePersonalDataAccount`, {
        method: "PUT",
        body:  JSON. stringify(credenciais)
    } );}
    
export async function atualizarEnderecoConta(credenciais){
    return await apiClient(`/user/updateAddressAccount`, {
        method: "PUT",
        body:  JSON. stringify(credenciais)
    } );}
    


