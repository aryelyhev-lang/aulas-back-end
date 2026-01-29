
console.log("iniciando a aplicação")

var readline = require("readline")

var obterDados = Readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

obterDados.question("Digite seu nome", function (nomeUsuario) {
    obterDados.question("Digite o primeiro valor: ", function (valor1) {
        obterDados.question("Digite o segundo valor: ", function (valo2) {
            obterDados.question("Digite o terceiro valor: ", function (valoe3) {
                //soma os 3 valores. A classe Number converte uma 
                //String para númerols
                var soma = Number(valor1) + Number(valo2) + Number(valoe3)
                console.log("Nome: " + nomeUsuario)
                console.log("o resultado é:  " + soma)
            })
        })
    })

})