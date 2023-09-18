const form = document.getElementById('idForm')
const botonProds = document.getElementById('botonProductos')
const socket = io()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    console.log(e.target)
    const datForm = new FormData(e.target)//genera un objeto iterador
    console.log(datForm.get('title'))
    const prod = Object.fromEntries(datForm)
    console.log(prod)
    socket.emit('nuevoProducto', prod)
    e.target.reset()
})

botonProds.addEventListener('click' , () => {
    socket.on('prods', (prods) => {
        console.log(prods)

    })

})