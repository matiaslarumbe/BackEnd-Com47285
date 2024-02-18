
import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getCookiesByName } from "../utils/formsUtils.js";
import { useAuth } from "../contexts/AuthContext";

const NewProducts = () => {
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
  const { logout } = useAuth();


  const handleSumbit = async (e) => {
    e.preventDefault();
    const token = getCookiesByName("jwtCookie");
  
  if (!token) {
    console.error("Token no válido");
    return;
  }

    try {
      const response = await fetch("http://localhost:4000/api/products", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`, // Ajusta el formato del token JWT
          "Content-type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
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

  // Función para verificar si el usuario tiene el rol de admin
  const isAdmin = (token) => {
    if (!token || !token.rol) {
      return false;
    }
    return token.rol === "admin";
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

export default NewProducts;




