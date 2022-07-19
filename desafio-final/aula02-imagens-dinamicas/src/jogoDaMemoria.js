class JogoDaMemoria {
    //se mandar um obj = { tela: 1, idade: 2, etc: 3}
    // vai ignorar o resto das propriedades e pegar somente a propriedade
    //tela
    constructor({ tela }) {
        this.tela = tela
        // caminho do arquivo, sempre relativo
        // ao index.html!
        this.heroisIniciais = [
            { img: './arquivos/capitaoamerica.png', name: 'Capitão América'},
            { img: './arquivos/flash.png', name: 'Flash'},
            { img: './arquivos/hulk.png', name: 'Hulk'},
            { img: './arquivos/lanternaverde.png', name: 'Lanterna Verde'},

        ]
    }
    // para usar o this, não podemos usar static!
    inicializar() {
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
    }
}