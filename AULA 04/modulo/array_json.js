/***********************************************************
 * Objetivo: Manipular dados ultilizando array e json
 * Data: 05/03/2026
 * Autor: Aryely Hevylyn
 * Versão: 1.0
 * *********************************************************/

/**
    [] -> representa um objeto do tipo ARRAY
    {} -> representa um objeto do tipo JSON

    aray -> é um objeto na mémoria que permite trabalhar 
    com vários valores em um único objeto

    //forma tradicional de criar variaveis e guardar algum valor
    let nome1   = "josé"
    let nome2   = "maria"
    let nome3   = "joão"

    //como é feito em array

    exemplo de indice   0       1        2
    let nome    =   ["josé", "maria", "joão"] <- exemplo em array

    //um elemento de um array SEMPRE começa pelo indice 0 
    //um array pode ter 3 indices, mas ele sempre começará do zero  
    //ou seja, dentro deste array, o indice zero é o nome josé

    json -> é um objeto na memoria que permite trabalhar com chave e valor

    //ao inves de fazer desta forma
    let cliente            = "josé"
    let telefone        = "11 95748393"
    let email           = "jose@gmail.com"

    //no json favia desta forma
    let cliente = { "nome": "josé",
                    "telefone": "11 95748393",
                    "email": "jose@gmail.com"}
 */

//formas de criar um array
const listaDeNomes         = ['José',  'Maria', 'João','André', 'Alex'] //criar e já ir atribuindo os valores
//o java script permite que você adicione varios tipos de dados diferentes dentro do mesmo array (como string, number e boleano) 

const listaDeClientes   = [] //criar ele vazio e depois atribuir um valor de outro lugar
const listaDeFornecedores = []

const exibirDados = function(){

    console.log(listaDeNomes)
    //exibe o objeto array e seu conteudo

    console.table(listaDeNomes)
    //exibe o objeto array no formato de tabela com seus indices

    console.log(listaDeNomes[1])
    //exibe apenas o conteudo localizado no indice 0 (exibe o que está guardado neste indice)

    console.log(typeof(listaDeNomes[3]))
    //exibe o tipo de dados guardado no indice 3 (se é number, string ou boleano)

    //forma manual de printar na tela
    console.log('***********MANUAL*************')
    console.log(`O nome do cliente é: ${listaDeNomes[0]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[1]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[2]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[3]}`)
    console.log(`O nome do cliente é: ${listaDeNomes[4]}`)
   
  
    //estruturas de reptição para exibir todos os indices de uma vez
    //while
    console.log('***********WHILE*************')
    let cont = 0
    while(cont <= 4){
        //determina o contador e soma +1 assim como o FOR
        console.log(`o nome do cliente é: ${listaDeNomes[cont]}`)
        cont+=1
    }

    //estrutura de repetição ultilizando o for
    console.log('*************FOR************')
    //metodo tradicional onde você determina onde o contador inicia
    //onde o contador termina e sempre adicionar +1 ao fim de cada volta
    for (let contador = 0; contador < listaDeNomes.length; contador++){ //ao ultilizar o .length ele determina a quantidade de itens dentro de um array
                                                                        //desta forma não poderia ser <= pois ele faria uma vez a mais do que o necessario
        console.log(`o nome do cliente é: ${listaDeNomes[contador]}`)   //é muito ultilizado quanto você não sabe a quantidade de itens dentro do array
    }

    console.log('*************FOR EACH************')
    //retorna o conteudo de cada elemento atraves de um callback
    //faz a mesma coisa que o for e o while, mas ele não é um contador
    //não precisa controlar o indice
    //o proprio forEach faz as repetições de acordo com a quantidade de elemntos dentro do array
    listaDeNomes.forEach(function(cliente){
        console.log(`o nome do cliente é: ${cliente}`) //cria uma variavel para retornar o conteudo
    })

    console.log('*************FOR IN************')
    for (item in listaDeNomes){
        //retorna o indice do elemento, ee será preciso colocar dentro do objeto do array
        //ex: listaDeNomes[item]
        //praticamente igual ao for e while
        console.log(`o nome do cliente é: ${listaDeNomes[item]}`)
    }

    console.log('*************FOR OF************')
    for (cliente of listaDeNomes){
        //percorre o array e retorna somente o conteudo de cada indice
        //sendo muito parecido com o for it
        console.log(`o nome do cliente é: ${cliente}`)
    }

    //como identificar a quantidade de elementos dentro de um array
    console.log(listaDeNomes.length)
}

const manipularDados = function(){
    //adicionando valores novos  no array atraves de indices
    listaDeClientes[0] = 'josé da silva'
    listaDeClientes[1] = 'maria da silva'
    listaDeClientes[2] = 'joão da silva'
    //<1 empty item>,  <- caso você pule um indice, o java script te mostra que ele deixou um campo vazio (o indice pulado foi o indice 3)
    listaDeClientes[4] = 'alex da silva'

    console.log(listaDeClientes)

    //ao ultilizar o push, ele segue a ordem sequencial do indice e adiciona o proximo conteudo no final da lista de indices
    //permite adicionar novos valores no arrey, sempre no final da lista
    listaDeFornecedores.push('luiz da silva')
    listaDeFornecedores.push('zezinho da silva')
    listaDeFornecedores.push(`huguinho da silva`)
    listaDeFornecedores.push(`luizinho da silva`, `andré da silva`, `carlos da silva`)
    //você pode enviar todos os elementos em um push só e ele vai adicionar na lista
    //mesmo desta forma ele ainda adiciona cada elemento a um indice diferente
    //caso voce queira acessar um dos 3 elementos que esteja dentro do mesmo push
    //será possivel já que o push adiciona um indice diferente para cada um

    console.log(listaDeFornecedores)
}

//chama a função para que possa ser exibido no terminal
//exibirDados()
manipularDados()