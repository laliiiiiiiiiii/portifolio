function extrairPalavrasChave() {
    // Note: 'stopWords' é acessada aqui porque foi carregada pelo arquivo 'palavrasRuins.js'
    const textoBruto = document.getElementById('textoEntrada').value;
    
    if (!textoBruto) {
        alert('Por favor, insira um texto para análise.');
        return;
    }

    let textoNormalizado = textoBruto.toLowerCase().replace(/[.,!?;:"'()/\\]/g, ' ');
    let palavras = textoNormalizado.split(/\s+/).filter(p => p.length > 2); 

    let contagem = {};
    for (let palavra of palavras) {
        // Acessa a variável definida no outro arquivo JS
        if (!stopWords.includes(palavra)) { 
            contagem[palavra] = (contagem[palavra] || 0) + 1;
        }
    }

    let listaOrdenada = Object.entries(contagem)
        .sort(([, freqA], [, freqB]) => freqB - freqA);
    
    apresentarResultados(listaOrdenada);
}

function apresentarResultados(lista) {
    const resultadosDiv = document.getElementById('listaChaves');
    
    if (lista.length === 0) {
        resultadosDiv.innerHTML = "Não foi possível extrair palavras-chave relevantes.";
        return;
    }

    let htmlSaida = '';
    lista.slice(0, 10).forEach(([palavra, frequencia]) => { // Mostra apenas as 10 mais frequentes
        htmlSaida += `<span class="palavra-chave">${palavra}</span> (${frequencia}x) &nbsp;`;
    });

    resultadosDiv.innerHTML = htmlSaida;
}
