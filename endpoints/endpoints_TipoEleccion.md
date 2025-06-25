# TipoEleccion Endpoints

## GET /api/tipoEleccion/{id}
Obtiene un tipo de elección por su ID.
- **Input**: ID del tipo de elección (path parameter)
- **Output**: Datos del tipo de elección
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /api/tipoEleccion
Crea un nuevo tipo de elección.
- **Input**: Datos del tipo de elección
```json
{
    "nombre": string
}
```


## GET /api/tipoEleccion
Lista todos los tipos de elección.
- **Output**: Array de tipos de elección
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
