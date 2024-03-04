import Aluno from "../Modelo/aluno.js";
import conectar from "./conexao.js";

export default class AlunoDAO{
    async gravar(aluno){
        if(aluno instanceof Aluno){
            const sql = 'INSERT INTO aluno (nome,cpf,telefone) VALUES (?,?,?)'
            const parametros = [aluno.nome, aluno.cpf, aluno.telefone]
            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            
            aluno.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(aluno){
        if(aluno instanceof Aluno){
            const sql = 'UPDATE aluno SET nome = ?, cpf = ?, telefone = ? WHERE codigo = ?'
            const parametros = [aluno.nome, aluno.cpf, aluno.telefone, aluno.codigo]
            const conexao = await conectar()
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
    async buscar(consulta) {
        let sql = '';
        let parametros = [];
    
        if (!isNaN(parseInt(consulta))) {
            sql = 'SELECT * FROM aluno WHERE codigo = ?';
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

    async excluir(aluno){
        if (aluno instanceof Aluno){
            const sql = "DELETE FROM aluno WHERE codigo = ?"

            const parametros = [aluno.codigo]
            const conexao = await conectar()
            await conexao.execute(sql,parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
}