/**************************************************************
 * Objetivo: Arquivo responsavel por gerar o resultado do calculo
 * Data: 04/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * ************************************************************/

//import da biblioteca que faz o calculo da media escolar
const { validarDados } = require("../exercicio-02/modulo/calcularMedia")
const calculoDaMedia = require("./modulo/calcularMedia")

//variaveis que irão guardar os valores das notas, nome e sexo do aluno/professor
let nomeAluno = "josé"
let nomeProfessor = "amanda"
let generoAluno = "masculino"
let generoProfessor = "feminino"
let nomeDisciplina = "matematica"
let nota1 = "46"
let nota2 = "39"
let nota3 = "55"
let nota4 = "70"
let notaExame = "60"

//faz a função validarDados chamar chamar a função de calcular imc 
//se a validação determinar que tudo está de acordo, ela exibe o resuldado
if(validarDados(nomeAluno, nomeProfessor, generoAluno, generoProfessor, nota1, nota2, nota3, nota4, nomeDisciplina, notaExame)){

    let media = calculoDaMedia.calcularMedia(nota1, nota2, nota3, nota4)
    let status = calculoDaMedia.statusAluno(media)

    /**
     * if (media == "recuperação"){
        let mediaFinal = (Number(notaExame) + Number(media)) / 2
        return mediaFinal
        //ajustar essa parte na proxima aula
    }
     */
    
    let tratamentoAluno = calculoDaMedia.tratamentoDeGeneroAluno(generoAluno)

    console.log(tratamentoAluno + " " + nomeAluno + 
        " da disciplina " + nomeDisciplina + 
        " ficou com a média final " + media + 
        " e seu status é: " + status)
    
}else{
    console.log("Erro ao realizar o cálculo da media")
    //caso tenha algum erro, a aplicação se encerra
}
