/*******************************************************
 * Objetivo: Arquivo responsavel por realizar o calculo da tabuada
 * Data: 05/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//função para validar os dados inseridos
const validarDados = function(tabuadaInicial, tabuadaFinal){
    if(tabuadaInicial == "" || tabuadaFinal == ""){
        //proibe a entrada de campos vazios
        return false

    }else if( !isNaN(tabuadaInicial) || !isNaN(tabuadaFinal)){
        //não permite a entrada de letras ou caracters
        return false

    }else if(tabuadaInicial >= 2 && tabuadaInicial <= 100 && tabuadaFinal >=2 && tabuadaFinal <= 100){
        //permite apenas numeros entre 2 e 100
        return false
    }else{
        //retorna true caso tudo acima esteja correto
        return true
    }
}

//função para realizar o calculo da tabuada
const gerarTabuada = function(tabuadaInicial, tabuadaFinal){
    //recebe as variaveis criadas no app
    let tabuada = Number(tabuadaInicial)
    let tab = Number(tabuadaFinal)
    let cont = 0 //contador de quantas casas a tabuada terá
    let resultado 
}


//exporta as funções para o app.js
module.exports ={
   validarDados,
   gerarTabuada
}