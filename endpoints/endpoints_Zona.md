# Zona Endpoints

## GET /zona/{id}
Obtiene una zona por su ID.
- **Input**: ID de la zona (path parameter)
- **Output**: Datos de la zona
```json
{
    "id": integer,
    "nombre": string,
    "municipio_id": integer
}
```

## POST /zona
Crea una nueva zona.
- **Input**: Datos de la zona
```json
{
    "nombre": string,
    "municipio_id": integer
}
```

## PUT /zona/{id}
Actualiza una zona existente.
- **Input**: ID de la zona (path parameter) y datos a actualizar
```json
{
    "nombre": string,
    "municipio_id": integer
}
```

## DELETE /zona/{id}
Elimina una zona por su ID.
- **Input**: ID de la zona (path parameter)

## GET /zona
Lista todas las zonas.
- **Output**: Array de zonas
```json
[
    {
        "id": integer,
        "nombre": string,
        "municipio_id": integer
    }
]
```
