import apiService from "@/api";
import { useAuthToken, useAuthTokenDestroyer, useAuthTokenSetter } from "@/state/auth";
import { issueToken } from "@/api/endpoint";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

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
    const [response, setResponse] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const setAuthToken = useAuthTokenSetter();

    async function requestAPI() {
        try {
            const res = await apiService.request(issueToken.endpoint, {
                username,
                password,
            });
            setAuthToken(res.accessToken);
        } catch (error) {
            if (issueToken.authFailError(error)) {
                setResponse("Auth Failed : " + error.message);
            }
        }
    }

    return (
        <div>
            <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                <Button color="primary" onClick={requestAPI}>
                    Sign In
                </Button>
            </div>
            <p>{response}</p>
        </div>
    );
}

function LogoutButton() {
    const logout = useAuthTokenDestroyer();

    return <Button onClick={logout}>Logout</Button>;
}
