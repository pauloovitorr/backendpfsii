import { Router } from "express";
import DisciplinaCtrl from "../Controle/disciplinaCtrl.js";

const rota_disciplina = Router()
const disciplinaCtrl = new DisciplinaCtrl()

rota_disciplina
.post('/', disciplinaCtrl.gravar)
.put('/', disciplinaCtrl.atualizar)


export default rota_disciplina