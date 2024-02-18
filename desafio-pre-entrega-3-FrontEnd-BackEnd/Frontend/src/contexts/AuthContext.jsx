

// import React, { createContext, useState, useContext, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCookiesByName } from '../utils/formsUtils';

// const URL = import.meta.env.MONGO_URL || "http://localhost:4000";
// const AuthContext = createContext();

// const AuthProvider = ({ children }) => {
   
//     const [token, setToken] = useState(null);
//     const [initialized, setInitialized] = useState(false);
//     const [redirectPath, setRedirectPath] = useState(null); // Asegúrate de incluir setRedirectPath aquí
//     const navigate = useNavigate();

//     useEffect(() => {
//         const initializeToken = () => {
//             const storedToken = getCookiesByName('jwtCookie');
    
//             try {
//                 if (storedToken) {
//                     const userObject = JSON.parse(atob(storedToken.split('.')[1])).user;
//                     setToken(userObject);
//                     console.log('Token:', userObject);
//                 }
//             } catch (error) {
//                 console.error('Error parsing token:', error);
//             } finally {
//                 setInitialized(true); 
//             }
//         };
//         if (!initialized) {
//             initializeToken();
//         }
//     }, [initialized]);

//     useEffect(() => {
//         if (token && redirectPath) {
//             navigate(redirectPath);
//             setRedirectPath(null);
//         }
//     }, [token, redirectPath, navigate]);

//     const login = async (email, password) => {
//         try {
//             const response = await fetch(`${URL}/api/sessions/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ email, password }),
//             });

//             if (response.ok) {
//                 const data = await response.json();
//                 if (data.rol === "admin") {
//                     setRedirectPath("/new-product");
//                 } else {
//                     setRedirectPath("/products-and-cart");
//                 }
//                 return { success: true, data };
//             } else {
//                 const error = await response.text();
//                 return { success: false, message: error };
//             }
//         } catch (error) {
//             console.error("Error al iniciar sesión:", error);
//             return { success: false, message: "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente." };
//         }
//     };

//     const logout = () => {
//         document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
//         setToken(null);
//     };

//     const handleNonJSONResponse = async (response) => {
//         const text = await response.text();
//         console.error("Error en la respuesta:", text);
//     };

//     return (
//         <AuthContext.Provider value={{ token, login, logout, setRedirectPath }}> {/* Asegúrate de incluir setRedirectPath aquí */}
//             {children}
//         </AuthContext.Provider>
//     );
// };


// const useAuth = () => {
//     const context = useContext(AuthContext);
//     if (!context) {
//         throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
//     }
//     return context;
// };

// export { AuthProvider, useAuth };

import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCookiesByName } from '../utils/formsUtils';

const URL = import.meta.env.MONGO_URL || "http://localhost:4000";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [initialized, setInitialized] = useState(false);
    const [redirectPath, setRedirectPath] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeToken = () => {
            const storedToken = getCookiesByName('jwtCookie');
    
            try {
                if (storedToken) {
                    const userObject = JSON.parse(atob(storedToken.split('.')[1])).user;
                    console.log("Token de usuario:", userObject);
                    setToken(userObject);
                }
            } catch (error) {
                console.error('Error parsing token:', error);
            } finally {
                setInitialized(true); 
            }
        };
        if (!initialized) {
            initializeToken();
        }
    }, [initialized]);

    useEffect(() => {
        if (token && redirectPath) {
            navigate(redirectPath);
            setRedirectPath(null);
        }
    }, [token, redirectPath, navigate]);

    const login = async (email, password) => {
        try {
            const response = await fetch(`${URL}/api/sessions/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.rol === "admin") {
                    setRedirectPath("/new-product");
                } else {
                    setRedirectPath("/products-and-cart");
                }
                return { success: true, data };
            } else {
                const error = await response.text();
                return { success: false, message: error };
            }
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            return { success: false, message: "Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente." };
        }
    };

    const logout = () => {
        document.cookie = 'jwtCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, setRedirectPath }}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
    }
    return context;
};

export { AuthProvider, useAuth };
