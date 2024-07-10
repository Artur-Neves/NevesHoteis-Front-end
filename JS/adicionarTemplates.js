import { decodeJwt } from "./Utils/decodeJWT.js";
const usuario = decodeJwt(localStorage.getItem("refreshToken"));
console.log(usuario);

export function carregarTemplates() {
  const login = usuario ? "header-login.html" : "header-logout.html";
  fetch(`./templates/${login}`)
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("headerContainer").innerHTML = html;
    })
    .then(function () {
      preConfiguracoes();
      escolherModo(usuario);
    });

  fetch("./templates/footer.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("footerContainer").innerHTML = html;
    });
}

function preConfiguracoes() {
  const navbar = document.getElementById("navbarSupportedContent");
  const button = document.querySelector("[button-hamburgier]");
  button.addEventListener(
    "click",
    ajustandoBotaoHamburgues.bind(null, navbar, button)
  );
}

function escolherModo(usuario) {
  if (usuario) {
    const list = document.getElementById("funcionalidades_conta");
    switch (usuario.perfil) {
      case "USER":
        templateUsuario(list);
        break;
      case "EMPLOYEE":
        templateFuncionario(list);
        break;
      case "ADMIN":
        templateAdmin(list);
        break;
      default:
        console.error("error no perfil do usuario");
        break;
    }
    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
      localStorage.removeItem("authToken");
      localStorage.removeItem("refreshToken");
    });
  }
}
function templateUsuario(list) {
  const meusAgendamentos = document.createElement("li");
  meusAgendamentos.innerHTML =
    '<li class="menu__list-item "><a href="./formularioMinhaConta.html" class="menu__list-link  offcanvas__link-item">Meus agendamentos</a></li>';
  const itensSalvos = document.createElement("li");
  itensSalvos.innerHTML =
    '<li class="menu__list-item "><a href="./formularioMinhaConta.html" class="menu__list-link  offcanvas__link-item">Itens salvos</a></li>';
  list.appendChild(meusAgendamentos);
  list.appendChild(itensSalvos);
}
function templateFuncionario(list) {
  const criarHostadias = document.createElement("li");
  criarHostadias.innerHTML =
    '<li class="menu__list-item "><a href="./formularioHotel.html" class="menu__list-link  offcanvas__link-item">Criar hoteis </a></li>';
  const gerenciarHostadias = document.createElement("li");
  gerenciarHostadias.innerHTML =
    '<li class="menu__list-item "><a href="./tabelaHotel.html" class="menu__list-link  offcanvas__link-item">Gerenciar hoteis </a></li>';
  list.appendChild(criarHostadias);
  list.appendChild(gerenciarHostadias);
}
function templateAdmin(list) {
  templateFuncionario(list);
  const cadastrarFuncionarios = document.createElement("li");
  cadastrarFuncionarios.innerHTML =
    '<li class="menu__list-item "><a href="./formularioFuncionario.html" class="menu__list-link  offcanvas__link-item">Cadastrar funcionários </a></li>';
  const gerenciarFuncionarios = document.createElement("li");
  gerenciarFuncionarios.innerHTML =
    '<li class="menu__list-item "><a href="./tabelaFuncionario.html" class="menu__list-link  offcanvas__link-item">Gerenciar funcionários </a></li>';
  list.appendChild(cadastrarFuncionarios);
  list.appendChild(gerenciarFuncionarios);
}

function ajustandoBotaoHamburgues(navbar, button) {
  if (navbar.classList.contains("d-flex") || button == null) {
    setTimeout(() => {
      navbar.classList.remove("d-flex");
    }, 300);
  } else {
    navbar.classList.add("d-flex");
  }
}
