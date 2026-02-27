/*******************************************************
 * Objetivo: Arquivo responsavel por realizar o calculo do IMC
 * Data: 27/02/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//validação de entradada de dados
const validarDados = function(alturaCliente, pesoCliente, nomeCliente){

    if (nomeCliente == "" || alturaCliente == "" || pesoCliente == "" || isNaN(alturaCliente) || isNaN(pesoCliente)){
        //valida a entrada de dados vazia e tambem se apenas numeros foram digitados
        return false
    }else{
        //caso esteja tudo correto ele retorna true
        return true
    }
}

//realiza o calculo do imc caso a validação de dados esteja como "true"
const calcularIMC = function(alturaCliente, pesoCliente){

    //chama as variaveis do app.js e transforma em number
    let altura          = Number(alturaCliente)
    let peso            = Number(pesoCliente)

    let resultado       = peso / (altura * altura) //formula do calculo
    let statusCliente = String(resultado) //cria uma variavel para receber o resultado final e determinar o status do imc

    //imprime o status final do cliente após realizar o calculo do imc
    if(statusCliente < 18.5){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: abaixo do peso")

    }if(statusCliente >= 18.5 && statusCliente <= 24.9){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: peso ideal")

    }if(statusCliente >= 25 && statusCliente <= 29.9){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: acima do peso (sobrepeso)")

    }if(statusCliente >= 30 && statusCliente <= 34.9){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: obesidade I")

    }if(statusCliente >= 35 && statusCliente <39.9){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: obesidade II")
    
    }if(statusCliente >= 40){
        console.log("------------------------------------------------------------------------------------------------------------------------")
        console.log("status: obesidade III")

    }

    return resultado.toFixed(2) //fixa o resultado final com duas casas decimais após a virgula

}

//exporta as duas funções para o app.js
module.exports ={
    calcularIMC,
    validarDados
}
