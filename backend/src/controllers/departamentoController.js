const { selectDepartamentoByID, insertDepartamento, selectDepartamento } = require('../services/departamentoService');

async function getDepartamento(req, res, next) {
    try {
        const resultsQuery = await selectDepartamento();
    
        console.log('Results from selectDepartamento:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'No Departamento found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Departamento:', error);
        next(error);
    }
}


async function getDepartamentoByID(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'ID is required' });
    }
    
    try {
        const resultsQuery = await selectDepartamentoByID(id);
    
        console.log('Results from selectDepartamentoByID:', resultsQuery);
    
        if (!resultsQuery) {
            return res.status(404).json({ message: 'Departamento not found' });
        }
        return res.status(200).json(resultsQuery);
    } catch (error) {
        console.error('Error fetching Departamento by ID:', error);
        next(error);
    }
}

async function postDepartamento(req, res, next) {
    const { nombre } = req.body;
    
    if (!nombre) {
        return res.status(400).json({ message: 'Nombre is required' });
    }

    try{
        const resultsQuery = await insertDepartamento(nombre);
    
        return res.status(201).json({ message: 'Departamento created successfully', id: resultsQuery.insertId });
    } catch (error) {
        console.error('Error creating Departamento:', error);
        next(error);
    }

}

module.exports = {
    getDepartamento,
    postDepartamento,
    getDepartamentoByID
};