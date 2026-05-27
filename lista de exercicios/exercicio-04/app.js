
const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


const calculo = require("./modulo/fatorial")
const validarDados = require("./modulo/validar")

entradaDeDados.question('Por favor digite um numero para poder fatorar: ', function (fatorial) {
    let fatorando = fatorial

    if (validarDados.fatorial(fatorando)) {
        calculo.calcular(Number(fatorando))
    }

    entradaDeDados.close()

})