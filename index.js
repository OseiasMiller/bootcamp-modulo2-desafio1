import fs from 'fs';

const estados = lerArquivo('./dados/Estados.json');
const cidades = lerArquivo('./dados/Cidades.json');

criarArquivoUf();

function lerArquivo(caminho) {
    const dados = fs.readFileSync(caminho);
    return JSON.parse(dados);
}

function criarArquivoUf() {
    estados.forEach((estado) => {
        const { Sigla: sigla, ID: id } = estado
        const cidadesPertecenteEstado = cidades.filter((cidade) => cidade.Estado == id)

        fs.writeFileSync(`./estados/${sigla}.json`, JSON.stringify(cidadesPertecenteEstado))
    })
}

const quantidadeCidades = contarCidadesPorEstado('MG');
console.log(`A quantidade de cidades em Minas Gerais é: ${quantidadeCidades}`);

estadosComMaisCidadesDesc();
estadosComMenosCidadesDesc();
buscaCidadeMaiorNome();
buscaCidadeMenorNome();


function contarCidadesPorEstado(estado) {
    const estadoECidades = lerArquivo(`./estados/${estado}.json`);
    return estadoECidades.length;
}

function populaEstado() {
    
    const estados = [];
    const estadosFiles = fs.readdirSync('./estados');
    estadosFiles.forEach((arquivo) => {
        const estado = arquivo.split('.json').join('')
        const quantidade = contarCidadesPorEstado(estado)
        estados.push({
            estado: estado, 
            cidades: quantidade
        })    
    })
    return Promise.resolve(estados);
    
}

function  estadosComMaisCidadesDesc() {
    populaEstado().then((estados) => {
        // console.log(estados);
        estados.sort((a, b) => b.cidades - a.cidades)
        const cincoMaiores = estados.slice(0 , 5);
        console.log(cincoMaiores);
        const totalCidades = cincoMaiores.reduce((acumalator, current) => acumalator + current.cidades, 0)
        console.log("Total Cidades 5 maiores: " + totalCidades)
    })
}

function estadosComMenosCidadesDesc() {
    populaEstado().then((estados) => {
        estados.sort((a, b) => b.cidades - a.cidades);
        const cincoMenores = estados.slice(-5)
        console.log(cincoMenores);
        const totalCidades = cincoMenores.reduce((acumalator, current) => acumalator + current.cidades, 0)
        console.log("Total cidades 5 menores:" + totalCidades)
    })
}

function buscaCidadeMaiorNome() {
    const cidadeOrdena = cidades;
    cidadeOrdena.sort((a, b) => b.Nome.localeCompare(a.Nome))
    cidadeOrdena.sort((a, b) => b.Nome.length - a.Nome.length)
    console.log(cidadeOrdena.slice(0, 5));
}

function buscaCidadeMenorNome() {
    const cidadeOrdena = cidades;
    cidadeOrdena.sort((a, b) => a.Nome.localeCompare(b.Nome))
    cidadeOrdena.sort((a, b) => a.Nome.length - b.Nome.length)
    console.log(cidadeOrdena.slice(0, 5));
}
