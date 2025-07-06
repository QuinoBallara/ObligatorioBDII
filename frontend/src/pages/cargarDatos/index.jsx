import React, { useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { cargarDatos, exampleDataStructure } from '../../services/cargarDatosService';

const CargarDatosPage = () => {
    const { auth } = useAuth(); // Get the full auth object, not just token
    const [jsonText, setJsonText] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResults(null);
        setLoading(true);

        try {
            // Validate JSON
            const data = JSON.parse(jsonText);
            
            // Submit data with token from auth context
            const response = await cargarDatos(data, auth.token); // Use auth.token
            setResults(response);
        } catch (err) {
            if (err instanceof SyntaxError) {
                setError('JSON inválido: ' + err.message);
            } else {
                setError('Error al procesar los datos: ' + err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLoadExample = () => {
        const example = exampleDataStructure();
        setJsonText(JSON.stringify(example, null, 2));
    };

    return (
        <div className="cargar-datos-page">
            <h1>Cargar Datos</h1>
            
            {/* Show authentication status */}
            {auth.token ? (
                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#d4edda', border: '1px solid #c3e6cb', borderRadius: '4px' }}>
                    <strong>Usuario autenticado:</strong> {auth.user?.id || 'N/A'}
                </div>
            ) : (
                <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px' }}>
                    <strong>No autenticado.</strong> Por favor, inicia sesión primero.
                </div>
            )}

            <div style={{ marginBottom: '20px' }}>
                <button onClick={handleLoadExample} style={{ marginRight: '10px' }}>
                    Cargar Ejemplo
                </button>
            </div>

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="jsonInput">JSON de datos:</label>
                    <textarea
                        id="jsonInput"
                        value={jsonText}
                        onChange={(e) => setJsonText(e.target.value)}
                        rows={20}
                        cols={80}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                        placeholder="Ingrese el JSON con los datos a cargar..."
                    />
                </div>

                <button type="submit" disabled={loading || !auth.token}>
                    {loading ? 'Cargando...' : 'Cargar Datos'}
                </button>
            </form>

            {error && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f8d7da', border: '1px solid #f5c6cb', borderRadius: '4px', color: '#721c24' }}>
                    <strong>Error:</strong> {error}
                </div>
            )}

            {results && (
                <div style={{ marginTop: '20px' }}>
                    <h2>Resultados</h2>
                    <div style={{ padding: '10px', backgroundColor: '#f8f9fa', border: '1px solid #dee2e6', borderRadius: '4px' }}>
                        <h3>Resumen</h3>
                        <p><strong>Total:</strong> {results.summary.total}</p>
                        <p><strong>Exitosos:</strong> {results.summary.successful}</p>
                        <p><strong>Fallidos:</strong> {results.summary.failed}</p>
                        
                        {results.success.length > 0 && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>Operaciones Exitosas</h3>
                                <ul>
                                    {results.success.map((item, index) => (
                                        <li key={index}>
                                            <strong>{item.entity}</strong> - {item.endpoint}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                        
                        {results.errors.length > 0 && (
                            <div style={{ marginTop: '20px' }}>
                                <h3>Errores</h3>
                                <ul>
                                    {results.errors.map((item, index) => (
                                        <li key={index} style={{ color: '#721c24' }}>
                                            <strong>{item.entity}</strong> - {item.endpoint}: {JSON.stringify(item.error)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CargarDatosPage;