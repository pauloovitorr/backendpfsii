import Professor from "../Modelo/professor.js";
import conectar from "./conexao.js";

export default class ProfessorDAO{
    async gravar(professor){
        if(professor instanceof Professor){
            const sql = 'INSERT INTO professor (nome,email,telefone) VALUES (?,?,?)'
            const parametros = [professor.nome, professor.email, professor.telefone]
            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            
            professor.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(professor){
        if(professor instanceof Professor){
            const sql = 'UPDATE professor SET nome = ?, email = ?, telefone = ? WHERE codigo = ?'
            const parametros = [professor.nome, professor.email, professor.telefone, professor.codigo]

            
            
            const conexao = await conectar()
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
}