/************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados mySQL na tabela filme
 * Autor: Aryely Hevylyn
 * Data: 15/04/2026
 * Versão: 1.0
 * **********************************************************************************/

//import da biblioteca para gerenciar o banco de dados mySQL no node.js
const knex = require('knex')

//import do arquivo de configuração para conexão do banco de dados mySQL
const knexConfig = require('../../database_config_knex/knexFile.js')
const { json } = require('body-parser')
const { ERRO_BAD_REQUEST } = require('../../../controller/modulo/configMessages.js')

//Criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)


//todas as funções devem conter async
//essa função sempre vai receber um parametro do tipo json
//função responsavel por inserir dados na tabela de filmes
const insertFilme = async function (filme) {

    //estrutura do try catch -> mantem a aoi funcionano mesmo que envontre um erro
    //tudo que está dentro do try é a api
    try {

        //variavel responsável por inserir um novo registro na tabela "tbl_filme"
        //usando os valores das propriedades do objeto "filme".
        let sql = `insert into tbl_filme (
                            nome, 
                            data_lancamento, 
                            duracao, 
                            sinopse, 
                            avaliacao, 
                            valor, 
                            capa
                            )
                    values (
                            '${filme.nome}',
                            '${filme.data_lancamento}', 
                            '${filme.duracao}',
                            '${filme.sinopse}',
                            if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'), 
                            '${filme.valor}',
                            '${filme.capa}'
                            );`

        //o if do avaliação vem do my sql e permite que 0 seja igual a null 

        // execulta o scriptSQL no banco de dados 
        // await -> aguarde a resposta/devolutiva do banco
        let result = await knexConex.raw(sql)

        if (result)
            return true
        else
            return false //banco de dados rejeita

    } catch (error) {
        console.log(error)
        //fechamento do try catch
        return false    //rejeita caso tenha algum bug na aplicação
                        //sempre que der um bug no DAO, dar um console.log na variavel error do trycatch

    }

}


//função responsavel por atualizar um filme existente na tabela
const updadeFilme = async function (filme) {

    try {
        //script para atualizar os dados no banco de dados
        let sql = `update tbl_filme set 
            nome                = '${filme.nome}',
            data_lancamento     = '${filme.data_lancamento}',
            duracao             = '${filme.duracao}',
            sinopse             = '${filme.sinopse}',
            avaliacao           = if('${filme.avaliacao}' = '', null, '${filme.avaliacao}'),
            valor               = '${filme.valor}',
            capa                = '${filme.capa}'
            where id            = ${filme.id}` //id é um atributo do tipo inteiro e por isso não precisa colocar entre aspas


        //execulta o script SQL do DB
        let result = await knexConex.raw(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        return false
    }

}

//função responsavel por retornar todos os dados da tabela de filme
const selectAllFilme = async function () {
    try {
        //select * from_nomeDaTbl   -> seleciona todos os elementos da lista (retorna todos os filmes) 
        //oder by                   -> troca a ordem da lista por id
        //id desc                   -> id em ordem decrescente
        let sql = `select * from tbl_filme order by id desc`

        //execulta no banco de dados do script SQL para retornar os filmes
        let result = await knexConex.raw(sql)

        //aciona a classe array e chama o metodo isarray
        //para ele responder se o result é um array ou não (retorna um boleano)
        //se o script SQL der erro, o banco NÃO devolve um array
        //verificar se o knex retornou um array
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }


    } catch (error) {
        return false
    }
}


//função responsavel por retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function (id) {
    try {
        //select where -> buscar o filme pelo id
        let sql = `select * from tbl_filme where id=${id}`

        //execulta o knex
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}

//função responsavel por excluir um filme pelo id
const deleteFilme = async function (id) {

   try {
        //busca um filme pelo id dentro da tabela de filmes
        let sql = `select * from tbl_filme where id=${id}`

        //execulta o knex
        let filme = await knexConex.raw(sql)

        if (Array.isArray(filme)) {
            return result[0]
        } else {
            return false
        }

   } catch (error) {
        return false
   }

}

//exportando todas as funções que foram criadas 
module.exports = {
    insertFilme,
    updadeFilme,
    selectAllFilme,
    selectByIdFilme,
    deleteFilme
}

/**
    dependencias para se conectar com o banco 
  
      - sequeLize -> Foi uma das primeiras dependencias criadas para ser usada no node
      - prisma -> mais atualizado do que o sequeLize, porém está recebendo muitas atualizações que alteram os codigos
      - knex -> maior performance na execução de API's em relação aos anterioes
  
    Significado de CRUD no banco de dados 

      - create no banco de dados é conhecido como insert
      - read é select 
      - updade continua sendo update
      - delete continua como delete

      GET 

      200 -> tem dados (tudo okay)
      404 -> não tem dados
      500 -> erro na controller ou model
      400 -> requisição errada por parte do front
 */