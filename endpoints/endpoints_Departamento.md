# Departamento Endpoints

## GET /departamento/{id}
Obtiene un departamento por su ID.
- **Input**: ID del departamento (path parameter)
- **Output**: Datos del departamento
```json
{
    "id": integer,
    "nombre": string
}
```

## POST /departamento
Crea un nuevo departamento.
- **Input**: Datos del departamento
```json
{
    "nombre": string
}
```

## PUT /departamento/{id}
Actualiza un departamento existente.
- **Input**: ID del departamento (path parameter) y datos a actualizar
```json
{
    "nombre": string
}
```

## DELETE /departamento/{id}
Elimina un departamento por su ID.
- **Input**: ID del departamento (path parameter)

## GET /departamento
Lista todos los departamentos.
- **Output**: Array de departamentos
```json
[
    {
        "id": integer,
        "nombre": string
    }
]
```
