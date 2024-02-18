// import React, { useRef, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { getCookiesByName } from "../utils/formsUtils.js";

// const Login = () => {
//   const formRef = useRef(null);
//   const navigate = useNavigate();
//   const [error, setError] = useState(null);
//   const [userRole, setUserRole] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(formRef.current);
//     const data = Object.fromEntries(formData);

//     try {
//       const response = await fetch("http://localhost:4000/api/sessions/login", {
//         method: "POST",
//         headers: {
//           "Content-type": "application/json",
//         },
//         body: JSON.stringify(data),
//       });

//       if (response.status === 200) {
//         const { token } = await response.json();
//         getCookiesByName("jwtCookie", token); // Seteamos la cookie con el token
//          // Redirigir después del inicio de sesión exitoso
//          const role = token === "admin_token" ? "admin" : "user";
//          setUserRole(role); // Establecer el rol del usuario
//         // Redirigir después del inicio de sesión exitoso
//         navigate("/products-and-cart");
//       } else {
//         setError(
//           "Credenciales inválidas. Por favor, verifica tu email y contraseña."
//         );
//       }
//     } catch (error) {
//       console.error("Error en la solicitud:", error);
//     }
//   };

//   return (
//     <div className="container">
//       <h2>Formulario de Login</h2>
//       <form onSubmit={handleSubmit} ref={formRef}>
//         <div className="col-md-6">
//           <label htmlFor="email" className="form-label">
//             Email:
//           </label>
//           <input type="email" name="email" className="form-control" />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="password" className="form-label">
//             Password:
//           </label>
//           <input type="password" name="password" className="form-control" />
//         </div>
//         <div className="mt-3">
//           <button type="submit" className="btn btn-info">
//             Iniciar Sesion
//           </button>
//         </div>
//       </form>
//       {error && (
//         <div className="alert alert-danger" role="alert">
//           {error}
//         </div>
//       )}
//       <p>
//         ¿Olvidaste tu contraseña?{" "}
//         <Link to="http://localhost:5173/password-recovery">
//           Recuperar contraseña
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

import React, { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = () => {
  const formRef = useRef(null);
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const data = Object.fromEntries(formData);
    try {
      const { success, message, data: responseData } = await login(data.email, data.password);

      if (success) {
        console.log(responseData);
        if (responseData.rol === "admin") {
          navigate("/new-product");
        } else {
          navigate("/products-and-cart");
        }
      } else {
        setError(message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setError("Ocurrió un error al iniciar sesión. Por favor, inténtalo nuevamente.");
    }
  };

  return (
    <div className="container">
      <h2>Formulario de Login</h2>
      <form onSubmit={handleSubmit} ref={formRef}>
        <div className="col-md-6">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input type="email" name="email" className="form-control" />
        </div>
        <div className="col-md-6">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input type="password" name="password" className="form-control" />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-info">
            Iniciar Sesion
          </button>
        </div>
      </form>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      <p>
        ¿Olvidaste tu contraseña?{" "}
        <Link to="/password-recovery">
          Recuperar contraseña
        </Link>
      </p>
    </div>
  );
};

export default Login;
