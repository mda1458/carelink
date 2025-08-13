export type Role = "guest" | "user" | "admin";

export function hasRole(userRole: Role, required: Role | Role[]): boolean {
  const need = Array.isArray(required) ? required : [required];
  // simple hierarchy
  const weight: Record<Role, number> = { guest: 0, user: 1, admin: 2 };
  return need.some((r) => weight[userRole] >= weight[r]);
}

/**
 * Example usage in a Next.js route handler:
 *
 * import { hasRole } from '@carelink/utils/src/rbac';
 * const role = getRoleFromCookie(); // your existing auth
 * if (!hasRole(role, 'admin')) return new NextResponse('Forbidden', { status: 403 });
 */
