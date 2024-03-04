import { Router } from "express";
import AlunoCtrl from "../Controle/aluno.Ctrl.js";

const rota_aluno = new Router()
const aluno = new AlunoCtrl()


rota_aluno

.post('/', aluno.gravar)
.put('/', aluno.atualizar)
.get('/', aluno.buscar)
.get('/:termo', aluno.buscar)
.delete('/', aluno.excluir)

export default rota_aluno