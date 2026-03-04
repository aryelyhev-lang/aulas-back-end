/*******************************************************
 * Objetivo: Arquivo responsavel realizar o calculo da media escolar
 * Data: 04/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//função para validar os dados
const validarDados = function(nomeAluno, nomeProfessor, generoAluno, generoProfessor, nota1, nota2, nota3, nota4, nomeDisciplina){

    if(nomeAluno == "" || nomeProfessor == "" || generoAluno == "" || generoProfessor == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "" || nomeDisciplina == ""){
        //proibe a entrada de campos vazios
        return false

    }else if( !isNaN(nomeAluno) || !isNaN(nomeProfessor) || !isNaN(generoAluno) || !isNaN(generoProfessor) || !isNaN(nomeDisciplina)){
        //proibe a entrada de numeros em campos onde só é permitido a entrada de letras
        return false

    }else if(nota1 < 0 && nota1 >= 100 && nota2 < 0 && nota2 >= 100 && nota3 < 0 && nota3 >= 100 && nota4 < 0 && nota4 >= 100){
        //proibe a entrada de uma nota menor do que 0 ou maior do que 100
        return false 

    }else{
        return true
    }

}

//função de calcular a media escolar
const calcularMedia = function(nota1, nota2, nota3, nota4){

    //cria as variaveis que irão receber o argumento da função 
    //transforma o conteudo em number
    let primeiraNota = Number(nota1)
    let segundaNota = Number(nota2)
    let terceiranota = Number(nota3)
    let quartaNota = Number(nota4)

    //calculo da media
    let media = (primeiraNota + segundaNota + terceiranota + quartaNota)/4
    return media //retorna a media do aluno calculada
}

//recebe a media calculada e devolve o status do aluno como string
const statusAluno = function(media){
    let status = Number(media)

    if(status >= 70){
        return "aprovado"

    }else if(status < 50 ){
        return "reprovado"

    }else if(status >= 50 && status <= 60){
        return "recuperação"
    }
}

//calcula novamente a media escolar, juntamente com a nota do exame
const alunoRecuperacao = function(statusAluno, media, notaExame){

    //novo calculo da media caso o aluno esteja em recuperação
    if(statusAluno == "recuperação"){

        let mediaFinal = (Number(notaExame) + Number(media)) / 2
        return mediaFinal
    }
}

//verifica qual o genero do aluno e devolve a menssagem com os pronomes corretos
const tratamentoDeGeneroAluno = function(generoAluno){
    let sexoDoAluno = String(generoAluno)

    if(sexoDoAluno == "feminino"){
        return "A aluna"
    
    }else if(sexoDoAluno == "masculino"){
        return "O aluno"
    }
}

//verifica qual o genero do professor e devolve a menssagem com os pronomes corretos
const tratamentoDeGeneroProfessor = function(generoProfessor){
    let sexoDoProfessor = String(generoProfessor)

    if(sexoDoProfessor == "feminino"){
        return generoProf = "A professora"
    
    }else if(sexoDoProfessor == "masculino"){
        return generoProf = "O professor"
    }
}


//exporta as funções para o app.js
module.exports ={
    validarDados,
    calcularMedia,
    statusAluno,
    alunoRecuperacao,
    tratamentoDeGeneroAluno,
    tratamentoDeGeneroProfessor
}