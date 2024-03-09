CREATE DATABASE sistema;

USE sistema;



CREATE TABLE disciplina(

    codigo INT NOT NULL AUTO_INCREMENT,
    nome_disciplina VARCHAR(30) NOT NULL,
    inicio VARCHAR(10) NOT NULL,
    termino VARCHAR(10) NOT NULL,
    codigo_professor INT NOT NULL,
    
    CONSTRAINT pk_disciplina PRIMARY KEY(codigo),
    CONSTRAINT fk_professor FOREIGN KEY(codigo_professor) REFERENCES professor(codigo)
    
)

