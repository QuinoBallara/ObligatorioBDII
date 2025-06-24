# Comisaria Endpoints

## GET /comisaria/:id
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

## GET /comisaria/:id/policia/:policia_id
Obtiene una asignación de policía a comisaría por sus IDs.
- **Input**: ID del policía y ID de la comisaría (path parameters)
- **Output**: Datos de la asignación
```json
{
    "policia_id": integer,
    "comisaria_id": integer
}
```

## POST /comisaria/:id/policia
Crea una nueva asignación de policía a comisaría.
- **Input**: Datos de la asignación
```json
{
    "policia_id": integer,
    "comisaria_id": integer
}
```

