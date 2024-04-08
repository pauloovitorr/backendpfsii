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

                const parametros = [alu_disciplina.codigo_aluno , disciplina]

                const  retorno = await conexao.execute(sql, parametros)
            }
            //alu_disciplina.codigo = retorno[0].insertId
            
            global.poolConexoes.releaseConnection(conexao);
        }
    }

    async atualizar(alu_disciplina){
        if(alu_disciplina instanceof Aluno_Disciplina){
            const sql = 'UPDATE aluno_disciplina SET codigo_disciplina = ? WHERE codigo_aluno = ? AND codigo_disciplina = ? '
            const parametros = [alu_disciplina.codigo_novo_disciplina, alu_disciplina.codigo_aluno, alu_disciplina.codigo_disciplina]
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
            INNER JOIN professor p ON p.codigo = d.codigo_professor WHERE a.codigo = ? ORDER BY a.nome_aluno`;
            parametros = [consulta];
        } else {
            if (!consulta) {
                consulta = '';
            }
            sql = `SELECT a.nome_aluno, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.codigo, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
            INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
            INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
            INNER JOIN professor p ON p.codigo = d.codigo_professor`;
            parametros = ['%' + consulta + '%'];
        }
           
        const conexao = await conectar();
        const [registro] = await conexao.execute(sql, parametros);

        
        let listaAlunos_disciplina = [];
        let cod = []
        let aluno_com_dis = []
        
    
        for (const dado of registro) {
            listaAlunos_disciplina.push(dado)
        }

        let Disciplinas_aluno = []

        for(let i  in listaAlunos_disciplina){

            if(!cod.includes(listaAlunos_disciplina[i].codigo_aluno)){
                let dados = buscarElementosPorCodigo(listaAlunos_disciplina, listaAlunos_disciplina[i].codigo_aluno)
                
                for(let dado of dados ){
                     let professor = new Professor(dado.codigo, dado.nome, dado.email, dado.telefone)
                     let disciplinas = new Disciplina(dado.codigo_disciplina, dado.nome_disciplina, dado.inicio, dado.termino, professor)
                     Disciplinas_aluno.push(disciplinas)
                }

                const aluno_disciplina = new Aluno(dados[0].codigo_aluno, dados[0].nome_aluno, dados[0].cpf, dados[0].telefone, Disciplinas_aluno)
                aluno_com_dis.push(aluno_disciplina)
                dados = []
                Disciplinas_aluno = []

            }
            cod.push(listaAlunos_disciplina[i].codigo_aluno)
        }
        function buscarElementosPorCodigo(array_dados, codigoDesejado) {
            return array_dados.filter(elemento => elemento.codigo_aluno === codigoDesejado);
          }

        return aluno_com_dis
          
    }

    async excluir(alu_disciplina){
        if (alu_disciplina instanceof Aluno_Disciplina){
            const sql = "DELETE FROM aluno_disciplina WHERE codigo_aluno = ? AND codigo_disciplina = ?"

            const parametros = [alu_disciplina.codigo_aluno, alu_disciplina.codigo_disciplina]
            const conexao = await conectar()
            await conexao.execute(sql,parametros)
            global.poolConexoes.releaseConnection(conexao)
        }
    }
}