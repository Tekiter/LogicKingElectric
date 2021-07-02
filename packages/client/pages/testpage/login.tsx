import { Button, Container, TextField } from "@material-ui/core";

export default function LoginTest(): JSX.Element {
    return (
        <Container>
            <TextField label="username" />
            <TextField label="password" />
            <div>
                <Button color="primary">Sign In</Button>
            </div>
        </Container>
    );
}
