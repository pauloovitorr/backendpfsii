import jwt from "jsonwebtoken";
// Gerar Token
export function assinar(usuario){
   const Token = jwt.sign({usuario}, process.env.SEGREDO, {expiresIn:'300s'})
   return Token
}


// Informações sencíveis ficam em variáveis de ambientes 

export function verficarAssinatura(token){
    return jwt.verify(token,process.env.SEGREDO )
}  