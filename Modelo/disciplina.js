import DisciplinaDAO from "../Persistencia/disciplinaDAO.js"

export default class Disciplina{
    #codigo
    #nome_disciplina
    #inicio
    #termino
    #professor
    
    constructor(codigo = 0,nome_disciplina,inicio,termino,professor={}){
        this.#codigo = codigo
        this.#nome_disciplina = nome_disciplina
        this.#inicio = inicio
        this.#termino = termino
        this.#professor = professor
    }

    get codigo(){
        return this.#codigo
    }

    set codigo(c){
        this.#codigo = c
    }

    get nome_disciplina(){
        return this.#nome_disciplina
    }

    set nome_disciplina(n){
        this.nome_disciplina = n
    }

    get inicio(){
        return this.#inicio
    }

    set inicio(i){
        this.#inicio = i
    }

    get termino(){
        return this.#termino
    }

    set termino(t){
        this.#termino = t
    }

    get professor(){
        return this.#professor
    }
    
    set professor(cod){
        this.#professor = cod
    }

    toJSON(){
        return{
            codigo: this.#codigo,
            nome_disciplina: this.#nome_disciplina,
            inicio: this.#inicio,
            termino: this.#termino,
            professor: this.#professor
        }
    }

    async gravar(){
        const disDAO = new DisciplinaDAO()
        await disDAO.gravar(this)
    }

    async atualizar(){
        const disDAO = new DisciplinaDAO()
        await disDAO.atualizar(this)
    }

    async buscar(termo){
        const disDAO = new DisciplinaDAO()
        return await disDAO.buscar(termo)
     }

     async excluir(){
        const disDAO = new DisciplinaDAO()
        await disDAO.excluir(this)
     }

}