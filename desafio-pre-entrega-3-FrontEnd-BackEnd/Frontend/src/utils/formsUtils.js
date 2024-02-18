// export const getCookiesByName = (name) => {
//     const cookies = document.cookie.split(';');
//     for (let i = 0; i < cookies.length; i++) {
//         const cookie = cookies[i].trim()
//         if (cookie.startsWith(name + "=")) {
//             return cookie.substring(name.length + 1)
//         } 
//     }
//     return null
// }
export const getCookiesByName = (name) => {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.startsWith(name + "=")) {
            const cookieValue = cookie.substring(name.length + 1);
            try {
                // Intenta parsear el valor de la cookie como JSON
                return JSON.parse(decodeURIComponent(cookieValue));
            } catch (error) {
                console.error('Error al parsear el token:', error);
                return null;
            }
        } 
    }
    return null;
};
