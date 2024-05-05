const formulario = document.querySelector(".formulario");
const reenviarEmail = document.querySelector("[reenviar]");
const reenviarLink = document.getElementById("reenviar-link");
const emailUsuario = document.getElementById("email-usuario");
let tempoDecorridoSegundos = 25;
let nIntervId=null;
// emailUsuario.textContent= JSON.parse(localStorage.getItem("cadastro")).email;
if (localStorage.getItem("tempoDecorrido") == null)
  localStorage.setItem("tempoDecorrido", tempoDecorridoSegundos);

formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  if (formulario.checkValidity()) {
    window.location.href = "index.html";
  }
});

const contagemRegressiva = () => {
  if (tempoDecorridoSegundos <= 0) {
    localStorage.setItem("tempoDecorrido",localStorage.getItem("tempoDecorrido")*1.5 | 0);
    clearInterval(nIntervId);
    nIntervId=null;
    reenviarEmail.innerHTML = `Não recebeu o email? <a href="#" id="reenviar-link">Reenviar</a>`;
    return;
  }
  tempoDecorridoSegundos -= 1;
  initinalTimer();
};
function cronometroReenviar() {
  if (!nIntervId) {
    tempoDecorridoSegundos =  localStorage.getItem("tempoDecorrido");
    nIntervId = setInterval(contagemRegressiva, 1000);
  }
}
reenviarLink.addEventListener("click", cronometroReenviar);


function initinalTimer() {
  const tempo = new Date(tempoDecorridoSegundos * 1000);
  const tempoFormatado = tempo.toLocaleTimeString("pt-Br", {
    second: "2-digit",
  });
  reenviarEmail.innerHTML = `Espere <span class="fw-bold"> ${tempoFormatado}s </span> para solicitar o reenvio novamente.`;
}
