const listaDeEstados = require("./estados_cidades")

//função que recebe o paramentro com a lista de estados
function getlistaDeEstados(listaDeEstados){

    // pega o array de "estados" dentro do json
    const estados = listaDeEstados.estados

    //variavel que guarda a estrutura do json para receber as uf's
    let resultado = {
        uf : [  ],
        quantidade : [  ]
    }

    //percorre o array "estados" que está dentro do json listaDeEstados
    estados.forEach(function(estado){
        //adiciona as siglas dentro da variavel resultado
        resultado.uf.push(estado.sigla)
    })

    //chama a variavel resultado ponto quantidade
    //faz um push de estados.length para exibir
    //quantos elementos tem dentro array "estados"
    resultado.quantidade.push(estados.length)

    //retorna a variavel resultado que agora guarda estado.sigla
    return resultado
}

//função para exibir um estado por vez de forma detalhada
function getDadosEstado(listaDeEstados){

}

//chama a função
console.log(getlistaDeEstados(listaDeEstados))
