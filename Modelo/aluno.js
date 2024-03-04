import AlunoDAO from "../Persistencia/AlunoDAO.js"

export default class Aluno{
    #codigo
    #nome
    #cpf
    #telefone

    constructor(codigo = 0,nome,cpf,telefone){
        this.#codigo = codigo
        this.#nome = nome
        this.#cpf = cpf
        this.#telefone = telefone
    }

    get codigo(){
        return this.#codigo
    }
 
    set codigo(c){
        this.#codigo = c
    }

    get nome(){
        return this.#nome
    }

    set nome(n){
        this.nome = n
    }

    get cpf(){
        return this.#cpf
    }

    set cpf(e){
        this.#cpf = e
    }

    get telefone(){
        return this.#telefone
    }

    set telefone(t){
        this.#telefone = t
    }

    toJSON(){
        return{
            codigo: this.#codigo,
            nome: this.#nome,
            cpf: this.#cpf,
            telefone: this.#telefone
        }
    }

    async gravar(){
        const proDAO = new AlunoDAO()
        await proDAO.gravar(this)
    }

    async atualizar(){
        const proDAO = new AlunoDAO()
        await proDAO.atualizar(this)
    }

    async buscar(parametro){
        const proDAO = new AlunoDAO
        return await proDAO.buscar(parametro)
    }

    async excluir(){
        const proDAO = new AlunoDAO
        await proDAO.excluir(this)
    }
}