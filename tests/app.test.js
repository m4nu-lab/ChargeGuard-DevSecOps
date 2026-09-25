const request = require('supertest');
const app = require('../app');

describe('ChargeGuard API', () => {

    test('health endpoint should return healthy status', async () => {
        const response = await request(app)
            .get('/health');

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('healthy');
    });

    test('chargers endpoint should return charger data', async () => {
        const response = await request(app)
            .get('/api/chargers');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('incidents endpoint should return incident data', async () => {
        const response = await request(app)
            .get('/api/incidents');

        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('invalid incident should be rejected', async () => {
        const response = await request(app)
            .post('/api/incidents')
            .send({
                charger: 'CG-001'
            });

        expect(response.statusCode).toBe(400);
    });

});
