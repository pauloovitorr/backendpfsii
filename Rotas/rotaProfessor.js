import { Router } from "express";
import ProfessorCtrl from '../Controle/professorCtrl.js'

const rota_professor = new Router()
const professor = new ProfessorCtrl()


rota_professor

.post('/', professor.gravar)
.put('/', professor.atualizar)
.get('/', professor.buscar)
.get('/:termo', professor.buscar)
.delete('/', professor.excluir)

export default rota_professor