# Development
Pasos para levantar la app en desarrollo

1. Levantar la base de datos
```
docker compose up -d
```

2. Renombrar el .env.template a .env
3. Reemplazar las variables de entorno
4. Ejecutar el comando ``` npm install ```
5. Ejecutar el comando ``` npm run dev ```
6. Ejecutar comandos de prisma
7. Ejecutar el SEED para [crear la base de datos loca](http://localhost:3000/api/seed)

# Prisma commands
```
npx prima init
npx prisma migrate dev
npx prima generate
```