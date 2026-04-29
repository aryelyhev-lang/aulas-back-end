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

//ENDPOINTS             -> sempre escrever todas as assinaturas iguais entre get, post, select e delete
//exemplo de assinatura -> /v1/senai/locadora/filme 
//o unico momento que a assinatura muda ou se diferencia, é quando se tem 2 ou mais enpoints com get

//diz para o endpoint que ele terá como referencia o objeto que foi criado, ou seja o bodyParser
app.post('/v1/senai/locadora/filme', bodyParserJson, async function(request, response){

    //recebe o conteúdo dentro do body da requisição
    let dados           = request.body
    //recebe o content type da requisição para validar se é um json
    let contentType     = request.headers['content-type']
    let result          = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result) 
})

app.get('/v1/senai/locadora/filme', async function(request, response){
    
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

//tudo que é uma busca por ATRIBUTO chega via QUERY (exemplo: nome, cidade, estado)
//todo identificador ID é SEMPRE chega via parametro (só vem via parametro quando é id)
app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    let id          = request.params.id
    let result      = await controllerFilme.buscarFilme(id) //manda o id para a controller fazer a validação

    response.status(result.status_code)
    response.json(result)
})


 //existem dois verbos que representam o atualizar (put e patch)
 //put    -> altera todos os dados (faz um update geral)
 //patch  -> altera algo especifico
app.put('/v1/senai/locadora/filme/:id', bodyParserJson, async function(request, response){

    //variavel que recebe o contentType da requisição
    let contentType = request.headers['content-type']

    //recebe o id do registro a ser atualizado
    let id = request.params.id

    //recebe os dados enviados no corpo da requisição
    let dados = request.body

    //chama a função de atualizar na controller e encaminha os dados, id e content type
    //obedecendo a ordem de criação na funação da controller 
    let result = await controllerFilme.atualizarFilme(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

app.listen(8080, function () {
    console.log('Api funcionando e aguardando novas requisições ...')
})
