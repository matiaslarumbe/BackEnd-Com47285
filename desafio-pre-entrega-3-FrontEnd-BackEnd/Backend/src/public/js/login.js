const socket = io();
document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Enviar la solicitud POST al servidor para iniciar sesión
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: email, password: password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultado === 'Login válido') {
                // Redirigir al usuario a la página principal después de iniciar sesión
                window.location.href = '/rutaProductos';
            } else {
                alert('Error en el inicio de sesión. Verifica tus credenciales.');
            }
        })
        .catch(error => {
            console.error('Error al iniciar sesión:', error);
        });
    });
});
