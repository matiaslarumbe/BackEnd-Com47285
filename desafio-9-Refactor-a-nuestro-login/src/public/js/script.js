const socket = io();

const botonChat = document.getElementById('botonChat');
const parrafosMensajes = document.getElementById('parrafosMensajes');
const valInput = document.getElementById('chatBox');
let user = '';

function obtenerUsuario() {
    return new Promise((resolve, reject) => {
        Swal.fire({
            title: "Identificacion de usuario",
            text: "Por favor ingrese su nombre de usuario",
            input: "text",
            inputValidator: (valor) => {
                return !valor && "Ingrese su nombre de usuario valido";
            },
            allowOutsideClick: false
        }).then(resultado => {
            user = resultado.value;
            console.log(user);
            resolve();
        });
    });
}

async function iniciarChat() {
    await obtenerUsuario();

    botonChat.addEventListener('click', () => {
        let fechaActual = new Date().toLocaleString();

        if (valInput.value.trim().length > 0) {
            socket.emit('mensaje', { fecha: fechaActual, user: user, mensaje: valInput.value });
            valInput.value = '';
        }
    });

    socket.on('mensajes', (arrayMensajes) => {
        parrafosMensajes.innerHTML = '';
        arrayMensajes.forEach(mensaje => {
            parrafosMensajes.innerHTML += `<p>${mensaje.fecha}: el usuario ${mensaje.user} escribió ${mensaje.mensaje} </p>`;
        });
    });
}

iniciarChat();
