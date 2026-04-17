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
    Response:           {}       //campo que ira retornar uma mensagem, sempre dentro de um json
}

//menssagens de erro da api 
const ERRO_BAD_REQUEST = {status: false, status_code: 400, message: 'Os dados enviados na requisição não estão corretos.' }

//menssagens de sucesso da api 
const SUCCESS_CREATE_ITEM = {status: true, status_code: 201, message: 'Registro inserido com sucesso'}

module.exports = {
    DEFAULT_MESSAGE,
    ERRO_BAD_REQUEST,
    SUCCESS_CREATE_ITEM
}