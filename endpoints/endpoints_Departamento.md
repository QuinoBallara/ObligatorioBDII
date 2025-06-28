# Departamento Endpoints

## GET /api/departamento/{id}
Obtiene un departamento por su ID.
- **Input**: ID del departamento (path parameter)
- **Output**: Datos del departamento
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /api/departamento
Crea un nuevo departamento.
- **Input**: Datos del departamento
```json
{
    "nombre": string
}
```
