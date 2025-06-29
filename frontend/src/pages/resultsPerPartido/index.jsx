import { useEffect, useState } from "react";
import { Container, Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import escudoUruguay from "../../assets/escudo_uruguay.png";
import { getVotosPerPartido } from "../../services/getViewsService"; 

const ResultsPerListaPage = () => {
    
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
               
                const mesaId = 1;
                const response = await getVotosPerPartido(mesaId);
                console.log(response);
                
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

        fetchData();
    }, []);

    if (loading) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography>Cargando...</Typography>
            </Container>
        );
    }

    if (error) {
        return (
            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography color="error">{error}</Typography>
            </Container>
        );
    }

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card raised sx={{
                padding: 5,
                paddingBottom: 3,
                backgroundColor: '#f5f5f5',
                borderRadius: 3,
                minWidth: '70vh',
                minHeight: '65vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CardContent sx={{ width: '100%' }}>
                    <Box sx={{ textAlign: 'center', marginBottom: 3 }}>
                        <img src={escudoUruguay} alt="Escudo de Uruguay" style={{
                            width: '100px',
                            height: '100px',
                            marginBottom: '16px'
                        }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Resultados por Partido
                        </Typography>
                        <Typography variant="body1">
                            Resultados de votación por cada partido.
                        </Typography>
                    </Box>

                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Partido Político</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Votos</TableCell>
                                    <TableCell align="right" sx={{ fontWeight: 'bold' }}>Porcentaje</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row) => (
                                    <TableRow key={row.id}>
                                        <TableCell align="right">{row.Partido}</TableCell>
                                        <TableCell align="right">{row.CantidadDeVotos}</TableCell>
                                        <TableCell align="right">{row.porcentaje}%</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>
        </Container>
    );
};

export default ResultsPerListaPage;
