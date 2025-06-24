# Policia_Comisaria Endpoints

## GET /policia-comisaria/{policia_id}/{comisaria_id}
Obtiene una asignación de policía a comisaría por sus IDs.
- **Input**: ID del policía y ID de la comisaría (path parameters)
- **Output**: Datos de la asignación
```json
{
    "policia_id": integer,
    "comisaria_id": integer
}
```

## POST /policia-comisaria
Crea una nueva asignación de policía a comisaría.
- **Input**: Datos de la asignación
```json
{
    "policia_id": integer,
    "comisaria_id": integer
}
```

## DELETE /policia-comisaria/{policia_id}/{comisaria_id}
Elimina una asignación de policía a comisaría.
- **Input**: ID del policía y ID de la comisaría (path parameters)

## GET /policia-comisaria
Lista todas las asignaciones de policías a comisarías.
- **Output**: Array de asignaciones
```json
[
    {
        "policia_id": integer,
        "comisaria_id": integer
    }
]
```

## GET /policia-comisaria/comisaria/{comisaria_id}
Lista todos los policías asignados a una comisaría.
- **Input**: ID de la comisaría (path parameter)
- **Output**: Array de policías
```json
[
    {
        "policia_id": integer
    }
]
```
