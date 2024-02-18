import mongoose from "mongoose";
import { userModel } from "../src/models/users.models.js";
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(process.env.MONGO_URL)


describe('Test CRUD de Usuarios en la ruta api/users', function () {
    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a arrancar cada uno de los test
    beforeEach(() => {
        console.log("Comienza test!")
    })

    it('Obtener todos los usuarios mediante metodo GET', async () => {
        const users = await userModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })

    it('Obtener un usuario mediante metodo GET', async () => {
        const user = await userModel.findById('65124bd5a5a1407e4a243bcd')

        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un usuario mediante metodo POST', async () => {
        const newUser = {
            first_name: "Ramiro",
            last_name: "Ramirez",
            email: "rara@rara.com",
            password: "@arakr234341d@@"
        }

        const user = await userModel.create(newUser)

        assert.ok(user._id)
    })

    it('Actualizar un usuario mediante metodo PUT', async () => {
        const udpateUser = {
            first_name: "Fran",
            last_name: "Fran",
            email: "franco@fran.com",
            password: "@arakr234341d@@"
        }

        const user = await userModel.findByIdAndUpdate("65124bd5a5a1407e4a243bcd", udpateUser)

        assert.ok(user._id)
    })

    it('Eliminar un usuario mediante metodo DELETE', async () => {

        const resultado = await userModel.findByIdAndDelete("651cef0dc57ea8aa676c9ec9")

        assert.strictEqual(typeof resultado, 'object')
    })


})