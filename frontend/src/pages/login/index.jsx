import { useEffect, useState } from "react";
import { Container, Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import escudoUruguay from "../../assets/escudo_uruguay.png";

const LoginCiudadanoPage = () => {
    const { handleLoginCiudadano, isAuthenticated } = useAuth();
    const [authData, setAuthData] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        if (isCredencial()) {
            await handleLoginCiudadano(null, authData.replace(" ", ""));
        }
        else {
            await handleLoginCiudadano(authData.replace("-", ""), null);
        }
    };

    const handleRedirect = () => {
        navigate('/login/gestion')
    }

    const isCredencial = () => {
        return authData.split(" ").length === 2
    }

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/votacion');
        }
    }, [isAuthenticated])

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
                            Empezar
                        </Typography>
                        <Typography variant="body1" sx={{}}>
                            Empiece el proceso de votación.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="subtitle1" sx={{ marginBottom: 0 }}>
                            Ingrese su credencial cívica o cédula de identidad
                        </Typography>
                        <TextField id="outlined-basic" variant="outlined" placeholder="'ABC 12345' o '1234567-8'" fullWidth
                            value={authData}
                            onChange={(e) => setAuthData(e.target.value)}
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
                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Button
                            variant="text"
                            color="primary"
                            onClick={handleRedirect}
                            sx={{ textTransform: 'none' }}
                        >
                            <Typography variant="body2" color="textSecondary">
                                Hacer login como presidente de mesa.
                            </Typography>
                        </Button>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginCiudadanoPage;