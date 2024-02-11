import Disciplina from "../Modelo/disciplina.js";
import conectar from "./conexao.js";

export default class DisciplinaDAO{
    async gravar(disciplina){
        if(disciplina instanceof Disciplina){
            const sql = 'INSERT INTO disciplina (nome_disciplina,inicio,termino, codigo_professor) VALUES (?,?,?,?)'
            const parametros = [disciplina.nome_disciplina, disciplina.inicio, disciplina.termino, disciplina.codigo_professor]
            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            
            disciplina.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao); 
        }
    }

    async atualizar(disciplina){
        if(disciplina instanceof Disciplina){
            const sql = 'UPDATE disciplina SET nome_disciplina = ?, inicio = ?, termino = ?, codigo_professor = ? WHERE codigo = ?'
            const parametros = [disciplina.nome_disciplina, disciplina.inicio, disciplina.termino, disciplina.codigo_professor, disciplina.codigo]
            
            try{
                const conexao = await conectar()
                await conexao.execute(sql, parametros)
                global.poolConexoes.releaseConnection(conexao)
            }
            catch (erro){
               throw erro
            }
        }
    }


    // async buscar(consulta) {
    //     let sql = '';
    //     let parametros = [];
    
    //     if (!isNaN(parseInt(consulta))) {
    //         sql = 'SELECT * FROM professor WHERE codigo = ?';
    //         parametros = [consulta];
    //     } else {
    //         if (!consulta) {
    //             consulta = '';
    //         }
    //         sql = 'SELECT * FROM professor WHERE nome like ?';
    //         parametros = ['%' + consulta + '%'];
    //     }
    
    //     const conexao = await conectar();
    //     const [registros] = await conexao.execute(sql, parametros);
    //     let listaProfessores = [];
    
    //     for (const registro of registros) {
    //         const professor = new Professor(registro.codigo, registro.nome, registro.email, registro.telefone);
    //         listaProfessores.push(professor);
    //     }
    
    //     return listaProfessores
    // }

    // async excluir(professor){
    //     if (professor instanceof Professor){
    //         const sql = "DELETE FROM professor WHERE codigo = ?"

    //         const parametros = [professor.codigo]
    //         const conexao = await conectar()
    //         await conexao.execute(sql,parametros)
    //         global.poolConexoes.releaseConnection(conexao)
    //     }
    // }
}