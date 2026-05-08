
const { validarDados } = require("../exercicio-03/modulo/tabuada")
const calcularFatorial = require("./modulo/tabuada")

let entrada = "1"; // Simulação de entrada do usuário


if (validarDados(entrada)) {
    console.log(calcularFatorial(entrada));
} else {
    console.log("Entrada inválida! O cálculo não foi realizado.");
}




