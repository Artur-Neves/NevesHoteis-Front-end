import { apiClient } from "./apiClient.js";
export async function buscarTodosAdmin(size, page) {
  return await apiClient(`/admin?size=${size}&page=${page}`, {  });
}
export async function cadastrarUsuario(credenciais) {
  return await apiClient("/admin", {
    method: "POST",
    body: credenciais
  }, true );
}
export async function atualizarAdmin(id, credenciais) {
  return await apiClient(`/admin/${id}`, {
    method: "PUT",
    body: credenciais
  }, true);
}
export async function buscarPorId(id) {
  return await apiClient(`/admin/${id}`, {});
}
export async function deletarAdmin(id) {
  return await apiClient(`/admin/${id}`, {
    method: "DELETE",
  });
}
