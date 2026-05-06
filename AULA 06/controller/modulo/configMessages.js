/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela configuração e padronização das menssagens da API
 * data: 17/04/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

//padronização para o retorno dos endpoints da api
const DEFAULT_MESSAGE = {

    api_description:    'API para genrenciar o controle de filmes',
    development:        'Aryely Hevylyn',
    version:            '1.0.4.26',
    status:             Boolean, //espera um buleano nesse campo
    status_code:        Number,  //espera que esse campo seja preenchido com um numero
    response:           {}       //campo que ira retornar uma mensagem, sempre dentro de um json
                                // response -> retorna os dados que o banco respondeu
}

//menssagens de erro para a api retornar
const ERRO_BAD_REQUEST                              = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.' }
const ERRO_CONTENT_TYPE                             = {status: false, status_code: 415, message: 'Não foi possivel processar a requisição pois o formato de dados aceito pela API é somente JSON.' }
const ERRO_INTERNAL_SERVER_MODEL                    = {status: false, status_code: 500, message: 'Nâo foi possivel processar a requisição por conta de erro na API [ERRO NA MODELAGEM DE DADOS].'}
const ERRO_INTERNAL_SERVER_CONTROLLER               = {status: false, status_code: 500, message: 'Não foi possivel processar a requisição por conta de erro na API [ERRO NA CONTROLLER].' }
const ERRO_NOT_FOUND                                = {status: false, status_code: 404, message: 'Não foi encontrado nenhum dado para retorno.' }


//menssagens de sucesso da api 
const SUCCESS_DELETED_ITEM                          = {status: true, status_code: 200, message: 'Registro excluido com sucesso!'}   //retorno para o delete (pode retornar um 200 ou 204)
const SUCCESS_UPDATE_ITEM                           = {status: true, status_code: 200, message: 'Registro atualizado com sucesso!'} //status code de retorno para o PUT
const SUCCESS_CREATE_ITEM                           = {status: true, status_code: 201, message: 'Registro inserido com sucesso'}    //status code de retorno para GET
const SUCCESS_RESPONSE                              = {status: true, status_code: 200}                                              //o status code 200 sempre vai servir para o response NO GET
                                                                                                                                    //não tem message porque ele devolve os dados solicitados do banco de dados

module.exports = {
    DEFAULT_MESSAGE,
    ERRO_BAD_REQUEST,
    SUCCESS_CREATE_ITEM,
    ERRO_INTERNAL_SERVER_MODEL,
    ERRO_CONTENT_TYPE,
    ERRO_INTERNAL_SERVER_CONTROLLER,
    ERRO_NOT_FOUND,
    SUCCESS_RESPONSE,
    SUCCESS_DELETED_ITEM, 
    SUCCESS_UPDATE_ITEM
}