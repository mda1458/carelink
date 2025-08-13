# Page snapshot

```yaml
- dialog "Unhandled Runtime Error":
    - navigation:
        - button "previous" [disabled]:
            - img "previous"
        - button "next" [disabled]:
            - img "next"
        - text: 1 of 1 error Next.js (14.2.30) is outdated
        - link "(learn more)":
            - /url: https://nextjs.org/docs/messages/version-staleness
    - button "Close"
    - heading "Unhandled Runtime Error" [level=1]
    - paragraph:
        - text: 'Error: Route /protected/dashboard/ with `dynamic = "error"` couldn''t be rendered statically because it used `cookies`. See more info here:'
        - link "https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering":
            - /url: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering
    - heading "Source" [level=2]
    - link "src/lib/auth.ts (6:28) @ cookies":
        - text: src/lib/auth.ts (6:28) @ cookies
        - img
    - text: '4 | const enc = new TextEncoder(); 5 | export async function currentUser(): Promise<{ id?: string; role: Role }> { > 6 | const jar = await cookies(); | ^ 7 | const roleSig = jar.get(roleCookieName())?.value; 8 | if (roleSig) { const v = await verifyRoleCookie(roleSig); if (v) return { id: v.sub, role: v.role }; } 9 | const token = jar.get("auth_token")?.value;'
    - heading "Call Stack" [level=2]
    - button "Show collapsed frames"
```
