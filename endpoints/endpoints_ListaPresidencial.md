# ListaPresidencial Endpoints

## GET /listapresidencial/:id
Obtiene una lista presidencial por su ID.
- **Input**: ID de la lista presidencial (path parameter)
- **Output**: Datos de la lista presidencial
```json
{
    "lista_id": integer,
    "eleccion_id": integer,
    "partido_politico_id": integer,
    "departamento_id": integer,
    "numero": integer,
    "ciudadanos": [
        {
            "ciudadano_id": integer,
            "tipo_ciudadano_id": integer,
            "numero": integer
        }
    ]
}
```

## POST /listapresidencial
Crea una nueva lista presidencial, debe también crear su padre en Lista y crear una relación de cada ciudadano con la lista presidencial.
- **Input**: Datos de la lista presidencial
```json
{
    "lista_id": integer,
    "eleccion_id": integer,
    "partido_politico_id": integer,
    "departamento_id": integer,
    "numero": integer,
    "ciudadanos": [
        {
            "ciudadano_id": integer,
            "tipo_ciudadano_id": integer,
            "numero": integer
        }
    ]
}
```

## GET /listapresidencial/eleccion/:eleccion_id
Lista todas las listas presidenciales de una eleccion particular.
- **Output**: Array de listas presidenciales
```json
[
    {
        "lista_id": integer,
        "partido_politico_id": integer,
        "departamento_id": integer,
        "numero": integer,
        "ciudadanos": [
            {
                "ciudadano_id": integer,
                "tipo_ciudadano_id": integer,
                "numero": integer
            }
        ]
    }
]
```

## GET /listapresidencial/eleccion/:eleccionId/partidoPolitico/:partido_id
Obtiene todas las listas presidenciales de un partido político específico en una elección específica.
- **Input**: ID del partido político (path parameter) y ID de la elección (path parameter)
- **Output**: Array de listas presidenciales pertenecientes al partido
```json
[
    {
        "lista_id": integer,
        "partido_politico_id": integer,
        "departamento_id": integer,
        "numero": integer,
        "ciudadanos": [
            {
                "ciudadano_id": integer,
                "tipo_ciudadano_id": integer,
                "numero": integer
            }
        ]
    }
]
```
