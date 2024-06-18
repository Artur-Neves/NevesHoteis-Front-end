export async function apiClient(endpoint, options){
    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${endpoint}`;
    const token = localStorage.getItem("authToken");
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
    if (!response.ok) {
        return response.json().then(error => {
           console.log(error.field+"\n"+error.message)
        });
    }
    return await response.json();
}