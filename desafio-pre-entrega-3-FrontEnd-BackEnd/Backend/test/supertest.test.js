import "dotenv/config";
import { expect } from 'chai';
import mongoose from "mongoose";
import supertest from "supertest";

const requester = supertest('http://localhost:4000');

before(async () => {
    await mongoose.connect(process.env.MONGO_URL);
});

let cookie = {};

describe('Test Users Session api/session', function () {
    this.timeout(15000);

    it("Ruta: api/session/register con metodo POST", async () => {
        const newUser = {
            firstName: "mat",
            lastName: "matias",
            age: 28,
            email: "mat@matias.com",
            password: "ahiahiahi"
        };

        const response = await requester.post('/api/session/register').send(newUser);
        
        // Verifica si la respuesta tiene el formato esperado
        expect(response.body).to.be.ok;
    });

    it("Ruta: api/session/login con metodo POST", async () => {
        const user = {
            email: "admin@admin.com",
            password: "admin"
        };

        const response = await requester.post('/api/session/login').send(user);
        
        // Verifica si la respuesta tiene el formato esperado y contiene el token
        expect(response.body).to.be.ok;
        expect(response.body.token).to.be.ok;

        cookie = {
            name: "token",
            value: response.body.token
        };
    });

    it("Ruta: api/session/current con metodo GET", async () => {
        const response = await requester.get('/api/session/current')
            .set('Authorization', `Bearer ${cookie.value}`);

        // Verifica si la respuesta tiene el formato esperado y contiene la propiedad 'user'
        expect(response.body).to.be.ok;
        expect(response.body.user).to.be.ok;
        expect(response.body.user.email).to.equal('admin@admin.com');
    });
});

describe('Test Products api/products', function () {
    it("Ruta: api/products con metodo GET", async () => {
        const response = await requester.get('/api/products');

        // Verifica si la respuesta tiene el formato esperado y contiene la propiedad 'payload'
        expect(response.body).to.be.ok;
        expect(response.body.payload).not.to.deep.equal([]);
    });

    it("Ruta: api/products con metodo GET (por ID)", async () => {
        const productId = '65766e9922edd16f2f0d6bd9';
        const response = await requester.get(`/api/products/${productId}`);

        // Verifica si la respuesta tiene el formato esperado y contiene la propiedad 'mensaje'
        expect(response.body).to.be.ok;
        expect(response.body.mensaje).to.have.property('_id');
    });

    it('Crear un producto mediante POST', async () => {
        const product = {
            title: "pistacho indu",
            description: "made in india",
            price: 2000,
            stock: 5,
            category: "fruto-seco",
            code: "Pist555"
        };

        const response = await requester.post('/api/products')
            .send(product)
            .set('Authorization', `Bearer ${cookie.value}`);

        // Verifica si la respuesta tiene el formato esperado
        expect(response.body).to.be.ok;
    });
});

describe('Test Carts api/carts', function () {
    it("Ruta: api/cart con metodo GET", async () => {
        const response = await requester.get('/api/carts')
            .set('Authorization', `Bearer ${cookie.value}`);

        // Verifica si la respuesta tiene el formato esperado y contiene la propiedad 'payload'
        expect(response.body).to.be.ok;
        expect(response.body.payload).not.to.deep.equal([]);
    });

    it("Ruta: api/carts con metodo GET (por ID)", async () => {
        const cartId = '659b7db737b7236c4240cafc';
        const response = await requester.get(`/api/carts/${cartId}`);

        // Verifica si la respuesta tiene el formato esperado y contiene la propiedad 'mensaje'
        expect(response.body).to.be.ok;
        expect(response.body.mensaje).to.have.property('_id');
    });
});
