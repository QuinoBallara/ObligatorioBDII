import { useEffect, useState } from "react";
import { Container, Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import escudoUruguay from "../../assets/escudo_uruguay.png";

const LoginPresidentePage = () => {
    const { handleLoginPresidente, isAuthenticated, auth } = useAuth();
    const [ci, setCi] = useState("");
    const [credencialCivica, setCredencialCivica] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (!ci.includes("-") || !credencialCivica.includes(" ")) {
            alert("La cédula debe contener un guión y la credencial debe contener un espacio.");
            return;
        }
        await handleLoginPresidente(ci.replace("-", ""), credencialCivica.replace(" ", ""));
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/home');
        }
    }, [isAuthenticated, auth])

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Card raised sx={{
                padding: 5,
                paddingBottom: 3,
                backgroundColor: '#f5f5f5',
                borderRadius: 3, minWidth: '50vh',
                minHeight: '65vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                        <img src={escudoUruguay} alt="Escudo de Uruguay" style={{
                            width: '150px',
                            height: '150px',
                            marginBottom: '16px'
                        }} />
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Iniciar Sesión
                        </Typography>
                        <Typography variant="body1" sx={{}}>
                            Accede como presidente de mesa.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0 }}>
                            Credencial Cívica
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" placeholder="ABC 12345" fullWidth
                            value={credencialCivica}
                            onChange={(e) => setCredencialCivica(e.target.value)}
                            sx={{ marginBottom: 2, width: '100%' }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0 }}>
                            Cédula de identidad
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" placeholder="1234567-8" fullWidth
                            value={ci}
                            onChange={(e) => setCi(e.target.value)}
                            sx={{ marginBottom: 2, width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleLogin}
                            sx={{ padding: '10px 20px', borderRadius: '4px' }}
                        >
                            Iniciar sesión
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container >
    )
}

export default LoginPresidentePage;