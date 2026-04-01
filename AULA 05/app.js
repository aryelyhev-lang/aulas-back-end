/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela criação da api do projeto de Estados e Cidades 
 * data: 01/04/2026
 * autor: aryely hevylyn
 * versão: 1.0
 * -----------------------------------------------------------------------------------------------------------------
 * instalação do EXPRESS - npm install express --save  
 *      a instalação deve ser feita sempre onde o arquivo app.js está (ou seja pasta aula 05)
 *      dependencia responsavel pela manipulação do protocolo http para a api
 * 
 * não mexer na pasta node_modules
 * package_look.json -> aponta tudo que tem no node module (não alterar esse arquivo)
 * package.json -> trás as dependencias que estão instaladas no seu projeto (nesse caso só tem o express e o cors instalado)
 * 
 * simbolo do ^ dentro do package_look.json
 *      esse acento significa que você está dixando o arquivo aberto paa novas atualizações do express
 *      se você retirar a seta, não será possivel realizar uma atualização (ideal retirar quando finalizar o projeto 100%)
 * 
 * instalação do cors - npm install cors --save
 *      são conjuntos de permissões que a gente libera no back end, para que o front faça as requisições atraves do http
 *      dependencia responsavel pelas configurações a serem realizadas
 *      para a permissão de acesso da api
 * ******************************************************************************************************************/

//import das dependencias para criar a API
const express   = require('express')
const cors      = require('cors')

//criando um objeto para manipular o express
const app = express()


//cria uma const, atribuir as permissões e depois enviar para o cors
//conjunto de permissões a serem aplicadas no cors da API 
const corsOpitons = {
    origin: ['*'],  //a origem da requisção, podendo ser um ip ou um * que significa todos
                    //por meio de um ip nenhuma outra máquina poderá fazer requisição na sua api
                    //pode ser atribuido mais de um ip para fazer as requisições da sua api
    methods: 'GET', //são os verbos que serão liberados na api (get, post, put e delete)
    allowedHeaders: ['Content-type', 'Autorization'] //permissões de cabeçalho do cors 
}

//configura as permissões da api atraves do cors
//app.use -> objeto para manipular o express
//cors -> biblioteca importada
//corsOpitons -> objeto que guarda as permissões
app.use(cors(corsOpitons)) 

//import do arquivo de funções 
const estadosCidades = require('./modulo/arquivos_funcoes.js')


//criando endpoints para a api = pontos de parada
//o app é uma função de call back
//essas funções de call back trabalham com
//response -> retornos da API (pode ser escrito como res)
//request -> são chegadas de dados na API (pode ser escrito como req)
app.get('/v1/senai/estados', function(request, response){

    //cria uma variavel que recebe a função getListaDeEstados
    //com o import que é uma constante estadosCidades
    let chamaEstados = estadosCidades.getListaDeEstados()

    //teste de respota da api
    response.json({chamaEstados})
    response.status(200)
    //sempre que o beck realizar um response
    //obrigatoriamente ele precisa mandar dois response para o front, um com o json e outro com status.code
    //status.code -> é um codigo que representa o que está acontecendo com sua api
    //ele retorna sempre um número

    /*  Respostas Informativas (100 – 199)
        Respostas bem-sucedidas (200 – 299)
        Mensagens de redirecionamento (300 – 399)
        Respostas de erro do cliente (400 – 499) <- erro no front ou o usuario
        Respostas de erro do servidor (500 – 599) <- erro no beck
        
        status code 200: 
            A solicitação foi bem-sucedida. O significado do resultado de "sucesso" depende do método HTTP:

                GET: O recurso foi obtido e transmitido no corpo da mensagem.
                HEAD: Os cabeçalhos de representação são incluídos na resposta sem nenhum corpo de mensagem.
                PUT ou POST: O recurso que descreve o resultado da ação é transmitido no corpo da mensagem.
                TRACE: O corpo da mensagem contém a mensagem de requisição recebida pelo servidor.

        status code 201: 
        
                A requisição foi bem sucedida e um novo recurso foi criado como resultado. 
                Esta é normalmente a resposta enviada após as solicitações POST ou 
                algumas solicitações PUT.*/
})

//endPoint que devolve true ou false
app.get('/v1/senai/dados/estado/:uf', function(request, response){

    let sigla = request.params.uf
    let estado = estadosCidades.getDadosEstado(sigla)

    response.json(estado)
    response.status(200)
    //criando variavel como parametro (ela deve ficar entre as barras)
    //ex: antes -> /v1/senai/dados/estado, depois -> /v1/senai/dados/estado/sp 
    //variaveis via parametros são encaminhadas por /: 
    //para ser uma variavel é OBRIGATORIO usar os :

    //como abrir no navegados http://localhost:8080/v1/senai/dados/estado/sp <- UF se tornou SP no front
    //nesse caso não irá aparecer nada no navegador
    //será retornado a varaiavel "uf" no terminal que nesse caso é SP 
    //console.log(request.params.uf) //params -> parametro
})

app.get('/cidades', function(request, response){

    //sempre usar aspas duplas ao criar um atributo
    //cada end point retorna um json
    //ao abrir no navegador, só mudará o eindPoint da url
    //http://localhost:8080/cidades -. de estados vai para cidades
    response.json({"message": "testando minha API de cidades"}) //chama a variavel dentro do json para imprimir o conteudo guardado
    response.status(200)
})

//serve para icializar a api para receber requisições (geralmente é colocado no fim do codigo)
//  8080 é a porta atribuida para ser usada na url dentro do navegador
//  para abrir no navegador http://localhost:8080/estados
//  localhost porque o arquivo está na maquina local
//  estados é o nome atribuido ao app.get no request e response
app.listen(8080, function(){
    console.log('Api funcionando e aguardando novas requisições ...')
})