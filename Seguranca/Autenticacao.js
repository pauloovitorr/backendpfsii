import { assinar } from "./funcoesjwt.js"
import { verficarAssinatura } from "./funcoesjwt.js"

export function autenticar(req, res){
    const usuario = req.body.usuario
    const senha =   req.body.senha

    if(usuario === 'admin' && senha === 'admin'){
        req.session.usuarioAutenticado = usuario
        res.json({
            "status": true,
            "token": assinar({usuario})
        })
    }
    else{
        req.session.usuarioAutenticado = null
        res.status(401).json({
            "status": true,
            "mensagem": 'Usuário ou senha inválidos !'
        })
    }
}


export function verificarAcesso(req,res, next){
    const token = req.headers['authorization']

    let tokenDecodificado = ''

    if(token){
        tokenDecodificado = verficarAssinatura(token)
    }
    
    if(tokenDecodificado.usuario.usuario === req.session.usuarioAutenticado){
        next()
    }
    else{
        res.status(401).json({
            "status": false,
            "mensagem": 'Acesso não autorizado. Faça o login'
        })
    }
}