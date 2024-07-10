
    export  function decodeJwt(token) {
        if(token)
        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
            const decodedToken = JSON.parse(jsonPayload);
            let usuario;
            return  usuario = {
            username: decodedToken.sub, 
            perfil: decodedToken.role  
        };
        } catch (e) {
            return null;
        }
    }



