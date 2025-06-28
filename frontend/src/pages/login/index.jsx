import { useState, useContext } from "react";
import { Container, Box, Card, CardContent, Typography, TextField } from "@mui/material";
import { useAuth } from "../../contexts/authContext";
import escudoUruguay from "../../assets/escudo_uruguay.png";

const LoginCiudadanoPage = () => {
    const { handleLoginCiudadano } = useAuth();
    const [authData, setAuthData] = useState("");

    const handleLogin = async () => {
        await handleLoginCiudadano(ci, credencialCivica);
    };

    const isCredencial = () => {
        return authData.split(" ").length === 2
    }

    return (
        <Container>
            <Card raised sx={{ padding: 2, marginTop: 2, backgroundColor: '#f5f5f5', borderRadius: 1 }}>
                <CardContent>
                    <Box sx={{ textAlign: 'center', marginBottom: 2 }}>
                        <img src={escudoUruguay} alt="Escudo de Uruguay" style={{
                            width: '100px',
                            height: '100px',
                            marginBottom: '16px'
                        }} />
                        <Typography variant="h4" sx={{ marginTop: 2, fontWeight: 'bold' }}>
                            Empezar
                        </Typography>
                        <Typography variant="subtitle1" sx={{ marginTop: 1 }}>
                            Empiece el proceso de votación.
                        </Typography>
                    </Box>

                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <TextField id="outlined-basic" label="Ingrese su credencial cívica o cédula de identidad" variant="outlined" placeholder="SDC 12345 o 12345678" fullWidth
                            value={authData}
                            onChange={(e) => setAuthData(e.target.value)}
                            sx={{ marginBottom: 2, width: '100%' }}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                        <button onClick={handleLogin} style={{
                            padding: '10px 20px',
                            backgroundColor: '#1976d2',
                            color: 'white',
                            border: 'none',
                            borderRadius: '4px',
                        }}>
                            Iniciar sesión
                        </button>
                    </Box>
                    <Box sx={{ textAlign: 'center', marginTop: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                            Hacer login como presidente de mesa.
                        </Typography>
                    </Box>
                </CardContent>
            </Card>
        </Container>
    )
}

export default LoginCiudadanoPage;