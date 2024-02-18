import React, { useState } from "react";

const PasswordRecovery = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/recovery/password-recovery", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setMessage("Correo de recuperación enviado. Por favor, revise su correo electrónico.");
        setIsSubmitted(true);
      } else {
        const data = await response.json();
        setMessage(data);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
    }
  };

  return (
    <div className="container">
      <h2>Recuperación de Contraseña</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Enviar Correo de Recuperación
        </button>
      </form>
      {message && <p className="mt-3">{message}</p>}
      {isSubmitted && (
        <div>
          <p>
            Se ha enviado un correo electrónico con un enlace para restablecer su contraseña.
            Siga las instrucciones en el correo electrónico para completar el proceso.
          </p>
        </div>
      )}
    </div>
  );
};

export default PasswordRecovery;
