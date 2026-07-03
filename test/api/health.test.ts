import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { initializeExpress } from '../../src/loaders/express-loader.js';

const app = initializeExpress();

describe('Health Route', () => {
  it('return 200', async () => {
    const res = await request(app).get('/health');

    expect(res.status).toBe(200);
  });
});
