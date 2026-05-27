const numerosIniciais = function (inicio, final, opcao) {

    numeroInicial = Number(inicio)
    numeroFinal = Number(final)

    let contadorPar = 0
    let contadorImpar = 0
    let listaPar = ""
    let listaImpar = ""

    for (let contador = numeroInicial; contador <= numeroFinal; contador++) {

        if (contador % 2 == 0) {
            listaPar = listaPar + contador + "\n"
            contadorPar++
        } else {
            listaImpar = listaImpar + contador + "\n"
            contadorImpar++
        }

    }


    if (opcao == 1) {
        console.log("Números pares:\n" + listaPar)
        console.log("Quantidade de pares: " + contadorPar)

    } else if (opcao == 2) {
        console.log("Números ímpares:\n" + listaImpar)
        console.log("Quantidade de ímpares: " + contadorImpar)

    } else if (opcao == 3) {

        console.log("Números pares:\n" + listaPar)
        console.log("Quantidade de pares: " + contadorPar + "\n")

        console.log("Números ímpares:\n" + listaImpar)
        console.log("Quantidade de ímpares: " + contadorImpar)

    }

}


module.exports = {
    numerosIniciais
}