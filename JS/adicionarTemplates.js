export function carregarTemplates(){

    fetch('./templates/header.html')
    .then(response =>
        response.text()
        )
    .then(html => {
         document.getElementById('headerContainer').innerHTML = html;

    }).then(function(){
        const navbar = document.getElementById("navbarSupportedContent");
        const button = document.querySelector("[button-hamburgier]");
        button.addEventListener("click", ajustandoBotaoHamburgues.bind(null, navbar, button));
});

    fetch('./templates/footer.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('footerContainer').innerHTML = html;
    });
}

function ajustandoBotaoHamburgues(navbar, button){
    if(navbar.classList.contains("d-flex") || button == null){
        setTimeout(() => {
            navbar.classList.remove("d-flex");
        }, 300);
    }
    else{
        navbar.classList.add("d-flex");
    }
}
