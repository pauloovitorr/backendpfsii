import express from 'express';
import cors from 'cors';
import rota_professor from './Rotas/rotaProfessor.js';
import rota_disciplina from './Rotas/rotaDisciplina.js';
import rota_aluno from './Rotas/rotaAluno.js'
import rotaLogin from './Rotas/rotaLogin.js';
import rota_aluno_dis from './Rotas/rotaAlu_dis.js';
import { verificarAcesso } from './Seguranca/Autenticacao.js';
import dotenv from 'dotenv';
import session from 'express-session';


const host='0.0.0.0';
const porta='3000';

dotenv.config()



const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: process.env.SEGREDO,
    resave: false,
    saveUninitialized: true,
    maxAge: 1000 * 60 * 6
}))


// verificarAcesso
// verificarAcesso

app.use('/login',rotaLogin);
app.use('/professor', rota_professor)
app.use('/disciplina', rota_disciplina)
app.use('/aluno', rota_aluno)
app.use('/vincular', rota_aluno_dis)

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
