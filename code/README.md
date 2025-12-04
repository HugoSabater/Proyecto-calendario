<div align="center">
  <img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# 🚀 AI Studio App — Local & Docker Setup

Aplicación generada con **AI Studio**, ejecutada localmente y lista para desplegar con Node o Docker.

Puedes ver la app en AI Studio:  
https://ai.studio/apps/drive/19QnuDI4zKN7Sd5jxEX4knK66OQ-WxubP

---

## 📦 Tecnologías usadas

- React + TypeScript
- Vite
- Node.js
- Docker (opcional)
- Gemini API

---

## 🛠 Prerrequisitos

- Node.js 18+
- (Opcional) Docker Desktop
- Clave de API de Gemini

---

## ▶️ Ejecutar localmente

1. Instalar dependencias:
   ```sh
   npm install
   ```

2. Crear el archivo `.env.local` y añadir:
   ```
   GEMINI_API_KEY=tu_clave
   ```

3. Iniciar el servidor de desarrollo:
   ```sh
   npm run dev
   ```

La app estará disponible en: ➡️ http://localhost:8080

---

## 🐳 Ejecutar con Docker (opcional)

```sh
docker compose up --build
```

Luego abre: ➡️ http://localhost:8080

---

## 📂 Estructura del proyecto

```
/
├── src/
│   ├── components/
│   ├── pages/
│   ├── hooks/
│   └── App.tsx
├── public/
├── .env.local (no incluido)
├── docker-compose.yml
├── Dockerfile
└── README.md
```

---

## 📜 Scripts disponibles

```sh
npm run dev       # servidor de desarrollo
npm run build     # compilar para producción
npm run preview   # previsualizar build
```

---

## 📝 Notas importantes

- Asegúrate de tener Docker Desktop iniciado antes de usar `docker compose`.
- La app requiere una clave válida de Gemini.
- Si aparece el error TypeScript TS6133, elimina variables sin usar.
- El puerto por defecto es 8080; si está ocupado, Vite seleccionará otro.