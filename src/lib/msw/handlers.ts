import { http, HttpResponse, delay } from 'msw';

// Test user credentials
const TEST_USER = {
  email: 'user@example.com',
  password: 'Password123!',
};

const TEST_USER_DATA = {
  id: '1',
  email: 'user@example.com',
  name: 'Test User',
};

const TEST_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6IlRlc3QgVXNlciIsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsImlhdCI6MTYxNjI0NzQ0MCwiZXhwIjoxNjE2MjUxMDQwfQ.example';

export const handlers = [
  // Sign-in endpoint
  http.post('/api/auth/sign-in', async ({ request }) => {
    await delay(800 + Math.random() * 400); // 800-1200ms delay
    
    const body = await request.json() as { email: string; password: string };
    const { email, password } = body;
    
    if (email === TEST_USER.email && password === TEST_USER.password) {
      return HttpResponse.json({
        user: TEST_USER_DATA,
        token: TEST_TOKEN,
      });
    }
    
    return HttpResponse.json(
      {
        message: 'Invalid email or password',
        code: 'INVALID_CREDENTIALS',
      },
      { status: 401 }
    );
  }),

  // Get current user endpoint
  http.get('/api/me', async ({ request }) => {
    await delay(300 + Math.random() * 200); // 300-500ms delay
    
    const authHeader = request.headers.get('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return HttpResponse.json(
        {
          message: 'Unauthorized - No valid token provided',
          code: 'NO_TOKEN',
        },
        { status: 401 }
      );
    }
    
    const token = authHeader.replace('Bearer ', '');
    
    if (token !== TEST_TOKEN) {
      return HttpResponse.json(
        {
          message: 'Unauthorized - Invalid token',
          code: 'INVALID_TOKEN',
        },
        { status: 401 }
      );
    }
    
    return HttpResponse.json(TEST_USER_DATA);
  }),
];
