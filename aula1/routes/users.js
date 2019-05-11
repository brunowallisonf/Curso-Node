const express = require('express');
const router = express.Router()
const users = require('../model/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const config = require('../config/config')()
// FUNCOES AUXILIARES
const createUsertoken = (userId) => {
    return jwt.sign({ id: userId },config.tokenKey , { expiresIn: config.expires })
}
router.get('/', async (req, res) => {
    try {
        const usersobj = await users.find({});
        return res.send(usersobj)
    } catch (error) {
        console.log(error)
        return res.status(500).send({ erro: 'Erro na consulta de usuario' })
    }
})


router.post('/create', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send({ erro: "Preencha corretamente os campos" })
        }
        const user = await users.findOne({ email })
        if (user) {
            return res.status(400).send({ status: "Usuario ja registrado" })
        }
        const data = users.create({ email, password })

        return res.status(201).send({ user: data, token: createUsertoken(data.id) })

    } catch (error) {
        console.log(error)
        return res.status(500).send(error)
    }
})

router.post('/auth', async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).send({ status: 'ERROR -  Dados insuficientes' })

        const data = await users.findOne({ email }).select('+password')

        if (!data) return res.status(400).send({ status: "Dados invalidos" })

        const same = bcrypt.compare(password, data.password)

        if (!same) return res.status(401).send({ status: "Erro ao autenticar usuario" })
        data.password = undefined
        return res.send({ user: data, token: createUsertoken(data.id) })

    } catch (error) {
        console.log('error')
        res.status(500).send(error)
    }
})
module.exports = router