# TipoEstablecimiento Endpoints

## GET /tipoEstablecimiento/{id}
Obtiene un tipo de establecimiento por su ID.
- **Input**: ID del tipo de establecimiento (path parameter)
- **Output**: Datos del tipo de establecimiento
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /tipoEstablecimiento
Crea un nuevo tipo de establecimiento.
- **Input**: Datos del tipo de establecimiento
```json
{
    "nombre": string
}
```

## GET /tipoEstablecimiento
Lista todos los tipos de establecimiento.
- **Output**: Array de tipos de establecimiento
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
