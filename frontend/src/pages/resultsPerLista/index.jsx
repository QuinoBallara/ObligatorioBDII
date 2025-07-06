import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getVotosPerLista } from "../../services/getViewsService";
import ResultsTable from "../../components/resultsTable"; 
import { getTableInfo } from "../../services/controlPanelService";

const ResultsPerListaPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { auth } = useAuth();
    const [tableInfo, setTableInfo] = useState(false);

    const columns = [
        { key: 'Lista', label: 'Lista', align: 'left' },
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
                const response = await getVotosPerLista(auth);
                
                // Calculate total votes
                const totalVotes = response.reduce((sum, item) => sum + item.CantidadDeVotos, 0);
                
                // Add percentage and sort by votes descending
                const dataWithPercentage = response
                    .map(item => ({
                        ...item,
                        porcentaje: totalVotes > 0 ? ((item.CantidadDeVotos / totalVotes) * 100).toFixed(2) : 0
                    }))
                    .sort((a, b) => b.CantidadDeVotos - a.CantidadDeVotos);
                
                setData(dataWithPercentage);
                setError(null);
            } catch (error) {
                console.error('Error fetching votos por lista:', error);
                setError('Error al cargar los datos');
            } finally {
                setLoading(false);
            }
        };

        const fetchTableInfo = async () => {
            if (auth) {
                const response = await getTableInfo(auth.user.mesaId, auth.token)
                setTableInfo(response);
            }
        }

        fetchTableInfo();
        fetchData();
    }, [auth]);

    return (
        <ResultsTable
            data={data}
            loading={loading}
            error={error}
            title="Resultados por Lista"
            subtitle="Resultados de votación por cada lista."
            columns={columns}
            mesaState={tableInfo.esta_abierta}
        />
    );
};

export default ResultsPerListaPage;