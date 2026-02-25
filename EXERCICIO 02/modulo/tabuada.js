/*******************************************************
 * Objetivo: Arquivo responsavel por gerar a tabuada de um numero
 * Data: 25/02/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *****************************************************/

//import da biblioteca que guarda funções de calculos matematicos
const calculosMatematicos = require("./calcular.js")

//estruturas de repetição

//o que é a estrutura de repetição: Ela é como um cronometro, precisa ter um start, um ponto de parada e um contador
//sempre definir onde ela começa e onde termina
//while possui uma variação cont(contador), ele serve para contar quantas vezes(em quanto), ou seja, quantas vezes vai repetir o loop
//o contador sempre muda quando volta para o start (muda sempre que da uma volta completa)
//while(cont < = 10) -> condição da repetição
//cont = cont + 1 (de quanto em quanto o contador aumenta sempre que ele retornar ao start, nesse caso, ele aumentaria de 1 em 1)

//função para imprimir a tabuada usando while 
const gerartabuada = function(tabuada){
    
    //recebe a tabuada a ser gerada
    let tab = Number(tabuada) //tab é o nome da variavel
    let cont = 0 //variavel contador, sempre vai começar em zero por conta da tabuada
    let resultado 

    //repetição para gerar a tabuada até 10
    //só criar o while depois que criar a formula da primeira linha (a linha que será usada narepetição)
    while(cont <= 10){

        //guarda a conta na variavel resulta
        //resultado = tab * cont como ficaria o calculo CASO não fossemos usar uma função de outro arquivo
        //o objetivo é se abtuar a importar funções prontas de outros projetos
        resultado = calculosMatematicos.multiplicar(tab, cont) //função criada em outro projeto para multiplicar
        //chama a função multiplicar para realizar a operação 
        console.log(tab + " x " + cont + " = " + resultado)
        //console.log('${tab} x ${cont} = ${resultado') outro modo de concatenar

        //formas colocar o contador + 1:
        //cont = cont + 1
        //cont++
        cont +=1 //declara o contador
    }

}

//função para imprimir a tabuada usando FOR
const gerartabuadaFor = function(tabuada){
     
    let tab = Number(tabuada) 
    let cont = 0 
    let resultado 

    //determina o parametro, a condição e a repetição, tudo em apenas uma linha
    //determina o inicio que é 0, sinaliza que enquanto o cont for <= a 10 ele deve adicionar sempre mais 1 (cont++)
    //a estrutura sempre vai ser a declaração, o ponto de parada e o incremento

     for(let cont = 0; cont <= 10; cont++){
         resultado = calculosMatematicos.multiplicar(tab, cont)
         console.log(tab + " x " + cont + " = " + resultado)
     }

} //fizemos duas funções igual, que fazem a mesma coisa, porém uma fez a repetição em while w a outra fez em FOR
  //ambas não terão conflito pois somente UMA das duas está sendo declarada lá embaixo (que foi a função feita com while)


gerartabuada(2) //o numero representa o parametro da tabuada, ou seja, qual numero vai ser o multiplicador 
                //(exemplo: 2 x 0 = 0 ou 2 x 1 = 2, nesse caso o numero 2 é o parametro)