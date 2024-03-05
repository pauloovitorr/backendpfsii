import Aluno_Disciplina from "../Modelo/alu_disciplina.js";
import conectar from "./conexao.js";

export default class Aluno_DisciplinaDAO{
    async gravar(alu_disciplina){
        if(alu_disciplina instanceof Aluno_Disciplina){
            const sql = 'INSERT INTO aluno_disciplina (codigo_aluno,codigo_disciplina) VALUES (?,?)'
            const parametros = [alu_disciplina.codigo_aluno , alu_disciplina.codigo_disciplina ]
            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            
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
            sql = 'SELECT * FROM alu_disciplina WHERE codigo = ?';
            parametros = [consulta];
        } else {
            if (!consulta) {
                consulta = '';
            }
            sql = 'SELECT * FROM aluno WHERE nome like ?';
            parametros = ['%' + consulta + '%'];
        }
    
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        let listaAlunos = [];
    
        for (const registro of registros) {
            const aluno = new Aluno(registro.codigo, registro.nome, registro.cpf, registro.telefone);
            listaAlunos.push(aluno);
        }
    
        return listaAlunos
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