class JogoDaMemoria {
    //se mandar um obj = { tela: 1, idade: 2, etc: 3}
    // vai ignorar o resto das propriedades e pegar somente a propriedade
    //tela
    constructor({ tela, util }) {
        this.tela = tela
        this.util = util
        // caminho do arquivo, sempre relativo
        // ao index.html!
        this.heroisIniciais = [
            { img: './arquivos/capitaoamerica.png', nome: 'Capitão América'},
            { img: './arquivos/flash.png', nome: 'Flash'},
            { img: './arquivos/hulk.png', nome: 'Hulk'},
            { img: './arquivos/lanternaverde.png', nome: 'Lanterna Verde'},

        ]
        this.iconePadrao = './arquivos/padrao.png'
        this.heroisEscondidos = []
        this.heroisSelecionados = []
    }
    // para usar o this, não podemos usar static!
    inicializar() {
        // vai pegar todas as funcoes da classe tela!
        // coloca todos os herois na tela
        this.tela.atualizarImagens(this.heroisIniciais)
        // força a tela a usar o THIS de Jogo da memoria
        this.tela.configurarBotaoJogar(this.jogar.bind(this))
        this.tela.configurarBotaoVerificarSelecao(this.verificarSelecao.bind(this))
    }
    async embaralhar() { // para usar o await precisa colocar o async na assinatura!!
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
        this.tela.exibirCarregando()
        // vamos esperar 1 segundo para atualizar a tela
        await this.util.timeout(1000)
        this.esconderHerois(copias)
        this.tela.exibirCarregando(false)
        
    }
    esconderHerois(herois) {
        // vamos trocar a imagem de todos os herois existente
        // pelo icone padrão
        // como fizemos no construtor, vamos extrair somente o necessario
        // usando a sintaxe ({ chave: 1 }) estamos falando que vamos retornar
        // o que tiver dentro dos parenteses
        // quando nao usamos : (exemplo do id), o JS entende que o nome
        // é o mesmo do valor. Ex. id: id, vira id,
        const heroisOcultos = herois.map(( { nome, id }) => ({
            id,
            nome,
            img: this.iconePadrao
        }))
        // atualizamos a tela com os herois ocultos
        this.tela.atualizarImagens(heroisOcultos)
        // guardamos os herois para trabalhar com eles depois
        this.heroisOcultos = heroisOcultos
    }
    exibirHerois(nomeDoHeroi) {
        // vamos procurar esse heroi pelo nome em nossos heroisIniciais
        // vamos obter somente a imagem dele
        const {img} = this.heroisIniciais.find(({ nome }) => nomeDoHeroi === nome)
        // vamos criar a funcao na tela, para exibir somente o heroi selecionado
        this.tela.exibirHerois(nomeDoHeroi, img)
    }
    verificarSelecao(id, nome) {
        const item = { id, nome }
        // vamos verificar a quantidade de herois selecionados
        // e tomar ação se escolheu certo ou errado
        const heroisSelecionados = this.heroisSelecionados.length
        switch(heroisSelecionados) {
            case 0:
                // adiciona a escolha na lista, esperando pela proxima
                // clicada
                this.heroisSelecionados.push(item)
                break;
            case 1:
                // se a quantidade de escolhidos for 1, significa
                // que o usuario só pode escolher mais um
                // vamos obter o primeiro item da lista
                const [ opcao1 ] = this.heroisSelecionados
                // zerar itens para nao selecionar mais de dois
                this.heroisSelecionados = []
                // conferimos se os nomes e ids batem conforme 
                // o esperado
                if(opcao1.nome === item.nome &&
                // aqui verificamos se são ids diferentes para
                // o usuario nao clicar duas vezes no mesmo
                opcao1.id !== item.id
                ) {
                    this.exibirHerois(item.nome)
                    //como o padrão e true, nao precisa passar nada
                    this.tela.exibirMensagem()
                    // parar a execucao
                    return;
                }

                this.tela.exibirMensagem(false)
                // fim do case!
                break;

        }

    }
    jogar() {
        this.embaralhar()
    }
}