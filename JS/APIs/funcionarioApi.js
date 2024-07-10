import { apiClient } from "./apiClient.js";
export async function buscarTodosFuncionarios(size, page) {
  return await apiClient(`/employee?size=${size}&page=${page}`, {  });
}
export async function cadastrarEmployee(credenciais) {
  return await apiClient("/employee", {
    method: "POST",
    body: JSON.stringify(credenciais),
  });
}
export async function atualizarEmployee(id, credenciais) {
  console.log(credenciais)
  return await apiClient(`/employee/${id}`, {
    method: "PUT",
    body: JSON.stringify(credenciais),
  });
}
export async function buscarPorId(id) {
  return await apiClient(`/employee/${id}`, {});
}
export async function deletarEmployee(id) {
  return await apiClient(`/employee/${id}`, {
    method: "DELETE",
  });
}
