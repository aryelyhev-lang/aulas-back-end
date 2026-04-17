/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud de filmes
 * data: 17/04/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

//import das dependencias para criar a API
const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

//import das controllers do projeto 
const controllerFilme = require('./controller/filme/controller_filme.js')

//criando um objeto para manipular dados do body da API em formato JSON 
const bodyParserJson = bodyParser.json()

//criando um objeto para manipular o express
const app = express()

//conjunto de permissões a serem aplicadas no cors da API 
const corsOpitons = {
    origin: ['*'],  //a origem da requisção, podendo ser um ip ou um * que significa todos
    methods: 'GET, POST, PUT, DELETE, OPTIONS', //são os verbos que serão liberados na api (get, post, put e delete)
    allowedHeaders: ['Content-type', 'Autorization'] //permissões de cabeçalho do cors 
}

app.use(cors(corsOpitons))

//ENDPOINTS
//diz para o endpoint que ele terá como referencia o objeto que foi criado, ou seja o bodyParser
app.post('/v1/senai/locadora/filme', bodyParserJson, async function(request, response){

    //recebe o conteúdo dentro do body da requisição
    let dados = request.body

    let result = await controllerFilme.inserirNovoFilme(dados)

    response.status(result.status_code)
    response.json(result) 
})

app.listen(8080, function () {
    console.log('Api funcionando e aguardando novas requisições ...')
})
