export async function apiClient(endpoint,options,contentType){
    const baseUrl = 'http://localhost:8080';
    const url = `${baseUrl}${endpoint}`;
    const token =  localStorage.getItem("authToken");
    const headers = { };
    if(!contentType){
        headers['Content-Type']= 'application/json'}

   
    if(token){
        headers['Authorization'] = `Bearer ${token}`;
    }
    
    let response = await fetch(url, {
        headers: headers,
        ...options
    });
    try{
        switch (response.status) {
            case 401:
                headers['Authorization']= "";
                const refreshResponse = await fetch(`${baseUrl}/user/refresh`, {
                method: 'POST',
                headers: headers,
            
                body: JSON.stringify({
                    token: localStorage.getItem("refreshToken")})
            });
          
                if (refreshResponse.ok) {
                    console.log("caindo aqui")
                    const accessToken = await refreshResponse.json();
                    const token = accessToken.token;
                    localStorage.setItem("authToken", token);
                    headers['Authorization'] = `Bearer ${token}`;
                    response = await fetch(url,  {
                        headers: headers,
                        ...options
                    })
            
                }
                else{
                  //  window.location.href = "login.html";
                }
            break;
            case 403:
                window.location.href= "403Error.html";
                break;
        }
    const isJson = response.headers.get('content-type')?.includes('application/json');
    const data = isJson ? await response.json() : null;
  
    if (!response.ok) {
        if (data && data.message) {
            let message;
            message = (data.field) ? `${data.field}, ${data.message}` : data.message
            throw new Error(message);
        } else {
            throw new Error('Erro ao processar a requisição');
        }
    }
        return data;
    } catch (error) {
        throw error;
    }
   
}