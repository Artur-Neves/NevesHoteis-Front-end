
export function validarCPF(campo){
    const valor = pegarValorCpf(campo.value);
    return ((regraDoDecimoDigito(valor) && regraDoDecimoPrimeiroDigito(valor)) ? "":"CPF inválido");
    
}
function pegarValorCpf(campo){
    if(campo){
        if(campo.includes(".", 0) || campo.includes("-", 0)){
           campo = campo.replace(".", "");
           campo = campo.replace(".", "");
           campo = campo.replace("-", "");
        }
    }
    return campo;
}
function regraDoDecimoDigito(valor){
    let soma = 0;
    for (let index = 10; 1 < index; index--) {
       soma += parseInt(valor.charAt(10-index)) * index;
    }
    const resto = soma%11;
    return ((resto<=1 && (valor.charAt(9)==0)) || ((resto>= 2) && (11-resto==valor.charAt(9))));
}
function regraDoDecimoPrimeiroDigito(valor){
    let soma = 0;
    for (let index = 11; 1 < index; index--) {
       soma += parseInt(valor.charAt(11-index)) * index;
    }
    const resto = soma%11;
    return (valor.charAt(10)!="" &&(resto<=1 && (valor.charAt(10)==0)) || ((resto>= 2) && (11-resto==valor.charAt(10))));
}

