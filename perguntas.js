// 1. Lista de Stop Words
const stopWords = [
    'o', 'a', 'os', 'as', 'de', 'do', 'da', 'dos', 'das', 'e', 'é', 'em', 'um', 'uma',
    'uns', 'umas', 'para', 'com', 'sem', 'por', 'no', 'na', 'nos', 'nas', 'meu', 'minha',
    'seu', 'sua', 'mas', 'ou', 'se', 'ao', 'aos', 'à', 'às', 'que', 'qual', 'quem', 
    'onde', 'isso', 'este', 'esta', 'isto', 'eu', 'tu', 'ele', 'nós', 'vós', 'eles',
    'me', 'te', 'lhe', 'nos', 'vos', 'lhes', 'muito', 'pouco', 'também', 'apenas', 'ser'
];

function extrairPalavrasChave() {
    const textoBruto = document.getElementById('textoEntrada').value;
    
    if (!textoBruto) {
        alert('Por favor, insira um texto para análise.');
        return;
    }

    // Normalização: Minúsculas e Remoção de Caracteres Especiais
    let textoNormalizado = textoBruto.toLowerCase().replace(/[.,!?;:"'()/\\]/g, ' ');
    
    // Tokenização
    let palavras = textoNormalizado.split(/\s+/).filter(p => p.length > 2); 

    // Análise de Frequência e Remoção de Stop Words
    let contagem = {};
    for (let palavra of palavras) {
        if (!stopWords.includes(palavra)) {
            contagem[palavra] = (contagem[palavra] || 0) + 1;
        }
    }

    // Ordenação
    let listaOrdenada = Object.entries(contagem)
        .sort(([, freqA], [, freqB]) => freqB - freqA);
    
    // Apresentação dos Resultados
    apresentarResultados(listaOrdenada);
}

function apresentarResultados(lista) {
    const resultadosDiv = document.getElementById('listaChaves');
    
    if (lista.length === 0) {
        resultadosDiv.innerHTML = "Não foi possível extrair palavras-chave relevantes.";
        return;
    }

    let htmlSaida = '';
    lista.forEach(([palavra, frequencia]) => {
        htmlSaida += `<span class="palavra-chave">${palavra}</span> (${frequencia}x) &nbsp;`;
    });

    resultadosDiv.innerHTML = htmlSaida;
}# portifolio
