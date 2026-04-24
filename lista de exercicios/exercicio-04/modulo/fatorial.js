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
    else if (Number(numeroFatorial) < 0) {
        return false;
    }

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

let entrada = "ss"; // Simulação de entrada do usuário

if (validarDados(entrada)) {
    console.log(calcularFatorial(entrada));
} else {
    console.log("Entrada inválida! O cálculo não foi realizado.");
}

