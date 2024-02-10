export default class Disciplina{
    #codigo
    #nome_disciplina
    #inicio
    #termino
    
    constructor(codigo = 0,nome_disciplina,inicio,termino){
        this.#codigo = codigo
        this.#nome_disciplina = nome_disciplina
        this.#inicio = inicio
        this.#termino = termino
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

    toJSON(){
        return{
            codigo: this.#codigo,
            nome_disciplina: this.#nome_disciplina,
            inicio: this.#inicio,
            termino: this.#termino
        }
    }

    

}