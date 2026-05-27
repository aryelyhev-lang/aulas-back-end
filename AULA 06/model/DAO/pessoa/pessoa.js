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
                            id_sexo				
                        ) values (
	                        '${pessoa.nome}',
                            '${pessoa.data_nascimento}',
                            '${pessoa.biografia}',
                            '${pessoa.foto}',
                            '${pessoa.id_sexo}'
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

    try {
        //script para atualizar os dados no banco de dados
        let sql = `update tbl_genero set
                    
                            nome                ='${pessoa.nome}',				
                            data_nascimento     ='${pessoa.data_nascimento}',		
	                        biografia           ='${pessoa.biografia}',			
                            foto                ='${pessoa.foto}',				
                            id_sexo             =${pessoa.id_sexo}
                            where id            =${pessoa.id}`

        //executa o script SQL no BD
        let result = await knexConex.raw(sql)
    
        if (result) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        return false
    }

}

//função responsavel por retornar todos os dados da tabela de casatro
const selectAllCadastro = async function () {

    try {
        //Script para retornar todos os cadastros
        let sql = 'select * from tbl_pessoa order by id'

        //Executa no banco de dados o script SQL para retornar os cadastros
        let result = await knexConex.raw(sql)

        //Validação para verificar se o retorno no BD é um array
        //Se o scriptSQL der erro, o banco não devolve um array
        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }
    } catch (error) {

    }
}

//função responsavel por retornar os dados do cadastro filtrando pelo id
const selectByIdCadastro = async function (id) {

    try {
        let sql = `select * from tbl_pessoa where id=${id}`

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

//função responsavel por excluir um cadastro pelo id
const deleteCadastro = async function (id) {

    try {
        let sql = `delete from tbl_pessoa where id=${id}`

        let result = await knexConex.raw(sql)

        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }
}


module.exports = {
    insertCadastro,
    updadeCadastro,
    selectAllCadastro,
    selectByIdCadastro,
    deleteCadastro
}




