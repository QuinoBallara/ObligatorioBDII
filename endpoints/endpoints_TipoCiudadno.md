# TipoCiudadano Endpoints

## GET /api/tipociudadano/{id}
Obtiene un tipo de ciudadano por su ID.
- **Input**: ID del tipo de ciudadano (path parameter)
- **Output**: Datos del tipo de ciudadano
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /api/tipociudadano
Crea un nuevo tipo de ciudadano.
- **Input**: Datos del tipo de ciudadano
```json
{
    "nombre": string
}
```

## GET /api/tipociudadano
Lista todos los tipos de ciudadano.
- **Output**: Array de tipos de ciudadano
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
