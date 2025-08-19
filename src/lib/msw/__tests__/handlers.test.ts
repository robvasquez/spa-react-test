import { describe, it, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { server } from '../../../test/msw.setup';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('MSW Handlers', () => {
  it('handles successful sign-in with valid credentials', async () => {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@example.com',
        password: 'Password123!',
      }),
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('user');
    expect(data).toHaveProperty('token');
    expect(data.user.email).toBe('user@example.com');
  });

  it('handles failed sign-in with invalid credentials', async () => {
    const response = await fetch('/api/auth/sign-in', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'wrong@example.com',
        password: 'WrongPassword',
      }),
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.message).toBe('Invalid email or password');
  });

  it('handles successful getMe with valid token', async () => {
    const response = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjI0NzQ0MCwiZXhwIjoxNjE2MjUxMDQwfQ.example',
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty('id');
    expect(data).toHaveProperty('email');
    expect(data).toHaveProperty('name');
  });

  it('handles failed getMe without token', async () => {
    const response = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.message).toBe('Unauthorized - No valid token provided');
  });

  it('handles failed getMe with invalid token', async () => {
    const response = await fetch('/api/me', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer invalid-token',
        'Content-Type': 'application/json',
      },
    });

    expect(response.status).toBe(401);
    const data = await response.json();
    expect(data.message).toBe('Unauthorized - Invalid token');
  });
});
