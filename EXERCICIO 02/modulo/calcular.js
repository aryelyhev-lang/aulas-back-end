/**********************************************************
 * Objetivo: arquivo responsável pelas funções de calcular(somar, dividir, subtrair, multiplicar)
 * Autor: Aryely Hevylyn
 * Data: 20/02/26
 * Versão: 1.0
 * *******************************************************/

//função anonima, se inicia com uma const e depois declara a função dentro da const
//como criar const nomeQualquer = function(){}
//assim você guarda uma função dentro de uma const 


//modelo de função anonima
//chama-se função anonima pois ela não possui nomenclatura, ela carrega o nome da const
const calcular = function(numero1, numero2, operador){
//após isso foi determinado o que essa função irá receber, ou seja numero1, numero2 e o operador

    //entrada da função
    let resultado = false //variavel nasce como false e depois recebe um valor
    //por conta disso, se a aplicação não entrar no if ou else, ele continuará sendo falso
    //caso contrario ele entrará em um dos blocos e receberá um valor para exibir 
    let valor1 = Number(numero1)
    let valor2 = Number(numero2)
    let operadorMatematico = String(operador).toUpperCase()
    //console.log(operadorMatematico.toUpperCase())
    //toUpperCase retorna a string em minusculo
    //tolowerCase retorna a string em maiusculo

    //condicionais para validar qual o tipo de operação matematica
    //por ter apenas uma linha de codigo não é obrigatorio abrir chaves
    //processamento da função
    // if(operadorMatematico == "SOMAR"){
    //     resultado = valor1 + valor2
    // }else if(operadorMatematico == "SUBTRAIR"){
    //     resultado = valor1 - valor2
    // }else if(operadorMatematico == "MULTIPLICAR"){
    //     resultado = valor1 * valor2
    // }else if(operadorMatematico == "DIVIDIR"){
    //     resultado = valor1 / valor2
    // }else{
    //     return false
    //}
    //nessa situação não é necessario abrir as chaves pois só é necessario abrir chaves em blocos de programações
    //ou seja, se passar de uma linha é necessario abrir chaves, caso contrario não precisa abrir chaves {}


    //saida da função
    // if(resultado != undefined){
    //     return Number(resultado).toFixed(2)
    // }else{
    //     return false
    // }

    //como ultilizar o switch case ao inves do if e else
    switch (operadorMatematico) {
        case "SOMAR": //if
            resultado = valor1 + valor2
            break;
        case "SUBTRAIR": //else if
            resultado = valor1 - valor2
            break;
        case "DIVIDIR": //else if
            resultado = valor1 / valor2
            break;
        case "MULTIPLICAR": //else if
            resultado = valor1 * valor2
            break;
        //default: //else
            //return false    <- precisaria desse bloco de codigos caso a variavel resultado não fosse criada como false lá em cima no let
            //break;
    }

    return resultado //retorna o resultado da conta
}

//por não possuir uma enrada de dados, você atribui um valor para testar a função
//o console log precisa estar fora da função
console.log(calcular("11.5", 50, "somar"))