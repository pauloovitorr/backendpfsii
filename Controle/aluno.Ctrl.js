import Aluno from '../Modelo/aluno.js'

export default class AlunoCtrl {
    gravar(req, res) {
        res.type('application/json')
        if (req.method === 'POST' && req.is('application/json')) {

            const dados = req.body
            const nome = dados.nome
            const cpf = dados.cpf
            const telefone = dados.telefone

            if (nome && cpf && telefone) {
                const aluno = new Aluno(0, nome, cpf, telefone)
                aluno.gravar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "codigoGerado": aluno.codigo,
                            "mensagem": "aluno cadastrado com sucesso!"
                        })
                    })

                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar aluno:" + erro.message
                        })
                    })
            }
        }
    }

    atualizar(req, res) {
        res.type('application/json')
        if (req.method === 'PUT' && req.is('application/json')) {
            const dados = req.body
            const codigo = dados.codigo
            const nome = dados.nome
            const cpf = dados.cpf
            const telefone = dados.telefone

            if (codigo && nome && cpf && telefone) {

                const aluno = new Aluno(codigo, nome, cpf, telefone)
                aluno.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "aluno atualizado com sucesso!"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a aluno:" + erro.message
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
            const codigo = dados.codigo;

            if (codigo) {
                const aluno = new Aluno(codigo);
                aluno.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "aluno excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o aluno:" + erro.message
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