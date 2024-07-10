import {carregarTemplates} from "./adicionarTemplates.js";
import {buscarTodosHoteis} from "./APIs/hotelApi.js";

buscarTodosOsHoteis();
carregarTemplates();
function buscarTodosOsHoteis(){
    buscarTodosHoteis().then((result) => {
        console.log(result);
    }).catch((err) => {
        console.error(err);
    });
}
