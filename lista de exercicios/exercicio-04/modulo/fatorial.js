//arquivo responsavel por calcular o fatorial de um numero

const calcularFatorial = function (numeroUsuario) {

    let fatorando = 1
    let sequencia = ""

    for (let contador = numeroUsuario; contador >= 1; contador--) {

        fatorando = fatorando * contador
        sequencia = sequencia + contador

        if (contador > 1) {
            sequencia = sequencia + "x"
        }

    }

    console.log(`Fatorial de ${numeroUsuario} é ${sequencia} = ${fatorando}`)
}

module.exports = {
    calcularFatorial
}