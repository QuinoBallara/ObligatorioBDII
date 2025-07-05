// ResultsTable.js
import { Container, Box, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import escudoUruguay from "../../assets/escudo_uruguay.png";

const ResultsTable = ({ 
    data, 
    loading, 
    error, 
    title, 
    subtitle, 
    columns 
}) => {
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
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', flexDirection: 'column', alignItems: 'center', gap: 3, m: '15vh auto 0vh auto', width: '100%' }}>
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
                            {title}
                        </Typography>
                        <Typography variant="body1">
                            {subtitle}
                        </Typography>
                    </Box>

                    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell 
                                            key={column.key}
                                            align={column.align || 'left'} 
                                            sx={{ fontWeight: 'bold' }}
                                        >
                                            {column.label}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.map((row, index) => (
                                    <TableRow key={row.id || index}>
                                        {columns.map((column) => (
                                            <TableCell 
                                                key={column.key}
                                                align={column.align || 'left'}
                                                component={column.key === columns[0].key ? 'th' : 'td'}
                                                scope={column.key === columns[0].key ? 'row' : undefined}
                                            >
                                                {column.render ? column.render(row[column.key], row) : row[column.key]}
                                            </TableCell>
                                        ))}
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

export default ResultsTable;