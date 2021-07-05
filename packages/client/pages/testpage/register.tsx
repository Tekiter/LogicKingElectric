import apiService from "@/api";
import { register } from "@/api/endpoint";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

export default function LoginTest(): JSX.Element {
    const [response, setResponse] = useState("");

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    async function requestAPI() {
        try {
            const res = await apiService.request(register.endpoint, {
                username,
                password,
            });
            setResponse(res.success + "");
        } catch (error) {
            if (register.registerFailError(error)) {
                setResponse("Register Failed : " + error.message);
            }
        }
    }
    return (
        <Container>
            <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                <Button color="primary" onClick={requestAPI}>
                    Sign up
                </Button>
            </div>
            <div>{response}</div>
        </Container>
    );
}
