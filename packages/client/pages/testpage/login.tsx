import apiService from "@/api";
import { issueToken } from "@electric/shared/dist/api/v1/request/auth";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

export default function LoginTest(): JSX.Element {
    const [response, setResponse] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function requestAPI() {
        try {
            const res = await apiService.request(issueToken.endpoint, {
                username,
                password,
            });
            setResponse(res.accessToken);
        } catch (error) {
            setResponse("ERROR");
        }
    }
    return (
        <Container>
            <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                <Button color="primary" onClick={requestAPI}>
                    Sign In
                </Button>
            </div>
            <div>{response}</div>
        </Container>
    );
}
