import local from 'passport-local'
import passport from 'passport'
import GithubStrategy from 'passport-github2'
import jwt from 'passport-jwt'
import { createHash, validatePassword } from '../utils/bcrypt.js'
import {userModel} from '../models/users.models.js'
import 'dotenv/config'

const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const ExtractJWT = jwt.ExtractJwt


const initializePassport = () => {

    const cookieExtractor = req => {
        

        const token = req.headers.authorization ? req.headers.authorization : {}

        console.log("cookieExtractor", token)

        return token
    }

    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: process.env.JWT_SECRET
    }, async (jwt_payload, done) => {
        try{
            console.log("JWT", jwt_payload)
            return done(null, jwt_payload)

        } catch(error) {
            return done(error)
        }

    }))

    passport.use('register', new LocalStrategy(
        { passReqToCallback: true, usernameField: 'email' }, async (req, username, password, done) => {
            //Registro de usuario

            const { first_name, last_name, email, age } = req.body

            try {
                const user = await userModel.findOne({ email: email })

                if (user) {
                    //Caso de error: usuario existe
                    return done(null, false)
                }


                const passwordHash = createHash(password)
                const userCreated = await userModel.create({
                    first_name: first_name, 
                    last_name: last_name, 
                    email: email, 
                    age: age, 
                    password: passwordHash
                })

                return done(null, userCreated)

              } catch(error) {
                    return done(error)
              }

        }))

        passport.use('login', new LocalStrategy(
            { usernameField: 'email' }, async (email, password, done) => {
                try {
                    const user = await userModel.findOne({ email: email })
    
                    if (!user) {
                        return done(null, false)
                    }
    
                    if (validatePassword(password, user.password)) {
                        return done(null, user)
                    }
    
                    return done(null, false)
    
                } catch (error) {
                    return done(error)
                }
            }))


            passport.use('github', new GithubStrategy({
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.SECRET_CLIENT,
                callbackURL: process.env.CALLBACK_URL
            }, async(accessToken, refreshToken, profile, done) => {
                try {
                    console.log(accessToken)
                    console.log(refreshToken)
                    console.log(profile._json)

                    const user = await userModel.findOne({email: profile._json.email })
                    if(user) {
                        done(null, false)
                    } else{
                        const userCreated = await userModel.create({
                            first_name: profile._json.name,
                            last_name: ' ',
                            email: profile._json.email,
                            age: 18,
                            password: createHash(profile._json.email + profile._json.name)
                        })
                        done(null, userCreated)
                    }

                } catch(error){
                    done(error)
                }
            }))


            passport.serializeUser((user, done) => {
                done(null, user._id)
            })
        
            //Eliminar la session del user
            passport.deserializeUser(async (id, done) => {
                const user = await userModel.findById(id)
                done(null, user)
            })
        
        }
        //Recupero de contraseña
        passport.use('recovery', new LocalStrategy(
            { passReqToCallback: true, usernameField: 'email' }, 
            async (req, email, done) => {
                const { newPassword, newPassword2 } = req.body;
        
                if (newPassword !== newPassword2) {
                    return done(null, false, { message: 'Las contraseñas no coinciden' });
                }
        
                try {
                    const user = await userModel.findOne({ email });
        
                    if (!user) {
                        return done(null, false, { message: 'Usuario no encontrado' });
                    }
        
                    const passwordHash = createHash(newPassword);
                    console.log('Contraseña hasheada:', passwordHash);
        
                    user.password = passwordHash;
                    await user.save();
        
                    return done(null, user);
                } catch (error) {
                    console.error('Error al recuperar o guardar la contraseña:', error);
                    return done(error);
                }
            }
        ));
        
    
export default initializePassport


 