import Aluno_Disciplina from "../Modelo/alu_disciplina.js";
import Aluno from '../Modelo/aluno.js'
import Professor from '../Modelo/professor.js'
import Disciplina from '../Modelo/disciplina.js'
import conectar from "./conexao.js";

export default class Aluno_DisciplinaDAO{
    async gravar(alu_disciplina){
        if(alu_disciplina instanceof Aluno_Disciplina){
            const sql = 'INSERT INTO aluno_disciplina (codigo_aluno,codigo_disciplina) VALUES (?,?)'
            const conexao = await conectar()

            for(let disciplina of alu_disciplina.codigo_disciplina){

                const parametros = [alu_disciplina.codigo_aluno , disciplina.codigo]
                const  retorno = await conexao.execute(sql, parametros)
            }

            
            
            
            //alu_disciplina.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(alu_disciplina){
        if(alu_disciplina instanceof Aluno_Disciplina){
            const sql = 'UPDATE aluno_disciplina SET codigo_aluno = ?, codigo_disciplina = ? WHERE codigo_aluno = ?'
            const parametros = [alu_disciplina.codigo_aluno, alu_disciplina.codigo_disciplina, alu_disciplina.codigo_aluno]
            const conexao = await conectar()
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
    async buscar(consulta) {
        let sql = '';
        let parametros = [];
    
        if (!isNaN(parseInt(consulta))) {
            sql = `SELECT a.nome_aluno, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.codigo, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
            INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
            INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
            INNER JOIN professor p ON p.codigo = d.codigo_professor WHERE a.codigo = ? ORDER BY a.nome_aluno DESC`;
            parametros = [consulta];
        } else {
            if (!consulta) {
                consulta = '';
            }
            sql = `SELECT a.nome_aluno, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.codigo, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
            INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
            INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
            INNER JOIN professor p ON p.codigo = d.codigo_professor WHERE a.nome_aluno LIKE  ? ORDER BY a.nome_aluno DESC`;
            parametros = ['%' + consulta + '%'];
        }
           
        const conexao = await conectar();
        const [registro] = await conexao.execute(sql, parametros);

        
        let listaAlunos_disciplina = [];
    
        for (const dado of registro) {
            let professor = new Professor(dado.codigo, dado.nome, dado.email, dado.telefone)
            let disciplinas = new Disciplina(dado.codigo_disciplina, dado.nome_disciplina, dado.inicio, dado.termino, professor)
            const aluno_disciplina = new Aluno(dado.codigo_aluno, dado.nome_aluno, dado.cpf, dado.telefone, disciplinas)
            listaAlunos_disciplina.push(aluno_disciplina)

            

        }
        
        return listaAlunos_disciplina
    }

    async excluir(alu_disciplina){
        if (alu_disciplina instanceof Aluno_Disciplina){
            const sql = "DELETE FROM aluno_disciplina WHERE codigo_aluno = ?"

            const parametros = [alu_disciplina.codigo_aluno]
            const conexao = await conectar()
            await conexao.execute(sql,parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
}