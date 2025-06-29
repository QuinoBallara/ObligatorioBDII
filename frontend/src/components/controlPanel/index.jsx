import React from 'react'
import { Box, Container, Card, Typography, Divider } from '@mui/material';
import escudoUruguay from "../../assets/escudo_uruguay.png";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useAuth } from '../../contexts/authContext';

function ControlPanel() {
    const [showSidebar, setShowSidebar] = React.useState(true);
    const { auth } = useAuth();

    if (!showSidebar) {
        return (
            <Box
                sx={{
                    position: 'fixed',
                    top: 16,
                    left: 16,
                    zIndex: 1300,
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    boxShadow: 3,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    margin: '8px 0 0 8px'
                }}
                onClick={() => setShowSidebar(true)}
            >
                <MenuOutlinedIcon sx={{ fontSize: 50, color: 'black' }} />
            </Box>
        )
    }
    return (
        <Container
            sx={{
                display: 'flex',
                height: '100vh',
                marginLeft: 0,
                marginRight: 'auto',
                padding: '0 !important',
                borderRadius: 0
            }}
        >
            <Card
                raised
                sx={{
                    paddingTop: 5,
                    paddingLeft: 3,
                    paddingRight: 3,
                    paddingBottom: 3,
                    backgroundColor: '#f5f5f5',
                    borderRadius: 0,
                    minWidth: '30vh',
                    minHeight: '65vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    gap: '1em'
                }}
            >
                <Box sx={{ display: 'flex', marginBottom: 2, flexDirection: 'row' }}>
                    <img src={escudoUruguay} alt="Escudo de Uruguay" style={{ width: '80px', height: 'auto' }} />
                    <Box sx={{ textAlign: 'left', marginTop: 2, alignContent: 'flex-start', marginLeft: 3 }}>
                        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
                            Corte Electoral
                        </Typography>
                        <Typography variant="h6" >
                            República Oriental del Uruguay
                        </Typography>
                    </Box>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                        Panel de Control
                    </Typography>
                    <MenuOutlinedIcon
                        sx={{ fontSize: 30, color: 'black', cursor: 'pointer' }}
                        onClick={() => setShowSidebar(false)}
                    />
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                        Estado de la mesa
                    </Typography>
                    <Typography variant="body2" sx={{ textAlign: 'left' }}>
                        Abierta
                    </Typography>
                </Box>
                <Divider />
            </Card>
        </Container >
    )
}

export default ControlPanel