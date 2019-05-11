const express = require('express');
const indexRoute = require('./routes/index')
const usersRoute = require('./routes/users')
const app = express();
const mongoose = require('mongoose');
const bodyPaser = require('body-parser')
const config = require('./config/config')()

const URL = config.bdString
const options = {reconnectTries: Number.MAX_VALUE,reconnectInterval: 500, poolSize: 5, useNewUrlParser: true}
mongoose.connect(URL,options);
mongoose.set('useCreateIndex',true)


mongoose.connection.on('error',(error) => {
    console.log('Erro na conexao com o Banco de dados')
})

mongoose.connection.on('disconnected', () => {
    console.log('Banco de dados desconectado')
})
mongoose.connection.on('connected',() =>{
    console.log('Banco de dados conectado')
})

//Body-Parser

app.use(bodyPaser.urlencoded({ extended:false }))
app.use(bodyPaser.json())
app.use('/',indexRoute)
app.use('/users',usersRoute)

app.listen(4000)

module.exports = app

