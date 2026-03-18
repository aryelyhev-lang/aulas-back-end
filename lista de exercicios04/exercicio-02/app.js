/**************************************************************
 * Objetivo: Arquivo responsavel por gerar o resultado do calculo
 * Data: 04/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * ************************************************************/

//import da biblioteca que faz o calculo da media escolar
const { validarDados } = require("../exercicio-02/modulo/calcularMedia")
const calculoDaMedia = require("./modulo/calcularMedia")

//variaveis que guardam os valores para teste
let nomeAluno = "Fernanda"
let nomeProfessor = "amanda"
let generoAluno = "feminino"
let generoProfessor = "feminino"
let nomeDisciplina = "matematica"
let nota1 = "90"
let nota2 = "90"
let nota3 = "90"
let nota4 = "90"
let notaExame = "20"

//verifica se a função validarDados retornou todas as condições da entrada de dados verdadeiras
if (validarDados(nomeAluno, nomeProfessor, generoAluno, generoProfessor, nota1, nota2, nota3, nota4, nomeDisciplina, notaExame)) {

    //chama as funções que estão dentro do modulo
    let generoProf = calculoDaMedia.tratamentoDeGeneroProfessor(generoProfessor)
    let media = calculoDaMedia.calcularMedia(nota1, nota2, nota3, nota4)
    let status = calculoDaMedia.statusAluno(media)

    //sempre será exibida essa mensagem, a não ser que o aluno fique de recuperação
    let mediaFinal = "não possui nota do exame"

    //calcula a media das notas do aluno, junto com a nota do exame e imprime uma nova media final
    if (status == "recuperação") {
        mediaFinal = (Number(notaExame) + Number(media)) / 2
    }

    //chama a função tratamentoGeneroAluno
    let tratamentoAluno = calculoDaMedia.tratamentoDeGeneroAluno(generoAluno)

    //imprime a mensagem final após realizar o calculo
        console.log(tratamentoAluno + " " + nomeAluno +
        "\nstatus: " + status + "\ndisciplina: " + nomeDisciplina +
        "\n" + generoProf + nomeProfessor +
        "\nNotas do aluno: " + nota1 + ", " + nota2 + ", " + nota3 + ", " + nota4 +
        "\nMédia final: " + media +
        "\nMédia final do exame: " + mediaFinal)

    } else{
        //imprime a mensagem de erro caso algo esteja errado
        console.log("Erro ao realizar o cálculo da média")
    }
