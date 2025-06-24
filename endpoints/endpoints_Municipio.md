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

