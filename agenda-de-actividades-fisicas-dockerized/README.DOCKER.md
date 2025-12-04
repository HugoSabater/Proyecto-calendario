# Cómo usar Docker para este proyecto

### Construir la imagen
Desde el directorio del proyecto (donde está este `Dockerfile`):

```bash
docker build -t coagenda:latest .
```

### Ejecutar en un contenedor
```bash
docker run --rm -p 80:80 coagenda:latest
```

### Usar Docker Compose
```bash
docker compose up --build -d
```

La aplicación quedará servida en `http://localhost/`.

Notas:
- El `Dockerfile` usa una etapa de build con Node (instala dependencias y ejecuta `npm run build`) y luego sirve los archivos estáticos generados con Nginx.
- Si quieres trabajar en modo desarrollo (hot-reload), es mejor ejecutar `npm run dev` localmente o crear un servicio adicional en `docker-compose` que ejecute `npm run dev` y mapee el puerto `5173` (no recomendado para producción).