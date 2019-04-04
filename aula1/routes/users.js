const express = require('express');
const router = express.Router()
const users = require('../model/user')

router.get('/',(req, res) => {
    users.find({},(err,data) => {
        if(err) return res.send({erro:'Erro na consulta de usuario'})
        return res.send(data)
    })
    
})

router.post('/create',(req, res) => {
    const {email,password} = req.body;
    if(!email || !password){
        return res.send({erro: "Preencha corretamente os campos"})
    }

    users.findOne({email},(error,data) => {
        if(error){
            res.send({erro: 'Erro ao busca usuario'})
        }
        if(data){
            res.send({erro:'Usuario ja registrado'})
        }
    })
    users.create({email,password},(err,data) =>{
        if(err)
            return res.send({erro:'Erro ao criar usuario'})
            data.password = undefined
        return res.send(data)
    })
    

})


module.exports = router