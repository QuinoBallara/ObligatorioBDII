-- Ciudadano
CREATE TABLE Ciudadano (
    id INT PRIMARY KEY,
    credencial_civica VARCHAR(10) UNIQUE NOT NULL,
    primer_nombre VARCHAR(50) NOT NULL,
    segundo_nombre VARCHAR(50),
    primer_apellido VARCHAR(50) NOT NULL,
    segundo_apellido VARCHAR(50),
    fecha_nacimiento DATE NOT NULL,
    esta_vivo BOOLEAN NOT NULL DEFAULT TRUE
);

-- TipoCiudadano
CREATE TABLE TipoCiudadano (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);


-- Departamento
CREATE TABLE Departamento (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(15) NOT NULL
);

-- Municipio
CREATE TABLE Municipio (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    departamento_id SMALLINT NOT NULL,
    FOREIGN KEY (departamento_id) REFERENCES Departamento(id)
);

-- Zona
CREATE TABLE Zona (
    id INT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    municipio_id SMALLINT NOT NULL,
    FOREIGN KEY (municipio_id) REFERENCES Municipio(id)
);

-- Comisaria
CREATE TABLE Comisaria (
    id INT PRIMARY KEY,
    municipio_id SMALLINT NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    FOREIGN KEY (municipio_id) REFERENCES Municipio(id)
);

-- TipoEstablecimiento
CREATE TABLE TipoEstablecimiento (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Establecimiento
CREATE TABLE Establecimiento (
    id INT PRIMARY KEY,
    nombre VARCHAR(250) NOT NULL,
    direccion VARCHAR(300) NOT NULL,
    tipo_establecimiento_id SMALLINT NOT NULL,
    zona_id INT NOT NULL,
    FOREIGN KEY (tipo_establecimiento_id) REFERENCES TipoEstablecimiento(id),
    FOREIGN KEY (zona_id) REFERENCES Zona(id)
);

-- TipoEleccion
CREATE TABLE TipoEleccion (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE
);

-- Eleccion
CREATE TABLE Eleccion (
    id INT PRIMARY KEY,
    fecha DATE NOT NULL,
    tipo_eleccion_id SMALLINT NOT NULL,
    FOREIGN KEY (tipo_eleccion_id) REFERENCES TipoEleccion(id)
);

-- Mesa
CREATE TABLE Mesa (
    id INT PRIMARY KEY,
    circuito_id INT NOT NULL,
    establecimiento_id INT NOT NULL,
    accessible BOOLEAN NOT NULL DEFAULT FALSE,
    vocal_id INT NOT NULL,
    presidente_id INT NOT NULL,
    secretario_id INT NOT NULL,
    policia_id INT NOT NULL,
    eleccion_id INT NOT NULL,
    esta_abierta BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (establecimiento_id) REFERENCES Establecimiento(id),
    FOREIGN KEY (vocal_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (presidente_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (secretario_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (policia_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (eleccion_id) REFERENCES Eleccion(id)
);

-- Policia-Comisaria
CREATE TABLE Policia_Comisaria (
    policia_id INT NOT NULL,
    comisaria_id INT NOT NULL,
    PRIMARY KEY (policia_id, comisaria_id),
    FOREIGN KEY (policia_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (comisaria_id) REFERENCES Comisaria(id)
);

-- PartidoPolitico
CREATE TABLE PartidoPolitico (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Lista
CREATE TABLE Lista (
    id INT PRIMARY KEY,
    eleccion_id INT NOT NULL,
    FOREIGN KEY (eleccion_id) REFERENCES Eleccion(id)
);

-- ListaPresidencial
CREATE TABLE ListaPresidencial (
    lista_id INT PRIMARY KEY,
    partido_politico_id SMALLINT NOT NULL,
    departamento_id SMALLINT NOT NULL,
    numero SMALLINT NOT NULL,
    FOREIGN KEY (lista_id) REFERENCES Lista(id),
    FOREIGN KEY (partido_politico_id) REFERENCES PartidoPolitico(id),
    FOREIGN KEY (departamento_id) REFERENCES Departamento(id)
);

-- Voto
CREATE TABLE Voto (
    id INT PRIMARY KEY,
    mesa_id INT NOT NULL,
    lista_id INT,
    es_observado BOOLEAN NOT NULL DEFAULT FALSE,
    es_valido BOOLEAN NOT NULL DEFAULT TRUE,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (mesa_id) REFERENCES Mesa(id),
    FOREIGN KEY (lista_id) REFERENCES Lista(id)
);

-- Ciudadano-Mesa
CREATE TABLE Ciudadano_Mesa (
    ciudadano_id INT NOT NULL,
    mesa_id INT NOT NULL,
    emitio_voto BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY (ciudadano_id, mesa_id),
    FOREIGN KEY (ciudadano_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (mesa_id) REFERENCES Mesa(id)
);

-- OrganismoEstatal
CREATE TABLE OrganismoEstatal (
    id SMALLINT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE
);

-- Ciudadano-OrganismoEstatal
CREATE TABLE Ciudadano_OrganismoEstatal (
    ciudadano_id INT NOT NULL,
    organismo_estatal_id SMALLINT NOT NULL,
    PRIMARY KEY (ciudadano_id, organismo_estatal_id),
    FOREIGN KEY (ciudadano_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (organismo_estatal_id) REFERENCES OrganismoEstatal(id)
);

-- Ciudadano-ListaPresidencial
CREATE TABLE Ciudadano_ListaPresidencial (
    lista_presidencial_id INT NOT NULL,
    ciudadano_id INT NOT NULL,
    tipo_ciudadano_id SMALLINT NOT NULL,
    numero INT NOT NULL,
    PRIMARY KEY (lista_presidencial_id, ciudadano_id),
    FOREIGN KEY (tipo_ciudadano_id) REFERENCES TipoCiudadano(id),
    FOREIGN KEY (lista_presidencial_id) REFERENCES ListaPresidencial(lista_id),
    FOREIGN KEY (ciudadano_id) REFERENCES Ciudadano(id)
);

-- Autoridad-PartidoPolitico
CREATE TABLE Autoridad_PartidoPolitico (
    id SMALLINT PRIMARY KEY,
    ciudadano_id INT NOT NULL,
    partido_politico_id SMALLINT NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    tipo_ciudadano_id SMALLINT NOT NULL ,
    FOREIGN KEY (ciudadano_id) REFERENCES Ciudadano(id),
    FOREIGN KEY (tipo_ciudadano_id) REFERENCES TipoCiudadano(id),
    FOREIGN KEY (partido_politico_id) REFERENCES PartidoPolitico(id)
    CHECK (fecha_inicio <= fecha_fin)
);
