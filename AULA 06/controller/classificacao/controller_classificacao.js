/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud da tabela classificação
 * data: 13/05/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

const config_message = require('../modulo/configMessages.js')

//import do arquivo DAO para fazer o CRUD do filme no banco de dados
const classificacaoDAO = require('../../model/DAO/classificacao/classificacao.js')


//Função responsavel por inserir uma nova classificação na tabela
const inserirClassificacao = async function (classificacao, contentType){

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
    
         //VALIDAÇÃO PARA O TIPO DE DADOS DA REQUISIÇÃO (somente json é válido)
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {
    
            let validar = await validarDados(classificacao)
    
            //se a função validarDados retornar um json de erros, iremos devolver  ao APP o erro
            if (validar) {
                return validar //erro 400
    
            } else {
                //encaminha os dados da classificação para o DAO
                let result = await classificacaoDAO.insertClassificacao(classificacao)
    
    
                //valida se o result deu certo ou não
                if (result) {
                    
                    //201 = se inserir no banco volta true e imprime essa menssagem
                    classificacao.id = result //criando o atributo ID no json da classificacao e colocando o id gerado após o inset
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_CREATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_CREATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message         = message.SUCCESS_CREATE_ITEM.message
                    message.DEFAULT_MESSAGE.response        = classificacao
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

//Função responsavel por atualizar uma classificação ja existente
const atualizarClassificacao = async function (classificacao, id, contentType){

    //clone da configMessage.js
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON' ){

            //validação para um ID incorreto
            //chama a função que busca as classificações pelo id, lá ela valida se o id está correto e se ele existe
            let resultBuscarId = await buscarClassificacao(id)

            //Se a função buscarClassificações encontrar uma classificação com aquele id, o atributo do JSON será verdadeiro 
            //isso significa que a classificação realmente existe na base, caso não retorne true, então 
            //o retono da função poderá ser um 400 ou 404 ou até mesmo 500
            if(resultBuscarId.status){
                let validar = await validarDados(classificacao)

        
                //validação de campos obrigatorios para a atualização (dos elementos que vem dentro do body)
                if (!validar){

                    classificacao.id = id //adiciona o atributo ID da classifição dentro do json para ser enviado ao DAO

                    //chama a função do DAO para atualizar a classificação (dados + ID)
                    let result = await classificacaoDAO.updateClassificacao(classificacao)
                    console.log(result)

                    if (result){
                        message.DEFAULT_MESSAGE.status          = message.SUCCESS_UPDATE_ITEM.status
                        message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_UPDATE_ITEM.status_code
                        message.DEFAULT_MESSAGE.message         = message.SUCCESS_UPDATE_ITEM.message
                        message.DEFAULT_MESSAGE.response        = classificacao

                        return message.DEFAULT_MESSAGE //status code 200 -> representa que uma atualização foi feita com sucesso */

                    }else{

                        return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 da model
                    }

                }else{

                    return validar //erro 400
                }

            }else{

                return resultBuscarId //retorna um erro 400, 404 ou 500 caso o status seja diferente de true
            }
            
        }else{

            return message.ERRO_CONTENT_TYPE //erro na content type 415
        }

    } 
    
    catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}


//Função responsavel por listar todas as classificações disponiveis
const listarClassificacao = async function (){
     //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
        let message = JSON.parse(JSON.stringify(config_message))
    
        try {
            //chama a função do DAO para retornar a lista de todos os filmes
            let result = await classificacaoDAO.selectAllClassificacao()
    
            //validação para verificar se o DAO conseguiu processar os dados
            if (result) {
                //verificando se existe conteudo no array
                if (result.length > 0) {
                    message.DEFAULT_MESSAGE.status                      = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code                 = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.count              = result.length //retorna a quantidade de filmes dentro do banco de dados
                    message.DEFAULT_MESSAGE.response.classificacao      = result
                    
                    return message.DEFAULT_MESSAGE //status code 200 vai ser retornado um cabeçalho com as informações da api
                }else {
                    return message.ERRO_NOT_FOUND //erro 404
                }
    
            }else {
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
const buscarClassificacao = async function (id){


    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        //valida se o id está vazio ou se possui caracters
        if(id == undefined || id == null || id == "" || isNaN(id)){
            message.ERRO_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        }else{
            // Busca no banco de dados uma classificação pelo ID informado
            // Executa uma operação assíncrona para recuperar os dados da classificação com base no ID
            let result = await classificacaoDAO.selectByIdClassificacao(id)

            console.log(result)
            if(result){

                if(result.length > 0 ){ //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.classificacao  = result
                    
                    return message.DEFAULT_MESSAGE //confirma que tudo deu certo (status code 200)
                }else{
                    return message.ERRO_NOT_FOUND //erro 404
                }

            }else{
                return message.ERRO_INTERNAL_SERVER_MODEL //erro 500 do DAO (model)
            }

        }
    } catch (error) {
        console.log(error)
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }
}


//Função responsavel por excluir uma classificação 
const excluirClassificacao = async function (id){
    //faz o import das menssagens de status code
    let message = JSON.parse(JSON.stringify(config_message)) 
    
    try {
        //chama a função "buscarClassificacao" que já realiza a validação o ID 
        //todas as validações que tiverem undefined, ele SEMPRE deve ser o primeiro
        let resultBuscarId = await buscarClassificacao(id) //faz a validação do erro 400 e 404 dentro da função buscarfilme
    
        //validção para verificar se o status é verdadeiro (se o filme/id existe)
        if(resultBuscarId.status){
            //chama a função do DAO para excluir o filme
            let result = await classificacaoDAO.deleteClassificacao(id)
    
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
        return message.ERRO_INTERNAL_SERVER_CONTROLLER //erro 500 da controller
    }

}

//Função responsavel por validar os dados
const validarDados = async function (classificacao){

    //cria um clone da const de message
    let message = JSON.parse(JSON.stringify(config_message))
    
    //Validação dos dados para os atributos da classificação (status code 400)
    if (classificacao.sigla == undefined || classificacao.sigla == null || classificacao.sigla == "" || classificacao.sigla.length > 6){
        message.ERRO_BAD_REQUEST.field = '[SIGLA] INVÁLIDA'
        return message.ERRO_BAD_REQUEST

    }else if(classificacao.descricao == undefined || classificacao.descricao == null || classificacao.descricao == "" || classificacao.descricao.length > 250){
        message.ERRO_BAD_REQUEST.field = '[DESCRIÇÃO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST
        
    }else if (classificacao.foto.length > 250) {
        message.ERRO_BAD_REQUEST.field = '[FOTO] INVÁLIDA'
        return message.ERRO_BAD_REQUEST //retorna o problema em especifico
           
    }else if (classificacao.idade_minima == undefined || classificacao.idade_minima == null || classificacao.idade_minima == "" || isNaN(classificacao.idade_minima) ){
        message.ERRO_BAD_REQUEST.field = '[IDADE] INVÁLIDA'
        return message.ERRO_BAD_REQUEST
    }else{
        return false
    }
    
}

module.exports = {
    inserirClassificacao,
    atualizarClassificacao,
    listarClassificacao,
    buscarClassificacao,
    excluirClassificacao,
    validarDados
}