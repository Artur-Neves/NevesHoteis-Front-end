const imagem = document.querySelector("#imagemAlert");
const tituloErro = document.querySelector("#tituloErro");
const menssagemErro = document.querySelector("#menssagemErro");
paginaDeConfirmacao("405",`Hoje eu desenvolvi uma tela que serve tanto para mostrar uma possível menssagem 
de erro como uma menssagem de confimação, ela não pode ser muito útil agora, mas com certeza será útil quando eu fizer
integração com o banco de dados`);
function paginaDeErro(titulo, menssagem){
    imagem.setAttribute("src", "./assets/img/cancelar.png");
    tituloErro.textContent= titulo;
    menssagemErro.textContent= menssagem;
}
function paginaDeConfirmacao(titulo, menssagem){
    document.body.style='height: 100vh; background: url("/assets/img/fundoVerde.jpg") no-repeat; background-position: center; background-size: cover;';
    tituloErro.style.color="green";
    imagem.setAttribute("src", "./assets/img/confirme.png");
    tituloErro.textContent= titulo;
    menssagemErro.textContent= menssagem;
}