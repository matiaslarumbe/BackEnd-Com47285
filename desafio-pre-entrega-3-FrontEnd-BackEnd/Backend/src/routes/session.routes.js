import { Router } from "express";
import passport from "passport";
import { authorization, passportError } from "../utils/messagesError.js";
// import { generateToken } from "../utils/jwt.js"; Borrarlo?
import { login, logout, register, githubLogin, githubCallback, signup, testJWT, getCurrentUser, } from "../controllers/session.controllers.js"; // Me falta GithubCallback 

const sessionRouter = Router()

sessionRouter.post('/login', passport.authenticate('login'), login)
sessionRouter.get('/logout', logout)
sessionRouter.post('/register', passport.authenticate('register'), register)
sessionRouter.get('/github', passport.authenticate('github', {scope: ['user:email']}), githubLogin)
sessionRouter.post('/signup', signup)
sessionRouter.get('/testJWT', passport.authenticate('jwt', {session: false }), testJWT)
sessionRouter.get('/current', passportError('jwt'), authorization('user'), getCurrentUser)


export default sessionRouter
