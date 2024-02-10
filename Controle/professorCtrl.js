import Professor from "../Modelo/professor.js";

export default class ProfessorCtrl{
    gravar(req,res){
        res.type('application/json')
        if(req.method === 'POST' && req.is('application/json')){

            const dados = req.body
            const nome = dados.nome
            const email = dados.email
            const telefone = dados.telefone

            if(nome && email && telefone){
                const professor = new Professor(0,nome,email,telefone)
                professor.gravar()
                .then(()=>{
                    res.status(200).json({
                        "status": true,
                        "codigoGerado": professor.codigo,
                        "mensagem": "Professor incluído com sucesso!"
                    })
                })

                .catch((erro)=>{
                    res.status(500).json({
                        "status": false,
                        "mensagem": "Erro ao registrar professor:" + erro.message
                    })
                })
            }
        }
    }

}