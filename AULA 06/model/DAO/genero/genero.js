const knex = require('knex')

const knexConfig = require('../../database_config_knex/knexFile.js')

const knexConex = knex(knexConfig.development)

const insertGenero = async function (genero) {


    try {
        let sql = `insert into tbl_genero (nome_genero)
                    values(
                    '${genero.nome_genero}'
                    );`

    let result = await knexConex.raw(sql)
    
    if (result) {
        return result[0].insertId //retorna o ID gerado 
    } else {
        return false
    }

    } catch (error) {
        return false
    }

}


const selectAllGenero = async function () {
    try {
        //Script para retornar todos os filmes
        let sql = 'select * from tbl_genero order by id'

        //Executa no banco de dados o script SQL para retornar os filmes
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


const selectByIdGenero = async function (id) {

    try {
        let sql = `select * from tbl_genero where id=${id}`

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

const updateGenero = async function (genero) {

    try {
        let sql = `update tbl_genero set
                nome        ='${genero.nome}'
                where id    =${genero.id}`
        //executa o script SQL no BD
        let result = await knexConex.raw(sql)
    
        
        if (result) {
            return true
        } else {
            return false
        }
        
    } catch (error) {
        console.log(error)
        return false
    }
}


const deleteGenero = async function (id) {

    try {
        let sql = `delete from tbl_genero where id=${id}`

        let result = await knexConex.raw(sql)

        console.log(sql)
        if (result) {
            return true
        } else {
            return false
        }

    } catch (error) {
        console.log(error) //não está chegando aqui
        return false
    }

}

module.exports = {
    insertGenero,
    selectAllGenero,
    selectByIdGenero,
    updateGenero,
    deleteGenero
}