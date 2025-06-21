# TipoCiudadano Endpoints

## GET /tipociudadano/{id}
Obtiene un tipo de ciudadano por su ID.
- **Input**: ID del tipo de ciudadano (path parameter)
- **Output**: Datos del tipo de ciudadano
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /tipociudadano
Crea un nuevo tipo de ciudadano.
- **Input**: Datos del tipo de ciudadano
```json
{
    "nombre": string
}
```

## PUT /tipociudadano/{id}
Actualiza un tipo de ciudadano existente.
- **Input**: ID del tipo de ciudadano (path parameter) y datos a actualizar
```json
{
    "nombre": string
}
```

## DELETE /tipociudadano/{id}
Elimina un tipo de ciudadano por su ID.
- **Input**: ID del tipo de ciudadano (path parameter)

## GET /tipociudadano
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
