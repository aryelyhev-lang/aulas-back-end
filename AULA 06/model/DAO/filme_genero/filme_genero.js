/************************************************************************************
 * Objetivo: Arquivo responsavel pelo CRUD no banco de dados mySQL na tabela de relação entre filme e genero
 * Autor: Aryely Hevylyn
 * Data: 22/05/2026
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
const insertFilmeGenero = async function (filmeGenero) {

    try {

        let sql = `insert into tbl_filme_genero (
                            id_filme,
                            id_genero
                            )
                    values (
                            ${filmeGenero.id_filme},
                            ${filmeGenero.id_genero}
                            );` 

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

//função responsavel por atualizar um filme existente na tabela
const updadeFilmeGenero = async function (filmeGenero) {

    try {
        //script para atualizar os dados no banco de dados
        let sql = `update tbl_filme_genero set 
            id_filme                = ${filmeGenero.id_filme},
            id_genero               = ${filmeGenero.id_genero},

            where id = ${filmeGenero.id}` 

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
const selectAllFilmeGenero = async function () {
    try {
        
        let sql = `select * from tbl_filme_genero order by id desc`

        //execulta no banco de dados do script SQL para retornar os filmes
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

//função responsavel por retornar os dados do filme filtrando pelo id
const selectByIdFilmeGenero = async function (id) {
    try {

        let sql = `select * from tbl_filme_genero where id=${id}`

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

//função responsavel por receber o id do genero e retornar as caracteristic do filme 
const selectFilmesByIdGenero = async function (idGenero) {
    try {
        //dividindo o select em 3 partes 
        //select tbl_filme.* -> devolvendo TODAS as caracteristicas do filme
        //relacionando as tabelas filme e genero com a tabela intermediaria filme_genero
        let sql =   `select tbl_filme.*
                        from tbl_filme
                            inner join tbl_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero 
                                on tbl_genero.id = tbl_filme_genero.id_genero

                     where tbl_genero.id=${idGenero}`   //filtrando pela chave primaria direto na tabela
                                                        //da a devolutiva dos dados do filme, filtrando pelo id do genero

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

//função responsavel por receber o id do filme e retornar as caracteristic do genero 
const selectGenerosByIdFilme = async function (idGenero) {
    try {
        
        let sql =   `select tbl_genero.*
                        from tbl_filme
                            inner join tbl_filme_genero
                                on tbl_filme.id = tbl_filme_genero.id_filme
                            inner join tbl_genero 
                                on tbl_genero.id = tbl_filme_genero.id_genero

                     where tbl_filme.id=${idFilme}`   //filtrando pela chave primaria direto na tabela
                                                        //da a devolutiva dos dados do filme, filtrando pelo id do genero

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
const deleteFilmeGenero = async function (id) {

    try {
        
        let sql = `delete from tbl_filme_genero where id=${id}`

        //execulta o knex
        let result = await knexConex.raw(sql)

        //validação para verificar se o result é verdadeiro ou não. 
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        return false
    }

}

//exportando todas as funções que foram criadas 
module.exports = {
    insertFilmeGenero,
    updadeFilmeGenero,
    selectAllFilmeGenero,
    selectByIdFilmeGenero,
    deleteFilmeGenero,
    selectGenerosByIdFilme,
    selectFilmesByIdGenero
}

