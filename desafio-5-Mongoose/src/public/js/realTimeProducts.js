
const form = document.getElementById('idForm');
const botonProds = document.getElementById('botonProductos');
const listaProductos = document.getElementById('listaProductos');
const socket = io();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const datForm = new FormData(e.target);
    const prod = Object.fromEntries(datForm);
    socket.emit('nuevoProducto', prod);
    e.target.reset();
});

botonProds.addEventListener('click', () => {
    console.log('Solicitando lista de productos...');
    socket.emit('solicitarProductos');
});

socket.on('prods', (prods) => {
    console.log('Recibiendo lista de productos:', prods);
    mostrarProductosEnPagina(prods);
});

socket.on('nuevoProducto', (producto) => {
    console.log('Nuevo producto recibido:', producto);
    agregarProductoAlDOM(producto);
});

function mostrarProductosEnPagina(productos) {
    listaProductos.innerHTML = ''; // Limpiar contenido anterior
    productos.forEach(producto => {
        agregarProductoAlDOM(producto);
    });
}

function agregarProductoAlDOM(producto) {
    const productoLi = document.createElement('li');
    productoLi.textContent = `Producto: ${producto.title}, Precio: ${producto.Price}`;
    listaProductos.appendChild(productoLi);
}

