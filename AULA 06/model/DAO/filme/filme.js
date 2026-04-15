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

//Criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)


//todas as funções devem conter async
//essa função sempre vai receber um parametro do tipo json
//função responsavel por inserir dados na tabela de filmes
const insertFilme = async function(filme){

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
                        '${filme.avaliacao}',
                        '${filme.valor}',
                        '${filme.capa}'
                        );`

    // execulta o scriptSQL no banco de dados 
    // await -> aguarde a resposta/devolutiva do banco
    let result = await knexConex.raw(sql)

    if (result)
        return true
    else 
        return false
}

//função responsavel por atualizar um filme existente na tabela
const updadeFilme = async function(filme){

}

//função responsavel por retornar todos os dados da tabela de filme
const selectAllFilme = async function(){

} 

//função responsavel por retornar os dados do filme filtrando pelo id
const selectByIdFilme = async function(id){

}

//função responsavel por excluir um filme pelo id
const deleteFilme = async function(id){

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
 */