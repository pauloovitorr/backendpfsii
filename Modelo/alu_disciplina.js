import Aluno_DisciplinaDAO from '../Persistencia/alu_disciplinaDAO.js'

export default class Aluno_Disciplina{
    
    #codigo_aluno
    #codigo_disciplina
    #codigo_novo_disciplina
    
    

    constructor(codigo_aluno,codigo_disciplina,codigo_novo_disciplina){
        this.#codigo_aluno = codigo_aluno
        this.#codigo_disciplina = codigo_disciplina
        this.#codigo_novo_disciplina = codigo_novo_disciplina
    }


    get codigo_aluno(){
        return this.#codigo_aluno
    }
 
    set codigo_aluno(c){
        this.#codigo_aluno = c
    }

    get codigo_disciplina(){
        return this.#codigo_disciplina
    }
 
    set codigo_disciplina(c){
        this.#codigo_disciplina = c
    }

    get codigo_novo_disciplina(){
        return this.#codigo_novo_disciplina
    }
 
    set codigo_novo_disciplina(c){
        this.#codigo_novo_disciplina = c
    }

    
    toJSON(){
        return{
            codigo_aluno: this.#codigo_aluno,
            codigo_disciplina: this.codigo_disciplina,
            codigo_novo_disciplina: this.#codigo_novo_disciplina            
        }
    }

    async gravar(){
        const aluDisciplinaDAO = new Aluno_DisciplinaDAO()
        await aluDisciplinaDAO.gravar(this)
    }

    async atualizar(){
        const aluDisciplinaDAO = new Aluno_DisciplinaDAO()
        await aluDisciplinaDAO.atualizar(this)
    }

    async buscar(parametro){
        const aluDisciplinaDAO = new Aluno_DisciplinaDAO()
        return await aluDisciplinaDAO.buscar(parametro)
    }

    async excluir(){
        const aluDisciplinaDAO = new Aluno_DisciplinaDAO()
        await aluDisciplinaDAO.excluir(this)
    }
}