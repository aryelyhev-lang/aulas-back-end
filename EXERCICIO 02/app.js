/*******************************************************
 * Objetivo: Arquivo responsavel pela entrada e saida de dados
 * Data: 25/02/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/


//import d biblioteca para calculos
const calculosMatematicos = require("./modulo/calcular.js")

let valor1 = "10"
let valor2 = 30

if(validar){
    let resultado = calculosMatematicos.calcular(valor1, valor2, "somar")
    console.log(resultado)
    //essa seria a forma certa de chamar a função NESSE caso
    //um erro cometido foi chamar a função calcular dentro da função validar para ela exibir o resultado
    //por não terem relação entre si, não faz sentido chamar a função calcular dentro da função validar
    //pois a fução validar não pode exibir um resultado de soma, apenas valida os dados
    //nesse caso, o correto seria o APP chamar a função validar e depois, caso seja true, ela chama a função calcular 
}else{
    let resultado = calculosMatematicos.calcular(valor1, valor2, "somar")

}