import { Router } from "express";
import ProfessorCtrl from '../Controle/professorCtrl.js'

const rota_professor = new Router()
const professor = new ProfessorCtrl()


rota_professor

.post('/', professor.gravar)


export default rota_professor