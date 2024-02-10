import ProfessorDAO from "../Persistencia/professorDAO.js"

export default class Professor{
    #codigo
    #nome
    #email
    #telefone

    constructor(codigo = 0,nome,email,telefone){
        this.#codigo = codigo
        this.#nome = nome
        this.#email = email
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

    get email(){
        return this.#email
    }

    set email(e){
        this.#email = e
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
            email: this.#email,
            telefone: this.#telefone
        }
    }

    async gravar(){
        const proDAO = new ProfessorDAO()
        await proDAO.gravar(this)
    }

    async atualizar(){
        const proDAO = new ProfessorDAO()
        await proDAO.atualizar(this)
    }

    async buscar(parametro){
        const proDAO = new ProfessorDAO
        return await proDAO.buscar(parametro)
    }

    async excluir(){
        const proDAO = new ProfessorDAO
        await proDAO.excluir(this)
    }
}