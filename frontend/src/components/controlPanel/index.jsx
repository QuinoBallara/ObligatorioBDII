import React, { useEffect, useState } from 'react'
import { Box, Container, Card, Typography, Divider, Slide, Zoom } from '@mui/material';
import escudoUruguay from "../../assets/escudo_uruguay.png";
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import LogoutIcon from '@mui/icons-material/Logout';
import BallotIcon from '@mui/icons-material/Ballot';
import PollIcon from '@mui/icons-material/Poll';
import PeopleIcon from '@mui/icons-material/People';
import { useAuth } from '../../contexts/authContext';
import { getTableInfo, changeTableState } from '../../services/controlPanelService';
import ControlPanelButton from '../buttons/controlPanelButton';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../contexts/sidebarContext';

function ControlPanel() {
    const { auth, handleLogout } = useAuth();
    const [tableInfo, setTableInfo] = useState({});
    const navigate = useNavigate();
    const { showSidebar, setShowSidebar } = useSidebar();

    useEffect(() => {
        const fetchTableInfo = async () => {
            if (auth) {
                const response = await getTableInfo(auth.user.mesaId, auth.token)
                setTableInfo(response);
            }
        }
        fetchTableInfo();
    }, [auth]);

    const logout = async () => {
        const response = await handleLogout();
        console.log('Logout response:', response);
        navigate('/login/gestion');
    }

    return (
        <>
            <Zoom in={!showSidebar} timeout={300}>
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
            </Zoom>

            <Slide direction="right" in={showSidebar} timeout={500} easing={{
                enter: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                exit: 'cubic-bezier(0.55, 0.06, 0.68, 0.19)'
            }}>
                <Container
                    sx={{
                        display: 'flex',
                        height: '100vh',
                        marginLeft: 0,
                        marginRight: 'auto',
                        padding: '0 !important',
                        borderRadius: 0,
                        backgroundColor: '#f5f5f5',
                        width: showSidebar ? '25vw' : '0vw', // Dynamically adjust width
                        minWidth: showSidebar ? '350px' : '0px',
                        overflow: 'hidden',
                        transition: 'width 0.5s ease, min-width 0.5s ease'
                    }}
                >
                    <Card raised sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        minHeight: '65vh',
                        width: '100%',
                    }}>
                        <Box
                            sx={{
                                padding: '1em 0.5em 1em 0.5em',
                                borderRadius: 0,
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'flex-start',
                            }}
                        >
                            <Box sx={{ display: 'flex', marginBottom: 3, flexDirection: 'row', cursor: 'pointer' }} onClick={() => navigate('/gestion/home')}>
                                <img src={escudoUruguay} alt="Escudo de Uruguay" style={{ width: '60px', aspectRatio: '1:1' }} />
                                <Box sx={{ textAlign: 'left', marginTop: 2, alignContent: 'flex-start', marginLeft: 2 }}>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                                        Corte Electoral
                                    </Typography>
                                    <Typography variant="h7" >
                                        República Oriental del Uruguay
                                    </Typography>
                                </Box>
                            </Box>
                            <Divider />
                            <ControlPanelButton
                                onClick={() => setShowSidebar(false)}
                            >
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Panel de Control
                                </Typography>
                                <MenuOutlinedIcon
                                    sx={{ fontSize: 30, color: 'black' }}
                                />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton
                                onClick={async () => {
                                    if (tableInfo && auth) {
                                        const newState = !tableInfo.esta_abierta;
                                        const response = await changeTableState(auth.user.mesaId, auth.token, newState);
                                        setTableInfo({ ...tableInfo, esta_abierta: newState });
                                        console.log('Table state changed:', response);
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
                                    <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                        Estado de la mesa
                                    </Typography>
                                    <Typography variant="subtitle2" sx={{ textAlign: 'left' }}>
                                        {tableInfo && tableInfo.esta_abierta ? 'Abierta' : 'Cerrada'}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1, justifyContent: 'center' }}>
                                    <Typography variant="subtitle2" sx={{ textAlign: 'center' }}>
                                        Click para
                                        {tableInfo && !tableInfo.esta_abierta ? ' abrir' : ' cerrar'}
                                    </Typography>
                                    {tableInfo && tableInfo.esta_abierta ? (
                                        <CheckCircleIcon sx={{ color: 'black', fontSize: 30 }} />
                                    ) : (
                                        <CancelIcon sx={{ color: 'black', fontSize: 30 }} />
                                    )}
                                </Box>
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/votantes');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Votantes
                                </Typography>
                                <PeopleIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/listas');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Listas
                                </Typography>
                                <BallotIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/resultados/candidatos');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Resultados por Candidato
                                </Typography>
                                <PollIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/resultados/listas');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Resultados por Lista
                                </Typography>
                                <PollIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/resultados/partidos');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Resultados por Partido
                                </Typography>
                                <PollIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                        </Box>
                        <Box sx={{
                            padding: '1em 0.5em 0.5em 0.5em',
                            borderRadius: 0,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'flex-start',
                        }}>
                            <Divider />
                            <ControlPanelButton onClick={() => {
                                navigate('/gestion/cargarDatos');
                            }}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Cargar datos
                                </Typography>
                                <FileUploadIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <ControlPanelButton onClick={logout}>
                                <Typography variant="body1" sx={{ textAlign: 'left' }}>
                                    Cerrar sesión
                                </Typography>
                                <LogoutIcon sx={{ fontSize: 30, color: 'black' }} />
                            </ControlPanelButton>
                            <Divider />
                            <Typography variant="body2" sx={{ color: 'gray', marginTop: 1 }}>
                                © 2025 Corte Electoral - Todos los derechos reservados
                            </Typography>
                        </Box>
                    </Card>
                </Container>
            </Slide>
        </>
    )
}

export default ControlPanel