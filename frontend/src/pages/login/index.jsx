import { useEffect, useState } from "react";
import { Container, Box, Card, CardContent, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import { useNavigate } from "react-router-dom";
import escudoUruguay from "../../assets/escudo_uruguay.png";
import { checkEmitioVoto } from "../../services/authService";

const LoginCiudadanoPage = () => {
    const { handleLoginCiudadano, isAuthenticated, auth, handleLogoutVoter } = useAuth();
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

    const isCredencial = () => {
        return authData.split(" ").length === 2
    }

    useEffect(() => {
        const redirect = async () => {
            if (isAuthenticated && auth && auth.voter && auth.voter.token) {
                const response = await checkEmitioVoto(auth);
                console.log(response);
                if (!response.emitio_voto) {
                    navigate('/votacion/votar');
                } else {
                    alert("Ya ha votado. No puede votar nuevamente.");
                    handleLogoutVoter();
                }
            }
        };
        redirect();
    }, [isAuthenticated, auth]);

    return (
        <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', position: 'relative' }}>
            <Button
                onClick={() => {handleLogoutVoter(); navigate('/home')}}
                sx={{
                    position: 'absolute',
                    bottom: 1,
                    left: 1,
                    minWidth: '20px',
                    minHeight: '20px',
                    padding: '5px',
                    backgroundColor: 'transparent',
                    border: 'none',
                    opacity: 0.3,
                    '&:hover': {
                        opacity: 0.3,
                        backgroundColor: 'rgba(0,0,0,0.1)'
                    }
                }}
            >
                ←
            </Button>
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
                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginCiudadanoPage;