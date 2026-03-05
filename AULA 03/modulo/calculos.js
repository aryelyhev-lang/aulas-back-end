/*************************************************
 * Objetivo: Arquivo responsavel pelas funções de calculos para este projeto
 * Autor: Aryely hevylyn
 * Data: 11/02/2026
 * Versão: 1.0
 * ***********************************************/


//Criando uma função para calcular o valor da compra parcelada
//Metodo tradicional de criar uma função
//toda função que for criada precisa ter um nome (argumento){} 
//dentro do parentes fica a area de argumento, ou seja entrada de dados
//é obrigatorio ter um return em cada função, pode ser um boleaono true ou false
//return -> saida   argumento -> entrada 
function calcularJurosCompostos(valorCompra, taxaJuros, tempoPagto){
    //recebe os argumentos da função em variaveis locais
    //as variaveis valor, taxa e tempo são numericas por conta da conversão 
    //mas os argumentos valorCompra, taxaJuros e tempoPagto ainda serão Strings
    let valor = Number(valorCompra)
    let taxa =  Number(taxaJuros)
    let tempo = Number(tempoPagto)

    if(valorCompra == "" || isNaN(valorCompra) || tempoPagto == "" || isNaN(tempoPagto)){
        console.log("ERRO: Valores de compra ou tempo de pagamento estão incorretos.")
        return false
    }else{
        //chama a função para converter o numero em percentual
        let percentual = calcularPercentual(taxa)
    
        //validção para o erro do percentual na função calcularPercentual
        if (percentual){
            let montante = valor * ((1+percentual)**tempo)
            return Number(montante.toFixed(2))
        }else{
            console.log("ERRO: Valor da taxa está incorreto.")
            return false 
        }
    }
    //console.log(percentual)
    //console.log(typeof(percentual))
    //verificar se está devolvendo number, string ou boleano
    //let montante = valor * ((1+taxa)**tempo) <- como estava antes de criar a função calcularPercentual
    
}


//essa função divide o percentual por 100
//foi criado em uma função separada para ser ultilizada em multiplos lugares
function calcularPercentual(numero){
    let NumeroPercentual = Number(numero)
  
    if(numero == "" || numero <= 0 || isNaN(numero)){
        return false //não pode processar

    }else{
        //processamento do calculo do percentual
        let percentual = NumeroPercentual / 100
        return Number(percentual.toFixed(2))
        //toFixed fixa o resultado em duas casas decimais após a virgula
        //toFixed sempre retorna o numero como string
        //portanto é necessario coloca Number antes do toFixed
        //return percentual.toFixed(2) como normalmente é feito, mas retorna String
    } 
}

//tornando as duas funçôes publicas para outros projetos poderem utilizar tambem
module.exports = {
    calcularJurosCompostos,
    calcularPercentual

}