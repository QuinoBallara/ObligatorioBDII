import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import { getListas } from "../../services/votacionService";
import ResultsTable from "../../components/resultsTable";

const Listas = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { auth } = useAuth();

    const columns = [
        { key: 'numero', label: 'N° Lista', align: 'left' },
        { key: 'partido_nombre', label: 'Partido Político', align: 'left' },
        { key: 'departamento_nombre', label: 'Departamento', align: 'left' },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const listas = await getListas(auth);
                console.log("Listas obtenidas:", listas);
                setData(listas);
                
                
            } catch (error) {
                console.error("Error al obtener las listas:", error);
                setError('Error al cargar las listas');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <ResultsTable
            data={data}
            loading={loading}
            error={error}
            title="Listas Electorales"
            subtitle="Listas disponibles para la elección en su mesa."
            columns={columns}
        />
    );
};

export default Listas;
