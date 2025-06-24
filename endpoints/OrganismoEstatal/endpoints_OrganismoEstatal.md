# OrganismoEstatal Endpoints

## GET /organismo/{id}
Obtiene un organismo estatal por su ID.
- **Input**: ID del organismo (path parameter)
- **Output**: Datos del organismo
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /organismo
Crea un nuevo organismo estatal.
- **Input**: Datos del organismo
```json
{
    "nombre": string
}
```

## PUT /organismo/{id}
Actualiza un organismo estatal existente.
- **Input**: ID del organismo (path parameter) y datos a actualizar
```json
{
    "nombre": string
}
```

## DELETE /organismo/{id}
Elimina un organismo estatal por su ID.
- **Input**: ID del organismo (path parameter)

## GET /organismo
Lista todos los organismos estatales.
- **Output**: Array de organismos
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
