import { roleCookieName, signRoleCookie, type Role } from "@/lib/roleCookie";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, password, role = "admin" } = body;

        // TODO: Replace with actual authentication logic
        // This is a demo implementation for testing cookie security
        if (!email || !password) {
            return Response.json({ error: "Missing email or password" }, { status: 400 });
        }

        // Demo auth check (replace with real auth)
        if (email === "demo@example.com" && password === "demo123") {
            // Sign the role cookie
            const cookieValue = await signRoleCookie({
                role: role as Role,
                sub: `user_${Date.now()}`
            });

            // Get cookies instance
            const cookieStore = cookies();

            // Set cookie with proper security flags
            const isProduction = process.env.NODE_ENV === "production";
            const cookieOptions = {
                httpOnly: true,
                secure: isProduction, // Only secure in production (HTTPS)
                sameSite: "lax" as const,
                maxAge: 3600, // 1 hour
                path: "/",
            };

            cookieStore.set(roleCookieName(), cookieValue, cookieOptions);

            return Response.json({
                success: true,
                user: { email, role },
                message: "Login successful"
            });
        }

        return Response.json({ error: "Invalid credentials" }, { status: 401 });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Login error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
