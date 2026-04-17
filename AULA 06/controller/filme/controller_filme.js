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
const inserirNovoFilme = async function(filme){

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

    //validação com base nos dados acima com um return que possui uma menssagem direcionada
    //Validação dos dados para os atributos do filme (status 400)
    if(filme.nome == '' || filme.nome == null || filme.nome == undefined || filme.nome.length > 80){
        //filme.nome.length > 80 = se a quantidade(length) de caracters do filme.nome for maior que 80
        message.ERRO_BAD_REQUEST.field = '[NOME] INVÁLIDO'

    }else if(filme.data_lancamento == '' || filme.data_lancamento == null || filme.data_lancamento == undefined || filme.data_lancamento.length != 10){
        //filme.data_lancamento.length != 10 -> se a data for diferente de 10 caracters
        message.ERRO_BAD_REQUEST.field = '[DATA_LANCAMENTO] INVÁLIDO'

    }else if(filme.duracao == '' || filme.duracao == null || filme.duracao == undefined || filme.duracao.length < 5){
        message.ERRO_BAD_REQUEST.field = '[DURAÇÃO] INVÁLIDO'

    }else if(filme.sinopse == '' || filme.sinopse == null || filme.sinopse == undefined){
        message.ERRO_BAD_REQUEST.field = '[SINOPSE] INVÁLIDO'

    }else if(isNaN(filme.avaliacao) || filme.avaliacao.length > 3){
        message.ERRO_BAD_REQUEST.field = '[AVALIAÇÃO] INVÁLIDO'

    }else if(filme.valor == '' || filme.valor == null || filme.valor == undefined || filme.valor.length > 5 || isNaN(filme.valor)){
        message.ERRO_BAD_REQUEST.field = '[VALOR] INVÁLIDO'

    }else if(filme.capa.length > 255){
        message.ERRO_BAD_REQUEST.field = '[CAPA] INVÁLIDO'
    }else{
        //caso a requisição esteja com tudo certo, ele ignora os comandos acima e entra aqui direto
        let result = await filmeDAO.insertFilme(filme)
        //valida se o result deu certo ou não
        if(result){
            //201
            message.DEFAULT_MESSAGE.status      =   message.SUCCESS_CREATE_ITEM.status
            message.DEFAULT_MESSAGE.status_code =   message.SUCCESS_CREATE_ITEM.status_code
            message.DEFAULT_MESSAGE.message     =   message.SUCCESS_CREATE_ITEM.message
        }else{
            //404
            message.DEFAULT_MESSAGE.status      =   message.ERRO_BAD_REQUEST.status
            message.DEFAULT_MESSAGE.status_code =   message.ERRO_BAD_REQUEST.status_code
            message.DEFAULT_MESSAGE.message     =   message.ERRO_BAD_REQUEST.message
            message.DEFAULT_MESSAGE.field       =   message.ERRO_BAD_REQUEST.field
        }

        return message.DEFAULT_MESSAGE
    }
    
}

//função responsavel por atualizar um filme
const atualizarFilme = async function(){

}

//função responsavel por retornar todos os filmes
const listarFilme = async function(){

}

//função responsavel por buscar um filme pelo ID
const buscarFilme = async function(){

}

//função responsavel por excluir um filme 
const excluirFilme = async function(){

}

module.exports = {
    inserirNovoFilme, 
}