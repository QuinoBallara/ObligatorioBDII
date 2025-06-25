# Ciudadano Endpoints

## GET /api/ciudadano/:id
Obtiene un ciudadano por su ID.
- **Input**: ID del ciudadano (path parameter)
- **Output**: Datos del ciudadano
```json
{
    "id": integer,
    "credencial_civica": string,
    "primer_nombre": string,
    "segundo_nombre": string | null,
    "primer_apellido": string,
    "segundo_apellido": string | null,
    "fecha_nacimiento": date,
    "esta_vivo": boolean
}
```
## POST /api/ciudadano
Crea un nuevo ciudadano.
- **Input**: Datos del ciudadano
```json
{
    "credencial_civica": string,
    "primer_nombre": string,
    "segundo_nombre": string | null,
    "primer_apellido": string,
    "segundo_apellido": string | null,
    "fecha_nacimiento": date,
    "esta_vivo": boolean
}
```
