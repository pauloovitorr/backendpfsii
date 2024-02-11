import DisciplinaDAO from "../Persistencia/disciplinaDAO.js"

export default class Disciplina{
    #codigo
    #nome_disciplina
    #inicio
    #termino
    #codigo_professor
    
    constructor(codigo = 0,nome_disciplina,inicio,termino,codigo_professor){
        this.#codigo = codigo
        this.#nome_disciplina = nome_disciplina
        this.#inicio = inicio
        this.#termino = termino
        this.#codigo_professor = codigo_professor
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

    get codigo_professor(){
        return this.#codigo_professor
    }
    
    set codigo_professor(cod){
        this.#codigo_professor = cod
    }

    toJSON(){
        return{
            codigo: this.#codigo,
            nome_disciplina: this.#nome_disciplina,
            inicio: this.#inicio,
            termino: this.#termino,
            codigo_professor : this.#codigo_professor
        }
    }

    async gravar(){
        const disDAO = new DisciplinaDAO()
        disDAO.gravar(this)
    }

    async atualizar(){
        const disDAO = new DisciplinaDAO()
        disDAO.atualizar(this)
    }

}