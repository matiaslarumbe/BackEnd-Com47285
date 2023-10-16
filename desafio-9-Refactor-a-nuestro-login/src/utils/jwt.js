
import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
    /*
    
    */
    const token = jwt.sign({user}, process.env.JWT_SECRET, {expiresIn: '12h'})
    console.log(token)
    return token
}

// generateToken({"_id": "651cef0dc57ea8aa676c9ec9","first_name":"juan","last_name":"perez","age":"29","email":"juan@perez.com","password":"$2b$16$Hjyn/L136PhJhJe0x9L4r.ay7FvwoEjXOlADWU0gPdSmCgsQWs7rG","rol":"user","__v": "0" })

export const authToken = (req, res, next) => {
    const authHeader = req.headers.Authorization

    if(!authHeader) {
        return res.status(401).send({error: 'Usuario no autenticado'})
    }

    const token = authHeader.split(' ')[1]
    jwt.sign(token. process.env.JWT_SECRET, (error, credential) => { 
        if(error) {
            return res.status(403).send ({error: 'Usuario no autorizado, token invalido'})
        }

    })

    req.user = credential.user 
    next()

}