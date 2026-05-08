/************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados mySQL na tabela pessoa
 * Autor: Aryely Hevylyn
 * Data: 08/05/2026
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

//função responsavel por inserir um cadastro de uma pessoa
const insertCadastro = async function (pessoa) {

    try {

        let sql = `insert into tbl_pessoa (

                            nome,				
                            data_nascimento,		
	                        biografia,			
                            foto,				
                            sexo				
                        ) values (
	                        '${pessoa.nome}',
                            '${pessoa.data_nascimento}',
                            '${pessoa.biografia}',
                            '${pessoa.foto}',
                            '${pessoa.sexo}'
                        );`

        console.log(sql)
        // execulta o scriptSQL no banco de dados 
        // await -> aguarde a resposta/devolutiva do banco
        let result = await knexConex.raw(sql)

        if (result)
            //retorna o id gerado pelo banco de dados (isso é feito pelo knex)
            return result[0].insertId 
        else
            return false //banco de dados rejeita

    } catch (error) {
        console.log(error)
        //fechamento do try catch
        return false    //rejeita caso tenha algum bug na aplicação
        //sempre que der um bug no DAO, dar um console.log na variavel error do trycatch

    }
        
}

//função responsavel por atualizar o cadastro de um pessoa
const updadeCadastro = async function (pessoa) {

}

//função responsavel por retornar todos os dados da tabela de casatro
const selectAllCadastro = async function () {

}


//função responsavel por retornar os dados do cadastro filtrando pelo id
const selectByIdCadastro = async function (id) {
   
}

//função responsavel por excluir um cadastro pelo id
const deleteCadastro = async function (id) {

}


module.exports = {
    insertCadastro,
    updadeCadastro,
    selectAllCadastro,
    selectByIdCadastro,
    deleteCadastro
}




    