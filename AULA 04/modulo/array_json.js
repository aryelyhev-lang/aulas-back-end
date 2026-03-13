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
const listaDeNomes          = ['josé',  'Maria', 'João','André', 'Alex', 'Carlos', 'Ana', 'Bruna', 'Jake', 'josé', 'josé da silva'] //criar e já ir atribuindo os conteudos
                            //o java script permite que você adicione varios tipos de dados diferentes dentro do mesmo array (como string, number e boleano) 

const listaDeClientes       = [] //criar ele vazio e depois atribuir um valor de outro lugar
const listaDeFornecedores   = []

//funções com array
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
    //permite adicionar novos valores no array sempre no FINAL da lista
    listaDeFornecedores.push('luiz da silva')
    listaDeFornecedores.push('zezinho da silva')
    listaDeFornecedores.push(`huguinho da silva`)
    listaDeFornecedores.push(`luizinho da silva`, `andré da silva`, `carlos da silva`)
    //você pode enviar todos os elementos em um push só e ele vai adicionar na lista
    //mesmo desta forma ele ainda adiciona cada elemento a um indice diferente
    //caso voce queira acessar um dos 3 elementos que esteja dentro do mesmo push
    //será possivel já que o push adiciona um indice diferente para cada um

    //mostra como a lista estava antes do unshift
    console.table(listaDeFornecedores)


    //unshift permite adcionar novos elementos no array no INICIO da lista
    listaDeFornecedores.unshift("ana carolina")
    console.table(listaDeFornecedores)//mostra como a lista ficou depois do unshift


    //pop permite remover elementos do FINAL da lista
    listaDeFornecedores.pop()
    console.table(listaDeFornecedores)


    //shift permite remover um elemento do INICIO da lista e depois reorganiza os indices
    listaDeFornecedores.shift()
    console.table(listaDeFornecedores)

    //permite remover um elemento da lista baseado no indice
    listaDeFornecedores.splice(2,1)     //vai até o indice 2 e remove o primeiro indice que for encontrado 
    console.table(listaDeFornecedores)  //exemplo: (2,2) a partir do indice 2, apague 2 elementos
                                        //splice( indice, quantidade de elementos)
    
    //o splice tambem serve para adicionar itens em lugares expecificos
    //o primeiro indice determina a posição que o elemento adicionado ficará(2)
    //já o (0) determina a quantidade de itens que serão removidos
    //e o elemento entre aspas é o que será adcionado no lugar
    //ele adciona o novo elemento e reordena o resto para baixo  
    listaDeFornecedores.splice(2, 0, 'Carlos da silva')
    console.table(listaDeFornecedores)
    
}

const removerItem = function(nome){
    //percorre o array e entrega um elemento atraves de uma função de callback 
    //for each devolve um elemento e não o indice

    //nesse caso o for in seria mais adequado pois ele percorre o array e devolve o indice do elemento
    // for(indice in listaDeNomes){    //ele automaticamente percorre TODOS os elementos dentro do array

    //  //pega o indice do array e guarda numa variavel (variavel indice)
    //  //usa o for in para descobrir o indice 
    //     if(listaDeNomes[indice] == nome){
    //         listaDeNomes.splice(indice, 1)  //remove o elemento atraves do indice
    //                                         //ou seja usa um nome da lista para que o for in encontre o indice
    //                                         //e depois atraves do splice remove 1 elemento do indice do nome
    //     }
    // }

    //Retorna o indice de um elemento após fazer a busca dentro arrey pelo valor/nome do elemento
    //quando o index of não encontrar um elemento dentro do array, ele retornará -1 

    //let indice = listaDeNomes.indexOf(nome)   //ele pecorre o array até encontrar o conteudo (ele para quando encontra o valor/nome)
                                                //ou seja, se tiver dois valores iguais que você precisa apagar
                                                //ele percorre o array e apaga APENAS o primeiro que for encontrado
    //listaDeNomes.splice(indice, 1)            //remove o conteudo atraves do indice 
   
    //forma de usar o if e else no indexof para retornar true ou false
    //caso o indexof percorra o array e não encontre o elemento, ele retornara -1
    //por conta disse se ele for diferente de -> != menos 1 (será true) 
    //se não for diferente de -1 ele será false
    let indice = listaDeNomes.indexOf(nome)
    if(indice != -1){
        listaDeNomes.splice(indice, 1)
        return true
    }else{
        return false
    }
}

const verificarItem = function(nome){
    //includes = verifica a existencia de um conteudo dentro de uma lista
    //e retorna true ou false (é um boleano)
    return resposta = listaDeNomes.includes(nome)
}

//verifica quantas vezes um elemento se repete e retorna a quantidade dessa repetição
//ou seja, se na listaDeNomes tiver dois josé escritos iguais
//o foreach vai verificar quantas vezes esse conteudo se repete e irá retornar a quantidade (2)
const quantidadeDeItens = function(nome){
    let cont = 0
    listaDeNomes.forEach(function(item){
        //o toUpperCase irá tornar tudo escrito para maiusculo
        //torna as variaveis item e nome em string
        if (String(item).toUpperCase() == String(nome).toUpperCase())
            cont +=1
    })

    return cont
}

//função onde será ultilizado json
const criandoDadosJson = function(){
    //json é baseado em chave valor, conteudo e atributos
    //sugestão: atributos sempre em minusculo e estar entre aspas duplas
    let aluno = {   
                    "nome": "josé",
                    "ra": 123456, //não está entre aspas pois é um numero inteiro
                    "telefone": "9876-43829", //está entre aspas porque pode ser considerado uma string pelo -
                    "email": "jose@gmail.com"
                }

    //exibindo o json inteiro
    console.log(aluno)
    //console.table(aluno)  //table normalmente usado somente em array por ter uma tabela chamada index, ou seja indice
                            //pois no json não tem indice, ele tem atributos

    //exibindo apenas o atributo do json
    console.log(aluno.nome) 
    console.log(aluno.email)

    //adiciona um novo atributo no json
    aluno.sexo = 'masculino'
    console.log(aluno)

    //remove um atributo dentro do json
    delete aluno.telefone
    console.log(aluno)
}

//misturando as estruturas de array e json
const cadastroDeProdutos = function(){

    //esse objeto de cores é um array que terá um json dentro
    let cores = [ // <- inicio do array
        {"id": 1, "cor": "Branco"},    //é o indice 0 do array
        {"id": 2, "cor": "Preto"},     //indice 1 do array
        {"id": 3, "cor": "Azul"},      //indice 2
        {"id": 4, "cor": "Rosa"},      //indice 3
        {"id": 5, "cor": "Cinza"}      //indice 4
        //o atributo deve ser sempre em minusculo
        //mas o conteudo pode ser em maiusculo
    ]

    let marcas = [
        {"id": 1, "marca": "LG",        "telefone": "128344828", "email": "lg@gmail.com"},           //indice 0
        {"id": 2, "marca": "Dell",      "telefone": "224737373", "email": "dell@gmail.com"},         //indice 1
        {"id": 3, "marca": "Lenovo",    "telefone": "337827374", "email": "lenovo@gmail.com"},       //indice 2
        {"id": 4, "marca": "Apple",     "telefone": "673838338", "email": "apple@gmail.com"},        //indice 3
        {"id": 5, "marca": "Rayzer",    "telefone": "394848383", "email": "rayzer@gmail.com"},       //indice 4
        {"id": 6, "marca": "Logitech",  "telefone": "385575757", "email": "logitech@gmail.com"},     //indice 5
        {"id": 7, "marca": "Multilaser","telefone": "575478833", "email": "multilaser@gmail.com"}    //indice 6
    ]

    let produtos = [
        {
            "id": 1,
            "nome": "monitor",
            "descricao": "27 polegadas",
            "marca":[
                         marcas[1].marca //pega o atributo 1 dentro do objeto marcas
                    ],
            "qtde": 20,
            "cor": [        //chama o objeto e os respectivos indices de cada cor
                cores[4],   //um array que guarda mais de uma cor
                cores[1]    //dentro de outro array
            ],
            "valor": 880.50 //o valor não fica nas aspas pois é um number e não uma string 
        },

        { 
            "id": 2,
            "nome": "teclado",
            "descricao": "tecldo mecânico RGB",
            "marca":[
                        marcas[5].marca //pega um objeto dentro do atributo marcas
                    ],
            "qtde": 200,
            "cor": cores, //trás todas as CORES guardadas dentro do atributo cores
            "valor": 150
        },

        { 
            "id": 3, //indice do produto mouse
            "nome": "mouse",
            "descricao": "mouse sem fio",
            "marca":[
                        marcas[0].marca,
                        marcas[1].marca,
                        marcas[5].marca
                    ], 
            "qtde": 500,
            "cor":[     //chama o objeto e os respectivos indices de cada cor
                        cores[0],
                        cores[1],
                        cores[4]
            ],
            "valor": 150
        },

    ]

    //tentativa de fazer repetição de produto
    produtos.forEach(function(nomeProduto){
        console.log(nomeProduto)

        //repetição de cores
        produtos.forEach(function(nomeCor){
            console.log(nomeProduto.cor.cor)

            //repetição de marcas
            produtos.forEach(function(nomeMarca){
                console.log(nomeProduto.marca.marcas)
            })
        })
    })

    //um json só da para pegar um elemento por ponto
    //para array é chamado pelo indice 

    //console.table(cores)          //mostra uma tabela com os indices, os ids e as cores

    //console.log(cores[2].nome)    //exibe apenas o elemento dentro do atributo NOME
                                    //no console log acima, ele chama o objeto (cores) pelo INDICE 
                                    //não pelo id guardado dentro do json cores

    // console.log(produtos)           //navega dentro de 1 array
    // console.log(produtos[0].cor)    //navega dentro de dois array´s
    // console.table(produtos)         //mostra os indices dentro do objeto produtos
                              
    // console.log(produtos[0].cor[1].cor)
    //por ter apenas um produto cadastrado, ele é o indice 0
    //0 que representa qual indice está o produto que guarda o atributo cor
    //o 1 representa o indice da cor preto que está dentro do atributo cor


    //estrutura de repetição com um array que guarda um json
    //chama o objeto array produtos com o indice 0
    //.cor para chamar o atributo dentro do json
    //forEach faz as repetições de acordo com a quantidade de elemntos dentro do array
    //function recebe nome de uma variavel criada
    //.cor para pegar o NOME dentro do json
    // produtos[0].cor.forEach(function(nomeCor){
    //     console.log("a cor do produto é: " + nomeCor.cor)   //.cor para chegar no nome da cor
    //                                                         //caso contrario ele te devolve o "objeto" inteiro do json
    // })

    //console.table(produtos)
}

// let resposta = removerItem ('Carlos')
// if (resposta)
//     console.log("item removido com sucesso")
//     //avalia se o item do removerItem foi removido e imprime essa mensagem
// else
//     console.log("Não foram encontrados itens para ser removido")
//     //avalia caso Não tenha sido removido e imprime essa mensagem

//chama a função para que possa ser exibido no terminal

// console.table(listaDeNomes) //mostra o depois da lista
// exibirDados()
// manipularDados()
//console.table(listaDeNomes) //mostra a lista antes do removerItem(bruna, maria)
//console.log(verificarItem('Maria'))
//console.log(quantidadeDeItens("josé"))
//(manipularDados)
//criandoDadosJson()
cadastroDeProdutos()