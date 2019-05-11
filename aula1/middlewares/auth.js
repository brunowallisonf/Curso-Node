const jwt = require('jsonwebtoken')
const config = require('../config/config')()
const auth = (req, res, next) =>{
    const token  = req.headers.auth;
    if(!token) return res.status(401).send({error: 'Autenticacao recusada'})
    jwt.verify(token,config.tokenKey,(error,decoded)=>{
        if(error) return res.status(401).send({error : 'ERROR: Token Invalido'})
        res.locals.auth = decoded
        return next()
    })

}
module.exports = auth