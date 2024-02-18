import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, Button, Container, Row, Col, Table } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";

const ProductsAndCart = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const { token } = useAuth();
  const isLoggedIn = !!token;

  const addToCart = (product) => {
    console.log("Agregando al carrito:", product);
    if (!isLoggedIn) {
      return;
    }
    
    const existingProduct = cart.find((item) => item._id === product._id);
  
    if (existingProduct) {
      const updatedCart = cart.map((item) =>
        item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCart(updatedCart); // Actualizar el estado utilizando una función de actualización
      console.log("El carrito ha sido actualizado:", updatedCart);
    } else {
      const newProduct = { ...product, quantity: 1 };
      setCart((prevCart) => [...prevCart, newProduct]); // Actualizar el estado utilizando una función de actualización
      console.log("El carrito ha sido actualizado:", [...cart, newProduct]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/products");
        if (response.ok) {
          const productsData = await response.json();
          setProducts(productsData);
        } else {
          console.error("Error al obtener productos desde el servidor");
        }
      } catch (error) {
        console.error("Error de red al obtener productos:", error);
      }
    };
    fetchProducts();
  }, [cart]);

  return (
    <Container>
      <h1>Productos</h1>
      {!isLoggedIn && (
        <Button as={Link} to="/login" className="mb-3">
          Iniciar sesión
        </Button>
      )}
      <Row>
        {products.map((product) => (
          <Col key={product._id} md={4}>
            <Card>
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Precio: {product.price}</Card.Text>
                <Button onClick={() => addToCart(product)}>Agregar al Carrito</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Visualización del carrito */}
      <div className="mt-5">
        <h2>Carrito de Compras</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
              {cart.map((item, index) => (
               <tr key={index}>
                  <td>{item.title}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.quantity * item.price}</td>
                </tr>
             ))}
            </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default ProductsAndCart;

