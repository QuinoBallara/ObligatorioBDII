# Mesa Endpoints

## GET /mesa/:id
Obtiene una mesa por su ID.
- **Input**: ID de la mesa (path parameter)
- **Output**: Datos de la mesa
```json
{
    "id": integer,
    "circuito_id": integer,
    "establecimiento_id": integer,
    "accessible": boolean,
    "vocal_id": integer,
    "presidente_id": integer,
    "secretario_id": integer,
    "policia_id": integer,
    "eleccion_id": integer,
    "esta_abierta": boolean
}
```

## POST /mesa
Crea una nueva mesa.
- **Input**: Datos de la mesa
```json
{
    "id": integer,
    "circuito_id": integer,
    "establecimiento_id": integer,
    "accessible": boolean,
    "vocal_id": integer,
    "presidente_id": integer,
    "secretario_id": integer,
    "policia_id": integer,
    "eleccion_id": integer,
    "esta_abierta": boolean
}
```

## PATCH /mesa/:id
Actualiza si una mesa está abierta o cerrada.
- **Input**: ID de la mesa (path parameter) y datos a actualizar
```json
{
    "esta_abierta": boolean
}
```

## GET /mesa/:id/ciudadano/:ciudadanoId
Obtiene una asignación de ciudadano a mesa por IDs.
- **Input**: ID del ciudadano y ID de la mesa (path parameters)
- **Output**: Datos de la asignación
```json
{
    "ciudadano_id": integer,
    "mesa_id": integer,
    "emitio_voto": boolean
}
```

## POST /mesa/:id/ciudadano
Crea una nueva asignación de ciudadano a mesa.
- **Input**: Datos de la asignación
```json
{
    "ciudadano_id": integer,
    "mesa_id": integer,
    "emitio_voto": boolean
}
```

## PATCH /mesa/:id/ciudadano/:ciudadanoId
Actualiza si un ciudadano emitió un voto en una mesa.
- **Input**: ID del ciudadano y ID de la mesa (path parameters) y datos a actualizar
```json
{
    "emitio_voto": boolean
}
```

## GET /mesa/:id/ciudadano
Lista todos los ciudadanos asignados a una mesa.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de asignaciones para la mesa
```json
[
    {
        "ciudadano_id": integer,
        "mesa_id": integer,
        "emitio_voto": boolean
    }
]
```

## GET /mesa/voto/:id
Obtiene un voto por su ID.
- **Input**: ID del voto (path parameter)
- **Output**: Datos del voto
```json
{
    "id": integer,
    "mesa_id": integer,
    "lista_id": integer | null,
    "es_observado": boolean,
    "es_valido": boolean,
    "fecha_hora": timestamp
}
```

## POST /mesa/voto
Crea un nuevo voto y le asigna al ciudadano que votó en ciudadano_mesa.
- **Input**: Datos del voto
```json
{
    "ciudadano_id": integer,
    "mesa_id": integer,
    "lista_id": integer | null,
    "es_observado": boolean,
    "es_valido": boolean,
    "fecha_hora": timestamp
}
```

## GET /mesa/:id/resultados/lista
Obtiene los resultados de votos por lista en una mesa.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de resultados por lista
```json
[
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
        ],
        "cantidad_votos": integer
    }
]
```

## GET /mesa/:id/resultados/partido
Obtiene los resultados de votos por partido en una mesa.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de resultados por partido
```json
[
    {
        "id_partido": integer,
        "nombre_partido": string,
        "cantidad_votos": integer
    }
]
```

## GET /mesa/:id/resultados/candidato
Obtiene los resultados de votos por candidato en una mesa.
- **Input**: ID de la mesa (path parameter)
- **Output**: Array de resultados por candidato
```json
[
    {
        "primer_nombre": string,
        "segundo_nombre": string | null,
        "primer_apellido": string,
        "segundo_apellido": string | null,
        "fecha_nacimiento": date,
        "esta_vivo": boolean,
        "cantidad_votos": integer
    }
]
```