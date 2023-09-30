const socket = io();
document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const firstName = document.getElementById('first_name').value;
        const lastName = document.getElementById('last_name').value;
        const age = document.getElementById('age').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        // Enviar la solicitud POST al servidor para registrar al usuario
        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                first_name: firstName,
                last_name: lastName,
                age: age,
                email: email,
                password: password 
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultado === 'Registro exitoso') {
                alert('Registro exitoso. Inicia sesión para continuar.');
                window.location.href = '/rutaLogin'; // Redirigir al usuario a la página de inicio de sesión
            } else {
                alert('Error en el registro. Inténtalo de nuevo.');
            }
        })
        .catch(error => {
            console.error('Error al registrar al usuario:', error);
        });
    });
});
