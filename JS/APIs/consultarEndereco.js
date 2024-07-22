  
const cep = document.getElementById("inputCep");
const estado = document.getElementById("inputEstado");
const bairro = document.getElementById("inputBairro");
const cidade = document.getElementById("inputCidade");
const logadouro = document.getElementById("inputLogadouro");


if (cep && estado){
buscarEstados();
estado.addEventListener("click", buscarCidade);
}

async function buscarEstados(){
    try {
      estado.innerHTML="<option value='0' selected>Seleciona um estado</option>";
      const primese = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
      const json = await primese.json();
      let listUfsOrdenados =json.sort((uf1,uf2)=> uf1.nome.localeCompare(uf2.nome));
      listUfsOrdenados.forEach(element => {
        estado.innerHTML+= `<option value='${element.sigla}' id='${element.id}'>${element.sigla}</option>`;
      });
    } catch (error) {
      console.log(error);
    }
  }
export async function buscarCidade(){
  let ufEscolhido = Array.from(estado.children).find(child => child.value === estado.value).id;
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
export async function buscarInfoPorCep(cep){
    try{
    const primese = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const json = await primese.json();
    
    logadouro.value=((logadouro.validity.valueMissing) ? json.logradouro: logadouro.value );
    bairro.value=((bairro.validity.valueMissing) ? json.bairro: bairro.value );
    estado.value=json.uf
    if( cidade.value==0){
      await buscarCidade()
      cidade.value=json.localidade;
    }
    }
    catch(e){
      console.log(e);
    }
  }
