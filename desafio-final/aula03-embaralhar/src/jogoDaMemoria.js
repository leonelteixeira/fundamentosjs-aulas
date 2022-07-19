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
        // força a tela a usar o THIS de Jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
    }
    embaralhar() {
        const copias = this.heroisIniciais
        // duplicar os itens
        .concat(this.heroisIniciais)
        // entrar em cada item e criar um id aleatorio
        .map(item => {
            return Object.assign({}, item, { id: Math.random() / 0.5})
        })
        // ordenar aleatoriamente
        .sort(() => Math.random() - 0.5)
        
        this.tela.atualizarImagens(copias)
    }
 
    jogar() {
        this.embaralhar()
    }
}