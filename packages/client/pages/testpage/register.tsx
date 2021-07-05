import { register } from "@/api/endpoint";
import { useAPIRequest } from "@/api/hooks";
import { Button, Container, TextField } from "@material-ui/core";
import { useState } from "react";

export default function LoginTest(): JSX.Element {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const requestRegister = useAPIRequest(register.endpoint);

    function ShowError() {
        if (requestRegister.error) {
            if (register.registerFailError(requestRegister.error)) {
                return <div>Register Fail</div>;
            }
            return <div>Fatal Error</div>;
        }
        return <></>;
    }

    return (
        <Container>
            <TextField label="username" value={username} onChange={e => setUsername(e.target.value)} />
            <TextField label="password" value={password} onChange={e => setPassword(e.target.value)} />
            <div>
                {requestRegister.isLoading ? "Loading..." : ""}
                <Button color="primary" onClick={() => requestRegister.request({ username, password })}>
                    Sign up
                </Button>
            </div>
            <div>{requestRegister.data}</div>
            <ShowError />
        </Container>
    );
}
