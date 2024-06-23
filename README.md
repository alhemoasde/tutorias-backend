# TalentoTech Proyecto Final.

## Requisitos Previos.

1. Instalar Node.js y npm
2. Instalar Sequelize para MySQL
3. Instalar MySQL en local o mediante Docker
4. Crear la base de datos con el nombre `tutoriaDb`
5. Configurar la Conexión a la Base de Datos en el archivo `config.json`

```bash
development": {
    "username": "root",
    "password": "12345",
    "database": "tutoriaDb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
```

## Crear Base de Datos.

```bash
npx sequelize-cli db:create
```

## Ejercutar Migraciones.

```bash
npx sequelize-cli db:migrate
```

## Revertir la última migración

```bash
npx sequelize-cli db:migrate:undo
```

## Dependencias a Instalar.

1. Instalar express como framework web minimalista para Node.js.

```bash
npm install -g express@latest
```

2. Instalar bcrypt para el hashing de contraseñas.

```bash
npm install -g bcrypt@latest
```

3. Instlar cors para habilitar CORS (Cross-Origin Resource Sharing) en aplicaciones Express.

```bash
npm install cors
```

4. Instalar jsonwebtoken:

```bash
npm install -g jsonwebtoken@latest
```

5. Instalar sequelize como ORM (Object-Relational Mapping) para Node.js

```bash
npm install sequelize
```

6. Instalar sequelize-cli como herramienta para gestionar modelos, migraciones y semillas en sequelize.

```bash
npm install sequelize-cli
```

`Nota:` No es necesario instalar una a una cada dependencia, solo ejecute

```bash
npm install
```

## Autores.
