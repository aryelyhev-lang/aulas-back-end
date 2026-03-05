let valorPercentual = 10
//importa a biblioteca "modulo" que guarda as funçôes de calculo para serem utilizadas aqui
let calculos = require("./modulo/calculo.js")

let percentual = calculos.calcularPercentual(valorPercentual)
    console.log(percentual)