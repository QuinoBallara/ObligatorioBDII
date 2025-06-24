# ListaPresidencial Endpoints

## GET /listapresidencial/{id}
Obtiene una lista presidencial por su ID.
- **Input**: ID de la lista presidencial (path parameter)
- **Output**: Datos de la lista presidencial
```json
{
    "lista_id": integer,
    "partido_politico_id": integer,
    "departamento_id": integer,
    "numero": integer
}
```
## POST /listapresidencial
Crea una nueva lista presidencial.
- **Input**: Datos de la lista presidencial
```json
{
    "lista_id": integer,
    "partido_politico_id": integer,
    "departamento_id": integer,
    "numero": integer
}
```

## PUT /listapresidencial/{id}
Actualiza una lista presidencial existente.
- **Input**: ID de la lista presidencial (path parameter) y datos a actualizar
```json
{
    "partido_politico_id": integer,
    "departamento_id": integer,
    "numero": integer
}
```

## DELETE /listapresidencial/{id}
Elimina una lista presidencial por su ID.
- **Input**: ID de la lista presidencial (path parameter)

## GET /listapresidencial
Lista todas las listas presidenciales.
- **Output**: Array de listas presidenciales
```json
[
    {
        "lista_id": integer,
        "partido_politico_id": integer,
        "departamento_id": integer,
        "numero": integer
    }
]
```
## GET /listapresidencial/partido/{partido_id}
Obtiene todas las listas presidenciales de un partido político específico.
- **Input**: ID del partido político (path parameter)
- **Output**: Array de listas presidenciales pertenecientes al partido
```json
[
    {
        "lista_id": integer,
        "partido_politico_id": integer,
        "departamento_id": integer,
        "numero": integer
    }
]
```
