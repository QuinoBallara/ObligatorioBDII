# Comisaria Endpoints

## GET /comisaria/{id}
Obtiene una comisaría por su ID.
- **Input**: ID de la comisaría (path parameter)
- **Output**: Datos de la comisaría
```json
{
    "id": integer,
    "municipio_id": integer,
    "nombre": string
}
```

## POST /comisaria
Crea una nueva comisaría.
- **Input**: Datos de la comisaría
```json
{
    "municipio_id": integer,
    "nombre": string
}
```

## PUT /comisaria/{id}
Actualiza una comisaría existente.
- **Input**: ID de la comisaría (path parameter) y datos a actualizar
```json
{
    "municipio_id": integer,
    "nombre": string
}
```

## DELETE /comisaria/{id}
Elimina una comisaría por su ID.
- **Input**: ID de la comisaría (path parameter)

## GET /comisaria
Lista todas las comisarías.
- **Output**: Array de comisarías
```json
[
    {
        "id": integer,
        "municipio_id": integer,
        "nombre": string
    }
]
```
