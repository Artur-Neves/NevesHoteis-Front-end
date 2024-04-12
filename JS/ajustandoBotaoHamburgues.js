function ajustandoBotaoHamburgues() {
    if (navbar.classList.contains("d-flex") || buton == null) {
        setTimeout(() => {
            navbar.classList.remove("d-flex");
        }, 300);
    }
    else {
        navbar.classList.add("d-flex");
    }
}
