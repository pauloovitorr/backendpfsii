
import Aluno_Disciplina from "../Modelo/alu_disciplina.js"

export default class Aluno_DiscCtrl {
    gravar(req, res) {
        res.type('application/json')
        if (req.method === 'POST' && req.is('application/json')) {

            const dados = req.body
            const codigo_aluno = dados.codigo_aluno
            const codigo_disciplina = dados.codigo_disciplina
            

            if (codigo_aluno && codigo_disciplina) {
                const alu_disciplina = new Aluno_Disciplina (codigo_aluno, codigo_disciplina)
                alu_disciplina.gravar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "aluno vinculado a disciplina com sucesso!"
                        })
                    })

                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao vincular aluno:" + erro.message
                        })
                    })
            }
        }
    }

    atualizar(req, res) {
        res.type('application/json')
        if (req.method === 'PUT' && req.is('application/json')) {
            const dados = req.body
            const codigo_aluno = dados.codigo_aluno
            const codigo_disciplina = dados.codigo_disciplina

            if (codigo_aluno && codigo_disciplina) {

                const alu_disciplina = new Aluno_Disciplina(codigo_aluno,codigo_disciplina)
                alu_disciplina.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Vinculo de aluno atualizado com sucesso!"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar vinculo de aluno:" + erro.message
                        });
                    })

            }
        }
    }

    buscar(req, res) {
        res.type('application/json');
        let termo = req.params.termo;

        if (!termo) {
            termo = "";
        }

        if (req.method === "GET") {
            const aluno = new Aluno();
            aluno.buscar(termo).then((listaa) => {
                res.json({
                    status: true,
                    listaa
                });
            }).catch((erro) => {
                res.json({
                    status: false,
                    mensagem: "Não foi possível encontrar alunos: " + erro.message
                });
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar alunos!"
            });
        }
    }
    

    excluir(req, res) {
        res.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo_aluno;

            if (codigo) {
                const aluno = new Aluno_Disciplina(codigo);
                aluno.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Vinculo de aluno excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o Vinculo do aluno:" + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe o código do aluno!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Utilize o método DELETE para excluir um aluno!"
            });
        }
   }

   
}