const env = process.env.NODE_ENV || 'dev'

const config = () =>{
    console.log('Iniciando a api em ambiente ', env.toUpperCase())
    switch (env){
        case 'dev': return{
            bdString: 'mongodb+srv://admin:88130279@cluster0-rxn8r.mongodb.net/test?retryWrites=true',
            tokenKey: '88130279',
            expires: '7d'
        }
        case 'hml':
            return {
                bdString: 'mongodb+srv://admin:88130279@cluster0-rxn8r.mongodb.net/test?retryWrites=true',
                tokenKey: '88130279',
                expires: '7d'
            }
        case 'prod': 
            return {
                bdString: 'mongodb+srv://admin:88130279@cluster0-rxn8r.mongodb.net/test?retryWrites=true',
                tokenKey: '88130279',
                expires: '7d'
            }
    }
    
}

module.exports = config