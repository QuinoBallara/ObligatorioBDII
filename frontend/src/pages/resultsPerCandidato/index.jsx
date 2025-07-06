// ResultsPerCandidatoPage.js
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getVotosPerCandidato } from "../../services/getViewsService";
import ResultsTable from "../../components/resultsTable/";

const ResultsPerCandidatoPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { auth } = useAuth();

    const columns = [
        { key: 'Candidato', label: 'Candidato', align: 'left' },
        { key: 'Partido', label: 'Partido Político', align: 'right' },
        { key: 'CantidadDeVotos', label: 'Votos', align: 'right' },
        { 
            key: 'porcentaje', 
            label: 'Porcentaje', 
            align: 'right',
            render: (value) => `${value}%`
        }
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await getVotosPerCandidato(auth);
                
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
                
                // Calculate total votes
                const totalVotes = response.reduce((sum, item) => sum + item.CantidadDeVotos, 0);
                
                // Add percentage, fix encoding, and sort by votes descending
                const dataWithPercentage = response
                    .map(item => ({
                        ...item,
                        Candidato: fixEncoding(item.Candidato),
                        Partido: fixEncoding(item.Partido),
                        porcentaje: totalVotes > 0 ? ((item.CantidadDeVotos / totalVotes) * 100).toFixed(2) : 0
                    }))
                    .sort((a, b) => b.CantidadDeVotos - a.CantidadDeVotos);
                
                setData(dataWithPercentage);
                setError(null);
            } catch (error) {
                console.error('Error fetching votos por candidato:', error);
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
            title="Resultados por Candidato"
            subtitle="Resultados de votación por cada candidato."
            columns={columns}
        />
    );
};

export default ResultsPerCandidatoPage;