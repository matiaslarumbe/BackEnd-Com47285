import 'dotenv/config';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { expect } from 'chai';
import supertest from 'supertest';
import initializePassport from '../src/config/passport.js';
import { generateToken, authToken } from '../path-to-your-token-file'; // Asegúrate de proporcionar la ruta correcta




dotenv.config();

let test_product_id = null;
let test_product_code = null;
let token = null;

const api = supertest('http://localhost:4000');

before(async () => {
    initializePassport();
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

const user = {
    "_id": "651cef0dc57ea8aa676c9ec9",
    "first_name": "juan",
    "last_name": "perez",
    "age": "29",
    "email": "juan@perez.com",
    "password": "$2b$16$Hjyn/L136PhJhJe0x9L4r.ay7FvwoEjXOlADWU0gPdSmCgsQWs7rG",
    "rol": "user",
    "__v": "0"
};

token = generateToken(user);



describe('test CRUD de las ruta /api/products', function () {

    before(() => {
        console.log('before the test');
    });
    

    describe('ruta api/products metodo post', function () {

        it('iniciar sesion con post a traves de /sessions/login', async function () {
            this.timeout(5000);
            const user = {
                email: 'jorge@jorge.com',
                password: '123456',
            };

            
            const { statusCode, body, ok } = await api.post('/sessions/login').send(user);
            token = body.token;
            // Verificar si el token está definido antes de utilizarlo
            if (token) {
                expect(statusCode).to.be.equal(200);
                expect(token).to.be.ok;
            } else {
                throw new Error('Token no definido');
            }
        });

        it('crear un producto mediante post ', async function () {
            this.timeout(5000);
            const newproduct = {
                title: 'Producto de prueba',
                description: 'Descripcion de producto de prueba',
                price: 100,
                stock: 10,
                code: 'zxx1234',
                category: 'Destilados',
            };
            const { statusCode, body, ok } = await api.post('/products').set('Authorization', `Bearer ${token}`).send(newproduct);
            test_product_id = body._id;
            test_product_code = body.code;
            expect(statusCode).to.be.equal(201);
            expect(body).to.have.property('_id');
        });

        it('actualizar producto mediante PUT en /products/:id', async function () {
            this.timeout(5000);
            const product = {
                title: 'Producto modificado',
                description: 'Descripcion de producto de prueba',
                price: 100,
                stock: 1000,
                code: 'zxx1234',
                category: 'Destilados',
            };
            const { statusCode, body, ok } = await api.put(`/products/${test_product_code}`).set('Authorization', `Bearer ${token}`).send(product);
            expect(statusCode).to.be.equal(200);
            expect(body).to.have.property('stock').to.be.equal(1000);
        });

        it('obtener un producto por id', async function () {
            this.timeout(5000);
            const { statusCode, body, ok } = await api.get(`/products/${test_product_id}`).set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
            expect(body).to.have.property('_id');
            expect(body).to.have.property('code').to.be.equal(test_product_code);
        });

        it('obtener todos los productos', async function () {
            this.timeout(5000);
            const { statusCode, body, ok } = await api.get('/products').set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
            expect(body).not.to.be.deep.equal([]);
        });

        it('Eliminar el producto creado con DELETE en /products/:id', async function () {
            this.timeout(5000);
            const { statusCode, body, ok } = await api.delete(`/products/${test_product_id}`).set('Authorization', `Bearer ${token}`);
            expect(statusCode).to.be.equal(200);
        });
    });
});
