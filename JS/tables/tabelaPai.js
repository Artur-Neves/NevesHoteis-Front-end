import { carregarTemplates } from "../adicionarTemplates.js";
import { buscarTodosFuncionarios, deletarEmployee } from "../APIs/funcionarioApi.js";
import { buscarTodosHoteis, deletarHotel } from "../APIs/hotelApi.js";
import { buscarTodosAdmin, deletarAdmin } from "../APIs/adminApi.js";
const listaTabela = document.getElementById("list");
const proximo = document.getElementById("next");
const anterior = document.getElementById("prev");
const primeiro = document.getElementById("first");
const ultimo = document.getElementById("lasted");
const sublist = document.getElementById("sublist");
const modalRemoverText = document.getElementById("modalRemoverText");
const modalRemoverTitle = document.getElementById("modalRemoverTitle");
const btnRemover = document.getElementById("btnRemover");
const mapItens = new Map();
const btnCloseModal= document.getElementById("btnCloseModal");
let idEscolhido=0
var type;
var response;
let perPage = 5;
const state = {
  page: 1,
  perPage: perPage,
  totalPage: 1,
};
let data;
carregarTemplates();
async function buscarTodos() {
  try {
    if (response.content) {
      state.totalPage = response.totalPages;
      return response.content;
    }
  } catch (erro) {
    console.log("não foi!");
    console.log(erro);
  }
}

const controls = {
  next() {
    if (state.page < state.totalPage) state.page++;
    update();
  },
  prev() {
    if (state.page > 1) state.page--;
    update();
  },
  goTo(page) {
    if (page > 0 && page <= state.totalPage) state.page = page;
    update();
  },
  createListeners() {
    primeiro.addEventListener("click", () => {
      this.goTo(1);
    });
    ultimo.addEventListener("click", () => {
      this.goTo(state.totalPage);
    });
    proximo.addEventListener("click", this.next);
    anterior.addEventListener("click", this.prev);
    btnRemover.addEventListener("click", ()=>{removerEntidade(idEscolhido)})
  },
};
const list = {
  create(item, i) {
    const indice = ++i + state.perPage * (state.page - 1);
    const row = criarLinha(indice, item);
    listaTabela.innerHTML += row;
    mapItens.set(item.id, item.name);
  },
  update() {
    listaTabela.innerHTML = "";
    mapItens.clear()
    data.forEach(this.create);
  },
};

const buttons = {
  maxVisibleButtons: 4,
  create(page) {
    const li = document.createElement("li");
    li.classList.add("page-item");
    li.innerHTML = `<a class="page-link ">${page}</a>`;
    if (page == state.page) li.classList.add("active");
    li.addEventListener("click", () => {
      controls.goTo(page);
      update();
    });
    sublist.appendChild(li);
  },
  update() {
    sublist.innerHTML = "";
    const { maxLeft, maxRight } = this.calculedMaxVisible();
    console.log(maxLeft, maxRight);
    for (let page = maxLeft; page <= maxRight; page++) {
      this.create(page);
    }
  },
  calculedMaxVisible() {
    let maxLeft = state.page - Math.floor(this.maxVisibleButtons / 2);
    let maxRight = state.page + Math.floor(this.maxVisibleButtons / 2);
    if (maxLeft < 1) {
      maxLeft = 1;
      maxRight = this.maxVisibleButtons;
    }
    if (maxRight > state.totalPage) {
      maxLeft = state.totalPage - (this.maxVisibleButtons - 1);
      maxRight = state.totalPage;
      if (maxLeft < 1) maxLeft = 1;
    }
    return { maxLeft, maxRight };
  },
};

async function update() {
  await determinarType();
  data = await buscarTodos();
  list.update();
  buttons.update();
  atualizarItensDaList();
}

function atualizarItensDaList(){
  mapItens.keys().forEach((item)=>{
    document.getElementById(item).addEventListener("click", function(){
      modalRemoverText.textContent = `Ao clicar em 'confirmar' você assume a responsabilidade da exclusão do ${type} '${mapItens.get(item)}', não sendo possível reverter tal ação!`
      modalRemoverTitle.textContent = `Tem certeza que deseja excluir ${mapItens.get(item)}?`;
      idEscolhido=item
    })
  })
}
 async function removerEntidade(idEscolhido){
  if(idEscolhido!=0)
    switch (type) {
      case "funcionario":
        await deletarEmployee(idEscolhido).catch(console.log)
        break;
      case "admin":
        await deletarAdmin(idEscolhido).catch(console.log)
        break;
      case "hotel":
        await deletarHotel(idEscolhido).catch(console.log)
        break;
      default:
        console.log(type);
        break;
}
btnCloseModal.click();
await update();

}

async function determinarType(){
    switch (type) {
        case "funcionario":
          response = await buscarTodosFuncionarios(perPage, state.page - 1);
          break;
        case "admin":
          response = await buscarTodosAdmin(perPage, state.page - 1);
          break;
        case "hotel":
          response = await buscarTodosHoteis(perPage, state.page - 1);
          break;
        default:
          console.log(type);
          break;
}
}
function criarLinha (indice, item){
    switch (type) {
        case "funcionario":
          return `<tr>
                  <td>${indice}</td>
                  <td>${item.name}</td>
                  <td>${item.userDto.login}</td>
                  <td class='text-end'>${item.cpf}</td>
                  <td class='text-end'>${item.phone}</td>
                  <td class='text-center'>
                    <a href="formularioFuncionario.html?id=${item.id}" class="text-warning"
                      ><i class="bi bi-pencil-fill"></i
                    ></a>
                  </td>
                  <td class='text-center'>
                    <a href="" class="text-danger" data-bs-toggle="modal" id="${item.id}" data-bs-target="#staticBackdrop"
                      ><i class="bi bi-trash3-fill"></i
                    ></a>
                  </td>
                </tr>`;

        case "admin":
          return `<tr>
                  <td>${indice}</td>
                  <td>${item.name}</td>
                  <td>${item.userDto.login}</td>
                  <td class='text-end'>${item.cpf}</td>
                  <td class='text-end'>${item.phone}</td>
                  <td class='text-center'>
                    <a href="formularioAdmin.html?id=${item.id}" class="text-warning"
                      ><i class="bi bi-pencil-fill"></i
                    ></a>
                  </td>
                 <td class='text-center'>
                    <a href="" class="text-danger" data-bs-toggle="modal" id="${item.id}" data-bs-target="#staticBackdrop"
                      ><i class="bi bi-trash3-fill"></i
                    ></a>
                  </td>
                  </td>
                </tr>`;
        case "hotel":
          const date =  new Date(item.availabilityDate);
          const valorDiaria =  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
            item.dailyValue
          );
          return `<tr>
                  <td>${indice}</td>
                  <td>${item.name}</td>
                  <td class='text-center'>${date.toLocaleDateString('pt-BR', { timezone: 'UTC' })}</td>
                  <td class='text-end'>${valorDiaria}</td>
                  <td class='text-end'>${item.address.cep}</td>
                  <td class='text-center'>
                    <a href="formularioHotel.html?id=${item.id}" class="text-warning"
                      ><i class="bi bi-pencil-fill"></i
                    ></a>
                  </td>
                   <td class='text-center'>
                    <a href="" class="text-danger" data-bs-toggle="modal" id="${item.id}" data-bs-target="#staticBackdrop"
                      ><i class="bi bi-trash3-fill"></i
                    ></a>
                  </td>
                </tr>`;
          break;
        default:
          console.log(type);
          break;
}
}


export async function init(tipo) {
    type = tipo
  await determinarType()
  await update();
  controls.createListeners();
}