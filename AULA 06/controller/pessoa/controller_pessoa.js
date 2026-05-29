/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud de pessoa
 * data: 08/05/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/


const config_message = require('../modulo/configMessages.js')

//import do arquivo DAO para fazer o CRUD do cadastro no banco de dados
const cadastroDAO = require('../../model/DAO/pessoa/pessoa.js')

//função responsavel por inserir um novo cadastro
const inserirNovoCadastro = async function (pessoa, contentType) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //validação do tipo de dados da requisição que é somente json
        //String(contentType)      -> Converte o valor da variável contentType para texto (string)
        //toUpperCase()            -> Converte todo o texto para letras maiúsculas
        //== 'APPLICATION/JSON'    -> Verifica se o valor convertido é igual ao tipo APPLICATION/JSON
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(pessoa)

            //se a função validarDados retornar um json de erros, iremos devolver ao APP o erro
            if (validar) {
                return validar //erro 400

            } else {
                //caso a requisição esteja com tudo certo, ele ignora os comandos acima e entra aqui direto
                //encaminha os dados do cadastro direto para o DAO
                let result = await cadastroDAO.insertCadastro(pessoa)

                //valida se o result deu certo ou não
                if (result) {
                    //201 = se inserir no banco volta true e imprime essa menssagem
                    pessoa.id = result //criando o atributo ID no json do cadastro e colocando o id gerado após o insert
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATE_ITEM.message
                    message.DEFAULT_MESSAGE.response = pessoa
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

    }

}

//função responsavel por atualizar um cadastro
const atualizarCadastro = async function (pessoa, id, contentType) {

    let message = JSON.parse(JSON.stringify(config_message))

    try {
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            //validação para o ID incorreto
            let resultBuscarID = await buscarCadastro(id)

            if (resultBuscarID.status) {
                let validar = await validarDados(pessoa)

                if (!validar) {
                    pessoa.id = id

                    let result = await cadastroDAO.updateCadastro(pessoa)

                    if (result) {
                        message.DEFAULT_MESSAGE.status = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response = pessoa

                        return message.DEFAULT_MESSAGE //200

                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }

                } else {
                    return validar //400
                }
            } else {
                return resultBuscarID // 400 ou 404 ou 500
            }


        } else {
            return message.ERROR_CONTENT_TYPE //415
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER//500(model)
    }
}

//função responsavel por retornar todos os cadastros
const listarCadastro = async function () {

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //chama a função do DAO para retornar a lista de todos os cadastros
        let result = await cadastroDAO.selectAllCadastro()

        //validação para verificar se o DAO conseguiu processar os dados
        if (result) {
            //verificando se existe conteudo no array
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count = result.length //retorna a quantidade de sexos cadastrados dentro do banco de dados
                message.DEFAULT_MESSAGE.response.pessoa = result

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

//função responsavel por buscar um cadastro pelo ID
const buscarCadastro = async function (id) {

    let message = JSON.parse(JSON.stringify(config_message))
    try {
        if (id == undefined || id == '' || id == null || isNaN(id)) {

            message.ERROR_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERROR_BAD_REQUEST //400

        } else {
            let result = await cadastroDAO.selectByIdCadastro(id)

            if (result) {
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response = result

                    return message.DEFAULT_MESSAGE//200
                } else {
                    return message.ERROR_NOT_FOUND//404
                }
            } else {
                return message.ERROR_INTERNAL_SERVER_MODEL//500(model)
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }

}

//função responsavel por excluir um cadastro 
const excluirCadastro = async function (id) {

    //faz o import das menssagens de status code
    let message = JSON.parse(JSON.stringify(config_message))

    try {

        let resultBuscarId = await buscarCadastro(id) //faz a validação do erro 400 e 404 dentro da função buscarCadastro

        //validção para verificar se o status é verdadeiro (se o sexo/id existe)
        if (resultBuscarId.status) {
            //chama a função do DAO para excluir o cadastro 
            let result = await cadastroDAO.deleteCadastro(id)

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

//AJUSTAR TABELA DE PESSOA -> RETIRAR ATRIBUTO SEXO E CRIAR UMA TABELA INDIVIDUAL PARA O SEXO DA PESSOA
//função responsavel por validar todos os dados do cadastro
const validarDados = async function (pessoa) {

    //cria um clone da const de menssage
    let message = JSON.parse(JSON.stringify(config_message))

    //validação com base nos dados acima com um return que possui uma menssagem direcionada
    //Validação dos dados para os atributos do cadastro (status 400)
    if (pessoa.nome == undefined || pessoa.nome == null || pessoa.nome == "" || pessoa.nome.length > 150) {
        //pessoa.nome.length > 150 = se a quantidade(length) de caracters do pessoa.nome for maior que 150 retorne uma menssagem de erro
        message.ERRO_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (pessoa.data_nascimento == undefined || pessoa.data_nascimento == null || pessoa.data_nascimento == "" || pessoa.data_nascimento.length != 10) {
        //pessoa.data_nascimento.length != 10 -> se a data for diferente de 10 caracters retorne uma menssagem de erro
        message.ERRO_BAD_REQUEST.field = '[DATA_NASCIMENTO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST

    } else if (pessoa.foto.length > 250) {
        message.ERRO_BAD_REQUEST.field = '[FOTO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST //retorna o problema em especifico

    } else if (pessoa.id_sexo == undefined || pessoa.id_sexo == null || pessoa.id_sexo == "" || pessoa.id_sexo > 15) {
        message.ERRO_BAD_REQUEST.field = '[SEXO] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else {
        return false //mostra que nada estava com problema
    }

    //nome,				
    // data_nascimento,		
    // biografia,			
    // foto,				
    // sexo	

}

module.exports = {
    inserirNovoCadastro,
    atualizarCadastro,
    listarCadastro,
    buscarCadastro,
    excluirCadastro,
    validarDados
}