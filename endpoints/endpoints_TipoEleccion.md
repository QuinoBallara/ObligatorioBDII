# TipoEleccion Endpoints

## GET /tipoEleccion/{id}
Obtiene un tipo de elección por su ID.
- **Input**: ID del tipo de elección (path parameter)
- **Output**: Datos del tipo de elección
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /tipoEleccion
Crea un nuevo tipo de elección.
- **Input**: Datos del tipo de elección
```json
{
    "id": integer,
    "nombre": string
}
```

## PUT /tipoEleccion/{id}
Actualiza un tipo de elección existente.
- **Input**: ID del tipo de elección (path parameter) y datos a actualizar
```json
{
    "nombre": string
}
```

## DELETE /tipoEleccion/{id}
Elimina un tipo de elección por su ID.
- **Input**: ID del tipo de elección (path parameter)

## GET /tipoEleccion
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
