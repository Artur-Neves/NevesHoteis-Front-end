import { apiClient } from "./apiClient.js";
export async function   buscarTodosHoteis(size, page) {
  return await apiClient(`/hotel?size=${size}&page=${page}`, {  });
}
export async function cadastrarHotel(credenciais) {
  return await apiClient("/hotel", {
    method: "POST",
    body: JSON.stringify(credenciais),
  });
}
export async function atualizarHotel(id, credenciais) {
  return await apiClient(`/hotel/${id}`, {
    method: "PUT",
    body: JSON.stringify(credenciais),
  });
}
export async function buscarPorId(id) {
  return await apiClient(`/hotel/${id}`, {});
}
export async function deletarHotel(id) {
  return await apiClient(`/hotel/${id}`, {
    method: "DELETE",
  });
}
