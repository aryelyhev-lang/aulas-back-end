//arquivo responsavel por calcular o fatorial de um numero

//função responsavel por validar os dados
const validarDados = function(numeroFatorial) {

    if (numeroFatorial === "") {
        return false;
    } 
    // Se NÃO for apenas números, retorna falso
    else if (!/^\d+$/.test(numeroFatorial)) {
        return false;
    } 
    // Se for menor que 0, retorna falso
    else if (Number(numeroFatorial) <= 1) {
        return false;
    }

    console.log(numeroFatorial)
    return true;
    
}

//função responsavel por realizar o calculo do fatorial
const calcularFatorial = function(numeroFatorial) {
    let fatorial = Number(numeroFatorial);
    let resultado = 1;

    for (let cont = fatorial; cont > 1; cont--) {
        resultado *= cont;
    }

    return resultado;
}


