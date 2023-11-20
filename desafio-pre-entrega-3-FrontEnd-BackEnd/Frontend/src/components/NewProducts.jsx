// import { useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { getCookiesByName }  from "../utils/formsUtils.js"

// export const NewProducts = () => {
//     const formRef = useRef(null)
//     const navigate = useNavigate()
  
//   const handleSumbit = async (e) => {
//     e.preventDefault()
//     const datForm = new FormData(formRef.current)
//     const data = Object.fromEntries(datForm)
//     const token = getCookiesByName('jwtCookie')
//     console.log(token)
//     const response = await fetch('http://localhost:4000/api/products', {
//       method: 'POST',
//       headers: {
//         'Authorization': `${token}`,
//         'Content-type': 'application/json'
//       },
//       body: JSON.stringify(data)
//   })
  
//   if(response.status == 200) {
//       const datos = await response.json()
//       console.log(datos)
//   }else{
//     const datos = await response.json()
//     console.log(datos)
//   }

// }
  
// return (
//     <div className="container">
//       <h2>Creacion de nuevo producto</h2>
//       <form onSubmit={handleSumbit} ref={formRef}>
//       <div className="col-md-6">
//           <label htmlFor="title" className="form-label">
//             Nombre:
//           </label>
//           <input type="text" name="title" className="form-control"/>
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="description" className="form-label">
//             Description:
//           </label>
//           <input type="text" name="description" className="form-control" />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="category" className="form-label">
//             Categoria:
//           </label>
//           <input type="text" name="category" className="form-control" />
//         </div>
        
//         <div className="col-md-6">
//           <label htmlFor="code" className="form-label">
//             Codigo:
//           </label>
//           <input type="text" name="code" className="form-control" />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="price" className="form-label">
//             Precio:
//           </label>
//           <input type="number" name="price" className="form-control" />
//         </div>
//         <div className="col-md-6">
//           <label htmlFor="stock" className="form-label">
//             Stock:
//           </label>
//           <input type="number" name="stock" className="form-control" />
//         </div>
//         <div className="mt-3">
//           <button type="submit" className="btn btn-info">
//             Crear producto
//           </button>
//         </div>
//       </form>
//     </div>
//   )
// }
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookiesByName } from "../utils/formsUtils.js";

export const NewProducts = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    code: "",
    price: 0,
    stock: 0,
  });

  const formRef = useRef(null);
  const navigate = useNavigate();

  const handleSumbit = async (e) => {
    e.preventDefault();

    // Verificar si el token existe y es válido
    const token = getCookiesByName("jwtCookie");
    if (!token) {
      // Manejar el caso en el que el token no existe o no es válido
      console.error("Token no válido");
      return;
    }
    console.log("Token:", token);
    console.log("Data a enviar:", formData);

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          "Authorization": `${token}`,
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const datos = await response.json();
        console.log(datos);
        setFormData({
          title: "",
          description: "",
          category: "",
          code: "",
          price: 0,
          stock: 0,
        });
      } else {
        const datos = await response.json();
        console.log(datos);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="container">
      <h2>Creación de nuevo producto</h2>
      <form onSubmit={handleSumbit} ref={formRef}>
        <div className="col-md-6">
          <label htmlFor="title" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="description" className="form-label">
            Descripción:
          </label>
          <input
            type="text"
            name="description"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="category" className="form-label">
            Categoría:
          </label>
          <input
            type="text"
            name="category"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="code" className="form-label">
            Código:
          </label>
          <input
            type="text"
            name="code"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="price" className="form-label">
            Precio:
          </label>
          <input
            type="number"
            name="price"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="stock" className="form-label">
            Stock:
          </label>
          <input
            type="number"
            name="stock"
            className="form-control"
            onChange={handleInputChange}
          />
        </div>
        <div className="mt-3">
          <button type="submit" className="btn btn-info">
            Crear producto
          </button>
        </div>
      </form>
    </div>
  );
};
