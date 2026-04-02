const listaTodos = require("./estados_cidades")

//função que recebe o paramentro com a lista de estados
function getListaDeEstados() {

    //pega o array de "estados" dentro do json
    const lstEstados = listaTodos.listaDeEstados.estados

    //variavel que guarda a estrutura do json para receber as uf's
    let resultado = {
        uf: [],
        quantidade: []
    }

    //percorre o array "estados" que está dentro do json listaDeEstados
    lstEstados.forEach(function (estado) {
        //adiciona as siglas dentro da variavel resultado
        resultado.uf.push(estado.sigla)
    })

    //chama a variavel resultado ponto quantidade
    //faz um push de estados.length para exibir
    //quantos elementos tem dentro array "estados"
    //só ultilizar o push quando o objeto for um array
    resultado.quantidade.push(lstEstados.length)

    //retorna a variavel resultado que agora guarda estado.sigla
    return resultado
}


//função para exibir um estado por vez de forma detalhada
//o parametro uf é uma variavel que recebe o valor quando a função é chamada
function getDadosEstado(uf) {

    //constante que pega os estados dentro do json
    const estados = listaTodos.listaDeEstados.estados
    const nomeEstado = uf
    let status = false
    let resultado = {

        uf: '',
        descricao: '',
        capital: '',
        regiao: ''

    }

    //função para percorrer o array de "estados" filtrado por UF
    //por ser um contador forEach, não tem a necessidade de criar uma variavel cont e atribuir +1
    estados.forEach(function (estadoUf) {

        //condicional que compara a igualdade entre o elemento sigla com com a variavel nomeEstado
        if (String(estadoUf.sigla).toUpperCase() == String(nomeEstado).toUpperCase()) {


            //Adiciona os dados do "estados" demtro do objeto "resultado".
            //Cada propriedade (uf, descricao, capital, regiao) é um array,
            //então usamos o método "push" para inserir os valores do estado atual (variavel estadoUf)
            //push é ultilizado apenas em array
            //como estava antes resultado.uf.push(estadoUf.sigla) <- dessa forma o objeto teria que ser um array

            resultado.uf = estadoUf.sigla //dessa forma pode ser feito para objetos json's
            resultado.descricao = estadoUf.nome
            resultado.capital = estadoUf.capital
            resultado.regiao = estadoUf.regiao
            status = true
        }
    })

    if (status) {
        return resultado
    } else {
        return false
    }

}

//função que retona uma capital do brasil com o criterio de filtro com UF
function getCapitalEstado(uf) {

    const estados = listaTodos.listaDeEstados.estados
    const nomeEstado = uf
    let status = false
    let resultado = {

        //rstrutura de lista em um json
        uf: '',
        descricao: '',
        capital: '',
    }

    //contador para percorrer o array 'estados', filtrado pelo UF de cada estado
    estados.forEach(function (estadosUf) {

        //condicional para validar a igualdade entre o valor dentro da variavel e um elemento dentro do array
        if (String(estadosUf.sigla).toUpperCase() == String(nomeEstado).toUpperCase()) {

            resultado.uf = estadosUf.sigla
            resultado.descricao = estadosUf.nome
            resultado.capital = estadosUf.capital
            status = true
        }
    })

    if (status) {
        return resultado
    } else {
        return false
    }

}


//retorna as informações de alguns estados, filtrado pela região
//exemplo: região sul (ele retornaria todos os estados da região sul)
function getEstadosRegiao(regiao) {

    const estados = listaTodos.listaDeEstados.estados
    const nomeDosEstados = regiao
    let resultado = {

        regiao: '',
        estados: [

        ]
    }

    //contador que percorre o array "estados" da lista de estados
    estados.forEach(function (estadosRegiao) {

        //condicional para validar a igualdade do valor guardado na variavel nomeDosEstados
        //com os atributos "regiao" dentro do json
        console.log(nomeDosEstados)

        if (String(estadosRegiao.regiao).toUpperCase() == String(nomeDosEstados).toUpperCase()) {

            resultado.regiao = estadosRegiao.regiao

            //Estou adicionando um estado dentro do array "estados"
            //Uso um OBJETO porque "uf" e "descricao" pertencem ao mesmo estado
            //Assim eu mantenho os dados agrupados e evito depender de índice de array


            resultado.estados.push({

                // Sigla do estado (ex: SP)
                uf: estadosRegiao.sigla,

                // Nome completo do estado (ex: São Paulo)
                descricao: estadosRegiao.nome
            });


            //NÃO usar assim:
            //resultado.uf.push(...)
            //resultado.descricao.push(...)
            //Porque separa os dados e posso perder a relação entre eles (índice pode quebrar)

        }
    })

    return resultado
}


//retorna a lista de cidades filtrado pelo estado
// function getCidades (estado) {

//     const estados = listaDeEstados
//     const nomeDoEstado = estado
//     let resultado = {

//         uf: '',
//         descricao: '',
//         quantidade_cidades: '',
//         cidades: [
//             //continuar a estrutura desse array na hora de realizar o push
//             //ex:  resultado.estados.push({ uf: estadosRegiao.sigla,descricao: estadosRegiao.nome});
//             //dentro da estrutura condicional if
//         ]
//     }

//     estados.forEach(function(estadoscidades){
//         //contador para percorrer o array da lista de estados

//     })

//} 


function getCidades(filtroEstado) {
    filtroEstado = filtroEstado.toUpperCase()

    let infoCidades = {
        uf: '',
        descricao: '',
        quantidade_cidades: 0,
        cidades: []
    }

    listaTodos.listaDeEstados.estados.forEach(estado => {

        if (filtroEstado == estado.sigla.toUpperCase()) {
            infoCidades.uf = estado.sigla
            infoCidades.descricao = estado.nome

            estado.cidades.forEach(cidade => {      //forEach pois é um array 
                infoCidades.cidades.push(cidade.nome)
                infoCidades.quantidade_cidades = infoCidades.quantidade_cidades + 1
            });
        }
    })
    

    return infoCidades
}

//retorna as capitais do pais 
const getCapitalPais = function () {

    let capitalPais = []
    let resultado = false
    
    listaTodos.listaDeEstados.estados.forEach(function (estado){

        if (estado.capital_pais) {
            
            capitalPais.push({

                capital_atual:   estado.capital_pais.capital,
                uf:             estado.sigla,
                descricao:      estado.nome,
                capital:        estado.capital,
                regiao:         estado.regiao,
                ano_inicio:      estado.capital_pais.ano_inicio,
                ano_fim:         estado.capital_pais.ano_fim
            })

            resultado = capitalPais
        }
    
    })

    return resultado
}

//chama as funções
//ao chamar a função passa o parametro do uf "SP ou qualquer outra siglas"
//sempre sembrar de passar o parametro quando chamar a função, não com uma variavel dentro da função
//a variavel uf recebe o valor aribuido quando a função é chamada abaixo

//console.log(getlistaDeEstados(listaDeEstados)) //retorna as siglas dos estados e a quantidade de estados dentro do array
//console.log(getDadosEstado("sp")) //retorna o estado com algumas informações, filtrado pelo uf
//console.log(getCapitalEstado("pe"))
//console.log(getEstadosRegiao("norte"))



module.exports = {
    getListaDeEstados,
    getDadosEstado,
    getCapitalEstado,
    getEstadosRegiao,
    getCidades,
    getCapitalPais
}


