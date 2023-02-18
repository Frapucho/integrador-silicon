DROP DATABASE IF EXISTS integrador;
CREATE DATABASE integrador CHARACTER SET utf8mb4;
USE integrador;

CREATE TABLE usuario (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255),
nickname VARCHAR(50),
password VARCHAR(50),
rol VARCHAR(50)
);

CREATE TABLE alumno (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
apellido VARCHAR(255),
dni VARCHAR(10),
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuario(id)
);

CREATE TABLE curso (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
descripcion VARCHAR(1000),
imagen VARCHAR(1000),
anio INT,
activo BOOLEAN
);

CREATE TABLE alumno_curso (
id_alumno INT UNSIGNED,
id_curso INT UNSIGNED,
FOREIGN KEY (id_alumno) REFERENCES alumno(id),
FOREIGN KEY (id_curso) REFERENCES curso(id)
);

INSERT INTO usuario (email, nickname, password, rol) VALUES
('usuario1@ejemplo.com', 'usuario1', '123456', 'alumno'),
('usuario2@ejemplo.com', 'usuario2', '123456', 'alumno'),
('usuario3@ejemplo.com', 'usuario3', '123456', 'alumno'),
('usuario4@ejemplo.com', 'usuario4', '123456', 'alumno'),
('usuario5@ejemplo.com', 'usuario5', '123456', 'alumno');

INSERT INTO alumno (nombre, apellido, dni, id_usuario) VALUES
('Juan', 'Pérez', '12345678', 1),
('María', 'González', '23456789', 2),
('Lucas', 'Martínez', '34567890', 3),
('Ana', 'Sánchez', '45678901', 4),
('Pedro', 'Rodríguez', '56789012', 5);

INSERT INTO curso (nombre, descripcion, imagen, anio, activo) VALUES
('Programación Web Full Stack', 'Curso de programación web completo', 'https://ejemplo.com/imagen1.jpg', 2023, true),
('Diseño Gráfico', 'Curso de diseño gráfico para principiantes', 'https://ejemplo.com/imagen2.jpg', 2023, true),
('Marketing Digital', 'Curso de marketing digital para emprendedores', 'https://ejemplo.com/imagen3.jpg', 2023, true),
('Inglés Intermedio', 'Curso de inglés para estudiantes intermedios', 'https://ejemplo.com/imagen4.jpg', 2023, true),
('Finanzas Personales', 'Curso de finanzas personales para no expertos', 'https://ejemplo.com/imagen5.jpg', 2023, true);

INSERT INTO alumno_curso (id_alumno, id_curso) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);