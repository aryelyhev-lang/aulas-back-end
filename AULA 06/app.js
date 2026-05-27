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
const controllerFilme               = require('./controller/filme/controller_filme.js')
const controllerPessoa              = require('./controller/pessoa/controller_pessoa.js')
const controllerClassificacao       = require('./controller/classificacao/controller_classificacao.js')
const controllerSexo                = require('./controller/sexo/controller_sexo.js')
const controllerGenero              = require('./controller/genero/controller_genero.js')

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

//--------------------------->inicia os endpoints da tabela FILME<----------------------------------
//diz para o endpoint que ele terá como referencia o objeto que foi criado, ou seja o bodyParser
//endpoint para inserir um filme
app.post('/v1/senai/locadora/filme', bodyParserJson, async function(request, response){

    //recebe o conteúdo dentro do body da requisição
    let dados           = request.body
    //recebe o content type da requisição para validar se é um json
    let contentType     = request.headers['content-type']
    let result          = await controllerFilme.inserirNovoFilme(dados, contentType)

    response.status(result.status_code)
    response.json(result) 
})

//endpoint para LISTAR todos os filmes
app.get('/v1/senai/locadora/filme', async function(request, response){
    
    let result = await controllerFilme.listarFilme()

    response.status(result.status_code)
    response.json(result)
})

//tudo que é uma busca por ATRIBUTO chega via QUERY (exemplo: nome, cidade, estado)
//todo identificador ID é SEMPRE chega via parametro (só vem via parametro quando é id)
//endpoint para BUSCAR um filme pelo id
app.get('/v1/senai/locadora/filme/:id', async function(request, response){
    let id          = request.params.id
    let result      = await controllerFilme.buscarFilme(id) //manda o id para a controller fazer a validação

    response.status(result.status_code)
    response.json(result)
})

//endpoint para DELETAR um filme pelo id
app.delete('/v1/senai/locadora/filme/:id', async function(request, response){
    let id = request.params.id //recebe o id do filme via parametro

    let result = await controllerFilme.excluirFilme(id)

    response.status(result.status_code)
    response.json(result)
})

 //existem dois verbos que representam o atualizar (put e patch)
 //put    -> altera todos os dados (faz um update geral)
 //patch  -> altera algo especifico
 //endpoint para ATUALIZAR um filme pelo id
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



//-------------------------->inicia os endpoints da tabela CADASTRO<----------------------------------
app.post('/v1/senai/locadora/cadastro', bodyParserJson, async function(request, response){

     let dados           = request.body
     let contentType     = request.headers['content-type'] //recebe o content type da requisição para validar se é um json
     let result          = await controllerPessoa.inserirNovoCadastro(dados, contentType)
 
     response.status(result.status_code)
     response.json(result) 
})



//-------------------------->inicia os endpoints da tabela CLASSIFICAÇÃO<------------------------------

//inserir nova classificação
app.post('/v1/senai/locadora/classificacao', bodyParserJson, async function(request, response){

    let dados           = request.body
    let contentType     = request.headers['content-type'] //recebe o content type da requisição para validar se é um json
    let result          = await controllerClassificacao.inserirClassificacao(dados, contentType)

    response.status(result.status_code)
    response.json(result) 
})

//atualiza uma classificação já existente 
app.put('/v1/senai/locadora/classificacao/:id', bodyParserJson, async function(request, response){

    //variavel que recebe o contentType da requisição
    let contentType = request.headers['content-type']

    //recebe o id do registro que será atualizado
    let id = request.params.id

    //recebe os dados enviados no corpo da requisição
    let dados = request.body

    //chama a função de atualizar na controller e encaminha os dados, id e content type
    //obedecendo a ordem de criação na funação da controller 
    let result = await controllerClassificacao.atualizarClassificacao(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//busca uma classificação pelo id
app.get('/v1/senai/locadora/classificacao/:id', async function(request, response){

    let id          = request.params.id
    let result      = await controllerClassificacao.buscarClassificacao(id) //manda o id para a controller fazer a validação

    response.status(result.status_code)
    response.json(result)
})

//endpoint para LISTAR todas as classificações
app.get('/v1/senai/locadora/classificacao', async function(request, response){
    
    let result = await controllerClassificacao.listarClassificacao()

    response.status(result.status_code)
    response.json(result)
})

//endpoint para DELETAR um filme pelo id
app.delete('/v1/senai/locadora/classificacao/:id', async function(request, response){
    let id = request.params.id //recebe o id da classificação via parametro

    let result = await controllerClassificacao.excluirClassificacao(id)

    response.status(result.status_code)
    response.json(result)
})



//-------------------------->inicia os endpoints da tabela SEXO<------------------------------

//INSERE um sexo
app.post('/v1/senai/locadora/sexo', bodyParserJson, async function(request, response){

    //recebe o conteúdo
    let dados           = request.body
    let contentType     = request.headers['content-type'] //recebe o content type da requisição para validar se é um json
    let result          = await controllerSexo.inserirNovoSexo(dados, contentType)

    response.status(result.status_code)
    response.json(result) 
})

//ATUALIZA um sexo
app.put('/v1/senai/locadora/sexo/:id', bodyParserJson, async function(request, response){

    
    let contentType = request.headers['content-type']
    let id = request.params.id
    let dados = request.body

    console.log(contentType)
    let result = await controllerSexo.atualizarSexo(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)
    
})

//BUSCA um sexo pelo id
app.get('/v1/senai/locadora/sexo/:id', async function(request, response){
    let id          = request.params.id
    let result      = await controllerSexo.buscarSexo(id) //manda o id para a controller fazer a validação

    response.status(result.status_code)
    response.json(result)
})

//LISTA todos os sexos cadastrados
app.get('/v1/senai/locadora/sexo', async function(request, response){
    
    let result = await controllerSexo.listarSexo()

    response.status(result.status_code)
    response.json(result)
})

// //DELETA um sexo pelo id
// app.delete('/v1/senai/locadora/sexo/:id', async function(request, response) {
    
//     let id = request.params.id

//     let result = await controllerSexo.excluirGenero(id)

//     response.status(result.status_code)
//     response.json(result)

// })



//-------------------------->inicia os endpoints da tabela GENERO<------------------------------

//INSERE um novo genero
app.post('/v1/senai/locadora/genero', bodyParserJson, async function (request, response) {

      //recebe o conteúdo
      let dados           = request.body
      let contentType     = request.headers['content-type'] //recebe o content type da requisição para validar se é um json

    let result = await controllerGenero.inserirNovoGenero()

    response.status(result.status_code)
    response.json(result)
})

//LISTA todos os generos
app.get('/v1/senai/locadora/genero', async function (request, response) {
    let result = await controllerGenero.listarGenero()

    response.status(result.status_code)
    response.json(result)
    
})

//BUSCA um genero pelo id
app.get('/v1/senai/locadora/genero/:id', async function (request, response) {
    let id = request.params.id
    
    let result = await controllerGenero.buscarGenero(id)

    response.status(result.status_code)
    response.json(result)
})

//ATUALIZA um genero pelo id
app.put('/v1/senai/locadora/genero/:id', bodyParserJson, async function(request, response) {
    
    //Recebe o contenty type da requisição
    let contentType = request.headers['content-type']

    //Receber o ID do registro a ser atulizado
    let id = request.params.id

    //Receber os dados enviados no corpo de requisição
    let dados = request.body

    //Chama a função de atualizar na controller e encaminhando os dados, id e content-type
    //obedecendo a ordem de criação na função da controller
    let result = await controllerGenero.atualizarGenero(dados, id, contentType)

    response.status(result.status_code)
    response.json(result)

})


//DELETA um genero pelo id
app.delete('/v1/senai/locadora/genero/:id', async function(request, response) {
    

    let id = request.params.id

    let result = await controllerGenero.excluirGenero(id)

    response.status(result.status_code)
    response.json(result)

})



app.listen(8080, function () {
    console.log('Api funcionando e aguardando novas requisições ...')
})


