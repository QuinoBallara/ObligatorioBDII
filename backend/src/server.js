const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const cors = require('cors');
app.use(cors());

const pool = require('./db/db');
pool.query('SELECT 1', (err, results) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Database connection successful. Test query result:', results);
    }
});

app.use((req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.get('/api', (req, res) => {
    res.json({ message: 'Hello from Express!' });
});

// Auth and unprotected routes go here

const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

const authenticate = require('./middlewares/authenticate');
app.use(authenticate)

// Protected routes go here

const departamentoRoutes = require('./routes/departamento');
app.use('/api/departamento', departamentoRoutes);


// Error handling middleware

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
            status: err.status || 500
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
