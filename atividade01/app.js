/**************************************************************************************
 * Objetivo: Calcular os juros compostos
 * Data: 04/02/2026
 * Autor: Aryey Hevylyn
 * Versão: 1.0
 * ************************************************************************************/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
}) 

//pega dados
entradaDeDados.question("Digite o seu nome: ", function (nome){

    let nomeCliente = nome

    entradaDeDados.question("Digite o produto comprado: ", function(produto){
        
        entradaDeDados.question("Digite o valor da compra: ", function(valorProduto){

            entradaDeDados.question("Digite a taxa de juros: ", function(taxaJuros){

                entradaDeDados.question("Digite o tempo de pagamento em meses: ", function(tempoPagamento){

                    //validações
                    if (nomeCliente == "" || produto == "" || valorProduto == "" || taxaJuros == "" || tempoPagamento == ""){
                        console.log("ERRO: É obrigatório o preenchimento de todos os campos vazios!")

                    }else if(isNaN(valorProduto) || isNaN(taxaJuros) || isNaN(tempoPagamento)){
                        console.log("ERRO: Não é possível calcular com a entrada de caracters ou letras!")

                    }else{
                        let valorProdutoNumero = Number(valorProduto)
                        let taxaJurosNumero = Number(taxaJuros)
                        let tempoPagamentoNumero = Number(tempoPagamento)
                        //transforma os dados em números

                        let valorJuros = taxaJurosNumero / 100
                        //divide o valor de juros por 100 para torna-lo decimal
                        let jurosTaxa = (1 + valorJuros)
                        let montante = valorProdutoNumero * (1 + valorJuros) ** tempoPagamentoNumero
                        let acrescimo = montante - valorProdutoNumero
                        //valor inicial - o resultado da formula gera o acrescimo
                        
                        console.log(`
                            ******************* {Viva moda} *******************
                            Muito obrigado por realizar a sua compra conosco Sr(a) ${nomeCliente}.
                            A compra do produto ${produto}, tem um valor de: ${valorProduto} reais.
                            A sua compra será parcelada em ${tempoPagamento} vezes e o Sr(a) pagará: ${taxaJuros}%.
                            O acréscimo realizado ao valor de: ${acrescimo.toFixed(2)} será de ${montante.toFixed(2)}.
                            
                            Muito obrigado por escolher a {Viva moda}.
                            *******************************************************
                            `);//mensagem de saida
                    }
                })
            })
        })
    })
})