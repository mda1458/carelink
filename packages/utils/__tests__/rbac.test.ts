import { hasRole } from '../src/rbac';

test('hasRole allows admin for user route', () => {
  expect(hasRole('admin', 'user')).toBe(true);
});

test('hasRole blocks guest for user route', () => {
  expect(hasRole('guest', 'user')).toBe(false);
});
