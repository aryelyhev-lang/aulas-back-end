const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const validarDados = require("./modulo/validar")
const calculo = require("./modulo/calculo")

entradaDeDados.question('Por favor digite um numero inicial de 0 até 500: ', function (inicio) {
    let numeroInicial = inicio
    entradaDeDados.question('Por favor digite um numero final de 100 até 1000: ', function (final) {
        let numeroFinal = final
        entradaDeDados.question("Mostrar Pares - [1]" + "\n" + "Mostrar Ímpares - [2]" + "\n" + "Mostrar Ambos - [3]" + "\n" + 'Por favor escolha uma opção: '  , function (escolha) {
            let opcao = escolha

            if (validarDados.tratativa(numeroInicial, numeroFinal, opcao)) {

                calculo.numero(numeroInicial, numeroFinal, opcao)

            }
            entradaDeDados.close()

        })
    })
})