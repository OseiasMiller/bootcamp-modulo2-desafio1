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
