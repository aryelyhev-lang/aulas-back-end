//arquivo responsavel por calcular o fatorial de um numero

//função responsavel por validar os dados
const validarDados = function(numeroFatorial){

    if (numeroFatorial == "") {
        //proibe a entrada de campos vazios
        return false

    } else if (!isNaN(numeroFatorial)) {
        //não permite a entrada de letras ou caracters
        return false

    } else if (numeroFatorial <= 1) {
        //não permite numeros entre 1 e 0
        return false
    } else {
        //retorna true caso tudo acima esteja correto
        return true
    }

}

//função responsavel por realizar o calculo
const calcularFatorial = function(){

}