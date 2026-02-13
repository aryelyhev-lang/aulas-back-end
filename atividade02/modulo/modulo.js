//o return nunca imprime nada na tela
//a função que chama o return que imprime na tela
//ou seja, nunca coloque um return console.log junto

function dadosTratamento(numberCliente, numberMultiplicador, operadorMatematico){
//função que trata erros de entrada
        
    //valida os tipos de dados
    let numeroPrimario = Number (numberCliente)
    let numeroSecundario = Number(numberMultiplicador)
    let nomeOperador = String (operadorMatematico)
        
        if (nomeOperador == "" ||  numeroPrimario == "" || numeroSecundario == ""){
            //proibe a entrada de campos vazios
            console.log("ERRO: Prencha todos os campos em branco!");
            return false;

        }if (isNaN(numeroPrimario) || isNaN(numeroSecundario)){
            //verificar se os numeros são validos e proibe a entrada de letras
            console.log("ERRO: Digite apenas números válidos!");
            return false;
        
        }if (nomeOperador !== "adição" || nomeOperador !== "subtração" || nomeOperador !== "multiplicação" || nomeOperador !== "divisão"){
            //verifica se o operador foi escrito corretamente
            console.log("ERRO: Digite um operador válido!");
            return false;
        }

}

//formula dos calculos
function somaDosNumeros(numberCliente, numberMultiplicador, operadorMatematico){
    
    let numeroPrimarioSoma = Number (numberCliente)
    let numeroSecundarioSoma = Number (numberMultiplicador)
        
        if(operadorMatematico == "adição"){
            numeroPrimarioSoma + numeroSecundarioSoma
         }
}

module.exports = {
    dadosTratamento,
    somaDosNumeros
}