DROP DATABASE IF EXISTS integrador;
CREATE DATABASE integrador CHARACTER SET utf8mb4;
USE integrador;

CREATE TABLE usuarios (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
email VARCHAR(255),
nickname VARCHAR(50),
password VARCHAR(200),
rol VARCHAR(50)
);

CREATE TABLE alumnos (
id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(255),
apellido VARCHAR(255),
dni VARCHAR(10),
id_usuario INT UNSIGNED,
FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE cursos (
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
  FOREIGN KEY (id_alumno) REFERENCES alumnos(id),
  FOREIGN KEY (id_curso) REFERENCES cursos(id),
  UNIQUE (id_alumno, id_curso)
);

INSERT INTO usuarios (email, nickname, password, rol) VALUES
('usuario1@ejemplo.com', 'usuario1', '123456', 'alumno'),
('usuario2@ejemplo.com', 'usuario2', '123456', 'alumno'),
('usuario3@ejemplo.com', 'usuario3', '123456', 'alumno'),
('docente@docente.com', 'docente', '$2a$12$8osu0vJh1ZQTwSmcyGitees3Owo3EN1Gld/PVHj2Iu9.LCgfIG.PC', 'docente'),
('admin@admin.com', 'admin', '$2a$12$h7uFvsdIEuPqSOrWF1xdledcqNldw9mfGCa2e1uvjv18HLbU87wDC', 'admin');

INSERT INTO alumnos (nombre, apellido, dni, id_usuario) VALUES
('Juan', 'Pérez', '12345678', 1),
('María', 'González', '23456789', 2),
('Lucas', 'Martínez', '34567890', 3),
('Ana', 'Sánchez', '45678901', 4),
('Pedro', 'Rodríguez', '56789012', 5);

INSERT INTO cursos (nombre, descripcion, imagen, anio, activo) VALUES
('Programación Web Full Stack', 'Curso de programación web completo', 'https://www.naxer.es/wp-content/uploads/2021/05/8-lenguajes-de-programacion.jpg', 2023, true),
('Diseño Gráfico', 'Curso de diseño gráfico para principiantes', 'https://www.uag.mx/contenido/wp72m5vS7M/cuanto-dura-la-carrera-de-diseno-grafico_JGD.jpg', 2023, true),
('Marketing Digital', 'Curso de marketing digital para emprendedores', 'https://serverdo.in/wp-content/uploads/2019/06/mkt.jpeg', 2023, true),
('Inglés Intermedio', 'Curso de inglés para estudiantes intermedios', 'https://www.estudiaingles.org/wp-content/uploads/2021/06/curso-intermedio-ingles.jpg', 2023, true),
('Finanzas Personales', 'Curso de finanzas personales para no expertos', 'https://nheiddn.files.wordpress.com/2019/05/fp-01.png', 2023, true);

INSERT INTO alumno_curso (id_alumno, id_curso) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
