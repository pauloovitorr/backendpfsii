import Professor from "../Modelo/professor.js";
import conectar from "./conexao.js";

export default class ProfessorDAO{
    async gravar(professor){
        if(professor instanceof Professor){
            const sql = 'INSERT INTO professor (nome,email,telefone) VALUES (?)'
            const parametros = [professor.nome, professor.email, professor.telefone]
            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            professor.codigo(retorno[0])
            global.poolConexoes.releaseConnection(conexao);
        }
    }
}