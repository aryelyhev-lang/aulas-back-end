/**********************************************************
 * Objetivo: Criar um sistema que calcula multiplicação, soma, divisão
 * e adição ultilizando funções.
 * Autor: Aryely Hevylyn
 * Data: 13/02/26
 * Versão: 1.0
 * *******************************************************/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//entrada de dados
entradaDeDados.question("Digite o número que estará multiplicando: ", function(numero){
    let numberCliente = numero

    entradaDeDados.question("Digite o número multiplicador: ", function(numeroMultiplicador){
        let numberMultiplicador = numeroMultiplicador

        entradaDeDados.question("Digite um dos operadores matemáticos. multiplicar, somar, subtrair ou dividir: ", function(operador){
            let operadorMatematico = operador

            let calculos = require("./modulo/modulo.js")
            let montante = calculos.dadosTratamento(numberCliente, numberMultiplicador, operadorMatematico)
            let montante2 = calculos.somaDosNumeros(numberCliente, numberMultiplicador, operadorMatematico)
        

            //verifica se a validação de dados deu erro
            if(montante2){
                console.log("O resultado final é: " + montante2.toFixed(2))
                //exibe o resultado final caso esteja tudo certo
            }if(montante){
                console.log("ERRO: Devido a problemas no calculo ou no operador matemático, o programa encerrou.")
                //exibe uma mensagem caso tenha algum erro na validação

            }entradaDeDados.close()//encerra a aplicação caso tenha algum erro
        })
    }) 
})




