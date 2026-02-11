/**********************************************************
 * Objetivo: Criar um sistema que permite calculo de juros
 * ultilizando boas praticas com funções.
 * Autor: Aryely Hevylyn
 * Data: 11/02/26
 * Versão: 1.0
 * *******************************************************/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//entrada do nome do cliente
entradaDeDados.question("Digite o nome do Cliente: ", function(nome){
    let nomeCliente = nome
    
    //entrada do nome do produto
    entradaDeDados.question("digite o nome do produto: ", function(produto){
        let nomeProduto = produto
        
        //entrada do valor da compra
        entradaDeDados.question("Digite o valor da compra: ", function(capital){
            let capitalProduto = capital
            
            //entrada do valor da taxa
            entradaDeDados.question("Digite a taxa de juros a ser aplicada a compra: " ,function(taxa){
                let taxaCompra = taxa
                
                //entrada do tempo de pagamento
                entradaDeDados.question("Digite o tempo para realizar o pagamento: " ,function(tempo){
                    let tempoPagamento = tempo

                    //importe da biblioteca que realiza os calculos financeiros
                    //(repositorio modulo que guarda as funções de calculos)
                    let calculos = require("./modulo/calculos.js")

                    //divide o valor de juros por 100 para torna-lo decimal
                    //let percentual = Number(taxaCompra) / 100
                    //let montante = Number (capitalProduto) * ((1+Number(percentual)) ** Number(tempoPagamento))
                    let montante = calculos.calcularJurosCompostos(capitalProduto, taxaCompra, tempoPagamento)
                    //calculos.calcularJurosCompostos para chamar a função do modulo 

                    if(montante){
                        console.log("O montante final é: " + montante.toFixed(2))
                    }else{
                        console.log("ERRO: Devido a problemas no calculo de juros, o programa encerrou.")
                        entradaDeDados.close()
                    }
                })
            })
        })
    })
})

