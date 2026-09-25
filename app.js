const express = require('express');

const app = express();

app.use(express.json());

const chargers = [
    {
        id: 'CG-001',
        location: 'Dandenong',
        status: 'ONLINE'
    },
    {
        id: 'CG-002',
        location: 'Newcastle',
        status: 'ONLINE'
    },
    {
        id: 'CG-003',
        location: 'Hunter',
        status: 'OFFLINE'
    }
];

let incidents = [
    {
        id: 1,
        charger: 'CG-002',
        type: 'Cable Tampering',
        severity: 'HIGH',
        status: 'Detected'
    }
];

app.get('/', (req, res) => {
    res.json({
        application: 'ChargeGuard',
        description: 'EV Charger Security Monitoring System',
        status: 'running'
    });
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'healthy',
        service: 'ChargeGuard'
    });
});

app.get('/api/chargers', (req, res) => {
    res.json(chargers);
});

app.get('/api/incidents', (req, res) => {
    res.json(incidents);
});

app.post('/api/incidents', (req, res) => {
    const { charger, type, severity } = req.body;

    if (!charger || !type || !severity) {
        return res.status(400).json({
            error: 'charger, type and severity are required'
        });
    }

    const incident = {
        id: incidents.length + 1,
        charger,
        type,
        severity,
        status: 'Detected'
    };

    incidents.push(incident);

    res.status(201).json(incident);
});

app.put('/api/incidents/:id', (req, res) => {
    const id = Number(req.params.id);
    const incident = incidents.find(item => item.id === id);

    if (!incident) {
        return res.status(404).json({
            error: 'Incident not found'
        });
    }

    if (req.body.status) {
        incident.status = req.body.status;
    }

    res.json(incident);
});

module.exports = app;
