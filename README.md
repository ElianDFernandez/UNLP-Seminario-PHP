Proyecto PHP, React, y API Rest
===================================
Datos Utiles
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
```bash
docker cp C:\Users\Elian\Desktop\Facultad\Seminario\db\creacion-db.sql seminariophp-db-1:/tmp/creacion-db.sql
docker exec -it seminariophp-db-1 bash
mysql -u root -p < /tmp/creacion-db.sql
exit
docker exec seminariophp-db-1 rm /tmp/creacion-db.sql
```