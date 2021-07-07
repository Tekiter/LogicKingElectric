import { useAuthToken, useAuthTokenDestroyer, useAuthTokenSetter } from "@/state/auth";
import { issueToken } from "@/api/endpoint";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";
import { useAPIRequest } from "@/api/hooks";

export default function LoginTest(): JSX.Element {
    const authToken = useAuthToken();
    return (
        <Container>
            <LoginBox />
            <p>Current Token: {authToken}</p>
            <LogoutButton />
        </Container>
    );
}

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const setAuthToken = useAuthTokenSetter();

    const { request, data, error, isLoading } = useAPIRequest(issueToken.endpoint, {
        onSuccess(res) {
            setAuthToken(res.accessToken);
        },
    });

    return (
        <div>
            <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                <Button color="primary" onClick={() => request({ username, password })}>
                    Sign In
                </Button>
            </div>
            <p>{isLoading ? "Loading..." : ""}</p>
            <p>{JSON.stringify(data)}</p>
            <p>{error + ""}</p>
        </div>
    );
}

function LogoutButton() {
    const logout = useAuthTokenDestroyer();

    return <Button onClick={logout}>Logout</Button>;
}
