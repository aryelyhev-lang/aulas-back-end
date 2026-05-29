/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud da nacionalidade
 * data: 29/05/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

//import do arquivo de padronização de menssagens
const config_message = require('../modulo/configMessages.js')

//import do arquivo DAO para fazer o CRUD da nacionalidade no banco de dados
const nacionalidadeDAO = require('../../model/DAO/nacionalidade/nacionalidade.js')


//função responsavel por inserir o cadastro de uma nova nacionalidade 
const inserirNovaNacionalidade = async function (nacionalidade, contentType) {

    let message = JSON.parse(JSON.stringify(config_message))

    console.log(nacionalidade)
    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(nacionalidade)

            if (validar) {
                return validar //se o validar estiver como false retorna 400

            } else {
                //se estiver como true entra nesse bloco 

                //chama o dao e manda o objeto
                let result = await nacionalidadeDAO.insertNacionalidade(nacionalidade)

                //valida se o result deu certo ou não
                if (result) {
                    //201 = se inserir no banco volta true e imprime essa menssagem
                    nacionalidade.id = result //criando o atributo ID no json da nacionalidade e colocando o id gerado após o insert
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = nacionalidade
                    console.log(result)
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
        console.log(error)
        //retorna um json para o app pois ele não sabe o que é false
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 (controller)
    }

}

//função responsavel por atualizar um cadastro da nacionalidade
const atualizarNacionalidade = async function (nacionalidade, id, contentType) {

    //clone da configMessage.js
    let message = JSON.parse(JSON.stringify(config_message))

    console.log(nacionalidade)

    try {

        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let resultBuscarId = await buscarNacionalidade(id)

            if (resultBuscarId.status) {
                let validar = await validarDados(nacionalidade)

                if (!validar) {

                    nacionalidade.id = id

                    let result = await nacionalidadeDAO.updadeNacionalidade(nacionalidade)


                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = nacionalidade

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
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }
}

//função responsavel por listar todos os cadastros da nacionalidade
const listarNacionalidade = async function () {

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //chama a função do DAO para retornar a lista de todos as nascionalidades
        let result = await nacionalidadeDAO.selectAllNacionalidade()

        //validação para verificar se o DAO conseguiu processar os dados
        if (result) {
            //verificando se existe conteudo no array
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length //retorna a quantidade de sexos cadastrados dentro do banco de dados
                message.DEFAULT_MESSAGE.response.nacionalidade = result

                return message.DEFAULT_MESSAGE //status code 200 vai ser retornado um cabeçalho com as informações da api
            } else {
                return message.ERRO_NOT_FOUND //erro 404
            }

        } else {
            //retorna uma message status code 500 (erro na model)
            return message.ERRO_INTERNAL_SERVER_MODEL
        }

    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER
        //retorna uma message status code 500 (erro na controller)
    }

}

//função responsavel por buscar por uma nacionalidade
const buscarNacionalidade = async function (id) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //valida se o id está vazio ou se possui caracters
        if (id == undefined || id == null || id == "" || isNaN(id)) {
            message.ERRO_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        } else {

            let result = await nacionalidadeDAO.selectByIdNacionalidade(id)

            console.log(result)
            if (result) {

                if (result.length > 0) { //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.nacionalidade = result

                    return message.DEFAULT_MESSAGE //confirma que tudo deu certo (status code 200)
                } else {
                    return message.ERRO_NOT_FOUND //erro 404
                }

            } else {
                return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 do DAO (model)
            }

        }
    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}

//função responsavel por excluir um cadastro da Nacionalidade
const excluirNacionalidade = async function (id) {

    //faz o import das menssagens de status code
    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        //chama a função "buscarNacionalidade" que já realiza a validação o ID 
        //todas as validações que tiverem undefined, ele SEMPRE deve ser o primeiro
        let resultBuscarId = await buscarNacionalidade(id) //faz a validação do erro 400 e 404 dentro da função buscarNacionalidade
    
        //validção para verificar se o status é verdadeiro (se a Nacionalidade/id existe)
        if(resultBuscarId.status){
            //chama a função do DAO para excluir a Nacionalidade
            let result = await nacionalidadeDAO.deleteNacionalidade(id)
    
            //validação do result que verifica se o id foi mesmo apagado
            if(result){
                return message.SUCCESS_DELETED_ITEM //200 (registro excluido com sucesso!)
            }else{
                 return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 na model 
             }
    
        }else{
            return resultBuscarId //caso dê erro, ele retorna o result com 400 ou 404
         }
           
            
    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}

//função responsavel por validar todos os dados 
const validarDados = async function (nacionalidade) {

    
    //cria um clone da const de menssage
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação dos dados para os atributos do sexo (status 400)
    if (nacionalidade.nome == undefined || nacionalidade.nome == null || nacionalidade.nome == "" || nacionalidade.nome.length > 30) {

        
        message.ERRO_BAD_REQUEST.field = '[NACIONALIDADE] INVÁLIDA'
        return message.ERRO_BAD_REQUEST

    } else {
        return false
    }

}


module.exports = {
    inserirNovaNacionalidade,
    atualizarNacionalidade,
    listarNacionalidade,
    buscarNacionalidade,
    excluirNacionalidade,

}