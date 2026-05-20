/************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados mySQL na tabela sexo
 * Autor: Aryely Hevylyn
 * Data: 20/05/2026
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

const insertSexo = async function (sexo){

    try {
       
        let sql = `insert into tbl_sexo (sexo) values ('${sexo.sexo}');`
        
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
        return false 
    }

}

const updadeSexo = async function (sexo){

    try {
        //script para atualizar os dados no banco de dados
        let sql = `update tbl_sexo set 
            sexo                = '${sexo.sexo}',
            where id            =  ${sexo.id}` //id é um atributo do tipo inteiro e por isso não precisa colocar entre aspas


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

const selectAllSexo = async function (){

}

const selectByIdSexo = async function (id){

}
   
const deleteSexo = async function (id) {

}



module.exports = {
    insertSexo,
    updadeSexo,
    selectAllSexo,
    selectByIdSexo,
    deleteSexo
}