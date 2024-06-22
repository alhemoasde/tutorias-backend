# TalentoTech Proyecto Final.

## Requisitos Previos.

1. Instalar Node.js y npm
2. Instalar Sequelize para MySQL
3. Instalar MySQL en local o mediante Docker
4. Crear la base de datos con el nombre `tutoriaDb`
5. Configurar la Conexión a la Base de Datos en el archivo `config.json`

```bash
"development": {
    "username": "root",
    "password": "12345",
    "database": "tutoriaDb",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
```

## Crear Base de Datos.

```bash
npx sequelize-cli db:create
```

## Ejercutar Migraciones.

```bash
npx sequelize-cli db:migrate
```

## Para crear nuevos objetos.

1.

## Autores.
