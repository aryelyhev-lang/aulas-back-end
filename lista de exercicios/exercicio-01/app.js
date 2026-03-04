/*******************************************************
 * Objetivo: Arquivo responsavel por gerar o resultado do calculo do IMC
 * Data: 27/02/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//import da biblioteca que faz o calculo do imc
const { validarDados } = require("../exercicio-01/modulo/calcularIMC")
const calculosMatematicos = require("./modulo/calcularIMC")

//cria as variaveis para guardar peso e altura

let pesoCliente = "90"
let nomeCliente = "vilma" 
let alturaCliente = "1,70" //valor com virgula que será convertido para um ponto
let alturaConvertida = alturaCliente.replaceAll(',' , '.')
//ao utilizar o replaceAll para converter a virgula por um ponto
//é necessario criar uma variavel nova que irá receber a variavel inicial 
//que já possui um conteúdo dentro exemplo:
//crio a variavel alturaConvertida e ela recebe a variavel alturaCliente que JÁ POSSUI um valor dentro
//após isso o replace pode ser aplicado sem problemas


//faz a função validarDados chamar chamar a função de calcular imc 
//se a validação determinar que tudo está de acordo, ela exibe o resuldado
if(validarDados(alturaConvertida, pesoCliente, nomeCliente)){
    let resultado = calculosMatematicos.calcularIMC(alturaConvertida, pesoCliente)
    //imprime uma mensagem com o resultado para o usuario
    console.log(nomeCliente + " possui " + alturaCliente + " de altura "+ "e pesa " + pesoCliente + " kilos, portanto o resultado do seu IMC é de " + resultado)
    console.log("------------------------------------------------------------------------------------------------------------------------")
}else{
    console.log("Erro ao realizar o cálculo do IMC")
    //caso tenha algum erro, a aplicação se encerra
}