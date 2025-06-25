const { getDepartamentoByID, insertDepartamento } = require('../services/departamentoService');

async function getDepartamento(req, res) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    const resultsQuery = await getDepartamentoByID(id);

    console.log('Results from getDepartamentoByID:', resultsQuery);

    if (!resultsQuery) {
        return res.status(404).json({ message: 'Departamento not found' });
    }
    return res.status(200).json(resultsQuery);
}

async function postDepartamento(req, res) {
    const { nombre } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre is required' });
    }

    const resultsQuery = await insertDepartamento(nombre);

    return res.status(201).json({ message: 'Departamento created successfully', id: resultsQuery.insertId });

}

module.exports = {
    getDepartamento,
    postDepartamento
};