/*******************************************************************************************************************
 * objetivo: Arquivo responsavel pela validação, tratamento e manipulação de dados para o crud de filmes
 * data: 17/04/2026
 * autor: aryely hevylyn
 * versão: 1.0
 *******************************************************************************************************************/

//import do arquivo de padronização de menssagens
const config_message = require('../modulo/configMessages.js')

//import do arquivo DAO para fazer o CRUD do filme no banco de dados
const filmeDAO = require('../../model/DAO/filme/filme.js')

//sempre criar as funções da controller com base nas funções criadas no DAO (para facilitar o entendimento)
//função responsavel por inserir um novo filme

//contentType vem do request heraders -> mostra qual é o tipo de dados vindo da requisição
const inserirNovoFilme = async function (filme, contentType) {

    //essa função irá receber um json que vem do app
    //com base nisso, espera-se que a nomenclatura seja igual a nomenclatura estabelecida no scriptSQL

    /*  id 					int not null primary key auto_increment,
        nome				varchar(80) not null,
        data_lancamento		date not null,
        duracao				time not null,
        sinopse				text not null,
        avaliacao			decimal(3,2) default null,
        valor				decimal(5,2) not null default 0,
        capa				varchar(255) */

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    //JSON.pars -> converte uma string no formato JSON em um objeto/valor JavaScript
    //stringify -> converte um valor (objeto, array, etc.) em uma string (geralmente no formato JSON)
    let message = JSON.parse(JSON.stringify(config_message))
    //caso fizesse let message = config_message para fazer o clone, por ser um objeto e não uma 
    //variavel, ambas teriam o mesmo endereço, ou seja, tudo que fosse
    //alterado em uma seria alterado na outra

    try {

        //VALIDAÇÃO PARA O TIPO DE DADOS DA REQUISIÇÃO (somente json)
        //não aceita xml ou text no formato de dados da requisição 
        if (String(contentType).toUpperCase() == 'APPLICATION/JSON') {

            let validar = await validarDados(filme)

            //se a função validarDados retornar um json de eros, iremos devolver  ao APP o erro
            if (validar) {
                return validar //erro 400

            } else {
                //caso a requisição esteja com tudo certo, ele ignora os comandos acima e entra aqui direto
                //encaminha os dados do filme para o DAO
                let result = await filmeDAO.insertFilme(filme)

                //valida se o result deu certo ou não
                if (result) {
                    //201 = se inserir no banco volta true e imprime essa menssagem
                    message.DEFAULT_MESSAGE.status = message.SUCCESS_CREATE_ITEM.status
                    message.DEFAULT_MESSAGE.status_code = message.SUCCESS_CREATE_ITEM.status_code
                    message.DEFAULT_MESSAGE.message = message.SUCCESS_CREATE_ITEM.message
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

//função responsavel por atualizar um filme
const atualizarFilme = async function () {

}

//função responsavel por retornar todos os filmes
const listarFilme = async function () {

    //Criando um clone do objeto json para manipular a sua estrutura local sem modificar a estrutura original
    let message = JSON.parse(JSON.stringify(config_message))

    try {
        //chama a função do DAO para retornar a lista de todos os filmes
        let result = await filmeDAO.selectAllFilme()

        //validação para verificar se o DAO conseguiu processar os dados
        if (result) {
            //verificando se existe conteudo no array
            if (result.length > 0) {
                message.DEFAULT_MESSAGE.status              = message.SUCCESS_RESPONSE.status
                message.DEFAULT_MESSAGE.status_code         = message.SUCCESS_RESPONSE.status_code
                message.DEFAULT_MESSAGE.response.count      = result.length //retorna a quantidade de filmes dentro do banco de dados
                message.DEFAULT_MESSAGE.response.filme      = result
                
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

//função responsavel por buscar um filme pelo ID
const buscarFilme = async function (id) {

    let message = JSON.parse(JSON.stringify(config_message)) 

    try {
        //valida se o id está vazio ou se possui caracters
        if(id == "" || id == null || id == undefined || isNaN(id)){
            message.ERRO_BAD_REQUEST.field = '[ID] INVÁLIDO'
            return message.ERRO_BAD_REQUEST //erro 404

        }else{
            // Busca no banco de dados um filme específico pelo ID informado
            // Executa uma operação assíncrona para recuperar os dados do filme com base no ID
            let result = await filmeDAO.selectByIdFilme(id)

            if(result){

                if(result.length > 0 ){ //se o dao devolver um id maior do que 0
                    message.DEFAULT_MESSAGE.status          = message.SUCCESS_RESPONSE.status
                    message.DEFAULT_MESSAGE.status_code     = message.SUCCESS_RESPONSE.status_code
                    message.DEFAULT_MESSAGE.response.filme  = result
                    
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

//função responsavel por excluir um filme 
const excluirFilme = async function () {

}

//função responsavel por validar todos os dados do filme
//campos obrigatorios, qntde de caracters
const validarDados = async function (filme) {

    //cria um clone da const de mens
    let message = JSON.parse(JSON.stringify(config_message))

    //validação com base nos dados acima com um return que possui uma menssagem direcionada
    //Validação dos dados para os atributos do filme (status 400)
    if (filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80) {
        //filme.nome.length > 80 = se a quantidade(length) de caracters do filme.nome for maior que 80
        message.ERRO_BAD_REQUEST.field = '[NOME] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10) {
        //filme.data_lancamento.length != 10 -> se a data for diferente de 10 caracters
        message.ERRO_BAD_REQUEST.field = '[DATA_LANCAMENTO] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5) {
        message.ERRO_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined) {
        message.ERRO_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (isNaN(filme.avaliacao) || filme.avaliacao.length > 3) {
        message.ERRO_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.split('.')[0].length > 3 || isNaN(filme.valor)) {
        //filme.valor.split('.') -> pega o elemento . e separa o valor em um array, ou seja, o valor que era 100.50, se torna um array de 1000 (indice 0) e 50(indice 1)
        message.ERRO_BAD_REQUEST.field = '[VALOR] INVÁLIDO'
        return message.ERRO_BAD_REQUEST

    } else if (filme.capa.length > 255) {
        message.ERRO_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
        return message.ERRO_BAD_REQUEST //retorna o problema em especifico
    } else {
        return false //mostra que nada estava com problema
    }

}

module.exports = {
    inserirNovoFilme,
    listarFilme,
    buscarFilme
}