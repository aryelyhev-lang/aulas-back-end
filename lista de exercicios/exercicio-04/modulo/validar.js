const tratativaDeDados = function (numeroUsuario) {

    if (numeroUsuario == "") {
        console.log("ERRO: não é permitido campo vazio")
        return false
    }


    if (numeroUsuario == 0) {
        console.log("ERRO: não existe fatorial de 0")
        return false
    }


    if (numeroUsuario == 1) {
        console.log("ERRO: digite um numero maior que 1 para uma fatoração válida")
        return false
    }


    if (isNaN(numeroUsuario)) {
        console.log("ERRO: não é permitido letras preencha o campo APENAS com números")
        return false
    }
    return true
}

module.exports = {
    tratativaDeDados
}