import { apiClient } from "./apiClient.js";
export async function buscarTodos() {
  return await apiClient("/simple-user", {  });
}
export async function cadastrarUsuario(credenciais) {
  return await apiClient("/simple-user", {
    method: "POST",
    body: JSON.stringify(credenciais),
  });
}
export async function atualizarUsuario(id, credenciais) {
  return await apiClient(`/simple-user/${id}`, {
    method: "PUT",
    body: JSON.stringify(credenciais),
  });
}
export async function buscarPorId(id) {
  return await apiClient(`/simple-user/${id}`, {});
}
export async function deletar(id) {
  return await apiClient(`/simple-user/${id}`, {
    method: "DELETE",
  });
}

