import { apiClient } from "./apiClient.js";

export async function loginApi(credenciais) {
    return await apiClient("/login", {
        method: "POST",
        body:  JSON. stringify(credenciais)
    } );}

