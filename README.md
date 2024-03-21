Seminario de PHP, React, y API Rest
===================================

## Configuración inicial

1. Crear archivo `.env` a partir de `.env.dist`

```bash
cp .env.dist .env
```

2. Crear volumen para la base de datos

```bash
docker volume create seminariophp
```

donde *seminariophp* es el valor de la variable `DB_VOLUME`

## Iniciar servicios

```bash
docker compose up -d
```

## Terminar servicios

```bash
docker compose down -v
```

## Eliminar base de datos

```bash
docker volume rm seminariophp
```

## Creacion de base de datos

# 1. Copiar el archivo SQL a la carpeta temporal del contenedor
    docker cp C:\Users\Elian\Desktop\Facultad\Seminario\db\creacion-db.sql seminariophp-db-1:/tmp/creacion-db.sql
# 2. Acceder al contenedor de la base de datos
    docker exec -it seminariophp-db-1 bash
# 3. Ejecutar el archivo SQL para crear la base de datos
    mysql -u root -p < /tmp/creacion-db.sql
# 4. Salir del contenedor
    exit
# 5. Borrar el archivo temporal del contenedor
    docker exec seminariophp-db-1 rm /tmp/creacion-db.sql