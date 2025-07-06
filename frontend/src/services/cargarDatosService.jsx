import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

// Get auth token from the auth context (not localStorage)
const createApiClient = (token) => {
    const apiClient = axios.create({
        baseURL: API_URL, // This already includes /api
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Add auth token to requests
    apiClient.interceptors.request.use((config) => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });

    return apiClient;
};

export const cargarDatos = async (data, token) => {
    if (!token) {
        throw new Error('Token is required. Please ensure you are authenticated.');
    }

    const apiClient = createApiClient(token);
    
    const results = {
        success: [],
        errors: [],
        summary: {
            total: 0,
            successful: 0,
            failed: 0
        }
    };

    try {
        // Helper function to post data and track results
        const postData = async (endpoint, payload, entityName) => {
            results.summary.total++;
            try {
                const response = await apiClient.post(endpoint, payload);
                results.success.push({
                    entity: entityName,
                    endpoint,
                    data: payload,
                    response: response.data
                });
                results.summary.successful++;
                return response.data;
            } catch (error) {
                // Check if it's a duplicate entry error
                const isDuplicateError = error.response?.data?.error?.message?.includes('Duplicate entry') || 
                                       error.response?.data?.message?.includes('Duplicate entry');
                
                if (isDuplicateError) {
                    // For duplicate entries, consider it a "success" since the entity already exists
                    results.success.push({
                        entity: entityName,
                        endpoint,
                        data: payload,
                        response: { message: 'Entity already exists (duplicate)', existing: true }
                    });
                    results.summary.successful++;
                } else {
                    results.errors.push({
                        entity: entityName,
                        endpoint,
                        data: payload,
                        error: error.response?.data || error.message
                    });
                    results.summary.failed++;
                }
                
                console.error(`Error posting ${entityName}:`, error.response?.data || error.message);
            }
        };

        // PHASE 1: Basic entities (no dependencies)
        
        // 1. Departamento
        if (data.departamento && data.departamento.nombre) {
            await postData('/departamento', {
                nombre: data.departamento.nombre
            }, 'Departamento');
        }

        // 2. TipoEstablecimiento
        if (data.tipoEstablecimiento && data.tipoEstablecimiento.nombre) {
            await postData('/tipoEstablecimiento', {
                nombre: data.tipoEstablecimiento.nombre
            }, 'TipoEstablecimiento');
        }

        // 3. TipoCiudadano
        if (data.tipoCiudadano && data.tipoCiudadano.nombre) {
            await postData('/tipoCiudadano', {
                nombre: data.tipoCiudadano.nombre
            }, 'TipoCiudadano');
        }

        // 4. TipoEleccion
        if (data.tipoEleccion && data.tipoEleccion.nombre) {
            await postData('/tipoEleccion', {
                nombre: data.tipoEleccion.nombre
            }, 'TipoEleccion');
        }

        // 5. PartidoPolitico
        if (data.partidoPolitico && data.partidoPolitico.nombre) {
            await postData('/partidoPolitico', {
                nombre: data.partidoPolitico.nombre
            }, 'PartidoPolitico');
        }

        // 6. OrganismoEstatal
        if (data.organismoEstatal && data.organismoEstatal.nombre) {
            await postData('/organismoEstatal', {
                nombre: data.organismoEstatal.nombre
            }, 'OrganismoEstatal');
        }

        // PHASE 2: Entities that depend on basic entities

        // 7. Municipio (depends on Departamento)
        if (data.municipio && data.municipio.nombre && data.municipio.departamento_id) {
            await postData('/municipio', {
                nombre: data.municipio.nombre,
                departamento_id: data.municipio.departamento_id
            }, 'Municipio');
        }

        // 8. Zona (depends on Municipio)
        if (data.zona && data.zona.nombre && data.zona.municipio_id) {
            await postData('/zona', {
                nombre: data.zona.nombre,
                municipio_id: data.zona.municipio_id
            }, 'Zona');
        }

        // 9. Comisaria (depends on Municipio)
        if (data.comisaria && data.comisaria.nombre && data.comisaria.municipio_id) {
            await postData('/comisaria', {
                nombre: data.comisaria.nombre,
                municipio_id: data.comisaria.municipio_id
            }, 'Comisaria');
        }

        // 10. Establecimiento (depends on TipoEstablecimiento and Zona)
        if (data.establecimiento && data.establecimiento.nombre && 
            data.establecimiento.direccion && data.establecimiento.tipo_establecimiento_id && 
            data.establecimiento.zona_id) {
            await postData('/establecimiento', {
                nombre: data.establecimiento.nombre,
                direccion: data.establecimiento.direccion,
                tipo_establecimiento_id: data.establecimiento.tipo_establecimiento_id,
                zona_id: data.establecimiento.zona_id
            }, 'Establecimiento');
        }

        // 11. Eleccion (depends on TipoEleccion)
        if (data.eleccion && data.eleccion.fecha && data.eleccion.tipo_eleccion_id) {
            await postData('/eleccion', {
                fecha: data.eleccion.fecha,
                tipo_eleccion_id: data.eleccion.tipo_eleccion_id
            }, 'Eleccion');
        }

        // PHASE 3: Citizens and bulk citizens (must come before entities that reference them)

        // 12. Ciudadano (individual)
        if (data.ciudadano && data.ciudadano.id && data.ciudadano.credencial_civica && 
            data.ciudadano.primer_nombre && data.ciudadano.primer_apellido && 
            data.ciudadano.fecha_nacimiento) {
            await postData('/ciudadano', {
                id: data.ciudadano.id,
                credencial_civica: data.ciudadano.credencial_civica,
                primer_nombre: data.ciudadano.primer_nombre,
                segundo_nombre: data.ciudadano.segundo_nombre || null,
                primer_apellido: data.ciudadano.primer_apellido,
                segundo_apellido: data.ciudadano.segundo_apellido || null,
                fecha_nacimiento: data.ciudadano.fecha_nacimiento,
                esta_vivo: data.ciudadano.esta_vivo !== undefined ? data.ciudadano.esta_vivo : true
            }, 'Ciudadano');
        }

        // 13. Multiple Ciudadanos (bulk)
        if (data.bulk && data.bulk.ciudadanos && Array.isArray(data.bulk.ciudadanos)) {
            for (const ciudadano of data.bulk.ciudadanos) {
                if (ciudadano.id && ciudadano.credencial_civica && ciudadano.primer_nombre && 
                    ciudadano.primer_apellido && ciudadano.fecha_nacimiento) {
                    await postData('/ciudadano', {
                        id: ciudadano.id,
                        credencial_civica: ciudadano.credencial_civica,
                        primer_nombre: ciudadano.primer_nombre,
                        segundo_nombre: ciudadano.segundo_nombre || null,
                        primer_apellido: ciudadano.primer_apellido,
                        segundo_apellido: ciudadano.segundo_apellido || null,
                        fecha_nacimiento: ciudadano.fecha_nacimiento,
                        esta_vivo: ciudadano.esta_vivo !== undefined ? ciudadano.esta_vivo : true
                    }, `Ciudadano-${ciudadano.id}`);
                }
            }
        }

        // PHASE 4: Entities that depend on Citizens

        // 14. Mesa (depends on Ciudadano for all roles and Establecimiento, Eleccion)
        if (data.mesa && data.mesa.circuito_id && data.mesa.establecimiento_id && 
            data.mesa.vocal_id && data.mesa.presidente_id && data.mesa.secretario_id && 
            data.mesa.policia_id && data.mesa.eleccion_id && 
            data.mesa.accessible !== undefined) {
            await postData('/mesa', {
                circuito_id: data.mesa.circuito_id,
                establecimiento_id: data.mesa.establecimiento_id,
                accessible: data.mesa.accessible, // Note: backend expects 'accessible', not 'accesible'
                vocal_id: data.mesa.vocal_id,
                presidente_id: data.mesa.presidente_id,
                secretario_id: data.mesa.secretario_id,
                policia_id: data.mesa.policia_id,
                eleccion_id: data.mesa.eleccion_id
            }, 'Mesa');
        }

        // 15. ListaPresidencial (depends on Eleccion, PartidoPolitico, Departamento)
        // Note: Fixed the validation issue - backend expects 'numero' not 'nombre'
        if (data.listaPresidencial && data.listaPresidencial.eleccion_id && 
            data.listaPresidencial.partido_politico_id && data.listaPresidencial.departamento_id && 
            data.listaPresidencial.nombre && data.listaPresidencial.ciudadanos && 
            Array.isArray(data.listaPresidencial.ciudadanos)) {
            
            console.log('ListaPresidencial data before sending:', JSON.stringify(data.listaPresidencial, null, 2));
            
            await postData('/listaPresidencial', {
                eleccion_id: data.listaPresidencial.eleccion_id,
                partido_politico_id: data.listaPresidencial.partido_politico_id,
                departamento_id: data.listaPresidencial.departamento_id,
                nombre: data.listaPresidencial.nombre,
                numero: data.listaPresidencial.numero,
                ciudadanos: data.listaPresidencial.ciudadanos
            }, 'ListaPresidencial');
        }

        // 16. Policia (for Comisaria) - depends on Ciudadano and Comisaria
        if (data.policia && data.policia.comisaria_id && data.policia.policia_id) {
            await postData(`/comisaria/${data.policia.comisaria_id}/policia`, {
                policia_id: data.policia.policia_id
            }, 'Policia');
        }

        // 17. AutoridadPartidoPolitico (depends on Ciudadano, PartidoPolitico, TipoCiudadano)
        if (data.autoridadPartidoPolitico && data.autoridadPartidoPolitico.partidoPolitico_id && 
            data.autoridadPartidoPolitico.ciudadano_id && data.autoridadPartidoPolitico.fecha_inicio && 
            data.autoridadPartidoPolitico.fecha_fin && data.autoridadPartidoPolitico.tipo_ciudadano_id) {
            await postData(`/partidoPolitico/${data.autoridadPartidoPolitico.partidoPolitico_id}/autoridad`, {
                ciudadano_id: data.autoridadPartidoPolitico.ciudadano_id,
                fecha_inicio: data.autoridadPartidoPolitico.fecha_inicio,
                fecha_fin: data.autoridadPartidoPolitico.fecha_fin,
                tipo_ciudadano_id: data.autoridadPartidoPolitico.tipo_ciudadano_id
            }, 'AutoridadPartidoPolitico');
        }

        // 18. CiudadanoOrganismoEstatal (depends on Ciudadano and OrganismoEstatal)
        if (data.ciudadanoOrganismoEstatal && data.ciudadanoOrganismoEstatal.organismo_estatal_id && 
            data.ciudadanoOrganismoEstatal.ciudadano_id) {
            await postData(`/organismoEstatal/${data.ciudadanoOrganismoEstatal.organismo_estatal_id}/ciudadano`, {
                ciudadano_id: data.ciudadanoOrganismoEstatal.ciudadano_id
            }, 'CiudadanoOrganismoEstatal');
        }

        // PHASE 5: Final entities that depend on everything else

        // 19. CiudadanoMesa (depends on Ciudadano and Mesa)
        if (data.ciudadanoMesa && data.ciudadanoMesa.mesa_id && 
            data.ciudadanoMesa.ciudadano_id && data.ciudadanoMesa.emitio_voto !== undefined) {
            await postData(`/ciudadanoMesa/mesa/${data.ciudadanoMesa.mesa_id}/ciudadano/${data.ciudadanoMesa.ciudadano_id}`, {
                emitio_voto: data.ciudadanoMesa.emitio_voto
            }, 'CiudadanoMesa');
        }

        // 20. Voto (depends on Mesa and Lista)
        if (data.voto && data.voto.mesa_id && data.voto.lista_id && 
            data.voto.es_observado !== undefined && data.voto.es_valido !== undefined) {
            await postData('/voto', {
                mesa_id: data.voto.mesa_id,
                lista_id: data.voto.lista_id,
                es_observado: data.voto.es_observado,
                es_valido: data.voto.es_valido
            }, 'Voto');
        }

        // 21. Multiple Votos (bulk)
        if (data.bulk && data.bulk.votos && Array.isArray(data.bulk.votos)) {
            for (const voto of data.bulk.votos) {
                if (voto.mesa_id && voto.lista_id && voto.es_observado !== undefined && 
                    voto.es_valido !== undefined) {
                    await postData('/voto', {
                        mesa_id: voto.mesa_id,
                        lista_id: voto.lista_id,
                        es_observado: voto.es_observado,
                        es_valido: voto.es_valido
                    }, `Voto-${voto.mesa_id}-${voto.lista_id}`);
                }
            }
        }

        return results;

    } catch (error) {
        console.error('Error in cargarDatos:', error);
        return results;
    }
};

// Example usage function for reference with corrected field names
export const exampleDataStructure = () => {
    return {
        departamento: {
            nombre: "Montevideo"
        },
        tipoEstablecimiento: {
            nombre: "Escuela"
        },
        tipoCiudadano: {
            nombre: "Presidente"
        },
        tipoEleccion: {
            nombre: "Presidencial"
        },
        partidoPolitico: {
            nombre: "Partido Colorado"
        },
        organismoEstatal: {
            nombre: "IMM"
        },
        municipio: {
            nombre: "Municipio A",
            departamento_id: "1" // Changed from number to string
        },
        zona: {
            nombre: "Zona Centro",
            municipio_id: "1" // Changed from number to string
        },
        comisaria: {
            nombre: "Comisaría 1",
            municipio_id: "1" // Changed from number to string
        },
        establecimiento: {
            nombre: "Escuela 123",
            direccion: "Calle Principal 123",
            tipo_establecimiento_id: 1,
            zona_id: 1
        },
        eleccion: {
            fecha: "2024-12-15",
            tipo_eleccion_id: "1" // Changed from number to string
        },
        ciudadano: {
            id: "1234567", // Changed from number to string
            credencial_civica: "ABC123",
            primer_nombre: "Juan",
            segundo_nombre: "Carlos",
            primer_apellido: "Pérez",
            segundo_apellido: "González",
            fecha_nacimiento: "1990-05-15",
            esta_vivo: true
        },
        mesa: {
            circuito_id: "1", // Changed from number to string
            establecimiento_id: "1", // Changed from number to string
            accessible: true,
            vocal_id: "1234567", // Changed from number to string
            presidente_id: "2345678", // Changed from number to string
            secretario_id: "3456789", // Changed from number to string
            policia_id: "4567890", // Changed from number to string
            eleccion_id: "1" // Changed from number to string
        },
        listaPresidencial: {
            eleccion_id: 1, // Back to number - this works in Postman
            partido_politico_id: 1, // Back to number - this works in Postman
            departamento_id: "1", // Keep as string - this works in Postman
            nombre: "Lista Presidencial 1A", // Required field - this works in Postman
            numero: "1A",
            ciudadanos: [
                {
                    ciudadano_id: 1234567, // Back to number - this works in Postman
                    tipo_ciudadano_id: 1, // Back to number - this works in Postman
                    numero: 1
                }
            ]
        },
        voto: {
            mesa_id: 1,
            lista_id: 1,
            es_observado: false,
            es_valido: true
        },
        ciudadanoMesa: {
            mesa_id: 1,
            ciudadano_id: "1234567", // Changed to string to match ciudadano.id
            emitio_voto: false
        },
        policia: {
            comisaria_id: "1", // Changed to string for consistency
            policia_id: "4567890" // Changed from number to string
        },
        autoridadPartidoPolitico: {
            partidoPolitico_id: 1,
            ciudadano_id: "1234567", // Changed to string to match ciudadano.id
            fecha_inicio: "2024-01-01",
            fecha_fin: "2024-12-31",
            tipo_ciudadano_id: 1
        },
        ciudadanoOrganismoEstatal: {
            organismo_estatal_id: 1,
            ciudadano_id: "1234567" // Changed to string to match ciudadano.id
        },
        bulk: {
            ciudadanos: [
                {
                    id: "7654321", // Changed from number to string
                    credencial_civica: "XYZ789",
                    primer_nombre: "María",
                    segundo_nombre: null,
                    primer_apellido: "García",
                    segundo_apellido: "López",
                    fecha_nacimiento: "1985-03-20",
                    esta_vivo: true
                },
                // Add the ciudadanos needed for mesa roles
                {
                    id: "2345678",
                    credencial_civica: "DEF456",
                    primer_nombre: "Ana",
                    segundo_nombre: "María",
                    primer_apellido: "López",
                    segundo_apellido: "Martínez",
                    fecha_nacimiento: "1985-08-10",
                    esta_vivo: true
                },
                {
                    id: "3456789",
                    credencial_civica: "GHI789",
                    primer_nombre: "Carlos",
                    segundo_nombre: "Luis",
                    primer_apellido: "Rodríguez",
                    segundo_apellido: "Fernández",
                    fecha_nacimiento: "1992-12-03",
                    esta_vivo: true
                },
                {
                    id: "4567890",
                    credencial_civica: "JKL012",
                    primer_nombre: "Pedro",
                    segundo_nombre: "José",
                    primer_apellido: "González",
                    segundo_apellido: "Silva",
                    fecha_nacimiento: "1988-04-25",
                    esta_vivo: true
                }
            ],
            votos: [
                {
                    mesa_id: 1,
                    lista_id: 1,
                    es_observado: false,
                    es_valido: true
                }
            ]
        }
    };
};