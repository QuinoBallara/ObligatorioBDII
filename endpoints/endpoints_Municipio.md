# Municipio Endpoints

## GET /municipio/{id}
Obtiene un municipio por su ID.
- **Input**: ID del municipio (path parameter)
- **Output**: Datos del municipio
```json
{
    "id": integer,
    "nombre": string,
    "departamento_id": integer
}
```

## POST /municipio
Crea un nuevo municipio.
- **Input**: Datos del municipio
```json
{
    "nombre": string,
    "departamento_id": integer
}
```

## PUT /municipio/{id}
Actualiza un municipio existente.
- **Input**: ID del municipio (path parameter) y datos a actualizar
```json
{
    "nombre": string,
    "departamento_id": integer
}
```

## DELETE /municipio/{id}
Elimina un municipio por su ID.
- **Input**: ID del municipio (path parameter)

## GET /municipio
Lista todos los municipios.
- **Output**: Array de municipios
```json
[
    {
        "id": integer,
        "nombre": string,
        "departamento_id": integer
    }
]
```
