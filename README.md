# Obligatorio BDII

Joaquín Ballara, Facundo Dutra, Mauro Machado

# Requisitos

- Node.js (versión 18 o superior)
- NPM

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

3. Crea un archivo `.env` en la raíz del proyecto con las siguientes variables de entorno:
   ```env
   PORT=3000
   JWT_SECRET_KEY= tu_clave_secreta
   ```

# Ejecución

Para iniciar el servidor backend y el frontend, ejecuta los siguientes comandos en sus respectivas carpetas:
```bash
cd backend
npm start
```

```bash
cd frontend
npm start
```

