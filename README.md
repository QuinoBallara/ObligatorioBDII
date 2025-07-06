# Obligatorio BDII

Joaquín Ballara, Facundo Dutra, Mauro Machado

# Requisitos

- Node.js (versión 18 o superior)
- NPM
- Docker

# Instalación

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/QuinoBallara/ObligatorioBDII.git
   cd ObligatorioBDII
   ```

2. Instalar las dependencias en ambas carpetas `backend` y `frontend`:

   ```bash
    cd backend
    npm install
    cd ../frontend
    npm install
   ```

3. Crea un archivo `.env` en la carpeta `backend` con las siguientes variables de entorno:

   ```env
   PORT=3000
   JWT_SECRET_KEY= tu_clave_secreta
   DB_HOST=127.0.0.1
   DB_PORT=3307
   DB_USER=myappuser
   DB_PASSWORD=mypassword
   DB_NAME=myappdb
   ```

4. Crea un archivo `.env` en la carpeta `frontend` con la siguiente variable de entorno:
   ```env
   VITE_API_URL=http://localhost:3000/api
   ```

# Ejecución

Para iniciar el servidor backend y el frontend, ejecuta los siguientes comandos en sus respectivas carpetas:

```bash
cd backend
docker compose up -d
npm start
```

```bash
cd frontend
npm start
```
