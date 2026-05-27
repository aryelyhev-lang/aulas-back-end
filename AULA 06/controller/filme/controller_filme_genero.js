/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud de filme e generos
 * data: 22/05/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

const config_message = require('../modulo/configMessages.js')

//import do dao
const filmeGeneroDAO = require('../../model/DAO/filme_genero/filme_genero.js')



//Função responsavel por inserir uma nova classificação na tabela
//variavel filmegenero vai guarda os dois ids
const inserirNovoFilmeGenero = async function (filmeGenero) {

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let validar = await validarDados(filmeGenero)

        //se a função validarDados retornar um json de erros, iremos devolver  ao APP o erro
        if (validar) {
            return validar //erro 400

        } else {
            //encaminha os dados da classificação para o DAO
            let result = await filmeGeneroDAO.insertFilmeGenero(filmeGenero)


            //valida se o result deu certo ou não
            if (result) {

                //201 = se inserir no banco volta true e imprime essa menssagem
                filmeGenero.id = result //criando o atributo ID no json da classificacao e colocando o id gerado após o inset
                message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATE_ITEM.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATE_ITEM.status_code
                message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATE_ITEM.message
                message.DEFAULT_MESSAGE.response = filmeGenero
            } else {
                //500 = erro no servidor (erro na model)
                return message.ERRO_INTERNAL_SERVER_MODEL
            }

            return message.DEFAULT_MESSAGE
        }

    } catch (error) {
        console.log(error)
        //retorna um json para o app pois ele não sabe o que é false
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 (controller)

    }

}

//Função responsavel por atualizar uma classificação ja existente
const atualizarFilmeGenero = async function (filmeGenero, id) {

    //clone da configMessage.js
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        //validação para um ID incorreto
        //chama a função que busca as classificações pelo id, lá ela valida se o id está correto e se ele existe
        let resultBuscarId = await buscarFilmeGenero(id)

        //Se a função buscarClassificações encontrar uma classificação com aquele id, o atributo do JSON será verdadeiro 
        //isso significa que a classificação realmente existe na base, caso não retorne true, então 
        //o retono da função poderá ser um 400 ou 404 ou até mesmo 500
        if (resultBuscarId.status) {
            let validar = await validarDados(filmeGenero)


            //validação de campos obrigatorios para a atualização (dos elementos que vem dentro do body)
            if (!validar) {

                filmeGenero.id = id //adiciona o atributo ID da classifição dentro do json para ser enviado ao DAO

                //chama a função do DAO para atualizar a classificação (dados + ID)
                let result = await filmeGeneroDAO.updateFilmeGenero(filmeGenero)
                console.log(result)

                if (result) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = filmeGenero

                    return message.DEFAULT_MESSAGE //status code 200 -> representa que uma atualização foi feita com sucesso */

                } else {

                    return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 da model
                }

            } else {

                return validar //erro 400
            }

        } else {

            return resultBuscarId //retorna um erro 400, 404 ou 500 caso o status seja diferente de true
        }

    }

    catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}


//Função responsavel por listar todas as classificações disponiveis
const listarFilmeGenero = async function () {
    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeGeneroDAO.selectAllFilmeGenero()

        //validação para verificar se o DAO conseguiu processar os dados
        if (result) {
            //verificando se existe conteudo no array
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length //retorna a quantidade de filmes dentro do banco de dados
                message.DEFAULT_MESSAGE.response.filme_genero = result

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

//Função responsavel por buscar uma classificação 
const buscarFilmeGenero = async function (id) {


    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //valida se o id está vazio ou se possui caracters
        if (id == undefined || id == null || id == "" || isNaN(id)) {
            message.ERRO_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        } else {
            // Busca no banco de dados uma classificação pelo ID informado
            // Executa uma operação assíncrona para recuperar os dados da classificação com base no ID
            let result = await filmeGeneroDAO.selectByIdFilmeGenero(id)

            console.log(result)
            if (result) {

                if (result.length > 0) { //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

//função responsavel por buscar o filme pelo id do genero
const buscarFilmeIdGenero = async function (idGenero) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //valida se o id está vazio ou se possui caracters
        if (idGenero == undefined || idGenero == null || idGenero == "" || isNaN(idGenero)) {
            message.ERRO_BAD_REQUEST.field = '[ID GENERO] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        } else {
            // Busca no banco de dados uma classificação pelo ID informado
            // Executa uma operação assíncrona para recuperar os dados da classificação com base no ID
            let result = await filmeGeneroDAO.selectFilmesByIdGenero(id)

            if (result) {

                if (result.length > 0) { //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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

//função responsavel por buscar o genero pelo id do filme
const buscarGeneroIdFilme = async function (idFilme) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //valida se o id está vazio ou se possui caracters
        if (idFilme == undefined || idFilme == null || idFilme == "" || isNaN(idFilme)) {
            message.ERRO_BAD_REQUEST.field = '[ID FILME] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        } else {
            // Busca no banco de dados uma classificação pelo ID informado
            // Executa uma operação assíncrona para recuperar os dados da classificação com base no ID
            let result = await filmeGeneroDAO.selectGenerosByIdFilme(idFilme)


            if (result) {

                if (result.length > 0) { //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme_genero = result

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


//Função responsavel por excluir uma classificação 
const excluirFilmeGenero = async function (id) {
    //faz o import das menssagens de status code
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //chama a função "buscarClassificacao" que já realiza a validação o ID 
        //todas as validações que tiverem undefined, ele SEMPRE deve ser o primeiro
        let resultBuscarId = await buscarFilmeGenero(id) //faz a validação do erro 400 e 404 dentro da função buscarfilme

        //validção para verificar se o status é verdadeiro (se o filme/id existe)
        if (resultBuscarId.status) {
            //chama a função do DAO para excluir o filme
            let result = await filmeGeneroDAO.deleteFilmeGenero(id)

            //validação do result que verifica se o id foi mesmo apagado
            if (result) {
                return message.SUCCESS_DELETED_ITEM //200 (registro excluido com sucesso!)
            } else {
                return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 na model 
            }

        } else {
            return resultBuscarId //caso dê erro, ele retorna o result com 400 ou 404
        }


    } catch (error) {
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}

//Função responsavel por excluir os generos relacionadoa com o filme
const excluirGenerosIdFilme = async function (idFilme) {

    //faz o import das menssagens de status code
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //já tem o id do filme e por isso não precisa buscar

        let result = await filmeGeneroDAO.deleteGenerosByIdFilme(idFilme)

        //validação do result que verifica se o id foi mesmo apagado
        if (result) {
            return message.SUCCESS_DELETED_ITEM //200 (registro excluido com sucesso!)
        } else {

            return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 na model 
        }

    } catch (error) {
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}


//Função responsavel por validar os dados
const validarDados = async function (filmeGenero) {

    //cria um clone da const de message
    let message = JSON.parse(JSON.stringify(config_message))

    //Validação dos dados para os atributos da classificação (status code 400)
    if (filmeGenero.id_filme == undefined || filmeGenero.id_filme == null || filmeGenero.id_filme == "" || isNaN(filmeGenero.id_filme)) {
        message.ERRO_BAD_REQUEST.field = '[ID FILME INVALIDO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST

    } else if (filmeGenero.id_genero == undefined || filmeGenero.id_genero == null || filmeGenero.id_genero == "" || isNaN(filmeGenero.id_filme)) {
        message.ERRO_BAD_REQUEST.field = '[ID GENERO INVALIDO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST

    } else {
        return false
    }

}



module.exports = {
    inserirNovoFilmeGenero,
    listarFilmeGenero,
    buscarFilmeGenero,
    atualizarFilmeGenero,
    excluirFilmeGenero,
    buscarFilmeIdGenero,
    buscarGeneroIdFilme,
    excluirGenerosIdFilme,
    validarDados
}