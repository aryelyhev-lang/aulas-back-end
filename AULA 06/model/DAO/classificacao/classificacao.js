/************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados mySQL na tabela classificação
 * Autor: Aryely Hevylyn
 * Data: 13/05/2026
 * Versão: 1.0
 * **********************************************************************************/

//import da biblioteca 
const knex = require('knex')

//import do arquivo de configuração para conexão do banco de dados mySQL
const knexConfig = require('../../database_config_knex/knexFile.js')
const { json } = require('body-parser')
const { ERRO_BAD_REQUEST } = require('../../../controller/modulo/configMessages.js')

//Criar a conexão com o banco de dados mySQL
const knexConex = knex(knexConfig.development)


const insertClassificacao = async function (classificacao) {

    try {

        let sql = `insert into tbl_classificacao (

	        sigla,
            descricao,
            foto,
            idade_minima

        ) values(
                '${classificacao.sigla}',
                '${classificacao.descricao}', 
                '${classificacao.foto}',
                '${classificacao.idade_minima}'
        );`

        // execulta o scriptSQL no banco de dados 
        // await -> aguarde a resposta/devolutiva do banco
        let result = await knexConex.raw(sql)

        if (result)
            //retorna o id gerado pelo banco de dados (isso é feito pelo knex)
            return result[0].insertId 
        else
            return false //banco de dados rejeita

    } catch (error) {

        console.log(error)  //sempre que der um bug no DAO, dar um console.log na variavel error do trycatch
        return false        //rejeita caso tenha algum bug na aplicação
                        
    }

}

const updateClassificacao = async function (classificacao) {

    try {

        //script para realizar a atualização de uma tabela 
        let sql = `update tbl_classificacao set
            sigla           = '${classificacao.sigla}',
            descricao       = '${classificacao.descricao}',
            foto            = '${classificacao.foto}',
            idade_minima    =  ${classificacao.idade_minima} 
            where id        =  ${classificacao.id}` //id é um atributo do tipo inteiro e por isso não precisa colocar entre aspas
        
            console.log(sql)
         //execulta o script SQL do DB
         let result = await knexConex.raw(sql)

         if (result)
             return true
         else
             return false
 
    } catch (error) {
        console.log(error)
        return false
    }
}

//lista todas as classificações cadastradas
const selectAllClassificacao = async function () {
    try {
    
        let sql = `select * from tbl_classificacao order by id desc`

        //execulta no banco de dados do script SQL para retornar as classificações
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

//exiber uma classificação pelo id
const selectByIdClassificacao = async function (id) {

    try {
        //select where -> buscar a classificação pelo id
        let sql = `select * from tbl_classificacao where id=${id}`

        //execulta o knex
        let result = await knexConex.raw(sql)

        if (Array.isArray(result)) {
            return result[0]
        } else {
            return false
        }

    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteClassificacao = async function (id) {
    try {
        //busca uma classificação pelo id dentro da tabela de classificação e faz o delete 
        let sql = `delete from tbl_classificacao where id=${id}`

        //execulta o knex
        let result = await knexConex.raw(sql)

        //validação para verificar se o result é verdadeiro ou nãoh. 
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
    insertClassificacao,
    updateClassificacao,
    selectAllClassificacao,
    selectByIdClassificacao,
    deleteClassificacao
}