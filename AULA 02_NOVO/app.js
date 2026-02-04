/**************************************************************************************
 * Objetivo: Calcular médias escolares
 * Data: 29/01/2026
 * Autor: Aryey Hevylyn
 * Versão: 1.0
 * ************************************************************************************/

/*
    Existem três formas de criação de variáveis

        var -> Permite a criação de um espaço na memória
                do tipo variável. Foi muito ultilizado
                em projetos antigos.
                recomendação: Caso você queira ultilizar,
                recomenda-se na criação de variáveis globais
                (ficam no inicio do código).

        let -> Permite a criação de um espaço na memória
                do tipo variável. A ultilização deste padrão é
                para a criação dentro de blocos de programação { }.
                Essa variável nasce e morre dentro deste bloco.
                Não é recomendado a sua ultilização em escopo global.

        const -> Permite a criação de um espaço na memória 
                onde não sofrerá alteração durante o código. A const 
                pode ser ultilizada dentro e fora de bloco { }.
                Dica: Caso você queira criar uma const, um var ou
                um let.
                A const você pode criar com letras MAIUSCULAS.

*/

const readline = require("readline")

const entradaDeDados = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

//entrada nome aluno
entradaDeDados.question("Digite o nome do aluno: ", function (nome){
    //recebe o nome do aluno que foi digitado 
    let nomeAluno = nome

    //entrada nota1
    entradaDeDados.question("Digite a nota 1: ", function (valor1){
        let nota1 = valor1

        //entrada nota2
        entradaDeDados.question("Digite a nota 2: ", function (valor2){
            let nota2 = valor2

            //entrada nota3
            entradaDeDados.question("Digite a nota 4: ", function (valor3){
                let nota3 = valor3

                //entrada nota4
                entradaDeDados.question("Digite a nota 4: ", function (valor4){
                    let nota4 = valor4

                    /*  
                        Operadores de Comparação
    
                        == igual igual = permite comparar a igualdade de dois conteúdos no geral
                        <  menor = permite comparar valores menores
                        >  maior = permite comparar valores maiores
                        >= maior igual = permite comparar valores maiores ou iguais
                        <= menor igual = permite comparar valores menores ou iguais
                        != diferente de = permite comparar a diferença entre conteúdos
                        === igual igual igual =  permite comparar a igualdade
                            de conteúdos e a igualdade de tipagem de dados 
                        !== diferente igual igual = permite comparar a diferença
                            de conteúdos e a igualdade de tipos de dados 
                        ==! igual diferente de = permite comparar a igualdade
                            de conteúdos e a diferença de tipos de dados
                        !=! difente de diferente de = permite comparar a diferença
                            de conteúdos e a diferença de tipos de dados
    
                        Operadores lógicos 
                            E -> AND -> &&
                            OU -> OR -> ||
                            NÃO -> NOT -> !
                    */

                    //validação de uma entrada vazia (campo não preenchido pelo usúario)
                    if (nomeAluno == "" || nota1 == "" || nota2 == "" || nota3 == "" || nota4 == "") {
                        console.log("ERRO: É obrigatório o preenchimento de todos os dados !!!")
                    //validação entre 0 e 100
                    } else if (nota1 > 100 || nota2 > 100 || nota3 > 100 || nota4 > 100 || nota1 < 0 || nota2 < 0 || nota3 < 0 || nota4 < 0){
                        console.log("ERRO: Nota invalida! digite uma nota entre 0 e 100")
                    //calcular a media 
            
                    //o if já valida inicialmente uma pergunta como verdadeiro,
                    //portanto não é necessario fazer uma comparação como
                    //isNaN(nota1) == true || isNaN(nota) == true
                    }else if(isNaN(nota1) || isNaN(nota2) || isNaN(nota3) || isNaN(nota4)){
                        console.log("ERRO: Não é possível calculr a média com a entrada de caracters ou letras!!!")
                
                    //a função isNam significa "is not number?" ou seja, "isso não é um número?"
                    //permite validar se o conteúdo da variavel tem algum caracter ao invés de número 
                    //ele verifica o que o usúario digita e retorna um boolean
                    //ou seja, true ou false (se o usúario digitar um número, a resposta será false)
                    //caso o usúario digitar uma letra ou caracter, a função irá retornar true
                    }else{
                        let statusAluno 
                        let media = (Number(nota1) + Number(nota2) + Number(nota3) + Number(nota4))/4
                        //toFixed determina quantas casas decimais aparecem após o ponto da nota
                        /*
                            conversões de tipos de dados:
                            parseInt() -> Permite converter uma String para número inteiro
                            parseFloat() -> Permite converter uma String para número decimal
                            Number() -> Permite converter uma String para Número (inteiro ou decimal)
                            String() -> permite converter um conteúdo para String
                            Boolean() -> Permite converter um conteúdo para Booleano
                            typeof() -> Permite verificar o tipo de dados de uma variável 
                         */

                        if (media >= 70){
                            statusAluno = "aprovado"
                        }else if (media >= 50 && media <= 69.9){
                            statusAluno = "recuperação"
                        }else if(media < 50){
                            statusAluno = "reprovado!"
                        }

                        console.log("O aluno " + nomeAluno + " ficou com a média: " + media.toFixed(2) + "e está: " + statusAluno) 
                        //o comando \n serve para quebrar uma linha
                        //('aluno:  ${nomeAluno} \n média final: ${media.toFixed(2)} \n Status do aluno: ${statusAluno}')
                        //outra forma de apresentar o resultado ao usúario usando \ns
                    }

                })//fecha a nota 4
            })//fecha a nota 3
         })//fecha a nota 2
    })//fecha nota 1
})//fecha nome