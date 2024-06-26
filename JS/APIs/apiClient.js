export async function apiClient(endpoint, options){
    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${endpoint}`;
    const token =  null;   //localStorage.getItem("authToken");
    const headers = {
        'Content-Type': 'application/json',
    };
    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    const response = await fetch(url, {
        headers: headers,
        ...options
    });
    try{
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
   
    if (!response.ok) {
        if (data && data.message) {
            throw new Error(data.message);
        } else {
            throw new Error('Erro ao processar a requisição');
        }
    }
        return data;
    } catch (error) {
        throw error;
    }
   
}