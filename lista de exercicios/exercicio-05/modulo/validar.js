const validarDados = function (inicio, final, escolha) {

    opcao = Number(escolha)
    numeroInicial = Number(inicio)
    numeroFinal = Number(final)

    if (numeroInicial === "" || numeroFinal === "") {
        console.log("ERRO: não é permitido campo vazio")
        return false
    }


    if (numeroInicial < 0 || numeroInicial > 500) {
        console.log("ERRO: Digite no número inicial de 0 a 500")
        return false
    }


    if (numeroFinal < 100 || numeroFinal > 1000) {
        console.log("ERRO: Digite no número Final de 100 a 1000")
        return false
    }


    if (isNaN(numeroInicial) || isNaN(numeroFinal)) {
        console.log("ERRO: não é permitido letras preencha o campo APENAS com números")
        return false
    }

    if (numeroInicial > numeroFinal) {
        console.log("ERRO: não é permitido o número inical ser maior que o numero final")
        return false
    }

    if (numeroInicial == numeroFinal) {
        console.log("ERRO: não é permitido o número inical e o numero final serem iguais")
        return false
    }

    if (isNaN(opcao) || opcao < 1 || opcao > 3) {
        console.log("ERRO: escolha uma opção válida (1, 2 ou 3)")
        return false
    }
    return true
}

module.exports = {
    validarDados
}