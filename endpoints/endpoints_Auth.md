# Auth endpoints

## POST /api/auth/login/ciudadano
Inicia sesión como ciudadano.
- **Input**: Credenciales o CI del ciudadano
- **Output**: Token de autenticación
```json
{
    "credencial_civica": string | null,
    "id_ciudadano": integer | null
}
```

## POST /api/auth/login/presidente
Inicia sesión como presidente de la mesa.
- **Input**: Credenciales y CI del presidente
- **Output**: Token de autenticación
```json
{
    "credencial_civica": string,
    "id_ciudadano": integer
}
```

## POST /api/auth/logout
Cierra la sesión del usuario autenticado.
- **Input**: Token de autenticación (en headers)
- **Output**: Mensaje de éxito
```json
{
    "message": "Logout exitoso"
}
```