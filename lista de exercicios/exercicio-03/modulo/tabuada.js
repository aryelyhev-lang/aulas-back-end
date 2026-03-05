/*******************************************************
 * Objetivo: Arquivo responsavel por realizar o calculo da tabuada
 * Data: 05/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

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
        //retorna true caso tudo esteja correto acima
        return true
    }

}

//função para realizar o calculo da tabuada
const calcularTabuada = function(tabuadaInicial, tabuadaFinal){
    

}



//exporta as funções para o app.js
module.exports ={
   validarDados,
   calcularTabuada
}