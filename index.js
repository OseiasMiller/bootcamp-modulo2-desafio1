import fs from 'fs';

const estados = lerArquivo('Estados');
const cidades = lerArquivo('Cidades');

criarArquivoUf();

function lerArquivo(arquivo) {
    const dados = fs.readFileSync(`./dados/${arquivo}.json`);
    return JSON.parse(dados);
}

function criarArquivoUf() {
    estados.forEach((estado) => {
        const { Sigla: sigla, ID: id } = estado
        const cidadesPertecenteEstado = cidades.filter((cidade) => cidade.Estado == id)

        fs.writeFileSync(`./estados/${sigla}.json`, JSON.stringify(cidadesPertecenteEstado))
    })
}

function lerEstado(estado) 
{
    
}