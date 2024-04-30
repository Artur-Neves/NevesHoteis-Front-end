const buton = document.querySelector("[button-hamburgier]");
const navbar = document.getElementById  ("navbarSupportedContent");
buton.addEventListener("click", ajustandoBotaoHamburgues)

function ajustandoBotaoHamburgues(){
    if(navbar.classList.contains("d-flex") || buton ==null){
        setTimeout(() => {
            navbar.classList.remove("d-flex");
        }, 300);
    }
    else{
        navbar.classList.add("d-flex");
    }
}
