# Partido Político Endpoints

## GET /partido-politico/{id}
Obtiene un partido político por su ID.
- **Input**: ID del partido político (path parameter)
- **Output**: Datos del partido político
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /partido-politico
Crea un nuevo partido político.
- **Input**: Datos del partido político
```json
{
    "nombre": string
}
```

## PUT /partido-politico/{id}
Actualiza un partido político existente.
- **Input**: ID del partido político (path parameter) y datos a actualizar
```json
{
    "nombre": string
}
```

## DELETE /partido-politico/{id}
Elimina un partido político por su ID.
- **Input**: ID del partido político (path parameter)

## GET /partido-politico
Lista todos los partidos políticos.
- **Output**: Array de partidos políticos
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
