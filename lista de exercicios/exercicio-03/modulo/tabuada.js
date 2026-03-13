/*******************************************************
 * Objetivo: Arquivo responsavel por realizar o calculo da tabuada
 * Data: 05/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//função para validar os dados inseridos
const validarDados = function (tabuadaInicial, tabuadaFinal) {
    if (tabuadaInicial == "" || tabuadaFinal == "") {
        //proibe a entrada de campos vazios
        return false

    } else if (!isNaN(tabuadaInicial) || !isNaN(tabuadaFinal)) {
        //não permite a entrada de letras ou caracters
        return false

    } else if (tabuadaInicial >= 2 && tabuadaInicial <= 100 && tabuadaFinal >= 2 && tabuadaFinal <= 100) {
        //permite apenas numeros entre 2 e 100
        return false
    } else {
        //retorna true caso tudo acima esteja correto
        return true
    }
}

//função para realizar o calculo da tabuada
const gerarTabuada = function (tabuadaInicial, tabuadaFinal){

    //recebe as variaveis criadas no app
    let tabuada = Number(tabuadaInicial)
    let tab = Number(tabuadaFinal)
    let resultado

    //verifica se a tabuada inicial é maior que a tabuada final
    if (tabuadaInicial >= tabuadaFinal){

        //enquanto o contador for entre 0 e 10 vcont++ (adicione mais 1)
        for (let cont = 0; cont <= 10; cont++) {
            
            resultado = tabuada * cont
            console.log(`${tabuada} x ${cont} = ${resultado}`)
        }
    }
}

console.log(gerarTabuada())