import Professor from "../Modelo/professor.js";

export default class ProfessorCtrl {
    gravar(req, res) {
        res.type('application/json')
        if (req.method === 'POST' && req.is('application/json')) {

            const dados = req.body
            const nome = dados.nome
            const email = dados.email
            const telefone = dados.telefone

            

            if (nome && email && telefone) {
                const professor = new Professor(0, nome, email, telefone)
                professor.gravar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "codigoGerado": professor.codigo,
                            "mensagem": "Professor cadastrado com sucesso!"
                        })
                    })

                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar professor:" + erro.message
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
            const email = dados.email
            const telefone = dados.telefone

            if (codigo && nome && email && telefone) {

                const professor = new Professor(codigo, nome, email, telefone)
                professor.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "Professor atualizado com sucesso!"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a professor:" + erro.message
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
            const professor = new Professor();
            professor.buscar(termo).then((listaa) => {
                res.json({
                    status: true,
                    listaa
                });
            }).catch((erro) => {
                res.json({
                    status: false,
                    mensagem: "Não foi possível encontrar professores: " + erro.message
                });
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Por favor, utilize o método GET para consultar professores!"
            });
        }
    }
    

    excluir(req, res) {
        res.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;

            if (codigo) {
                const professor = new Professor(codigo);
                professor.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Professor excluído com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o professor:" + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe o código do professor!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Utilize o método DELETE para excluir um professor!"
            });
        }
    }

}