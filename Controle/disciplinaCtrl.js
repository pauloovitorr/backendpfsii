import Disciplina from "../Modelo/disciplina.js";

export default class DisciplinaCtrl {
    gravar(req, res) {
        res.type('application/json')
        if (req.method === 'POST' && req.is('application/json')) {

            const dados = req.body
            const nome_disciplina = dados.nome_disciplina
            const inicio = dados.inicio
            const termino = dados.termino
            const codigo_professor = dados.codigo_professor

            if (nome_disciplina && inicio && termino && codigo_professor) {
                const disciplina = new Disciplina(0,nome_disciplina,inicio,termino, codigo_professor)
                
                disciplina.gravar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "codigoGerado": disciplina.codigo,
                            "mensagem": "disciplina cadastrada com sucesso!"
                        })
                    })

                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao registrar disciplina:" + erro.message
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
            const nome_disciplina = dados.nome_disciplina
            const inicio = dados.inicio
            const termino = dados.termino
            const codigo_professor = dados.codigo_professor

            if (codigo && nome_disciplina && inicio && termino && codigo_professor) {

                const disciplina = new Disciplina(codigo,nome_disciplina,inicio,termino,codigo_professor)
                disciplina.atualizar()
                    .then(() => {
                        res.status(200).json({
                            "status": true,
                            "mensagem": "disciplina atualizada com sucesso!"
                        })
                    })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao atualizar a disciplina:" + erro.message
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
            const disciplina = new Disciplina();
            disciplina.buscar(termo).then((listaa) => {
                res.json({
                    status: true,
                    listaa
                });
            }).catch((erro) => {
                res.json({
                    status: false,
                    mensagem: "Disciplina não encontrada: " + erro.message
                });
            });
        } else {
            res.status(400).json({
                status: false,
                mensagem: "Utilize o método GET para consultar as disciplina!"
            });
        }
    }

    excluir(req, res) {
        res.type('application/json');
        if (req.method === 'DELETE' && req.is('application/json')) {
            const dados = req.body;
            const codigo = dados.codigo;

            if (codigo) {
                const disciplina = new Disciplina(codigo);
                disciplina.excluir().then(() => {
                    res.status(200).json({
                        "status": true,
                        "mensagem": "Disciplina excluída com sucesso!"
                    });
                })
                    .catch((erro) => {
                        res.status(500).json({
                            "status": false,
                            "mensagem": "Erro ao excluir o disciplina:" + erro.message
                        });
                    });
            }
            else {
                res.status(400).json({
                    "status": false,
                    "mensagem": "Informe o código do disciplina!"
                });
            }
        }
        else {
            res.status(400).json({
                "status": false,
                "mensagem": "Utilize o método DELETE para excluir uma disciplina!"
            });
        }
    }

}