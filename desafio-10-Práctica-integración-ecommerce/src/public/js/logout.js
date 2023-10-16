const socket = io();
document.addEventListener('DOMContentLoaded', function () {
    const logoutButton = document.getElementById('logoutButton');

    logoutButton.addEventListener('click', function () {
        // Realizar una solicitud GET al servidor para cerrar la sesión del usuario
        fetch('/logout', {
            method: 'GET'
        })
        .then(response => response.json())
        .then(data => {
            if (data.resultado === 'Usuario deslogueado') {
                // Redirigir al usuario a la página de inicio después de cerrar sesión
                window.location.href = '/rutaLogin';
            } else {
                alert('Error al cerrar sesión.');
            }
        })
        .catch(error => {
            console.error('Error al cerrar sesión:', error);
        });
    });
});
