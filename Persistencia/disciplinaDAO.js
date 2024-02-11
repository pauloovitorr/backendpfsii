import Disciplina from "../Modelo/disciplina.js"
import Professor from '../Modelo/professor.js'
import conectar from "./conexao.js";

export default class DisciplinaDAO{
    async gravar(disciplina){
        if(disciplina instanceof Disciplina){
            const sql = 'INSERT INTO disciplina (nome_disciplina,inicio,termino, codigo_professor) VALUES (?,?,?,?)'
            const parametros = [disciplina.nome_disciplina, disciplina.inicio, disciplina.termino, disciplina.professor]

            const conexao = await conectar()
            const  retorno = await conexao.execute(sql, parametros)
            
            disciplina.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao); 
        }
    }

    async atualizar(disciplina){
        if(disciplina instanceof Disciplina){
            const sql = 'UPDATE disciplina SET nome_disciplina = ?, inicio = ?, termino = ?, codigo_professor = ? WHERE codigo = ?'
            const parametros = [disciplina.nome_disciplina, disciplina.inicio, disciplina.termino, disciplina.professor, disciplina.codigo]
            
            const conexao = await conectar()
            await conexao.execute(sql, parametros)
            global.poolConexoes.releaseConnection(conexao)

        }
    }


    async buscar(consulta) {
        let sql = '';
        let parametros = [];
    
        if (!isNaN(parseInt(consulta))) {
            sql = 'SELECT d.codigo, d.nome_disciplina, d.inicio, d.termino, d.codigo_professor, p.nome, p.email, p.telefone FROM disciplina d INNER JOIN professor p ON d.codigo_professor = p.codigo WHERE d.codigo = ? ORDER BY d.codigo';
            parametros = [consulta];
        } else {
            if (!consulta) {
                consulta = '';
            }
            sql = 'SELECT d.codigo, d.nome_disciplina, d.inicio, d.termino, p.nome, p.email, p.telefone FROM disciplina d INNER JOIN professor p ON d.codigo_professor = p.codigo WHERE d.nome_disciplina like ? ORDER BY d.nome_disciplina';
            parametros = ['%'+consulta +'%'];
        }
    
        const conexao = await conectar();
        const [disciplinas] = await conexao.execute(sql, parametros);
        let listaDisciplina = [];
    
        for (const disc of disciplinas) {
            
            const professor = new Professor(disc.nome, disc.email, disc.telefone)
            const disciplina = new Disciplina(disc.codigo, disc.nome_disciplina, disc.inicio, disc.termino, professor);
            listaDisciplina.push(disciplina);
        }
        
        return listaDisciplina
        
    }

    async excluir(disciplina){
        if (disciplina instanceof Disciplina){
            const sql = "DELETE FROM disciplina WHERE codigo = ?"

            const parametros = [disciplina.codigo]

            
            const conexao = await conectar()
            await conexao.execute(sql,parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
}