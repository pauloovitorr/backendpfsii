import Aluno_Disciplina from "../Modelo/alu_disciplina.js";
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
            sql = `SELECT a.nome, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
            INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
            INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
            INNER JOIN professor p ON p.codigo = d.codigo_professor WHERE a.codigo = ? ORDER BY a.nome DESC`;
            parametros = [consulta];
        } else {
            if (!consulta) {
                consulta = '';
            }
            sql = `SELECT a.nome, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
            INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
            INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
            INNER JOIN professor p ON p.codigo = d.codigo_professor ORDER BY a.nome DESC`;
            parametros = ['%' + consulta + '%'];
        }
    
        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, parametros);
        // let listaAlunos = [];
    
        // for (const registro of registros) {
        //     const aluno = new Aluno(registro.codigo, registro.nome, registro.cpf, registro.telefone);
        //     listaAlunos.push(aluno);
        // }
    
        // return listaAlunos
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