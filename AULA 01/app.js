/* comentario em bloco*/

//imprime um conteudo no terminal
console.log("Testando o print do console")

//var para criar uma variavel, atribui um nome
var nome = "Aryely"

console.log(nome)

//concatena uma variavel com uma string/texto
console.log("O nome do usuario é: " + nome)
//faz a mesma coisa da anterior
console.log(`O nome do usuario é: ${nome}`)

//crie uma variavel com o nome da biblioteca que você pretende usar
var readline = require("readline")
/*readline nome da biblioteca que sera importada
 para captar a entrada de dados via terminal*/

 //cria uma interfac para entrada e saida de dados pelo terminal
 var entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
 })

 //função para retornar o nome digitado no terminal
 //o metodo question após a digitação chama a sua função "call back" (funtion)
 //para entregar o que foi digitado no terminal, atraves do argumento 
 //nomeUsuario
 entradaDeDados.question("Digite seu nome:",function( nomeUsuario){
    console.log("O nome do usuário é: " + nomeUsuario)
    //entrada de dados para o email
    //para que o usuario possa responder outras perguntas
    //vamos atribuir uma função dentro da outra
    entradaDeDados.question("Digite o seu e-mail:", function(emailUsuario){
        console.log(`O email informado é: ${emailUsuario}`)
    })
 })
 
