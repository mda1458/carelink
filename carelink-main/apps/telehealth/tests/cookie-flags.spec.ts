import { expect, test } from '@playwright/test';

test('login endpoint sets secure cookie flags', async ({ request }) => {
    // Test login endpoint sets cookies with proper security flags
    const response = await request.post('/api/auth/login', {
        data: {
            email: 'demo@example.com',
            password: 'demo123',
            role: 'clinician'
        }
    });

    expect(response.status()).toBe(200);

    const setCookieHeader = response.headers()['set-cookie'];
    expect(setCookieHeader).toBeDefined();

    // Verify security flags are present
    expect(setCookieHeader).toContain('HttpOnly');
    expect(setCookieHeader).toContain('SameSite=Lax');
    expect(setCookieHeader).toContain('Path=/');

    // In development, Secure flag might not be set (HTTP)
    // In production, Secure flag should be set (HTTPS)
    if (process.env.NODE_ENV === 'production') {
        expect(setCookieHeader).toContain('Secure');
    }
});

test('logout endpoint clears cookie properly', async ({ request }) => {
    // First login to set a cookie
    const loginResponse = await request.post('/api/auth/login', {
        data: {
            email: 'demo@example.com',
            password: 'demo123',
            role: 'clinician'
        }
    });

    expect(loginResponse.status()).toBe(200);

    // Then logout
    const logoutResponse = await request.post('/api/auth/logout');
    expect(logoutResponse.status()).toBe(200);

    const setCookieHeader = logoutResponse.headers()['set-cookie'];
    expect(setCookieHeader).toBeDefined();

    // Verify cookie is being cleared (Max-Age=0 or Expires in past)
    expect(setCookieHeader).toMatch(/Max-Age=0|Expires=/);
    expect(setCookieHeader).toContain('HttpOnly');
    expect(setCookieHeader).toContain('SameSite=Lax');
});

test('invalid login credentials rejected', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
        data: {
            email: 'invalid@example.com',
            password: 'wrongpassword'
        }
    });

    expect(response.status()).toBe(401);

    // Should not set any cookies on failed login
    const setCookieHeader = response.headers()['set-cookie'];
    expect(setCookieHeader).toBeUndefined();
});

test('missing credentials return 400', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
        data: {}
    });

    expect(response.status()).toBe(400);

    const body = await response.json();
    expect(body.error).toContain('Missing email or password');
});
