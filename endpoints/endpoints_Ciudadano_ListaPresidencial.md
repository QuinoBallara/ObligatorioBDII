# Ciudadano_ListaPresidencial Endpoints

## GET /ciudadano_lista_presidencial/{lista_presidencial_id}/{ciudadano_id}
Obtiene una relación ciudadano-lista presidencial por sus IDs.
- **Input**: ID de la lista presidencial y ID del ciudadano (path parameters)
- **Output**: Datos de la relación ciudadano-lista presidencial
```json
{
    "lista_presidencial_id": integer,
    "ciudadano_id": integer,
    "tipo_ciudadano_id": integer,
    "numero": integer
}
``` 

## POST /ciudadano_lista_presidencial
Crea una nueva relación ciudadano-lista presidencial.
- **Input**: Datos de la relación ciudadano-lista presidencial
```json
{
    "lista_presidencial_id": integer,
    "ciudadano_id": integer,
    "tipo_ciudadano_id": integer,
    "numero": integer
}
```

## PUT /ciudadano_lista_presidencial/{lista_presidencial_id}/{ciudadano_id}
Actualiza una relación ciudadano-lista presidencial existente.
- **Input**: IDs de la relación (path parameters) y datos a actualizar
```json
{
    "tipo_ciudadano_id": integer,
    "numero": integer
}
```

## DELETE /ciudadano_lista_presidencial/{lista_presidencial_id}/{ciudadano_id}
Elimina una relación ciudadano-lista presidencial por sus IDs.
- **Input**: ID de la lista presidencial y ID del ciudadano (path parameters)

## GET /ciudadano_lista_presidencial
Lista todas las relaciones ciudadano-lista presidencial.
- **Output**: Array de relaciones
```json
[
    {
        "lista_presidencial_id": integer,
        "ciudadano_id": integer,
        "tipo_ciudadano_id": integer,
        "numero": integer
    }
]
```

## GET /ciudadano_lista_presidencial/lista/{lista_presidencial_id}
Lista todas las relaciones para una lista presidencial específica.
- **Input**: ID de la lista presidencial (path parameter)
- **Output**: Array de relaciones
```json
[
    {
        "lista_presidencial_id": integer,
        "ciudadano_id": integer,
        "tipo_ciudadano_id": integer,
        "numero": integer
    }
]
```

## GET /ciudadano_lista_presidencial/ciudadano/{ciudadano_id}
Lista todas las listas presidenciales en las que participa un ciudadano.
- **Input**: ID del ciudadano (path parameter)
- **Output**: Array de relaciones
```json
[
    {
        "lista_presidencial_id": integer,
        "ciudadano_id": integer,
        "tipo_ciudadano_id": integer,
        "numero": integer
    }
]
```