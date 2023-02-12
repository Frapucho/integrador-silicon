
DROP DATABASE IF EXISTS integrador;
CREATE DATABASE integrador CHARACTER SET utf8mb4;
USE integrador;

CREATE TABLE usuario (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255) ,
nickname VARCHAR(50),
password VARCHAR(50),
rol VARCHAR(50),
);

CREATE TABLE alumno (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
apellido VARCHAR(255),
dni VARCHAR(10),
FOREIGN KEY (id_usuario) int REFERENCES departamentos(id)
);

CREATE TABLE curso (
id INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
descripcion VARCHAR(1000),
imagen VARCHAR(1000),
anio int,
activo boolean
);

CREATE TABLE alumno_curso (
FOREIGN KEY (id_alumno) int REFERENCES alumno(id),
FOREIGN KEY (id_curso) int REFERENCES curso(id),
);