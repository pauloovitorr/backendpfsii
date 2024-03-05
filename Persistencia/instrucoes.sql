CREATE DATABASE sistema;

USE sistema;

CREATE TABLE categoria(
    cat_codigo INT NOT NULL AUTO_INCREMENT,
    cat_descricao VARCHAR(100) NOT NULL,
    CONSTRAINT pk_categoria PRIMARY KEY(cat_codigo)
);

CREATE TABLE produto(
    prod_codigo INT NOT NULL AUTO_INCREMENT,
    prod_descricao VARCHAR(100) NOT NULL,
    prod_precoCusto DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_precoVenda DECIMAL(10,2) NOT NULL DEFAULT 0,
    prod_dataValidade DATE,
    prod_qtdEstoque DECIMAL(10,2) NOT NULL DEFAULT 0,
    cat_codigo INT NOT NULL,
    CONSTRAINT pk_produto PRIMARY KEY(prod_codigo),
);


CREATE TABLE disciplina(

    codigo INT NOT NULL AUTO_INCREMENT,
    nome_disciplina VARCHAR(30) NOT NULL,
    inicio VARCHAR(10) NOT NULL,
    termino VARCHAR(10) NOT NULL,
    codigo_professor INT NOT NULL,
    
    CONSTRAINT pk_disciplina PRIMARY KEY(codigo),
    CONSTRAINT fk_professor FOREIGN KEY(codigo_professor) REFERENCES professor(codigo)
    
)

SELECT a.nome, a.cpf, a.telefone, d.nome_disciplina, d.inicio, d.termino, p.nome, p.email, xl.codigo_aluno, xl.codigo_disciplina FROM aluno a 
INNER JOIN aluno_disciplina xl ON a.codigo = xl.codigo_aluno
INNER JOIN disciplina d ON d.codigo = xl.codigo_disciplina
INNER JOIN professor p ON p.codigo = d.codigo_professor ORDER BY a.nome DESC