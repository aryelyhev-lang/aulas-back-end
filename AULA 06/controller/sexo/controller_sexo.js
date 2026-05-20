/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud de sexo
 * data: 20/05/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

//import do arquivo de padronização de menssagens
const config_message = require('../modulo/configMessages.js')

//import do arquivo DAO para fazer o CRUD do sexo no banco de dados
const sexoDAO = require('../../model/DAO/sexo/sexo.js')


//função responsavel por inserir o cadastro de um novo sexo 
const inserirNovoSexo = async function (sexo, contentType) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(sexo)

            if (validar) {
                return validar //se o validar estiver como false retorna 400

            } else {
                //se estiver como true entra nesse bloco 

                //chama o dao e manda o objeto
                let result = await sexoDAO.insertSexo(sexo)
                console.log(sexo)

                //valida se o result deu certo ou não
                if (result) {
                    //201 = se inserir no banco volta true e imprime essa menssagem
                    sexo.id = result //criando o atributo ID no json do sexo e colocando o id gerado após o insert
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = sexo
                } else {
                    //500 = erro no servidor (erro na model)
                    return message.ERRO_INTERNAL_SERVER_MODEL
                }

                return message.DEFAULT_MESSAGE
            }

        } else {
            //tratamemto de tipo de dados do hearder request
            return message.ERRO_CONTENT_TYPE //erro 415
        }

    } catch (error) {
        //retorna um json para o app pois ele não sabe o que é false

        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 (controller)
    }

}

//função responsavel por atualizar um cadastro do sexo
const atualizarSexo = async function (sexo, id, contentType) {

    //clone da configMessage.js
    let message = JSON.parse(JSON.stringify(config_message))

    console.log(sexo)

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
              
            let resultBuscarId = await buscarSexo(id)

            if (resultBuscarId.status) {
                let validar = await validarDados(sexo)

                if (!validar) {

                    sexo.id = id

                    let result = await sexoDAO.updadeSexo(sexo)

                    
                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = sexo

                        return message.DEFAULT_MESSAGE 

                    } else {
                        return message.ERRO_INTERNAL_SERVER_MODEL 
                    }

                } else {
                    return validar //erro 400
                }

            } else {
                return resultBuscarId //retorna um erro 400, 404 ou 500 caso o status seja diferente de true
            }

        } else {
            return message.ERRO_CONTENT_TYPE //erro na content type 415
        }

    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }
}

//função responsavel por listar todos os cadastros de sexo
const listarSexo = async function () {

}

//função responsavel por buscar po um sexo
const buscarSexo = async function (id) {

}

//função responsavel por excluir um cadastro de sexo 
const excluirSexo = async function (id) {

}

//função responsavel por validar todos os dados 
const validarDados = async function (sexo) {

    //cria um clone da const de menssage
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação dos dados para os atributos do sexo (status 400)
    if (sexo.nome == undefined || sexo.nome == null || sexo.nome == "" || sexo.nome.length > 30) {

        message.ERRO_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else {
        return false
    }

}


module.exports = {
    inserirNovoSexo,
    atualizarSexo,
    listarSexo,
    buscarSexo,
    excluirSexo,

}