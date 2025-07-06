import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getVotantes } from "../../services/votantesService";
import ResultsTable from "../../components/resultsTable"; 
import Card from '@mui/material/Card';

const VotantesPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const columns = [
        { key: 'ciudadano_id', label: 'CI', align: 'left' },
        { key: 'nombre_completo', label: 'Nombres', align: 'left' },
        { key: 'apellido_completo', label: 'Apellidos', align: 'left' },
        { 
            key: 'emitio_voto', 
            label: 'Emitió Voto', 
            align: 'center',
            render: (value) => value === 1 ? 'Sí' : 'No'
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getVotantes(auth);
                
                // Process the data to handle null values and formatting
                const processedData = response.map(item => {
                    // Function to fix encoding issues
                    const fixEncoding = (str) => {
                        if (!str) return '';
                        return str
                            .replace(/Ã³/g, 'ó')
                            .replace(/Ã¡/g, 'á')
                            .replace(/Ã©/g, 'é')
                            .replace(/Ã­/g, 'í')
                            .replace(/Ãº/g, 'ú')
                            .replace(/Ã±/g, 'ñ')
                            .replace(/Ã/g, 'Á')
                            .replace(/Ã‰/g, 'É')
                            .replace(/Ã/g, 'Í')
                            .replace(/Ã"/g, 'Ó')
                            .replace(/Ãš/g, 'Ú')
                            .replace(/Ã'/g, 'Ñ');
                    };
                    
                    // Combine names
                    const nombreCompleto = [
                        fixEncoding(item.primer_nombre),
                        fixEncoding(item.segundo_nombre)
                    ].filter(Boolean).join(' ');
                    
                    const apellidoCompleto = [
                        fixEncoding(item.primer_apellido),
                        fixEncoding(item.segundo_apellido)
                    ].filter(Boolean).join(' ');
                    
                    return {
                        ...item,
                        nombre_completo: nombreCompleto,
                        apellido_completo: apellidoCompleto
                    };
                })
                .sort((a, b) => {
                    // Sort by emitio_voto (1 first, then 0)
                    if (a.emitio_voto !== b.emitio_voto) {
                        return b.emitio_voto - a.emitio_voto; // 1 comes before 0
                    }
                    // If same vote status, sort by apellido then nombre
                    const apellidoCompare = a.apellido_completo.localeCompare(b.apellido_completo);
                    if (apellidoCompare !== 0) {
                        return apellidoCompare;
                    }
                    return a.nombre_completo.localeCompare(b.nombre_completo);
                });
                
                setData(processedData);
                setError(null);
            } catch (error) {
                console.error('Error fetching votantes:', error);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };
    
        fetchData();
    }, [auth]);

    return (
        <ResultsTable
            data={data}
            loading={loading}
            error={error}
            title="Votantes"
            subtitle="Lista de votantes habilitados para esta mesa."
            columns={columns}
        />
    );
};

export default VotantesPage;