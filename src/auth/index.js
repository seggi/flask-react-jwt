import { createAuthProvider } from "react-token-auth";

export const [useAuth, authFetch, login, logout ] = createAuthProvider({
    accessTokenKey: "accessToken",
    onUpdateToken: (token) => fetch('/refresh', {
        method: 'POST',
        body: token.refreshToken
    })
    .then(r => r.json())
});