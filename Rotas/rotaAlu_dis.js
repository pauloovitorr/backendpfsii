import { Router } from "express";
import Aluno_DiscCtrl from "../Controle/alu_disciplinaCTRL.js";

const rota_aluno_dis = new Router()
const aluno_dis = new Aluno_DiscCtrl()


rota_aluno_dis

.post('/', aluno_dis.gravar)
.put('/', aluno_dis.atualizar)
// .get('/', aluno_dis.buscar)
// .get('/:termo', aluno_dis.buscar)
.delete('/', aluno_dis.excluir)

export default rota_aluno_dis