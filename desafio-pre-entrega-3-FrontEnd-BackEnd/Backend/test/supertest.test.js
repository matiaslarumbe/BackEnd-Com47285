import 'dotenv/config';
import { expect } from 'chai';
import mongoose from 'mongoose';
import supertest from 'supertest';
import initializePassport from '../src/config/passport.js';

const requester = supertest('http://localhost:4000');

before(async () => {
  initializePassport();
  await mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

    // ¡¡¡¡¡¡¡¡codigo que se vio en clase!!!!!!

// describe('Test Users Session api/session', function () {
//   let cookie = {};

//   it("Ruta: api/session/register con metodo POST", async () => {
//     const newUser = {
//       first_name: "martin",
//       last_name: "martinez",
//       email: "marti@marti.com",
//       password: "adjjahf98455222"
//     };

//     const { _body } = await requester.post('/api/sessions/register').send(newUser);
//     expect(_body.payload).to.be.ok;
//   }).timeout(5000); 

//   it("Ruta: api/session/login con metodo POST", async () => {
//     const user = {
//       email: "marti@marti.com",
//       password: "adjjahf98455222"
//     };

//     const resultado = await requester.post('/api/sessions/login').send(user);
//     const cookieResult = resultado.headers['set-cookie'][0];

//     cookie = {
//       name: cookieResult.split("=")[0],
//       value: cookieResult.split("=")[1]
//     };
//     expect(cookie.name).to.equal('coderCookie');
//     expect(cookie.value).to.be.ok;
//   }).timeout(5000); 

//   it("Ruta: api/session/current con metodo GET", async () => {
//     const { _body } = await requester.get('/api/sessions/current')
//       .set('Cookie', [`${cookie.name}=${cookie.value}`]);
//     expect(_body.payload.email).to.equal('marti@marti.com');
//   }).timeout(5000); 
  

  
//   });


describe('Test Users Session api/session', function () {
    let cookie = {};
  
    // Prueba para la ruta de registro
    it("Ruta: api/session/register con metodo POST", async () => {
      const newUser = {
        first_name: "Sandra",
        last_name: "Sanchez",
        email: "sa@sa.com",
        password: "sa@sa.com",
        age: "55"
      };
  
      const response = await requester.post('/api/session/register').send(newUser);
      
      // Verificaciones
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('payload').that.is.ok;
    });
  
    // Prueba para la ruta de inicio de sesión
    it("Ruta: api/session/login con metodo POST", async () => {
      const user = {
        email: "san@san.com",
        password: "sa@sa.com"
      };
  
      const response = await requester.post('/api/session/login').send(user);
      
      // Verificaciones
      expect(response.status).to.equal(200);
      expect(response.headers['set-cookie']).to.exist;
      
      const cookieResult = response.headers['set-cookie'][0];
      cookie = {
        name: cookieResult.split("=")[0],
        value: cookieResult.split("=")[1]
      };
  
      expect(cookie.name).to.equal('coderCookie');
      expect(cookie.value).to.be.ok;
    });
  
    // Prueba para obtener la sesión actual del usuario
    it("Ruta: api/session/current con metodo GET", async () => {
      const response = await requester.get('/api/session/current')
        .set('Cookie', [`${cookie.name}=${cookie.value}`]);
      
      // Verificaciones
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('payload');
      expect(response.body.payload.email).to.equal('san@san.com');
    });
  });