import express from 'express';
import cors from 'cors';
import rotaCategoria from './Rotas/rotaCategoria.js';
import rotaProduto from './Rotas/rotaProduto.js';
import rota_professor from './Rotas/rotaProfessor.js';
import rota_disciplina from './Rotas/rotaDisciplina.js';
import rotaLogin from './Rotas/rotaLogin.js';
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


app.use('/login',rotaLogin);
// app.use('/categoria',verificarAcesso,rotaCategoria); 
// app.use('/produto',verificarAcesso,rotaProduto);
app.use('/professor',verificarAcesso, rota_professor)
app.use('/disciplina',verificarAcesso, rota_disciplina)

app.listen(porta, host, ()=>{
    console.log(`Servidor escutando na porta ${host}:${porta}.`);
})
