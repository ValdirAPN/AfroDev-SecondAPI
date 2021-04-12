class FormatoInvalido extends Error {
    constructor(contentType) {
        const mensagem = `O tipo ${contentType} é inválido! A API aceita somente JSON`
        super(mensagem)
        this.nome = 'FormatoInvalido'
        this.id = 6
    }
}