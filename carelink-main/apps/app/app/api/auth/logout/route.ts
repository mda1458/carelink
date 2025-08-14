import { roleCookieName } from "@/lib/roleCookie";
import { cookies } from "next/headers";

export async function POST() {
    try {
        const cookieStore = cookies();

        // Clear the role cookie with same security settings
        const isProduction = process.env.NODE_ENV === "production";
        cookieStore.set(roleCookieName(), "", {
            httpOnly: true,
            secure: isProduction,
            sameSite: "lax" as const,
            maxAge: 0, // Expire immediately
            path: "/",
        });

        return Response.json({
            success: true,
            message: "Logout successful"
        });

    } catch (error) {
        // eslint-disable-next-line no-console
        console.error("Logout error:", error);
        return Response.json({ error: "Internal server error" }, { status: 500 });
    }
}
